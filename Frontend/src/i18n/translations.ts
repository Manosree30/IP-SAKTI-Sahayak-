import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  tagline: string;
  heroHeading: string;
  heroSubtext: string;
  analyzeBtn: string;
  askAiBtn: string;
  dashboard: string;
  analyzeFormulation: string;
  askAi: string;
  myAnalyses: string;
  evidenceLibrary: string;
  research: string;
  settings: string;
  workspace: string;
  evidence: string;
  howItWorks: string;
  authoritativeSources: string;
  searchPlaceholder: string;
  patent: string;
  patentDesc: string;
  tk: string;
  tkDesc: string;
  ayush: string;
  ayushDesc: string;
  biodiversity: string;
  biodiversityDesc: string;
  international: string;
  internationalDesc: string;
  disclaimer: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'AyurGuard',
    appSubtitle: 'AI-Powered IP & Regulatory Guidance for Ayurveda',
    tagline: 'TRUST • EVIDENCE • PROTECTION',
    heroHeading: 'Protect Your Ayurveda Innovation with Intelligence',
    heroSubtext: 'Navigate patents, traditional knowledge and regulatory requirements with AI grounded in authoritative sources.',
    analyzeBtn: 'Analyze My Formulation',
    askAiBtn: 'Ask AyurGuard AI',
    dashboard: 'Dashboard',
    analyzeFormulation: 'Analyze Formulation',
    askAi: 'Ask AI',
    myAnalyses: 'My Analyses',
    evidenceLibrary: 'Evidence Library',
    research: 'Research',
    settings: 'Settings',
    workspace: 'WORKSPACE',
    evidence: 'EVIDENCE',
    howItWorks: 'How AyurGuard Works',
    authoritativeSources: 'Powered by Authoritative Sources',
    searchPlaceholder: 'Search regulations, patents, traditional knowledge...',
    patent: 'Patent',
    patentDesc: 'Check patentability and prior-art considerations.',
    tk: 'Traditional Knowledge',
    tkDesc: 'Explore traditional knowledge and TKDL-related evidence.',
    ayush: 'AYUSH Regulation',
    ayushDesc: 'Understand relevant regulatory requirements.',
    biodiversity: 'Biodiversity',
    biodiversityDesc: 'Identify biological-resource and biodiversity considerations.',
    international: 'International',
    internationalDesc: 'Explore international IP and regulatory requirements.',
    disclaimer: 'This analysis provides research guidance and is not a substitute for professional legal or regulatory advice.'
  },
  ta: {
    appName: 'ஆயுர்கார்டு',
    appSubtitle: 'ஆயுர்வேத அறிவுசார் சொத்து மற்றும் ஒழுங்குமுறை வழிகாட்டி',
    tagline: 'நம்பிக்கை • சான்று • பாதுகாப்பு',
    heroHeading: 'உங்கள் ஆயுர்வேத புதுமைகளை நுண்ணறிவுடன் பாதுகாக்கவும்',
    heroSubtext: 'அதிகாரப்பூர்வ மூலங்களின் சான்றுகளுடன் காப்புரிமைகள், பாரம்பரிய அறிவு மற்றும் விதிமுறைகளை நிர்வகியுங்கள்.',
    analyzeBtn: 'உங்கள் ஆயுர்வேத தயாரிப்பை பகுப்பாய்வு செய்யுங்கள்',
    askAiBtn: 'ஆயுர்கார்டு AI-யிடம் கேளுங்கள்',
    dashboard: 'டாஷ்போர்டு',
    analyzeFormulation: 'தயாரிப்பை பகுப்பாய்வு செய்க',
    askAi: 'AI வழிகாட்டுதல்',
    myAnalyses: 'எனது பகுப்பாய்வுகள்',
    evidenceLibrary: 'சான்று நூலகம்',
    research: 'ஆராய்ச்சி',
    settings: 'அமைப்புகள்',
    workspace: 'பணிவெளி',
    evidence: 'ஆதாரங்கள்',
    howItWorks: 'ஆயுர்கார்டு எவ்வாறு செயல்படுகிறது',
    authoritativeSources: 'அதிகாரப்பூர்வ மூலங்களின் ஆதரவுடன்',
    searchPlaceholder: 'விதிகள், காப்புரிமை மற்றும் பாரம்பரிய அறிவைத் தேடுங்கள்...',
    patent: 'காப்புரிமை (Patent)',
    patentDesc: 'காப்புரிமை தகுதி மற்றும் முந்தைய கலை ஆவணங்களை சரிபார்க்கவும்.',
    tk: 'பாரம்பரிய அறிவு (TKDL)',
    tkDesc: 'பாரம்பரிய அறிவு மற்றும் TKDL தொடர்புடைய சான்றுகளை ஆராயுங்கள்.',
    ayush: 'ஆயுஷ் ஒழுங்குமுறை',
    ayushDesc: 'பொருத்தமான ஒழுங்குமுறை தேவைகளை புரிந்து கொள்ளுங்கள்.',
    biodiversity: 'பல்லுயிர் சட்டம்',
    biodiversityDesc: 'உயிரியல் வளம் மற்றும் தேசிய பல்லுயிர் தேவைகளை கண்டறியவும்.',
    international: 'சர்வதேசம்',
    internationalDesc: 'சர்வதேச அறிவுசார் சொத்து மற்றும் சந்தை தேவைகளை ஆராயுங்கள்.',
    disclaimer: 'இந்த பகுப்பாய்வு ஆராய்ச்சி வழிகாட்டுதலை மட்டுமே வழங்குகிறது; சட்ட ஆலோசனையாகாது.'
  },
  hi: {
    appName: 'आयुर्गार्ड',
    appSubtitle: 'आयुर्वेद हेतु एआई-संचालित आईपी एवं विनियामक मार्गदर्शन',
    tagline: 'विश्वास • प्रमाण • सुरक्षा',
    heroHeading: 'अपनी आयुर्वेद नवीनता को बौद्धिक संरक्षण प्रदान करें',
    heroSubtext: 'आधिकारिक स्रोतों से प्राप्त साक्ष्यों के आधार पर पेटेंट, पारंपरिक ज्ञान और नियामक आवश्यकताओं को समझें।',
    analyzeBtn: 'अपने आयुर्वेदिक फॉर्मूलेशन का विश्लेषण करें',
    askAiBtn: 'आयुर्गार्ड AI से पूछें',
    dashboard: 'डैशबोर्ड',
    analyzeFormulation: 'फॉर्मूलेशन विश्लेषण',
    askAi: 'AI से पूछें',
    myAnalyses: 'मेरे विश्लेषण',
    evidenceLibrary: 'साक्ष्य पुस्तकालय',
    research: 'अनुसंधान',
    settings: 'सेटिंग्स',
    workspace: 'कार्यक्षेत्र',
    evidence: 'साक्ष्य स्रोत',
    howItWorks: 'आयुर्गार्ड कैसे काम करता है',
    authoritativeSources: 'प्राधिकृत स्रोतों द्वारा संचालित',
    searchPlaceholder: 'विनियम, पेटेंट, पारंपरिक ज्ञान खोजें...',
    patent: 'पेटेंट (Patent)',
    patentDesc: 'पेटेंट योग्यता और पूर्व-कला संदर्भों की जांच करें।',
    tk: 'पारंपरिक ज्ञान (TKDL)',
    tkDesc: 'पारंपरिक ज्ञान और टीकेडीएल साक्ष्यों का अन्वेषण करें।',
    ayush: 'आयुष नियमन',
    ayushDesc: 'प्रासंगिक विनियामक और जीएमपी दिशानिर्देश समझें।',
    biodiversity: 'जैव विविधता',
    biodiversityDesc: 'जैविक संसाधन और एनबीए अनुमतियों की जांच करें।',
    international: 'अंतर्राष्ट्रीय',
    internationalDesc: 'अंतरराष्ट्रीय बौद्धिक संपदा और निर्यात नियम समझें।',
    disclaimer: 'यह विश्लेषण केवल अनुसंधान मार्गदर्शन प्रदान करता है और कानूनी सलाह का विकल्प नहीं है।'
  },
  te: {
    appName: 'ఆయుర్గార్డ్',
    appSubtitle: 'ఆయుర్వేద మేధో సంపత్తి & నియంత్రణ మార్గదర్శకత్వం',
    tagline: 'నమ్మకం • సాక్ష్యం • రక్షణ',
    heroHeading: 'మీ ఆయుర్వేద ఆవిష్కరణను రక్షించుకోండి',
    heroSubtext: 'అధికారిక ఆధారాలతో పేటెంట్లు, సాంప్రదాయ జ్ఞానం మరియు నిబంధనలను సులభంగా అర్థం చేసుకోండి.',
    analyzeBtn: 'ఫార్ములేషన్ విశ్లేషించండి',
    askAiBtn: 'ఆయుర్గార్డ్ AI ని అడగండి',
    dashboard: 'డ్యాష్‌బోర్డ్',
    analyzeFormulation: 'ఫార్ములేషన్ విశ్లేషణ',
    askAi: 'AI ని అడగండి',
    myAnalyses: 'నా విశ్లేషణలు',
    evidenceLibrary: 'సాక్ష్యాల లైబ్రరీ',
    research: 'పరిశోధన',
    settings: 'సెట్టింగ్‌లు',
    workspace: 'వర్క్‌స్పేస్',
    evidence: 'సాక్ష్యాలు',
    howItWorks: 'ఆయుర్గార్డ్ పనితీరు',
    authoritativeSources: 'అధికారిక మూలాల మద్దతుతో',
    searchPlaceholder: 'నియమాలు, పేటెంట్లు శోధించండి...',
    patent: 'పేటెంట్',
    patentDesc: 'పేటెంట్ అర్హత తనిఖీ చేయండి.',
    tk: 'సాంప్రదాయ జ్ఞానం',
    tkDesc: 'సాంప్రదాయ జ్ఞానం & TKDL ఆధారాలు.',
    ayush: 'ఆయుష్ నియంత్రణ',
    ayushDesc: 'సంబంధిత నియంత్రణ అవసరాలు.',
    biodiversity: 'జీవవైవిధ్యం',
    biodiversityDesc: 'జీవ వనరుల నిబంధనలు.',
    international: 'అంతర్జాతీయ',
    internationalDesc: 'గ్లోబల్ IP అవసరాలు.',
    disclaimer: 'ఈ విశ్లేషణ పరిశోధన మార్గదర్శకత్వాన్ని మాత్రమే అందిస్తుంది.'
  },
  ml: {
    appName: 'ആയുർഗാർഡ്',
    appSubtitle: 'ആയുർവേദ ഐപി & റെഗുലേറ്ററി മാർഗ്ഗനിർദ്ദേശം',
    tagline: 'വിശ്വാസം • തെളിവ് • സംരക്ഷണം',
    heroHeading: 'നിങ്ങളുടെ ആയുർവേദ നവീകരണങ്ങൾ സുരക്ഷിതമാക്കുക',
    heroSubtext: 'പേറ്റന്റുകളും പരമ്പരാഗത അറിവും കൃത്യമായി വിലയിരുത്തുക.',
    analyzeBtn: 'ഫോർമുലേഷൻ വിശകലനം ചെയ്യുക',
    askAiBtn: 'ആയുർഗാർഡ് AI ചോദിക്കുക',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    analyzeFormulation: 'ഫോർമുലേഷൻ അനാലിസിസ്',
    askAi: 'AI ചോദിക്കുക',
    myAnalyses: 'എന്റെ വിശകലനങ്ങൾ',
    evidenceLibrary: 'എവിഡൻസ് ലൈബ്രറി',
    research: 'ഗവേഷണം',
    settings: 'ക്രമീകരണങ്ങൾ',
    workspace: 'വർക്ക്‌സ്‌പേസ്',
    evidence: 'തെളിവുകൾ',
    howItWorks: 'ആയുർഗാർഡ് പ്രവർത്തനം',
    authoritativeSources: 'ഔദ്യോഗിക സ്രോതസ്സുകൾ',
    searchPlaceholder: 'നിയമങ്ങളും പേറ്റന്റുകളും തിരയുക...',
    patent: 'പേറ്റന്റ്',
    patentDesc: 'പേറ്റന്റ് സാധുത പരിശോധിക്കുക.',
    tk: 'പരമ്പരാഗത അറിവ്',
    tkDesc: 'പരമ്പരാഗത അറിവ് & TKDL രേഖകൾ.',
    ayush: 'ആയുഷ് ചട്ടങ്ങൾ',
    ayushDesc: 'റെഗുലേറ്ററി ആവശ്യകതകൾ.',
    biodiversity: 'ജൈവവൈവിധ്യം',
    biodiversityDesc: 'ജൈവ വിഭവ ചട്ടങ്ങൾ.',
    international: 'അന്താരാഷ്ട്രം',
    internationalDesc: 'ആഗോള ആവശ്യകതകൾ.',
    disclaimer: 'ഈ വിശകലനം ഗവേഷണ വിവരങ്ങൾ മാത്രമാണ് നൽകുന്നത്.'
  },
  kn: {
    appName: 'ಆಯುರ್ಗಾರ್ಡ್',
    appSubtitle: 'ಆಯುರ್ವೇದ ಐಪಿ ಮತ್ತು ನಿಯಂತ್ರಕ ಮಾರ್ಗದರ್ಶನ',
    tagline: 'ವಿಶ್ವಾಸ • ಸಾಕ್ಷ್ಯ • ರಕ್ಷಣೆ',
    heroHeading: 'ನಿಮ್ಮ ಆಯುರ್ವೇದ ನಾವೀನ್ಯತೆಯನ್ನು ರಕ್ಷಿಸಿ',
    heroSubtext: 'ಅಧಿಕೃತ ಸಾಕ್ಷ್ಯಗಳೊಂದಿಗೆ ಪೇಟೆಂಟ್ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ.',
    analyzeBtn: 'ಫಾರ್ಮುಲೇಶನ್ ವಿಶ್ಲೇಷಿಸಿ',
    askAiBtn: 'ಆಯುರ್ಗಾರ್ಡ್ AI ಕೇಳಿ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    analyzeFormulation: 'ಫಾರ್ಮುಲೇಶನ್ ವಿಶ್ಲೇಷಣೆ',
    askAi: 'AI ಕೇಳಿ',
    myAnalyses: 'ನನ್ನ ವಿಶ್ಲೇಷಣೆಗಳು',
    evidenceLibrary: 'ಸಾಕ್ಷ್ಯ ಲೈಬ್ರರಿ',
    research: 'ಸಂಶೋಧನೆ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    workspace: 'ವರ್ಕ್‌ಸ್ಪೇಸ್',
    evidence: 'ಸಾಕ್ಷ್ಯಗಳು',
    howItWorks: 'ಆಯುರ್ಗಾರ್ಡ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    authoritativeSources: 'ಅಧಿಕೃತ ಮೂಲಗಳಿಂದ',
    searchPlaceholder: 'ನಿಯಮಗಳು, ಪೇಟೆಂಟ್‌ಗಳನ್ನು ಹುಡುಕಿ...',
    patent: 'ಪೇಟೆಂಟ್',
    patentDesc: 'ಪೇಟೆಂಟ್ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ.',
    tk: 'ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ',
    tkDesc: 'ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ & TKDL ಸಾಕ್ಷ್ಯ.',
    ayush: 'ಆಯುಷ್ ನಿಯಮಾವಳಿ',
    ayushDesc: 'ನಿಯಂತ್ರಕ ಮಾರ್ಗಸೂಚಿಗಳು.',
    biodiversity: 'ಜೈವಿಕ ವೈವಿಧ್ಯತೆ',
    biodiversityDesc: 'ಜೈವಿಕ ಸಂಪನ್ಮೂಲ ನಿಯಮಗಳು.',
    international: 'ಅಂತರರಾಷ್ಟ್ರೀಯ',
    internationalDesc: 'ಜಾಗತಿಕ ಮಾನದಂಡಗಳು.',
    disclaimer: 'ಈ ವಿಶ್ಲೇಷಣೆಯು ಕೇವಲ ಸಂಶೋಧನಾ ಮಾರ್ಗದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತದೆ.'
  }
};
