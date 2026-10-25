/**
 * locale.ts
 * 캘린더 로케일 정의
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useSyncExternalStore } from "react";

/** 캘린더 로케일 타입 (텍스트 커스터마이징) */
export interface CalendarLocale {
    weekdays: [string, string, string, string, string, string, string]; // 요일 (일~토)
    months: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ]; // 월 (1~12월)
    today: string; // 오늘 버튼
    confirm: string; // 확인 버튼
    cancel: string; // 취소 버튼
    close: string; // 닫기 버튼
    am?: string; // 오전 (바퀴 시간 고르기의 오전/오후 줄 — 없으면 "AM")
    pm?: string; // 오후 (없으면 "PM")
    selectYear?: string; // 연도 고르기 머리 글 (없으면 영어)
    selectMonth?: string; // 월 고르기 머리 글 — {{year}} 자리 (없으면 영어)
    yearMonth?: string; // 달력 머리 "2026년 1월" 꼴 — {{year}} · {{month}}(months 의 글) 자리 (없으면 "{{month}} {{year}}")
}

/** 캘린더 텍스트 타입 (부분 커스터마이징용) */
export type CalendarTexts = Partial<CalendarLocale>;

/** 한국어 로케일 */
export const koLocale: CalendarLocale = {
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    months: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
    ],
    today: "오늘",
    confirm: "확인",
    cancel: "취소",
    close: "닫기",
    am: "오전",
    pm: "오후",
    selectYear: "연도 선택",
    selectMonth: "{{year}}년 - 월 선택",
    yearMonth: "{{year}}년 {{month}}",
};

/** 영어 로케일 */
export const enLocale: CalendarLocale = {
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    today: "Today",
    confirm: "OK",
    cancel: "Cancel",
    close: "Close",
    am: "AM",
    pm: "PM",
    selectYear: "Select year",
    selectMonth: "{{year}} - Select month",
    yearMonth: "{{month}} {{year}}",
};

/** 일본어 로케일 */
export const jaLocale: CalendarLocale = {
    weekdays: ["日", "月", "火", "水", "木", "金", "土"],
    months: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ],
    today: "今日",
    confirm: "確認",
    cancel: "キャンセル",
    close: "閉じる",
    am: "午前",
    pm: "午後",
    selectYear: "年を選択",
    selectMonth: "{{year}}年 - 月を選択",
    yearMonth: "{{year}}年 {{month}}",
};

/** 중국어 간체 로케일 */
export const zhCNLocale: CalendarLocale = {
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ],
    today: "今天",
    confirm: "确认",
    cancel: "取消",
    close: "关闭",
    am: "上午",
    pm: "下午",
    selectYear: "选择年份",
    selectMonth: "{{year}}年 - 选择月份",
    yearMonth: "{{year}}年 {{month}}",
};

/** 중국어 번체 로케일 */
export const zhTWLocale: CalendarLocale = {
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ],
    today: "今天",
    confirm: "確認",
    cancel: "取消",
    close: "關閉",
    am: "上午",
    pm: "下午",
    selectYear: "選擇年份",
    selectMonth: "{{year}}年 - 選擇月份",
    yearMonth: "{{year}}年 {{month}}",
};

/** 스페인어 로케일 */
export const esLocale: CalendarLocale = {
    weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    months: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ],
    today: "Hoy",
    confirm: "Aceptar",
    cancel: "Cancelar",
    close: "Cerrar",
};

/** 프랑스어 로케일 */
export const frLocale: CalendarLocale = {
    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    months: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Aoû",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
    ],
    today: "Aujourd'hui",
    confirm: "OK",
    cancel: "Annuler",
    close: "Fermer",
    selectYear: "Choisir l'année",
    selectMonth: "{{year}} - Choisir le mois",
    yearMonth: "{{month}} {{year}}",
};

/** 독일어 로케일 */
export const deLocale: CalendarLocale = {
    weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
    ],
    today: "Heute",
    confirm: "OK",
    cancel: "Abbrechen",
    close: "Schließen",
    selectYear: "Jahr auswählen",
    selectMonth: "{{year}} - Monat auswählen",
    yearMonth: "{{month}} {{year}}",
};

/** 포르투갈어 로케일 */
export const ptLocale: CalendarLocale = {
    weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    months: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ],
    today: "Hoje",
    confirm: "OK",
    cancel: "Cancelar",
    close: "Fechar",
};

/** 러시아어 로케일 */
export const ruLocale: CalendarLocale = {
    weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    months: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
    ],
    today: "Сегодня",
    confirm: "ОК",
    cancel: "Отмена",
    close: "Закрыть",
};

/** 이탈리아어 로케일 */
export const itLocale: CalendarLocale = {
    weekdays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
    months: [
        "Gen",
        "Feb",
        "Mar",
        "Apr",
        "Mag",
        "Giu",
        "Lug",
        "Ago",
        "Set",
        "Ott",
        "Nov",
        "Dic",
    ],
    today: "Oggi",
    confirm: "OK",
    cancel: "Annulla",
    close: "Chiudi",
    selectYear: "Seleziona l'anno",
    selectMonth: "{{year}} - Seleziona il mese",
    yearMonth: "{{month}} {{year}}",
};

/** 아랍어 로케일 */
export const arLocale: CalendarLocale = {
    weekdays: ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"],
    months: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ],
    today: "اليوم",
    confirm: "موافق",
    cancel: "إلغاء",
    close: "إغلاق",
};

/** 힌디어 로케일 */
export const hiLocale: CalendarLocale = {
    weekdays: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    months: [
        "जन",
        "फर",
        "मार्च",
        "अप्रै",
        "मई",
        "जून",
        "जुला",
        "अग",
        "सित",
        "अक्टू",
        "नव",
        "दिस",
    ],
    today: "आज",
    confirm: "ठीक",
    cancel: "रद्द",
    close: "बंद",
};

/** 베트남어 로케일 */
export const viLocale: CalendarLocale = {
    weekdays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    months: [
        "Th1",
        "Th2",
        "Th3",
        "Th4",
        "Th5",
        "Th6",
        "Th7",
        "Th8",
        "Th9",
        "Th10",
        "Th11",
        "Th12",
    ],
    today: "Hôm nay",
    confirm: "OK",
    cancel: "Hủy",
    close: "Đóng",
    selectYear: "Chọn năm",
    selectMonth: "{{year}} - Chọn tháng",
    yearMonth: "{{month}} {{year}}",
};

/** 태국어 로케일 */
export const thLocale: CalendarLocale = {
    weekdays: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    months: [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
    ],
    today: "วันนี้",
    confirm: "ตกลง",
    cancel: "ยกเลิก",
    close: "ปิด",
};

/** 인도네시아어 로케일 */
export const idLocale: CalendarLocale = {
    weekdays: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ],
    today: "Hari ini",
    confirm: "OK",
    cancel: "Batal",
    close: "Tutup",
};

/** 네덜란드어 로케일 */
export const nlLocale: CalendarLocale = {
    weekdays: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
    months: [
        "Jan",
        "Feb",
        "Mrt",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec",
    ],
    today: "Vandaag",
    confirm: "OK",
    cancel: "Annuleren",
    close: "Sluiten",
};

/** 폴란드어 로케일 */
export const plLocale: CalendarLocale = {
    weekdays: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
    months: [
        "Sty",
        "Lut",
        "Mar",
        "Kwi",
        "Maj",
        "Cze",
        "Lip",
        "Sie",
        "Wrz",
        "Paź",
        "Lis",
        "Gru",
    ],
    today: "Dziś",
    confirm: "OK",
    cancel: "Anuluj",
    close: "Zamknij",
};

/** 터키어 로케일 */
export const trLocale: CalendarLocale = {
    weekdays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    months: [
        "Oca",
        "Şub",
        "Mar",
        "Nis",
        "May",
        "Haz",
        "Tem",
        "Ağu",
        "Eyl",
        "Eki",
        "Kas",
        "Ara",
    ],
    today: "Bugün",
    confirm: "Tamam",
    cancel: "İptal",
    close: "Kapat",
};

/** 기본 로케일 (한국어) */
export const defaultLocale = koLocale;

/** 로케일 맵 */
export const locales = {
    ko: koLocale,
    en: enLocale,
    ja: jaLocale,
    zhCN: zhCNLocale,
    zhTW: zhTWLocale,
    es: esLocale,
    fr: frLocale,
    de: deLocale,
    pt: ptLocale,
    ru: ruLocale,
    it: itLocale,
    ar: arLocale,
    hi: hiLocale,
    vi: viLocale,
    th: thLocale,
    id: idLocale,
    nl: nlLocale,
    pl: plLocale,
    tr: trLocale,
} as const;

/** 로케일 키 타입 */
export type LocaleKey = keyof typeof locales;

/** 로케일 프롭 타입 (객체 또는 문자열) */
export type LocaleProp = CalendarLocale | LocaleKey;

/**
 * 로케일 프롭을 CalendarLocale 객체로 변환
 * @param locale - CalendarLocale 객체 또는 로케일 키 문자열 (예: 'ko', 'en')
 * @returns CalendarLocale 객체
 */
export function resolveLocale(locale: LocaleProp | undefined): CalendarLocale {
    if (!locale) return locales[globalLocaleKey];
    if (typeof locale === "string") {
        return locales[locale] ?? locales[globalLocaleKey];
    }
    return locale;
}

// ── 앱 전역 화면 언어(2026-10-26 — 1.1.0) ──────────────────────────────────────────
// locale prop 을 안 준 달력 · 시간 고르기는 이 언어를 쓴다. 기본은 한국어(전과 같다). prop 이 이긴다.
let globalLocaleKey: LocaleKey = "ko";
const localeListeners = new Set<() => void>();

/** "en-US" · "zh_TW" 같은 언어 코드를 로케일 키로 — 모르는 언어면 영어 */
export function langToLocaleKey(lang?: string | null): LocaleKey {
    const raw = String(lang ?? "").trim();
    if (raw in locales) return raw as LocaleKey;
    const [base, region = ""] = raw.toLowerCase().split(/[-_]/);
    if (base === "zh") return /^(tw|hk|mo|hant)$/.test(region) ? "zhTW" : "zhCN";
    return (base in locales ? base : "en") as LocaleKey;
}

/** 앱 전역 화면 언어를 정한다(앱이 언어를 바꿀 때마다 부른다) — 열린 달력도 다시 그린다. */
export function setMuiDatetimePickerLocale(lang: string): void {
    const next = langToLocaleKey(lang);
    if (next === globalLocaleKey) return;
    globalLocaleKey = next;
    localeListeners.forEach((fn) => fn());
}

/** 지금 앱 전역 화면 언어(로케일 키) */
export function getMuiDatetimePickerLocale(): LocaleKey {
    return globalLocaleKey;
}

function subscribeLocale(fn: () => void): () => void {
    localeListeners.add(fn);
    return () => {
        localeListeners.delete(fn);
    };
}

/** 컴포넌트용 — locale prop(있으면) 또는 전역 언어의 CalendarLocale. 전역 언어가 바뀌면 다시 그린다. */
export function useCalendarLocale(locale: LocaleProp | undefined): CalendarLocale {
    const key = useSyncExternalStore(subscribeLocale, getMuiDatetimePickerLocale, getMuiDatetimePickerLocale);
    return locale ? resolveLocale(locale) : locales[key];
}

/** {{year}} 같은 자리에 값을 넣는다 */
export function fillLocaleText(template: string, params: Record<string, string | number>): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, name) => (params[name] == null ? m : String(params[name])));
}
