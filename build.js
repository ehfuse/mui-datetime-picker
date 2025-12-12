const esbuild = require("esbuild");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const external = [
    "react",
    "react-dom",
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
    "@ehfuse/overlay-scrollbar",
];

async function build() {
    // Clean dist folder
    if (fs.existsSync("dist")) {
        fs.rmSync("dist", { recursive: true });
    }
    fs.mkdirSync("dist");

    // CommonJS build
    await esbuild.build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        sourcemap: true,
        format: "cjs",
        outfile: "dist/index.js",
        external,
        platform: "browser",
        target: ["es2020"],
        jsx: "automatic",
    });

    // ESM build
    await esbuild.build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        sourcemap: true,
        format: "esm",
        outfile: "dist/index.esm.js",
        external,
        platform: "browser",
        target: ["es2020"],
        jsx: "automatic",
    });

    // Generate TypeScript declarations
    console.log("Generating TypeScript declarations...");
    try {
        execSync(
            "npx tsc --declaration --emitDeclarationOnly --outDir dist --project tsconfig.build.json",
            {
                stdio: "inherit",
            }
        );
    } catch (e) {
        console.warn(
            "TypeScript declaration generation failed, creating minimal declaration..."
        );
        // Create minimal declaration file
        const indexDts = `export * from './types';
export { SimpleCalendar } from './SimpleCalendar';
export { TimePicker } from './TimePicker';
export { TimeSelector } from './TimeSelector';
export { PopupCalendar } from './PopupCalendar';
`;
        fs.writeFileSync("dist/index.d.ts", indexDts);

        // Copy types.ts as types.d.ts
        const typesContent = fs.readFileSync("src/types.ts", "utf-8");
        fs.writeFileSync("dist/types.d.ts", typesContent);
    }

    console.log("Build completed successfully!");
}

build().catch((e) => {
    console.error(e);
    process.exit(1);
});
