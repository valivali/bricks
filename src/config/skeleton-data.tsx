import React from "react"
import { BridgeIcon, WallIcon, SignageIcon, TunnelIcon } from "@/components/icons"

export interface SkeletonOption {
  id: string
  label: string
  icon?: React.ReactNode
  structTypeId?: number
  mainComponent?: string
  basicMeasurementUnit?: string
  secondaryMeasurementUnit?: string
  mainComponentId?: string
  secondaryComponent?: string
  secondaryComponentId?: string
  subOptions?: SkeletonOption[]
}

export interface StructuralComponent {
  componentId: string
  description: string
  importanceLevel: ImportanceLevel
  basicMeasurementUnit: string
  secondaryMeasurementUnit: string
  evaluationNeeded: boolean
  notes: string
}

export const ImportanceLevel = {
  HIGH: "גבוהה",
  HIGH_VERY: "גבוהה מאוד",
  MEDIUM: "בינונית",
  LOW: "נמוכה",
  NONE: "-"
} as const

export type ImportanceLevel = (typeof ImportanceLevel)[keyof typeof ImportanceLevel]

export const StructureType = {
  BRIDGE: "bridge",
  WALL: "wall",
  SIGNAGE_BRIDGE: "signage-bridge",
  TUNNEL: "tunnel"
} as const

export type SkeletonStructureType = (typeof StructureType)[keyof typeof StructureType]

export const SKELETON_STRUCTURE_TYPES: SkeletonOption[] = [
  {
    id: StructureType.BRIDGE,
    label: "גשר",
    icon: <BridgeIcon />,
    subOptions: [
      {
        id: "arch-bridges",
        label: "גשרי קשתות",
        subOptions: [
          {
            id: "full-arch",
            label: "קשת מלאה",
            structTypeId: 1,
            mainComponent: "גוף הקשת",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "1.1",
            secondaryComponentId: ""
          },
          {
            id: "open-arch",
            label: "קשת פתוחה",
            structTypeId: 2,
            mainComponent: "גוף הקשת",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "1.2",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.2"
          },
          {
            id: "tied-arch",
            label: "קשת מוחזקת (מיתר)",
            structTypeId: 3,
            mainComponent: "גוף הקשת",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "1.3",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.3"
          }
        ]
      },
      {
        id: "beam-bridges",
        label: "גשרי קורות",
        subOptions: [
          {
            id: "beam-and-slab",
            label: "קורות וטבלה",
            structTypeId: 4,
            mainComponent: "קורה ראשית",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "1.4",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.4"
          },
          {
            id: "box-section",
            label: "חתך ארגזי",
            structTypeId: 5,
            mainComponent: "גוף הארגז",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "1.5",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.5"
          },
          {
            id: "half-through-beams",
            label: "קורות half through",
            structTypeId: 6,
            mainComponent: "קורה ראשית",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "1.6",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.6"
          },
          {
            id: "composite-beams",
            label: "קורות ומילוי מרוכבים",
            structTypeId: 7,
            mainComponent: "קורה ראשית",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "1.7",
            secondaryComponent: "חומר מילוי",
            secondaryComponentId: "3.7"
          }
        ]
      },
      {
        id: "truss-bridges",
        label: "גשרי מסבך",
        subOptions: [
          {
            id: "underslung-truss",
            label: "מסבך תחתון Underslung truss",
            structTypeId: 8,
            mainComponent: "גוף מסבך",
            basicMeasurementUnit: "מ״א",
            mainComponentId: "1.8",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.8"
          },
          {
            id: "half-through-truss",
            label: "מסבך Half through truss",
            structTypeId: 9,
            mainComponent: "גוף מסבך",
            basicMeasurementUnit: "מ״א",
            mainComponentId: "1.9",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.9"
          },
          {
            id: "trough-truss",
            label: "מסבך Trough truss",
            structTypeId: 10,
            mainComponent: "גוף מסבך",
            basicMeasurementUnit: "מ״א",
            mainComponentId: "1.10",
            secondaryComponent: "טבלת המיסעה",
            secondaryComponentId: "3.10"
          }
        ]
      },
      {
        id: "slab-bridges",
        label: "גשרי טבלה",
        subOptions: [
          {
            id: "full-monolithic-slab",
            label: "טבלה מונוליטית מלאה",
            structTypeId: 11,
            mainComponent: "הטבלה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "1.11"
          },
          {
            id: "hollow-monolithic-slab",
            label: "טבלה מונוליטית עם חללים",
            structTypeId: 12,
            mainComponent: "הטבלה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "1.12"
          }
        ]
      },
      {
        id: "conduit-culvert",
        label: "מוביל / צינור / מעבר תחתי",
        subOptions: [
          {
            id: "round-oval",
            label: "עגול / אובלי",
            structTypeId: 13,
            mainComponent: "גוף המובל",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "1.13"
          },
          {
            id: "box-culvert",
            label: "מעבר ארגזי",
            structTypeId: 14,
            mainComponent: "טבלת התקרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "1.14"
          }
        ]
      }
    ]
  },
  {
    id: StructureType.WALL,
    label: "קיר",
    icon: <WallIcon />
  },
  {
    id: StructureType.SIGNAGE_BRIDGE,
    label: "גשרי שילוט",
    icon: <SignageIcon />
  },
  {
    id: StructureType.TUNNEL,
    label: "מנהרה",
    icon: <TunnelIcon />,
    subOptions: [
      {
        id: "dig-tunnel",
        label: "מנהרה בשיטת חפירה וכיסוי",
        subOptions: [
          {
            id: "box-tunnel-vault-roof-cast-in-situ",
            label: "מנהרה בחתך ארגזי עם תקרה מקשית יצוקה באתר",
            structTypeId: 1,
            mainComponent: "טבלת התקרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.01"
          },
          {
            id: "box-tunnel-beam-and-slab-roof-cast-in-situ",
            label: "מנהרה בחתך ארגזי עם תקרת קורות וטבלה",
            structTypeId: 2,
            mainComponent: "קורת התקרה",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "01.02",
            secondaryComponent: "טבלת התקרה",
            secondaryComponentId: "3.2"
          },
          {
            id: "box-tunnel-composite-beam-roof-cast-in-situ",
            label: "מנהרה בחתך ארגזי עם תקרת קורות ומילוי מרוכבים",
            structTypeId: 3,
            mainComponent: "קורה ראשית",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "01.03",
            secondaryComponent: "חומר המילוי",
            secondaryComponentId: "3.3"
          },
          {
            id: "box-tunnel-precast-segments",
            label: "מנהרה בחתך ארגזי ממקטעים טרומיים",
            structTypeId: 4,
            mainComponent: "טבלת תקרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.04"
          },
          {
            id: "other-tunnel-vault-roof-cast-in-situ",
            label: "מנהרה בחתך אחר (קשתי, מעגל חלקי, פרסה וכדו׳) יצוקה באתר",
            structTypeId: 5,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "01.05"
          },
          {
            id: "other-tunnel-vault-roof-precast-segments",
            label: "מנהרה בחתך אחר (קשתי, מעגל חלקי, פרסה וכדו׳) ממקטעים טרומיים",
            structTypeId: 6,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "01.06"
          }
        ]
      },
      {
        id: "push-tunnel",
        label: "מנהרה בדחיקה",
        subOptions: [
          {
            id: "box-push-tunnel-segments",
            label: "מנהרה בחתך ארגזי ממקטעים טרומיים",
            structTypeId: 10,
            mainComponent: "טבלת תקרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.10"
          },
          {
            id: "other-push-tunnel-segments",
            label: "מנהרה בחתך אחר (מעגל, אוולי וכדו׳) ממקטעים טרומיים",
            structTypeId: 11,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״א",
            secondaryMeasurementUnit: "מ״א היקף",
            mainComponentId: "01.11"
          }
        ]
      },
      {
        id: "mining-tunnel",
        label: "מנהרה בכריה",
        subOptions: [
          {
            id: "piling-concrete-cast-in-situ",
            label: "דיפון של גוף המנהרה מבטון מזויין יצוק באתר",
            structTypeId: 20,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.20"
          },
          {
            id: "piling-concrete-precast",
            label: "דיפון של גוף המנהרה ממקטעים טרומיים",
            structTypeId: 21,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.21"
          },
          {
            id: "piling-shotcrete",
            label: "דיפון של גוף המנהרה על ידי בטון מותז",
            structTypeId: 22,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.22"
          },
          {
            id: "no-piling",
            label: "מנהרה ללא דיפון (סלע חשוף לאחר כריה)",
            structTypeId: 23,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.23"
          },
          {
            id: "piling-stone-bricks",
            label: "דיפון של גוף המנהרה על ידי אבן/לבנים",
            structTypeId: 24,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.24"
          },
          {
            id: "piling-steel-structure",
            label: "דיפון של גוף המנהרה על ידי קונסטרוקציית פלדה",
            structTypeId: 25,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.25"
          },
          {
            id: "piling-wood-structure",
            label: "דיפון של גוף המנהרה על ידי קונסטרוקציית עץ",
            structTypeId: 26,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.26"
          },
          {
            id: "piling-other",
            label: "דיפונים אחרים",
            structTypeId: 27,
            mainComponent: "גוף המנהרה",
            basicMeasurementUnit: "מ״ר",
            mainComponentId: "01.27"
          }
        ]
      }
    ]
  }
]

export const BRIDGE_STRUCTURAL_COMPONENTS: StructuralComponent[] = [
  {
    componentId: "1",
    description: "רכיב ראשי - מס׳ 1",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "לבחור מטבלה 2",
    secondaryMeasurementUnit: "לבחור מטבלה 2",
    evaluationNeeded: true,
    notes: "הרכיב הראשי והיחידות מותאמים לסוג המבנה לפי טבלה 2"
  },
  {
    componentId: "2",
    description: "רכיב משני - קורות רוחב / דיאפרגמות",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "היחידה המשנית היא אורך ההיקף הגלוי של הקורה/דיאפרגמה"
  },
  {
    componentId: "3",
    description: "רכיב משני - מס׳ 3",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "לבחור מטבלה 2",
    secondaryMeasurementUnit: "לבחור מטבלה 2",
    evaluationNeeded: true,
    notes: "הרכיב המשני והיחידות מותאמים לסוג המבנה לפי טבלה 2"
  },
  {
    componentId: "4",
    description: "חצאי פרקים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "הסבר נפרד לגבי חצאי פרקים"
  },
  {
    componentId: "5",
    description: "קורות קשר / מוטות תלייה / מתלים / הקשחות / מפשעה",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "עוביים ומחברים לאורך הקורה הראשית ייחשבו גם בהקשחות משנה"
  },
  {
    componentId: "6",
    description: "זיז קצה",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח מעטפת גלויה"
  },
  {
    componentId: "7",
    description: "מעצרי גזירה",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "נ״ח",
    secondaryMeasurementUnit: "מ״ר",
    evaluationNeeded: true,
    notes: "יחידת משנה היא שטח פרישת פני מעצרי הגזירה"
  },
  {
    componentId: "8",
    description: "כלונסאות / יסודות / ראש כלונסאות",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח ההיטל האופקי של ראש הכלונס או היסוד"
  },
  {
    componentId: "9",
    description: "נציב קצה / בסיס קשת / קירות סוגרים",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "סכום פרישת שטח הפנים של פני הנציב"
  },
  {
    componentId: "10",
    description: "קירות מצע",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח החזית - החלק שמעל פני הדרך"
  },
  {
    componentId: "11",
    description: "עמודים / נציבי ביניים / חיזוקי קשתות",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "סכום פרישת שטח הפנים של כל העמודים/קירות"
  },
  {
    componentId: "12",
    description: "קורות ראש / ראש עמודים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "יחידת המשנה היא אורך היקף הגלוי של הקורה/כנף המשען"
  },
  {
    componentId: "13",
    description: "סמכים מסוגים שונים",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "נ״ח",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "הגבהת הבטון (תושבת) נחשבת חלק מהסמך"
  },
  {
    componentId: "14",
    description: "משטחי השענה לסמכים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "המשטח עליו נשענות התושבות לסמך"
  },
  {
    componentId: "15",
    description: "ניקוז מבנה עליון",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "נ״ח",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "יחידות ניקוז"
  },
  {
    componentId: "16",
    description: "ניקוז מבנה תחתון / תעלות",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח התעלה"
  },
  {
    componentId: "17",
    description: "אטומים שונים (מבנה עליון/תחתון)",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח איטום"
  },
  {
    componentId: "18",
    description: "חומרי התפשטות במבנים גשרים",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "תפרי מיסעה"
  },
  {
    componentId: "19",
    description: "צביעה וציפויי הגנה - אלמנטי מבנה עליון",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח כוללת של צבע/גלוון/אחרים"
  },
  {
    componentId: "20",
    description: "חיפוי/צביעה/ציפויי הגנה - אלמנטי מבנה תחתון",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח כוללת של צבע/גלוון/אחרים"
  },
  {
    componentId: "21",
    description: "חיפוי/צביעה/ציפויי הגנה - רכובים ומעקות",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "יחידת המשנה היא היקף הקיר/המעקה בטון בלבד"
  },
  {
    componentId: "22",
    description: "סולמות / מעברים / מדרגות / שבילי גישה",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מטר רוחב",
    evaluationNeeded: true,
    notes:
      "במקרה של שימוש משני בלבד. בגשרי הולכי רגל ייחשבו כמוסיפה. שבילי גישה מתייחסים למעברי שירות בגשר עצמו כגון cat walks (ולא לדרך חקלאית בגישה וכדו׳)"
  },
  {
    componentId: "23",
    description: "מעקות בטיחות / מעקות להולכי רגל",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "מעקה ייחשב חלק הקיר/קורה שמעל פני הדרך. יחידה משנית מ״א היקף תירשם עבור מעקות אטומים מבטון או מאבן."
  },
  {
    componentId: "24",
    description: "ציפוי מיסעה (אספלט וכדו׳)",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת השטח בתחום שבין קווים צהובים או בין הגבהות"
  },
  {
    componentId: "25",
    description: "ציפוי פני מדרכות / הגבהות / שוליים / ציפוי פני גשרי הולכי רגל",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת השטח בהגבהות או מחוץ לקו צהוב"
  },
  {
    componentId: "26",
    description: "קרקעית הנחל / תחתית השטח שמתחת לגשר",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: ""
  },
  {
    componentId: "27",
    description: "שינורים / קורות שפה / כרכובים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: false,
    notes: "יחידה משנית מ״א היקף גלוי הסינור/קורה/כרכוב"
  },
  {
    componentId: "28",
    description: "הגנת נציבים / הגנת התנגשות / הגנה מזרימה",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת השטח, לדוגמא חלק הבטון התחתון בנציבים במים"
  },
  {
    componentId: "29",
    description: "רכיבי הסדרת ערוץ",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח גביונים, ריפ רפ בערוץ, בטון מעוצב וכדי׳"
  },
  {
    componentId: "30",
    description: "דיפונים / מדרונות משופעים מצופים",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח ריפ רפ, בטון הגנה, ריצופי מדרונות וכדי׳ במבנה."
  },
  {
    componentId: "31",
    description: "קירות כנף",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת מ״ר חזית"
  },
  {
    componentId: "32",
    description: "קירות תומכים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת מ״ר חזית הקירות השייכים לגשר"
  },
  {
    componentId: "33",
    description: "פני דופן סוללות",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח פני הסוללה"
  },
  {
    componentId: "34",
    description: "תפרי התפשטות בקירות/גשרים ומובילים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "תפרי התפשטות במובילים, נציבי קצה, כנפיים וקירות השייכים לגשר."
  },
  {
    componentId: "35",
    description: "קירות ברמפות הגישה לגשר",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "מ״ר חזית קיר (אשר אינו נחשב קיר או מבנה נפרד)"
  },
  {
    componentId: "36",
    description: "שילוט",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "מספר יחידות השילוט"
  },
  {
    componentId: "37",
    description: "תאורה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "מספר יחידות התאורה"
  },
  {
    componentId: "38",
    description: "מערכות / שירותים",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "אורך"
  },
  {
    componentId: "39",
    description: "טבלאות גישה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: ""
  },
  {
    componentId: "40",
    description: "תעלות ניקוז ברמפות הגישה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח התעלה"
  },
  {
    componentId: "41",
    description: "אבני שפה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "אבני שפה במדרכות או בהגבהות לניקוז"
  },
  {
    componentId: "42",
    description: "מעקות ברמפות הגישה לגשר",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "מעקה ייחשב חלק הקיר/קורה שמעל פני הדרך. יחידה משנית מ״א היקף תירשם עבור מעקות אטומים מבטון או מאבן בלבד."
  },
  {
    componentId: "43",
    description: "רכיבים מכניים שונים",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שערים, סופגי אנרגיה, מרסנים וכדו׳"
  },
  {
    componentId: "46",
    description: "מקבעי (blisters) עוגנים אוכפים (saddle)",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "מ״ר",
    evaluationNeeded: true,
    notes: "מקבי עוגנים ואוכפים לעיגון מערכות דריכה אשר אינם חלק אינטגראלי מהקורה/החתך (מחוץ למישור הקורה/החתך)"
  }
]

export const SIGNAGE_BRIDGE_STRUCTURAL_COMPONENTS: StructuralComponent[] = [
  {
    componentId: "1",
    description: "יסודות",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "מ״ר",
    evaluationNeeded: true,
    notes:
      "היחידה המשנית שווה לשטח ההיטל האופקי של היסוד או ראש היסוד. במקרה של יסוד קבור יש להעריך על פי סימנים במבנה העליון או ביחס לסביבה."
  },
  {
    componentId: "2",
    description: "מסבך/קורה/זיז",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "ראה תרשים 16. יחידת מידה משנית הינה מ״א היקף קורת בטון או קורת פלדה אטומה בלבד."
  },
  {
    componentId: "3",
    description: "רכיבים ניצבים/רוחביים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "ראה תרשים 17"
  },
  {
    componentId: "4",
    description: "עמודים/תמיכות/רגליים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "ראה תרשימים 16, 17. יחידת המידה המשנית הינה היקף העמוד."
  },
  {
    componentId: "5",
    description: "צביעה וציפויי הגנה : מסבך/קורה/זיז",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "צביעה, גלוון, טיח, חיפויים וכד׳. יחידת מידה משנית הינה מ״א היקף קורת בטון או קורת פלדה אטומה בלבד."
  },
  {
    componentId: "6",
    description: "צביעה וציפויי הגנה : עמודים/תמיכות/רגליים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "צביעה, גלוון, טיח, חיפויים וכד׳. יחידת המידה המשנית הינה היקף העמוד."
  },
  {
    componentId: "7",
    description: "צביעה וציפויי הגנה : אלמנטים אחרים",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "לדוגמה אלמנטים 8,9,10,13 ואחרים"
  },
  {
    componentId: "8",
    description: "מדרך גישה/סיפון",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "הרכיב המשמש כמשטח התומך את העובדים על הגשר."
  },
  {
    componentId: "9",
    description: "סולם גישה",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א",
    evaluationNeeded: true,
    notes: ""
  },
  {
    componentId: "10",
    description: "מעקות/מאחזי יד",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "מעקות/מאחזי יד על המדרך"
  },
  {
    componentId: "11",
    description: "מחברי בסיס",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "המחברים שבין העמודים/רגליים ליסוד"
  },
  {
    componentId: "12",
    description: "מחברי מסבך/קורה/זיז",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "המחברים שבין הרכיב האורכי הראשי לעמודים/רגליים"
  },
  {
    componentId: "13",
    description: "מחברי השילוט והסימון",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "כולל השלד הנושא המבני והמחברים של השילוט למבנה הראשי"
  },
  {
    componentId: "14",
    description: "שילוט/סימון",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "מ״ר",
    evaluationNeeded: false,
    notes: "שטח השילוט."
  },
  {
    componentId: "15",
    description: "תאורה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: ""
  },
  {
    componentId: "16",
    description: "מערכות ושירותים",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: ""
  },
  {
    componentId: "17",
    description: "הגנת יסודות",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: ""
  }
]

export const TUNNEL_STRUCTURAL_COMPONENTS: StructuralComponent[] = [
  {
    componentId: "1",
    description: "רכיב ראשי - מס׳ 1",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "לבחור מטבלה 6",
    secondaryMeasurementUnit: "לבחור מטבלה 6",
    evaluationNeeded: true,
    notes:
      "מספר הרכיב הראשי והיחידות המתאימות מצוינות בטבלה 6 בהתאם לסוג המנהרה ושיטת ביצוע. במקרה של דיפון בסגמנטים טרומיים במנהרה בכרייה אין חובה בהערכה מפורטת אך יש לציין מיקום הפגמים הנצפים."
  },
  {
    componentId: "2",
    description: "רכיבי משנה - תמיכות/מסגרות/קורות רוחביות",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "רכיבי רוחב המהווים חלק ממבנה המנהרה (Invert Girder/Ceiling Girder). היחידה המשנית הינה אורך ההיקף הגלוי של הרכיב."
  },
  {
    componentId: "3",
    description: "רכיב ראשי - מס׳ 3",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "לבחור מטבלה 6",
    secondaryMeasurementUnit: "לבחור מטבלה 6",
    evaluationNeeded: true,
    notes: "מספר הרכיב הראשי והיחידות המתאימות מצוינות בטבלה 6 בהתאם לסוג המנהרה."
  },
  {
    componentId: "4",
    description: "טבלת מיסעה תלויה",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח של טבלת המיסעה המיועדת לנשיאת התנועה (Slab invert / Structural Slab) ומשמשת כתקרת פלנום/מעבר מילוט תחתון או קיים."
  },
  {
    componentId: "5",
    description: "מחברים / מתלים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes:
      "מחברים/מתלים אשר אינם חלק מגוף המנהרה (מצויים מחוץ למישור הגוף). לדוגמה, מחברים לתליית תקרות תלויוות או קונסטרוקציות תותב אחרות."
  },
  {
    componentId: "6",
    description: "עוגנים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "עוגני/בורגי סלע או קרקע לתמיכת גוף המנהרה / פורטל / קירות הכנף."
  },
  {
    componentId: "7",
    description: "טבלת רצפה מונחת",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח של טבלה הרצפה המונחת המשמשת לנשיאת עומסים וֿ/או כאלמנט לחיצה בין שני צידי גוף המנהרה."
  },
  {
    componentId: "8",
    description: "עמודים / קירות / דיפון",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "סכום פרישת שטח הפנים הגלוי של פני העמודים/קירות/דיפון. רכיב זה מתייחס הן לרכיבי המעטפת החיצונית והן לרכיבים פנימיים נושאים."
  },
  {
    componentId: "9",
    description: "קורת ראש עמוד",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "יחידה משנית הינה אורך היקף הגלוי של הקורה. מיועד בדרך כלל למנהרות בעלות מספר מפתחים כאשר התמיכות מבוססות על עמודים וקורות."
  },
  {
    componentId: "10",
    description: "יסוד / ראשי כלונסאות / כלונסאות",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח היטל אופקי של יסודות לגוף המנהרה, קירות הכנף וקירות התומכים."
  },
  {
    componentId: "11",
    description: "קיר פורטל",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת חזית הקיר (בניית לבנים, קירות מבטון וכד׳) בכניסה ויציאה ממנהרה (קירות שלא סווגו ע״י מנהל המבנה כמבנה נפרד ממנהרה)."
  },
  {
    componentId: "12",
    description: "מחבר גוף מנהרה",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "מחברים שבין רכיבי המנהרה הראשיים. לדוגמה, מחברים בין מקטעים טרומיים של גוף המנהרה."
  },
  {
    componentId: "20",
    description: "נקזים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "יחידות ניקוז. לדוגמה, נקזים בגוף הקשת או בקירות הפורטל וכד׳."
  },
  {
    componentId: "21",
    description: "תעלת/צינור ניקוז",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח תעלת הניקוז בתחום המנהרה."
  },
  {
    componentId: "22",
    description: "אטומים שונים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח מערכת איטום במנהרה, קירות הפורטל, קירות דיפון וכד׳."
  },
  {
    componentId: "23",
    description: "תפרי התפשטות",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "אורך התפר בהיקף גוף המנהרה וקירות דיפון (רכיב 8) בקיר פורטל (רכיב 11) וקירות כנף (26). (לדוגמה, תפר בין מקטעי מנהרה שונים)."
  },
  {
    componentId: "24",
    description: "צביעה וציפויי הגנה : גוף המנהרה",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח הפנים של צבע ציפוי, אריחים, טיח, חיפוי אבן, לוחות שונים (לדוגמה לוחות אלומיניום)."
  },
  {
    componentId: "25",
    description: "צביעה וציפויי הגנה : מעקות בטיחות לרכב/מעקות להולכי רגל",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "צביעה, גלוון, טיח, חיפוי אבן, לוחות שונים וכד׳. יחידת משנית מ״א היקף (למעקות אטומים בלבד)."
  },
  {
    componentId: "30",
    description: "סולמות/מדרגות/שבילי גישה/מדרכות מילוט",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א רוחב",
    evaluationNeeded: true,
    notes: ""
  },
  {
    componentId: "31",
    description: "מעקות בטיחות לרכב/מעקות להולכי רגל",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "מעקות בטיחות מבטון, פלדה וכד׳. מ״א היקף יצוין במקרה של מעקות אטומים בלבד."
  },
  {
    componentId: "32",
    description: "ציפוי מיסעה",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח מיסעה המיועדת לתנועה בין מעקות או הגבהות (מדרכות, מילוט, קירות וכד׳)."
  },
  {
    componentId: "33",
    description: "ציפוי פני מדרכות/שוליים/הגבהות/שבילי מילוט",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח מדרכות מילוט, הגבהות, שבילי מילוט וכד׳."
  },
  {
    componentId: "40",
    description: "טבלת תקרה משנית",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח טבלת התקרה הגלוי. לדוגמה, טבלת התקרה משמשת כתקרה תחתונה בתעלת שחרור עשן (CEILING SLAB)."
  },
  {
    componentId: "41",
    description: "קירות/מחיצות פנימיות",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח חזית קירות פנימיים בתוך המנהרה."
  },
  {
    componentId: "42",
    description: "קירות כנף",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שטח חזית של קירות הכנף אם קיימים במבנה הכניסה למנהרה."
  },
  {
    componentId: "43",
    description: "פתחי אוורור/נישות ארובות/תעלות אוורור",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת תעלת אוורור וכד׳. בהיעדר תכניות וגישה יש להעריך את אורך התעלה בהתייעצות עם מנהל המבנה."
  },
  {
    componentId: "44",
    description: "מדרונות משופעים מצופים",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח מדרונות/סוללות מצופים כגון: כוורת, ריפ ראף, פרט רשת מרחבית עם בטון, לבנים וכד׳ בכניסה למנהרה."
  },
  {
    componentId: "45",
    description: "פני דופן סוללה/מדרון",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח סוללה שאינה מצופה בהיטל האופקי בכניסה למנהרה."
  },
  {
    componentId: "50",
    description: "תעלת ניקוז מחוץ למנהרה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "פרישת שטח התעלה המצויה מחוץ למנהרה (בראש קיר/שוקת בסוללות וכד׳)"
  },
  {
    componentId: "51",
    description: "אבני שפה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "אבני שפה במדרכות כאשר יש הפרדה בין ריצוף/פני המדרכה לאבן השפה או במקרה של אבני שפה לניקוז"
  },
  {
    componentId: "52",
    description: "שילוט",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "שילוט פנימי וחיצוני"
  },
  {
    componentId: "53",
    description: "מחברי מערכות וציוד",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "מחברים בין גופי וציוד מערכות אלקטרו מכאניות בתוך המנהרה למבנה הנושא (גוף המנהרה)."
  },
  {
    componentId: "56",
    description: "רכיבים מכאניים שונים",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "שערים, דלתות, מחסומים, סופגי אנרגיה, מרסנים, תריסי אוורור, מדפי אוויר וכד׳ (אם לא נסקרו על ידי מומחים בתחום האלקטרו מכאני)"
  },
  {
    componentId: "57",
    description: "מתקנים נושאים למערכות אחרות",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "בסיסים ומתקנים נושאים למערכות נוספות כגון משאבות מים, גנרטור חירום וכד׳."
  },
  {
    componentId: "60",
    description: "אחר",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "-",
    secondaryMeasurementUnit: "-",
    evaluationNeeded: false,
    notes: ""
  }
]

export const WALL_STRUCTURAL_COMPONENTS: StructuralComponent[] = [
  {
    componentId: "1",
    description: "יסודות",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מטר רוחב",
    evaluationNeeded: true,
    notes:
      "יסודות קירות, תחתית תעלות בטון/ניקוז. מוערך/משוער על פי סימנים בגוף הקיר או בבדיקה החושפת את היסוד. היחידה המשנית הינה רוחב היסוד הממוצע."
  },
  {
    componentId: "2",
    description: "הקיר - רכיב ראשי",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״ר / מ״א היקף",
    evaluationNeeded: true,
    notes:
      "רכיב 2.1 - לרוב עבור קיר תומך או דופן תעלה (תרשים 18). מ״ר. רכיב 2.2 - לרוב עבור קיר אקוסטי (תרשימים 20/19). היחידה המשנית הינה היקף העמוד או הפרופיל."
  },
  {
    componentId: "3",
    description: "הקיר - רכיב משני",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "ראה תרשים מספר 19 (אם קיים רכיב משני). חל גם על דפנות התעלה."
  },
  {
    componentId: "4",
    description: "קורות ראש/ קורה מאספת",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: true,
    notes: "הקורה האורכית בראש הקיר המשמשגם לעיגון המעקה."
  },
  {
    componentId: "5",
    description: "מחברי בסיס / מחברים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "מחברי עמודים וחלקים ליסוד, מחברים של לוחות וחלקים מגוף הקיר."
  },
  {
    componentId: "6",
    description: "נקזים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "כולל חורי ניקוז, פילטרים, ניקוז בגב הקיר."
  },
  {
    componentId: "7",
    description: "תפרים",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "מתייחס לאורך התפר הכולל בקירות לרבות היסוד גוף הקיר וכד׳."
  },
  {
    componentId: "8",
    description: "חיפוי/צביעה/ציפויי הגנה : קיר",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "אריחים, אבן, לוחות שונים, צביעה, טיח וכד׳."
  },
  {
    componentId: "9",
    description: "חיפוי/צביעה/ציפויי הגנה : כרכובים ומעקות",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: false,
    notes: "אריחים, אבן, לוחות שונים, צביעה, טיח וכד׳. יחידה משנית מ״א היקף תירשם עבור מעקות אטומים מבטון או מאבן."
  },
  {
    componentId: "10",
    description: "מעקות בטיחות/ מעקות להולכי רגל / כרכוב",
    importanceLevel: ImportanceLevel.HIGH,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "מ״א היקף",
    evaluationNeeded: false,
    notes: "לאורך החלק העליון והתחתון של הקיר. יחידה משנית מ״א היקף תירשם עבור מעקות אטומים מבטון או מאבן."
  },
  {
    componentId: "11",
    description: "מסלול - ראש הקיר",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "הפגמים יכולים לכלול תזוזות, ארוזיה או סימני אי יציבות."
  },
  {
    componentId: "12",
    description: "מסלול - בסיס הקיר",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "הפגמים יכולים לכלול תזוזות, ארוזיה או סימני אי יציבות."
  },
  {
    componentId: "13",
    description: "מדרכה/שוליים - ראש הקיר",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "הפגמים יכולים לכלול תזוזות, ארוזיה או סימני אי יציבות."
  },
  {
    componentId: "14",
    description: "מדרכה/שוליים - בסיס הקיר",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "הפגמים יכולים לכלול תזוזות, ארוזיה או סימני אי יציבות."
  },
  {
    componentId: "15",
    description: "סוללה/שטח בור - ראש הקיר",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "הפגמים יכולים לכלול תזוזות, ארוזיה או סימני אי יציבות."
  },
  {
    componentId: "16",
    description: "סוללה/שטח בור - בסיס הקיר",
    importanceLevel: ImportanceLevel.LOW,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "הפגמים יכולים לכלול תזוזות, ארוזיה או סימני אי יציבות."
  },
  {
    componentId: "17",
    description: "קרקעית הנחל / תחתית התעלה",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "אם נחל/תעלת מים צמודים לאורך הקיר."
  },
  {
    componentId: "18",
    description: "סינור הגנה/ריצוף הגנה/קיר תעלה נמוך",
    importanceLevel: ImportanceLevel.MEDIUM,
    basicMeasurementUnit: "מ״ר",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "אם נחל/תעלת מים צמודים לאורך הקיר."
  },
  {
    componentId: "19",
    description: "מערכת עוגנים",
    importanceLevel: ImportanceLevel.HIGH_VERY,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "עוגני קרקע/סלע, בורגי סלע וכדי׳ בהתאם למקרה."
  },
  {
    componentId: "20",
    description: "שילוט",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "שילוט המורכב על הקיר."
  },
  {
    componentId: "21",
    description: "תאורה",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "יח׳",
    secondaryMeasurementUnit: "",
    evaluationNeeded: false,
    notes: "תאורה המורכבת על הקיר."
  },
  {
    componentId: "22",
    description: "מערכות שירותים",
    importanceLevel: ImportanceLevel.NONE,
    basicMeasurementUnit: "מ״א",
    secondaryMeasurementUnit: "",
    evaluationNeeded: true,
    notes: "המערכות המחוברות לקיר."
  }
]
