export const AREA_OPTIONS = [
  { value: "1.5-1", label: "דרום" },
  { value: "1.5-2", label: "מרכז" },
  { value: "1.5-3", label: "צפון" }
]

export const TRAFFIC_FUNCTION_OPTIONS = [
  { value: "2.3-1", label: "דרך מהירה" },
  { value: "2.3-2", label: "דרך ראשית דו מסלולית" },
  { value: "2.3-3", label: "דרך ראשית חד מסלולית" },
  { value: "2.3-4", label: "דרך אזורית דו מסלולית" },
  { value: "2.3-5", label: "דרך אזורית חד מסלולית" },
  { value: "2.3-6", label: "דרך מקומית" },
  { value: "2.3-7", label: "כביש מעבר במחלף (רמפה)" }
]

export const PRIMARY_CLASSIFICATION_OPTIONS = [
  { value: "BRG", label: "BRG" },
  { value: "CLV", label: "CLV" }
]

export const SECONDARY_CLASSIFICATION_OPTIONS = [
  { value: "AUP", label: "AUP" },
  { value: "CLB", label: "CLB" },
  { value: "CLL", label: "CLL" },
  { value: "CLS", label: "CLS" },
  { value: "PBG", label: "PBG" },
  { value: "PUP", label: "PUP" },
  { value: "TBG", label: "TBG" },
  { value: "UBG", label: "UBG" },
  { value: "VBG", label: "VBG" },
  { value: "VUP", label: "VUP" }
]

export const AUTHORITY_OPTIONS = [
  { value: "2.5-0", label: "מעצ יחידת הסמך ההיסטורית (עד 1/7/2005)" },
  { value: "2.5-1", label: 'מעצ החברה הלאומית לדרכים בישראל בע"מ / נתיבי ישראל' },
  { value: "2.5-2", label: "רכבת ישראל" },
  { value: "2.5-3", label: "רשות מקומית" },
  { value: "2.5-4", label: 'משרד הביטחון כולל צה"ל' },
  { value: "2.5-5", label: "חברות ממשלתיות (נתיבי איילון, מוריה, יפה נוף וכד')" },
  { value: "2.5-6", label: 'חברות תשתית במשק (חח"י, בזק, מקורות, קצא"א וכד\')' },
  { value: "2.5-7", label: "גורמים פרטיים אחרים" },
  { value: "2.5-8", label: "לא ידוע" },
  { value: "2.5-9", label: "אחר" }
]

export const USAGE_OPTIONS = [
  { value: "3.3-1", label: "רכב" },
  { value: "3.3-2", label: "מסילת רכבת" },
  { value: "3.3-3", label: "הולכי רגל" },
  { value: "3.3-4", label: "תשתיות" },
  { value: "3.3-5", label: "נחל" },
  { value: "3.3-6", label: "תעלת ניקוז" },
  { value: "3.3-7", label: "אחר" },
  { value: "3.3-8", label: "שביל אופניים" },
  { value: "3.3-9", label: "מעבר בעלי חיים" },
  { value: "3.3-10", label: "דרך חקלאית" }
]

export const TRAFFIC_DIRECTION_OPTIONS = [
  { value: "3.7-1", label: "חד סטרי" },
  { value: "3.7-2", label: "דו סטרי" }
]

export const BYPASS_POSSIBLE_OPTIONS = [
  { value: "3.16-1", label: "ניתן לבצע" },
  { value: "3.16-0", label: "לא ניתן לבצע" }
]

export const SEPARATOR_TYPE_OPTIONS = [
  { value: "4.16-1", label: "ללא מפרדה" },
  { value: "4.16-2", label: "מפרדה פתוחה" },
  { value: "4.16-3", label: "מפרדה סגורה" },
  { value: "4.16-4", label: "מפרדה סגורה עם מעקה קבוע" },
  { value: "4.16-5", label: "אחר" }
]

export const DECK_TYPE_OPTIONS = [
  { value: "5.2-1", label: "טבלה מקשית יצוקה באתר" },
  { value: "5.2-2", label: "טבלה וקורות יצוקות באתר" },
  { value: "5.2-3", label: "קורות AASHTO, קרומים ויציקה משלימה" },
  { value: "5.2-4", label: "קורות AASHTO ויציקה משלימה" },
  { value: "5.2-5", label: "קורות תעלה, קרומים ויציקה משלימה" },
  { value: "5.2-6", label: "קורות תעלה ויציקה משלימה (ללא קרומים)" },
  { value: "5.2-7", label: "קמץ הפוך ויציקה משלימה" },
  { value: "5.2-8", label: "קורות פלדה ויציקה משלימה" },
  { value: "5.2-9", label: "מקטעים טרומי" },
  { value: "5.2-10", label: "מקטעים יצוק באתר כולל בדחיקה" },
  { value: "5.2-11", label: "יציקה מעל אלמנט טרומי" },
  { value: "5.2-12", label: "אחר" },
  { value: "5.2-13", label: "מסבך לסוגיו התומך טבלה יצוקה באתר" },
  { value: "5.2-14", label: "מסבך לסוגיו התומך טבלה טרומית/מרוכבת/חיפוי עץ/מתכת/אחר" },
  { value: "5.2-15", label: "טבלת מיסעה יצוקה הנתמכת על ידי קשת תחתונה" },
  { value: "5.2-16", label: "טבלת מסעה יצוקה הנתמכת על ידי קשת עליונה" },
  { value: "5.2-17", label: "טבלת מיסעה טרומית/מרוכבת הנתמכת על ידי קשת תחתונה" },
  { value: "5.2-18", label: "טבלת מסעה טרומית/מרוכבת הנתמכת על ידי קשת עליונה" }
]

export const FLOOR_TYPE_OPTIONS = [
  { value: "5.3-1", label: "רצפה מקשית יצוקה באתר עם או ללא קורות" },
  { value: "5.3-2", label: "אלמנטים טרומיים" },
  { value: "5.3-3", label: "אחר" }
]

export const ABUTMENT_TYPE_1_OPTIONS = [
  { value: "5.4-1", label: "קיר נציב יצוק באתר" },
  { value: "5.4-2", label: "קיר נציב טרומי" },
  { value: "5.4-3", label: "קורת ספסל" },
  { value: "5.4-4", label: "קורת ספסל בשילוב קיר תומך" },
  { value: "5.4-5", label: "קורת ספסל בשילוב קיר קרקע משוריינת" },
  { value: "5.4-6", label: "קיר דיפון (עם או ללא עוגנים)" },
  { value: "5.4-7", label: "אחר" }
]

export const ABUTMENT_TYPE_2_OPTIONS = [
  { value: "5.5-1", label: "קיר נציב יצוק באתר" },
  { value: "5.5-2", label: "קיר נציב טרומי" },
  { value: "5.5-3", label: "קורת ספסל" },
  { value: "5.5-4", label: "קורת ספסל בשילוב קיר תומך" },
  { value: "5.5-5", label: "קורת ספסל בשילוב קיר קרקע משוריינת" },
  { value: "5.5-6", label: "קיר דיפון" },
  { value: "5.5-7", label: "אחר" }
]

export const PIER_TYPE_OPTIONS = [
  { value: "5.7-1", label: "קירות" },
  { value: "5.7-2", label: "מסגרת רוחבית תחתונה" },
  { value: "5.7-3", label: "מסגרת רוחבית עם קורה סמויה" },
  { value: "5.7-4", label: "עמודים בודדים" },
  { value: "5.7-5", label: "עמוד בודד" },
  { value: "5.7-6", label: "אחר" }
]

export const PRESTRESSING_TYPE_OPTIONS = [
  { value: "5.8-1", label: "אין במבנה אלמנטים דרוכים" },
  { value: "5.8-2", label: "דריכת קדם בלבד" },
  { value: "5.8-3", label: "דריכת אחר בלבד" },
  { value: "5.8-4", label: "דריכת קדם ודריכת אחר" },
  { value: "5.8-5", label: "דריכה חיצונית" },
  { value: "5.8-6", label: "דריכה חיצונית בשילוב סוגי דריכה אחרים" },
  { value: "5.8-7", label: "אחר" }
]

export const BEARING_TYPE_OPTIONS = [
  { value: "5.9-1", label: "סמכים אלסטומריים" },
  { value: "5.9-2", label: "Pot Bearings" },
  { value: "5.9-3", label: "Spherical bearings" },
  { value: "5.9-4", label: "Disk Bearings" },
  { value: "5.9-5", label: "אחר" }
]

export const JOINT_TYPE_OPTIONS = [
  { value: "5.10-1", label: "Rubber Cushion Seals" },
  { value: "5.10-2", label: "Compression Seals" },
  { value: "5.10-3", label: "תפרים מודולריים Modular Strip Seals" },
  { value: "5.10-4", label: "תפרים טמונים Buried Joints" },
  { value: "5.10-5", label: "תפרי אספלט פלג Asphalt Plug Joints" },
  { value: "5.10-6", label: "תפרי אצבעות Finger Joints" },
  { value: "5.10-7", label: "אחר" }
]

export const MATERIAL_OPTIONS = [
  { value: "6.100", label: "בטון לא מזוין" },
  { value: "6.101", label: "בטון מזוין" },
  { value: "6.102", label: "בטון דרוך" },
  { value: "6.103", label: "גרנוליט" },
  { value: "6.104", label: "אבן" },
  { value: "6.105", label: "אבנים משתלבות מתועשות (מבטון)" },
  { value: "6.106", label: "לבנים" },
  { value: "6.107", label: "פלדה חשופה" },
  { value: "6.108", label: "פלדה מגולוונת" },
  { value: "6.109", label: "פלדה צבועה" },
  { value: "6.110", label: "פלדה מגולוונת וצבועה" },
  { value: "6.111", label: "פלדת קורטן" },
  { value: "6.112", label: "עץ" },
  { value: "6.113", label: "פיברגלס" },
  { value: "6.114", label: "פוליקרבונט" },
  { value: "6.115", label: "אקריל" },
  { value: "6.116", label: "זכוכית" },
  { value: "6.117", label: "אספלט" },
  { value: "6.118", label: "איטום ביטומני" },
  { value: "6.119", label: "ממברנה / יריעה ביטומנית" },
  { value: "6.120", label: "איטום על בסיס צמנטי" },
  { value: "6.121", label: "JK" },
  { value: "6.122", label: "GeoWeb" },
  { value: "6.123", label: "אחר" },
  { value: "6.124", label: "אלומיניום" },
  { value: "6.125", label: "פלסטיק לסוגיו" },
  { value: "6.126", label: "בטון מותז ללא סיבים" },
  { value: "6.127", label: "בטון מותז עם סיבים" },
  { value: "6.128", label: "רכיבי בטון מזוין טרום (עם או ללא תוספת סיבים)" },
  { value: "6.129", label: "איטום על בסיס יריעות פולימריות לסוגיהן" }
]

export const INFRASTRUCTURE_OPTIONS = [
  { value: "8.1-1", label: "לא קיימות תשתיות / מערכות על המבנה" },
  { value: "8.1-2", label: "תשתיות רטובות (מים/ביוב/תיעול)" },
  { value: "8.1-3", label: "חשמל ותקשורת" },
  { value: "8.1-4", label: "אחר" }
]

export const INSPECTION_CLASSIFICATION_OPTIONS = [
  { value: "13.1-1", label: "גשר מקטעים סוג 1" },
  { value: "13.1-2", label: "גשר מקטעים סוג 2" },
  { value: "13.1-3", label: "גשר מקטעים סוג 3" },
  { value: "13.1-4", label: "גשר מקטעים סוג 4" },
  { value: "13.1-5", label: "גשר מקטעים סוג 5" },
  { value: "13.1-6", label: "גשר מקטעים סוג 6" },
  { value: "13.1-7", label: "גשר סוג 1" },
  { value: "13.1-8", label: "גשר סוג 1.1" },
  { value: "13.1-9", label: "גשר סוג 1.2" },
  { value: "13.1-10", label: "גשר סוג 1.3" },
  { value: "13.1-11", label: "גשר סוג 2" },
  { value: "13.1-12", label: "גשר סוג 3" },
  { value: "13.1-13", label: "גשר סוג 4" },
  { value: "13.1-14", label: "גשר סוג 4.1" },
  { value: "13.1-15", label: "גשר סוג 4.2" },
  { value: "13.1-16", label: "גשר סוג 5" },
  { value: "13.1-17", label: "גשר סוג 6" },
  { value: "13.1-18", label: "מנהרה סוג 1" },
  { value: "13.1-19", label: "מנהרה סוג 2" },
  { value: "13.1-20", label: "מנהרה סוג 3" },
  { value: "13.1-21", label: "מנהרה סוג 4" },
  { value: "13.1-22", label: "מובל סוג 1" },
  { value: "13.1-23", label: "מובל סוג 2" },
  { value: "13.1-24", label: "מובל סוג 3" },
  { value: "13.1-25", label: "מובל סוג 4" },
  { value: "13.1-26", label: "מובל סוג 5" },
  { value: "13.1-27", label: "גשר שילוט סוג 1" },
  { value: "13.1-28", label: "גשר שילוט סוג 2" },
  { value: "13.1-29", label: "גשר שילוט סוג 3" },
  { value: "13.1-30", label: "קיר תומך סוג 1" },
  { value: "13.1-31", label: "קיר תומך סוג 2" },
  { value: "13.1-32", label: "קיר תומך סוג 3" },
  { value: "13.1-33", label: "קיר תומך סוג 4" },
  { value: "13.1-34", label: "קיר תומך סוג 5" },
  { value: "13.1-35", label: "קיר תומך סוג 6" },
  { value: "13.1-36", label: "קיר אקוסטי סוג 1" },
  { value: "13.1-37", label: "קיר אקוסטי סוג 2" }
]

export const LOCAL_BYPASS_OPTIONS = [
  { value: "3.19-1", label: "קיים או ניתן ליצור מעקף מקומי" },
  { value: "3.19-0", label: "לא קיים ולא ניתן ליצור מעקף מקומי" }
]

export const LOCAL_BYPASS_METHOD_OPTIONS = [
  { value: "3.20-1", label: "קיים מעקף בשטח" },
  { value: "3.20-2", label: "נדרשים הסדרי תנועה בלבד" },
  { value: "3.20-3", label: "נדרשות עבודות עפר בלבד" },
  { value: "3.20-4", label: "נדרשות עבודות עפר וסלילה" },
  { value: "3.20-5", label: "נדרשות עבודות ניקוז, עפר ו/או סלילה" },
  { value: "3.20-6", label: "אחר" }
]

export const YES_NO_OPTIONS = [
  { value: "1", label: "כן" },
  { value: "0", label: "לא" }
]
