import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck, LayoutDashboard, Search, FileText, BookOpen, History, Settings,
  Languages, Menu, X, ArrowUpRight, AlertTriangle, CheckCircle2, CircleHelp,
  Link2, Upload, LoaderCircle, ChevronRight, ExternalLink, Sparkles, LockKeyhole,
  Activity, FileSearch, BadgeCheck, ShieldAlert, Lightbulb, Trash2, Copy, Check, ClipboardList, ListChecks, CircleCheck, CircleX, FileDown, Mic, Volume2, VolumeX
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const copy = {
  en: {
    dashboard:"Dashboard", investigator:"Scam Investigator", center:"Investigation Center", documents:"Document Simplifier",
    learn:"Learn & Stay Safe", reports:"Reports", settings:"Settings", greeting:"Your safety starts with a second look.",
    subtitle:"Understand suspicious messages, review documents, and make more informed decisions.",
    investigate:"Start an investigation", simplify:"Simplify a document", recent:"Recent investigations",
    overview:"Your safety workspace", screened:"Items screened", saved:"Saved reports", alerts:"Indicators found",
    quick:"Quick actions", tools:"Your safety toolkit", welcome:"Welcome to NiveshRakshak",
    hero:"Understand before you invest. Verify before you trust.",
    heroText:"A practical financial safety companion to help you spot warning signs, understand complex documents, and learn how to verify claims independently.",
    start:"Check a suspicious message", explore:"Explore safety guides", disclaimer:"Educational tool only — not financial, legal, or investment advice.",
    inputTitle:"What would you like to check?", messageLabel:"Paste a suspicious message or offer",
    messagePlaceholder:"Paste the message here. Remove names, phone numbers, account details, and other personal information first.",
    urlLabel:"Suspicious URL (optional)", urlPlaceholder:"https://example.com",
    analyze:"Analyze warning signs", analyzing:"Analyzing…", results:"Analysis results", indicators:"Potential indicators",
    nextSteps:"Safer next steps", noIndicators:"No indicators from our limited checks were detected. That does not prove the message is safe.",
    documentTitle:"Make a financial document easier to understand", uploadHelp:"Upload a PDF or TXT file (maximum 5 MB). Avoid sensitive personal or financial data.",
    upload:"Choose document", extract:"Extract & explain", extracting:"Reading document…", extracted:"Document overview",
    learnTitle:"Learn & Stay Safe", learnIntro:"Simple habits can help you spot pressure tactics and verify claims independently.",
    reportsTitle:"Your reports", reportsIntro:"Reports are saved only in this browser on this device.",
    noReports:"No reports yet", noReportsText:"Run an investigation and save its summary to see it here.",
    saveReport:"Save report", savedReport:"Report saved", clear:"Clear history", clearConfirm:"Clear all locally saved reports?",
    low:"Few indicators", medium:"Some indicators", high:"Several indicators", unknown:"Unable to assess",
    disclaimerLong:"These automated checks look for limited patterns. They cannot establish that a person, website, or investment is legitimate or fraudulent. Verify independently using official sources.",
    footer:"Built for awareness, not financial advice.", language:"Language", english:"English", hindi:"हिन्दी",
    loading:"Please wait…", error:"Something went wrong", retry:"Try again", fileName:"Selected file",
    overviewCard:"Investigation overview", method:"How this was checked", urlResult:"URL text inspection",
    indicatorsNone:"No indicators detected by these limited rules.", why:"Why it matters", verify:"How to verify",
    guides:["Pause when someone pressures you to act immediately.","Never share an OTP, PIN, password, or CVV.","Check an organization's details using an independently found official source.","Be cautious of guaranteed or unusually high returns.","Do not install remote-access apps at a stranger's request.","Keep screenshots and transaction records if you suspect a scam."],
    settingsTitle:"Settings & privacy", privacyText:"This demo stores report summaries in your browser's local storage. Uploaded documents are processed by the local backend and are not saved by this application.",
    localMode:"Local rule-based mode", localModeText:"No paid AI API is configured. Results come from transparent, limited checks.",
    source:"Official resources to consult", sources:["SEBI investor education","RBI financial education","National Cyber Crime Reporting Portal"],
    sourceNote:"Open official sites directly and verify the domain. This app does not contact or verify these sites on your behalf.",
    voiceRead:"Read this page aloud", voiceStop:"Stop voice", voiceDictate:"Speak message", voiceListening:"Listening…", voiceUnsupported:"Voice input is not supported in this browser. Try Chrome and allow microphone access.", voiceReady:"Voice assistance uses your browser’s built-in speech features; audio is not sent to an AI service."
  },
  hi: {
    dashboard:"डैशबोर्ड", investigator:"स्कैम जाँच", center:"जाँच केंद्र", documents:"दस्तावेज़ सरल करें",
    learn:"सीखें और सुरक्षित रहें", reports:"रिपोर्ट", settings:"सेटिंग्स", greeting:"आपकी सुरक्षा एक बार फिर जाँचने से शुरू होती है।",
    subtitle:"संदिग्ध संदेश समझें, दस्तावेज़ पढ़ें और बेहतर जानकारी के साथ निर्णय लें।",
    investigate:"जाँच शुरू करें", simplify:"दस्तावेज़ सरल करें", recent:"हाल की जाँच",
    overview:"आपका सुरक्षा कार्यक्षेत्र", screened:"जाँची गई चीज़ें", saved:"सहेजी गई रिपोर्ट", alerts:"मिले संकेत",
    quick:"त्वरित कार्य", tools:"सुरक्षा टूलकिट", welcome:"निवेशरक्षक में आपका स्वागत है",
    hero:"निवेश से पहले समझें। भरोसा करने से पहले जाँचें।",
    heroText:"संदिग्ध संदेशों के संकेत पहचानने, जटिल दस्तावेज़ समझने और दावों की स्वतंत्र जाँच सीखने में मदद करने वाला वित्तीय सुरक्षा साथी।",
    start:"संदिग्ध संदेश जाँचें", explore:"सुरक्षा गाइड देखें", disclaimer:"केवल शैक्षिक टूल — वित्तीय, कानूनी या निवेश सलाह नहीं।",
    inputTitle:"आप क्या जाँचना चाहते हैं?", messageLabel:"संदिग्ध संदेश या ऑफर डालें",
    messagePlaceholder:"यहाँ संदेश डालें। पहले नाम, फ़ोन नंबर, खाते और निजी जानकारी हटा दें।",
    urlLabel:"संदिग्ध URL (वैकल्पिक)", urlPlaceholder:"https://example.com",
    analyze:"चेतावनी संकेतों की जाँच करें", analyzing:"जाँच हो रही है…", results:"जाँच के परिणाम", indicators:"संभावित संकेत",
    nextSteps:"सुरक्षित अगले कदम", noIndicators:"सीमित जाँच में कोई संकेत नहीं मिला। इसका अर्थ यह नहीं कि संदेश सुरक्षित है।",
    documentTitle:"वित्तीय दस्तावेज़ को आसानी से समझें", uploadHelp:"PDF या TXT फ़ाइल डालें (अधिकतम 5 MB)। संवेदनशील निजी या वित्तीय जानकारी न डालें।",
    upload:"दस्तावेज़ चुनें", extract:"निकालें और समझें", extracting:"दस्तावेज़ पढ़ा जा रहा है…", extracted:"दस्तावेज़ का सार",
    learnTitle:"सीखें और सुरक्षित रहें", learnIntro:"सरल आदतें दबाव की रणनीति पहचानने और दावों की स्वतंत्र जाँच में मदद करती हैं।",
    reportsTitle:"आपकी रिपोर्ट", reportsIntro:"रिपोर्ट केवल इसी डिवाइस के इस ब्राउज़र में सहेजी जाती हैं।",
    noReports:"अभी कोई रिपोर्ट नहीं", noReportsText:"जाँच करें और उसका सार सहेजें।",
    saveReport:"रिपोर्ट सहेजें", savedReport:"रिपोर्ट सहेजी गई", clear:"इतिहास साफ़ करें", clearConfirm:"स्थानीय रूप से सहेजी सभी रिपोर्ट हटाएँ?",
    low:"कम संकेत", medium:"कुछ संकेत", high:"कई संकेत", unknown:"जाँच संभव नहीं",
    disclaimerLong:"ये स्वचालित जाँच सीमित पैटर्न देखती हैं। ये साबित नहीं कर सकतीं कि कोई व्यक्ति, वेबसाइट या निवेश असली या धोखाधड़ी है। आधिकारिक स्रोतों से स्वतंत्र जाँच करें।",
    footer:"जागरूकता के लिए, वित्तीय सलाह नहीं।", language:"भाषा", english:"English", hindi:"हिन्दी",
    loading:"कृपया प्रतीक्षा करें…", error:"कुछ गलत हुआ", retry:"फिर कोशिश करें", fileName:"चुनी गई फ़ाइल",
    overviewCard:"जाँच का सार", method:"जाँच का तरीका", urlResult:"URL टेक्स्ट जाँच",
    indicatorsNone:"सीमित नियमों से कोई संकेत नहीं मिला।", why:"यह क्यों महत्वपूर्ण है", verify:"कैसे जाँचें",
    guides:["जब कोई तुरंत कार्रवाई का दबाव डाले, तो रुकें।","OTP, PIN, पासवर्ड या CVV कभी साझा न करें।","स्वतंत्र रूप से मिले आधिकारिक स्रोत से संगठन की जानकारी जाँचें।","गारंटीड या असामान्य रूप से अधिक रिटर्न से सावधान रहें।","अजनबी के कहने पर रिमोट-एक्सेस ऐप इंस्टॉल न करें।","संदेह होने पर स्क्रीनशॉट और लेनदेन रिकॉर्ड रखें।"],
    settingsTitle:"सेटिंग्स और गोपनीयता", privacyText:"यह डेमो रिपोर्ट का सार आपके ब्राउज़र के लोकल स्टोरेज में रखता है। अपलोड किए गए दस्तावेज़ स्थानीय बैकएंड पर प्रोसेस होते हैं और ऐप उन्हें सहेजता नहीं है।",
    localMode:"स्थानीय नियम-आधारित मोड", localModeText:"कोई पेड AI API कॉन्फ़िगर नहीं है। परिणाम सीमित और स्पष्ट जाँच से आते हैं।",
    source:"देखने योग्य आधिकारिक संसाधन", sources:["SEBI निवेशक शिक्षा","RBI वित्तीय शिक्षा","राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल"],
    sourceNote:"आधिकारिक वेबसाइट स्वयं खोलें और डोमेन जाँचें। ऐप आपकी ओर से इन साइटों को सत्यापित नहीं करता।",
    voiceRead:"यह पेज सुनें", voiceStop:"आवाज़ रोकें", voiceDictate:"बोलकर संदेश लिखें", voiceListening:"सुन रहा है…", voiceUnsupported:"इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। Chrome इस्तेमाल करें और माइक्रोफ़ोन की अनुमति दें।", voiceReady:"वॉइस सहायता ब्राउज़र की अंतर्निहित स्पीच सुविधा का उपयोग करती है; ऑडियो किसी AI सेवा को नहीं भेजा जाता।"
  }
};

const navItems = [
  ["dashboard",LayoutDashboard],["investigator",Search],["center",ClipboardList],["documents",FileText],["learn",BookOpen],["reports",History],["settings",Settings]
];

function riskLabel(level, t) { return t[level] || t.unknown; }

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("nr-lang") || "en");
  const t = copy[lang];
  const [page, setPage] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [docBusy, setDocBusy] = useState(false);
  const [docResult, setDocResult] = useState(null);
  const [docError, setDocError] = useState("");
  const [reports, setReports] = useState(() => {
    try { return JSON.parse(localStorage.getItem("nr-reports") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  useEffect(() => { localStorage.setItem("nr-lang", lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => () => {
    try { recognitionRef.current?.abort(); } catch {}
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);
  useEffect(() => { localStorage.setItem("nr-reports", JSON.stringify(reports)); }, [reports]);

  const stats = useMemo(() => ({
    screened: reports.length,
    alerts: reports.filter(r => r.level === "high" || r.level === "medium").length
  }), [reports]);

  async function runAnalysis(e) {
    e?.preventDefault();
    setError(""); setAnalysis(null);
    if (!message.trim() && !url.trim()) { setError(lang === "hi" ? "पहले संदेश या URL डालें।" : "Enter a message or URL first."); return; }
    setBusy(true);
    try {
      const response = await fetch(`${API}/api/analyze`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({text:message, url, language:lang})
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");
      setAnalysis(data);
    } catch (err) {
      setError(`${err.message}. ${lang === "hi" ? "जाँचें कि बैकएंड localhost:5000 पर चल रहा है।" : "Check that the backend is running at localhost:5000."}`);
    } finally { setBusy(false); }
  }

  async function simplifyFile(e) {
    e.preventDefault(); setDocError(""); setDocResult(null);
    if (!file) { setDocError(lang === "hi" ? "पहले PDF या TXT फ़ाइल चुनें।" : "Choose a PDF or TXT file first."); return; }
    if (file.size > 5 * 1024 * 1024) { setDocError("File must be 5 MB or smaller."); return; }
    setDocBusy(true);
    try {
      const form = new FormData(); form.append("document", file);
      const response = await fetch(`${API}/api/document/extract`, {method:"POST", body:form});
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not read document.");
      setDocResult(data);
    } catch (err) {
      setDocError(`${err.message} ${lang === "hi" ? "जाँचें कि बैकएंड चल रहा है।" : "Check that the backend is running."}`);
    } finally { setDocBusy(false); }
  }

  function saveReport() {
    if (!analysis) return;
    const report = {
      id: analysis.id, type: "message", createdAt: analysis.createdAt, level: analysis.contentResult?.level || analysis.urlResult?.risk || "unknown",
      title: (message.trim() || url.trim()).slice(0, 80), analysis
    };
    setReports(prev => [report, ...prev.filter(r => r.id !== report.id)].slice(0, 50));
    setToast(t.savedReport); setTimeout(() => setToast(""), 2400);
  }

  function saveDocumentReport() {
    if (!docResult) return;
    const indicators = docResult.summary?.indicators || [];
    const report = {
      id: `doc-${Date.now()}`, type: "document", createdAt: new Date().toISOString(),
      level: indicators.length >= 3 ? "high" : indicators.length ? "medium" : "low",
      title: docResult.fileName || "Document summary", document: docResult
    };
    setReports(prev => [report, ...prev].slice(0, 50));
    setToast(t.savedReport); setTimeout(() => setToast(""), 2400);
  }

  const go = (key) => { setPage(key); setMobileNav(false); };
  const pageTitle = t[page] || t.dashboard;

  function stopVoice() {
    try { recognitionRef.current?.stop(); } catch {}
    setListening(false);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function startDictation() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setToast(t.voiceUnsupported); window.setTimeout(() => setToast(""), 3500); return; }
    if (listening) { try { recognitionRef.current?.stop(); } catch {} setListening(false); return; }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results).slice(event.resultIndex).map(result => result[0]?.transcript || "").join(" ").trim();
        if (transcript) setMessage(previous => `${previous.trim()}${previous.trim() ? " " : ""}${transcript}`);
      };
      recognition.onerror = (event) => {
        setListening(false);
        setToast(event.error === "not-allowed" ? (lang === "hi" ? "माइक्रोफ़ोन की अनुमति दें और फिर कोशिश करें।" : "Allow microphone access and try again.") : `${t.error}: ${event.error}`);
        window.setTimeout(() => setToast(""), 3500);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
      setToast(t.voiceUnsupported);
      window.setTimeout(() => setToast(""), 3500);
    }
  }

  function speakCurrentPage() {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setToast(lang === "hi" ? "इस ब्राउज़र में पढ़कर सुनाने की सुविधा उपलब्ध नहीं है।" : "Read-aloud is not supported in this browser.");
      window.setTimeout(() => setToast(""), 3500); return;
    }
    let text = "";
    if (page === "dashboard") text = `${t.greeting}. ${t.subtitle} ${t.hero}. ${t.heroText}`;
    else if (page === "investigator") {
      if (analysis) text = `${t.results}. ${riskLabel(analysis.contentResult?.level || analysis.urlResult?.risk || "unknown", t)}. ${analysis.contentResult?.summary || ""}. ${(analysis.contentResult?.indicators || []).map(item => `${item.label}. ${item.detail}. ${item.evidence || ""}`).join(". ")} ${(analysis.urlResult?.indicators || []).join(". ")}. ${t.nextSteps}. ${(analysis.nextSteps || []).join(". ")} ${analysis.disclaimer || t.disclaimerLong}`;
      else text = `${t.inputTitle}. ${t.messageLabel}. ${t.messagePlaceholder}. ${t.voiceReady}`;
    } else if (page === "center") {
      const latest = analysis;
      text = latest ? `${t.center}. ${latest.contentResult?.summary || ""}. ${(latest.contentResult?.indicators || []).map(item => `${item.label}. ${item.detail}`).join(". ")}. ${t.disclaimerLong}` : `${t.center}. ${t.reportsIntro}`;
    } else if (page === "documents") text = docResult ? `${t.extracted}. ${docResult.summary?.overview || ""}. ${(docResult.summary?.keyPoints || []).join(". ")}. ${(docResult.summary?.terms || []).map(term => `${term.term}. ${term.meaning}`).join(". ")}. ${(docResult.summary?.indicators || []).map(item => item.detail).join(". ")}. ${docResult.warning || ""}` : `${t.documentTitle}. ${t.uploadHelp}`;
    else if (page === "learn") text = `${t.learnTitle}. ${t.learnIntro}. ${t.guides.join(". ")}`;
    else if (page === "reports") text = `${t.reportsTitle}. ${reports.length} reports saved. ${t.reportsIntro}`;
    else text = `${t.settingsTitle}. ${t.privacyText}. ${t.localModeText}. ${t.disclaimerLong}`;
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={23}/></div><div><strong>NiveshRakshak</strong><span>FINANCIAL SAFETY</span></div><button className="icon-btn close-mobile" onClick={()=>setMobileNav(false)} aria-label="Close menu"><X/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItems.map(([key,Icon]) => <button key={key} className={`nav-item ${page===key?"active":""}`} onClick={()=>go(key)}><Icon size={18}/><span>{t[key]}</span>{key==="reports"&&reports.length>0&&<small>{reports.length}</small>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="local-card"><div className="local-card-icon"><LockKeyhole size={16}/></div><div><strong>{t.localMode}</strong><span>{t.localModeText}</span></div></div>
        <div className="profile"><div className="avatar">NR</div><div className="profile-text"><strong>NiveshRakshak AI</strong><span>Personal workspace</span></div><ShieldCheck size={16} className="profile-shield"/></div>
      </div>
    </aside>
    {mobileNav && <button className="scrim" onClick={()=>setMobileNav(false)} aria-label="Close navigation"/>}
    <main className="main">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-btn menu-btn" onClick={()=>setMobileNav(true)} aria-label="Open menu"><Menu/></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14}/><strong>{pageTitle}</strong></div></div>
        <div className="top-actions"><span className="status"><span className="status-dot"/> Local demo</span><button className="voice-top-btn" onClick={speaking ? stopVoice : speakCurrentPage} title={speaking ? t.voiceStop : t.voiceRead} aria-label={speaking ? t.voiceStop : t.voiceRead}>{speaking ? <VolumeX size={16}/> : <Volume2 size={16}/>}<span>{speaking ? t.voiceStop : t.voiceRead}</span></button><button className="language-btn" onClick={()=>setLang(lang==="en"?"hi":"en")}><Languages size={16}/>{lang==="en"?"हिन्दी":"English"}</button><div className="top-avatar">A</div></div>
      </header>
      <div className="content">
        {page==="dashboard" && <Dashboard t={t} reports={reports} stats={stats} go={go} />}
        {page==="investigator" && <Investigator t={t} lang={lang} message={message} setMessage={setMessage} url={url} setUrl={setUrl} busy={busy} error={error} analysis={analysis} runAnalysis={runAnalysis} saveReport={saveReport} startDictation={startDictation} listening={listening}/>}
        {page==="center" && <InvestigationCenter t={t} lang={lang} reports={reports} analysis={analysis} docResult={docResult} go={go}/>}
        {page==="documents" && <Documents t={t} file={file} setFile={setFile} busy={docBusy} error={docError} result={docResult} onSubmit={simplifyFile} saveReport={saveDocumentReport}/>}
        {page==="learn" && <Learn t={t}/>}
        {page==="reports" && <Reports t={t} reports={reports} setReports={setReports}/>}
        {page==="settings" && <SettingsPage t={t}/>}
        <footer className="footer"><span>© 2026 NiveshRakshak AI</span><span><ShieldCheck size={14}/>{t.footer}</span></footer>
      </div>
    </main>
    {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
  </div>;
}

function PageHeading({eyebrow,title,description,icon:Icon}) {
  return <div className="page-heading"><div className="heading-icon">{Icon&&<Icon size={21}/>}</div><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></div>;
}

function Dashboard({t,reports,stats,go}) {
  return <div className="page">
    <div className="welcome-row"><div><div className="eyebrow">MONDAY, YOUR SAFETY CHECK-IN</div><h1>{t.greeting}</h1><p>{t.subtitle}</p></div><div className="welcome-badge"><ShieldCheck size={20}/><span>Stay alert. Stay informed.</span></div></div>
    <section className="hero-panel"><div className="hero-content"><div className="hero-pill"><Sparkles size={14}/> YOUR FINANCIAL SAFETY COMPANION</div><h2>{t.hero}</h2><p>{t.heroText}</p><div className="hero-actions"><button className="btn btn-light" onClick={()=>go("investigator")}>{t.start}<ArrowUpRight size={16}/></button><button className="btn btn-ghost-light" onClick={()=>go("learn")}>{t.explore}<ChevronRight size={16}/></button></div><div className="hero-foot"><LockKeyhole size={14}/>{t.disclaimer}</div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="shield-illustration"><ShieldCheck size={76} strokeWidth={1.3}/></div><div className="float-chip chip-top"><CheckCircle2 size={15}/> Privacy-first</div><div className="float-chip chip-bottom"><Activity size={15}/> Risk indicators</div></div></section>
    <div className="section-title"><div><h2>{t.overview}</h2><p>A quick look at your activity in this browser.</p></div><span className="live-label"><span className="status-dot"/> LIVE LOCAL DATA</span></div>
    <div className="stats-grid">
      <StatCard icon={Search} color="blue" label={t.screened} value={stats.screened} note="Saved in this browser"/>
      <StatCard icon={FileText} color="purple" label={t.saved} value={reports.length} note="Local report history"/>
      <StatCard icon={AlertTriangle} color="amber" label={t.alerts} value={stats.alerts} note="Medium or high indicators"/>
    </div>
    <div className="section-title"><div><h2>{t.quick}</h2><p>Choose a task to get started.</p></div></div>
    <div className="action-grid">
      <ActionCard icon={Search} tint="blue" title={t.investigator} text="Screen a suspicious message or inspect a URL's text for warning signs." action={t.investigate} onClick={()=>go("investigator")}/>
      <ActionCard icon={FileSearch} tint="purple" title={t.documents} text="Extract readable text and identify terms or clauses worth reviewing." action={t.simplify} onClick={()=>go("documents")}/>
      <ActionCard icon={BookOpen} tint="green" title={t.learn} text="Learn practical habits to protect yourself from financial fraud." action={t.explore} onClick={()=>go("learn")}/>
    </div>
    <div className="section-title recent-title"><div><h2>{t.recent}</h2><p>Your recently saved checks.</p></div><button className="text-btn" onClick={()=>go("reports")}>View all <ArrowUpRight size={15}/></button></div>
    {reports.length ? <div className="report-list">{reports.slice(0,3).map(r=><ReportRow key={r.id} report={r}/>)}</div> : <div className="empty-card"><div className="empty-icon"><History size={22}/></div><strong>{t.noReports}</strong><p>{t.noReportsText}</p><button className="btn btn-outline" onClick={()=>go("investigator")}>{t.investigate}<ArrowUpRight size={15}/></button></div>}
    <div className="disclaimer-strip"><ShieldAlert size={18}/><div><strong>Important safety note</strong><p>{t.disclaimerLong}</p></div></div>
  </div>;
}
function StatCard({icon:Icon,color,label,value,note}) { return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>; }
function ActionCard({icon:Icon,tint,title,text,action,onClick}) { return <button className="action-card" onClick={onClick}><div className={`action-icon ${tint}`}><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><span>{action}<ArrowUpRight size={15}/></span></button>; }

function Investigator({t,lang,message,setMessage,url,setUrl,busy,error,analysis,runAnalysis,saveReport,startDictation,listening}) {
  const level = analysis?.contentResult?.level || analysis?.urlResult?.risk || "unknown";
  return <div className="page">
    <PageHeading eyebrow="INVESTIGATION WORKSPACE" title={t.investigator} description={t.subtitle} icon={Search}/>
    <div className="notice notice-blue"><ShieldCheck size={18}/><p>{t.disclaimerLong}</p></div>
    <div className="two-column">
      <form className="panel form-panel" onSubmit={runAnalysis}>
        <div className="panel-head"><div><h2>{t.inputTitle}</h2><p>Analyze message wording and URL text locally via the backend.</p></div><div className="panel-head-icon"><Search size={19}/></div></div>
        <label htmlFor="message">{t.messageLabel}</label>
        <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} maxLength={20000} rows={7} placeholder={t.messagePlaceholder}/>
        <div className="voice-input-row"><button type="button" className={`btn btn-outline voice-dictate-btn ${listening ? "is-listening" : ""}`} onClick={startDictation}><Mic size={16}/>{listening ? t.voiceListening : t.voiceDictate}</button><span>{t.voiceReady}</span></div>
        <div className="field-meta"><span>Remove private information before submitting.</span><span>{message.length}/20,000</span></div>
        <label htmlFor="url" className="spaced-label">{t.urlLabel}</label>
        <div className="input-with-icon"><Link2 size={17}/><input id="url" type="url" value={url} onChange={e=>setUrl(e.target.value)} maxLength={2000} placeholder={t.urlPlaceholder}/></div>
        {error && <div className="inline-error" role="alert"><AlertTriangle size={16}/>{error}</div>}
        <button className="btn btn-primary full-btn" type="submit" disabled={busy}>{busy?<LoaderCircle className="spin" size={17}/>:<Sparkles size={17}/>} {busy?t.analyzing:t.analyze}</button>
        <div className="privacy-note"><LockKeyhole size={14}/> Inputs are processed by your local backend. Avoid sensitive data.</div>
      </form>
      <div className="panel results-panel">
        <div className="panel-head"><div><h2>{t.results}</h2><p>Indicators are not proof of fraud.</p></div><div className="panel-head-icon purple"><Activity size={19}/></div></div>
        {!analysis ? <div className="result-empty"><div className="result-empty-art"><FileSearch size={35}/></div><strong>Your results will appear here</strong><p>Submit a message or URL to see a transparent, rule-based screening summary.</p><div className="mini-steps"><span><i>1</i> Submit content</span><span><i>2</i> Review indicators</span><span><i>3</i> Verify independently</span></div></div> : <div className="analysis-result">
          <div className={`risk-banner ${level}`}><div className="risk-ring"><ShieldAlert size={24}/></div><div><span>SCREENING SUMMARY</span><h3>{riskLabel(level,t)}</h3><p>{analysis.contentResult?.summary || "URL text inspection completed."}</p></div></div>
          {analysis.contentResult && <section className="result-section"><h3>{t.indicators} <span>{analysis.contentResult.indicators.length}</span></h3>{analysis.contentResult.indicators.length ? analysis.contentResult.indicators.map(item=><div className="indicator-row" key={item.key}><div className="indicator-bullet"><AlertTriangle size={15}/></div><div><strong>{item.label}</strong><p>{item.detail}</p>{item.evidence && <p className="evidence-excerpt"><b>{lang === "hi" ? "मिला हुआ टेक्स्ट:" : "Matched text:"}</b> “{item.evidence}”</p>}</div></div>) : <p className="muted">{t.noIndicators}</p>}<p className="method-line"><CircleHelp size={14}/>{analysis.contentResult.method}</p></section>}
          {analysis.urlResult && <section className="result-section"><h3>{t.urlResult}</h3><div className="url-host"><Link2 size={15}/><strong>{analysis.urlResult.hostname || "Invalid URL"}</strong><span className={`tiny-tag ${analysis.urlResult.risk}`}>{riskLabel(analysis.urlResult.risk,t)}</span></div>{analysis.urlResult.indicators.map((item,i)=><div className="simple-indicator" key={i}><AlertTriangle size={14}/>{item}</div>)}<p className="method-line">{analysis.urlResult.note}</p></section>}
          <section className="next-steps"><h3><CheckCircle2 size={17}/>{t.nextSteps}</h3>{analysis.nextSteps.map((s,i)=><div key={i}><span>{i+1}</span>{s}</div>)}</section>
          <p className="result-disclaimer">{analysis.disclaimer}</p>
          <button className="btn btn-outline full-btn" onClick={saveReport}><History size={16}/>{t.saveReport}</button>
        </div>}
      </div>
    </div>
    <div className="below-tip"><Lightbulb size={19}/><div><strong>Remember: a low score is not a safety certificate.</strong><p>Scammers change tactics frequently. Confirm identities and claims through independent official sources.</p></div></div>
  </div>;
}

function downloadInvestigationReport(item, language = "en") {
  if (!item) return;
  const isHindi = language === "hi";
  const lines = [
    "NiveshRakshak AI — Investigation Report",
    "=".repeat(42),
    `Title: ${item.title || "Untitled investigation"}`,
    `Type: ${item.type === "document" ? "Document review" : "Message / URL screening"}`,
    `Created: ${item.createdAt ? new Date(item.createdAt).toLocaleString() : new Date().toLocaleString()}`,
    `Preliminary level: ${item.level || "unknown"}`,
    "",
    "IMPORTANT LIMITATION",
    "This report contains preliminary, rule-based indicators only. It does not prove fraud or legitimacy. No suspicious destination or regulator registry was checked by this demo.",
    ""
  ];
  const addIndicators = (heading, indicators = []) => {
    lines.push(heading);
    lines.push("-".repeat(heading.length));
    if (!indicators.length) lines.push("No indicators from the limited rules were recorded.");
    indicators.forEach((indicator, index) => {
      lines.push(`${index + 1}. ${indicator.label || indicator.key || "Indicator"}`);
      if (indicator.detail) lines.push(`   Explanation: ${indicator.detail}`);
      if (indicator.evidence) lines.push(`   Matched text: ${indicator.evidence}`);
    });
    lines.push("");
  };

  if (item.analysis) {
    if (item.analysis.contentResult) {
      lines.push(`Message summary: ${item.analysis.contentResult.summary || "Not available"}`);
      lines.push(`Rule-based score: ${item.analysis.contentResult.score ?? "Not available"} (not a probability of fraud)`);
      lines.push("");
      addIndicators("Message wording indicators", item.analysis.contentResult.indicators || []);
    }
    if (item.analysis.urlResult) {
      lines.push("URL text inspection");
      lines.push("--------------------");
      lines.push(`Hostname: ${item.analysis.urlResult.hostname || "Could not parse"}`);
      lines.push(`Preliminary URL level: ${item.analysis.urlResult.risk || "unknown"}`);
      (item.analysis.urlResult.indicators || []).forEach((entry, index) => lines.push(`${index + 1}. ${entry}`));
      lines.push(item.analysis.urlResult.note || "The destination was not opened.", "");
    }
    if (item.analysis.nextSteps?.length) {
      lines.push("Safer next steps");
      lines.push("----------------");
      item.analysis.nextSteps.forEach((step, index) => lines.push(`${index + 1}. ${step}`));
      lines.push("");
    }
  }
  if (item.document?.summary) {
    lines.push(`Document overview: ${item.document.summary.overview || "Not available"}`, "");
    addIndicators("Document warning indicators", item.document.summary.indicators || []);
    const terms = item.document.summary.terms || [];
    lines.push("Financial terms");
    lines.push("---------------");
    if (!terms.length) lines.push("No glossary terms matched.");
    terms.forEach(term => lines.push(`- ${term.term}: ${term.meaning}`));
    lines.push("");
    lines.push("Key excerpts");
    lines.push("------------");
    (item.document.summary.keyPoints || []).forEach(point => lines.push(`- ${point}`));
    lines.push("");
  }
  lines.push(isHindi ? "यह रिपोर्ट केवल प्रारंभिक जाँच है। आधिकारिक स्रोतों से स्वतंत्र सत्यापन करें।" : "This report is a preliminary screening aid. Verify claims independently using official sources.");
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const safeName = (item.title || "investigation-report").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "investigation-report";
  anchor.href = url;
  anchor.download = `niveshrakshak-${safeName}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function InvestigationCenter({t,lang,reports,analysis,docResult,go}) {
  const [selectedId,setSelectedId] = useState(null);
  const liveItems = [
    ...(analysis ? [{ id: analysis.id, type: "message", title: "Latest message / URL analysis", level: analysis.contentResult?.level || analysis.urlResult?.risk || "unknown", createdAt: analysis.createdAt, analysis }] : []),
    ...(docResult ? [{ id: "live-document", type: "document", title: docResult.fileName || "Latest document summary", level: (docResult.summary?.indicators?.length || 0) >= 3 ? "high" : (docResult.summary?.indicators?.length || 0) ? "medium" : "low", createdAt: new Date().toISOString(), document: docResult }] : [])
  ];
  const allItems = [...liveItems, ...reports].filter((item,index,items)=>items.findIndex(other=>other.id===item.id)===index);
  const selected = allItems.find(item => item.id === selectedId) || allItems[0] || null;
  const isHindi = lang === "hi";
  const msg = (en,hi) => isHindi ? hi : en;
  const contentIndicators = selected?.analysis?.contentResult?.indicators || [];
  const urlIndicators = selected?.analysis?.urlResult?.indicators || [];
  const docIndicators = selected?.document?.summary?.indicators || [];
  const terms = selected?.document?.summary?.terms || [];
  const evidenceCount = contentIndicators.length + urlIndicators.length + docIndicators.length;
  const sourceName = selected?.type === "document" ? msg("Document review", "दस्तावेज़ समीक्षा") : msg("Message / URL screening", "संदेश / URL जाँच");
  const timeline = selected ? (selected.type === "document" ? [
    {done:true,title:msg("Document received", "दस्तावेज़ प्राप्त"),detail:selected.document?.fileName || selected.title},
    {done:true,title:msg("Readable text extracted", "पढ़ने योग्य टेक्स्ट निकाला गया"),detail:selected.document?.summary?.overview || msg("Text extraction completed", "टेक्स्ट निकाला गया")},
    {done:true,title:msg("Terms and pattern rules checked", "शब्दों और पैटर्न के नियम जाँचे गए"),detail:`${terms.length} ${msg("glossary terms;", "शब्दावली के शब्द;")} ${docIndicators.length} ${msg("warning indicators", "चेतावनी संकेत")}`},
    {done:false,title:msg("Human / official verification", "मानवीय / आधिकारिक सत्यापन"),detail:msg("Not performed by this demo. Review the original document and official disclosures.", "इस डेमो द्वारा नहीं किया गया। मूल दस्तावेज़ और आधिकारिक जानकारी जाँचें।")}
  ] : [
    {done:true,title:msg("Input received", "इनपुट प्राप्त"),detail:msg("Message wording and/or URL text submitted", "संदेश और/या URL टेक्स्ट प्राप्त हुआ")},
    ...(selected.analysis?.contentResult ? [{done:true,title:msg("Message pattern scan", "संदेश पैटर्न जाँच"),detail:`${contentIndicators.length} ${msg("indicator(s) matched", "संकेत मिले")}`}] : []),
    ...(selected.analysis?.urlResult ? [{done:true,title:msg("URL text inspection", "URL टेक्स्ट जाँच"),detail:`${urlIndicators.length} ${msg("URL indicator(s)", "URL संकेत")}; ${selected.analysis.urlResult.hostname || msg("invalid URL", "अमान्य URL")}`}] : []),
    {done:true,title:msg("Summary prepared", "सार तैयार"),detail:msg("Rule-based result generated", "नियम-आधारित परिणाम तैयार")},
    {done:false,title:msg("Live website / regulator verification", "लाइव वेबसाइट / नियामक सत्यापन"),detail:msg("Not performed. The destination was not visited and no official registry was queried.", "नहीं किया गया। वेबसाइट नहीं खोली गई और आधिकारिक रजिस्ट्री नहीं जाँची गई।")}
  ]) : [];
  return <div className="page">
    <PageHeading eyebrow="TRANSPARENT WORKFLOW" title={t.center} description={msg("Review the checks performed, inspect evidence, and see what still needs independent verification.", "की गई जाँच, मिले संकेत और स्वतंत्र सत्यापन की आवश्यकता यहाँ देखें।")} icon={ClipboardList}/>
    <div className="notice notice-blue"><ShieldCheck size={18}/><p>{msg("This center reports only checks the demo actually performs. It does not contact regulators, visit suspicious links, or prove whether an offer is legitimate.", "यह केंद्र केवल इस डेमो द्वारा की गई जाँच दिखाता है। यह नियामकों से संपर्क नहीं करता, संदिग्ध लिंक नहीं खोलता और किसी ऑफर की वैधता साबित नहीं करता।")}</p></div>
    <div className="investigation-stats">
      <div className="panel investigation-stat"><span className="investigation-stat-icon blue"><History size={18}/></span><div><strong>{reports.length}</strong><span>{msg("Saved reports", "सहेजी गई रिपोर्ट")}</span></div></div>
      <div className="panel investigation-stat"><span className="investigation-stat-icon amber"><AlertTriangle size={18}/></span><div><strong>{reports.filter(r=>r.level==="high"||r.level==="medium").length}</strong><span>{msg("Reports needing review", "समीक्षा योग्य रिपोर्ट")}</span></div></div>
      <div className="panel investigation-stat"><span className="investigation-stat-icon green"><ListChecks size={18}/></span><div><strong>{allItems.length}</strong><span>{msg("Available investigations", "उपलब्ध जाँच")}</span></div></div>
    </div>
    <div className="investigation-layout">
      <section className="panel investigation-list-panel">
        <div className="panel-head"><div><h2>{msg("Investigation history", "जाँच इतिहास")}</h2><p>{msg("Select a result to inspect its workflow and evidence.", "किसी परिणाम को चुनकर उसकी प्रक्रिया और प्रमाण देखें।")}</p></div><div className="panel-head-icon"><History size={18}/></div></div>
        {allItems.length ? <div className="investigation-list">{allItems.map(item=><button key={item.id} className={`investigation-item ${selected?.id===item.id?"selected":""}`} onClick={()=>setSelectedId(item.id)}><span className={`investigation-item-icon ${item.level}`} >{item.type==="document"?<FileText size={17}/>:<Search size={17}/>}</span><span className="investigation-item-copy"><strong>{item.title || msg("Untitled investigation", "बिना शीर्षक की जाँच")}</strong><small>{item.type==="document"?msg("Document simplification", "दस्तावेज़ सरलीकरण"):msg("Message / URL", "संदेश / URL")} · {new Date(item.createdAt || Date.now()).toLocaleString()}</small></span><span className={`tiny-tag ${item.level}`}>{riskLabel(item.level,t)}</span></button>)}</div> : <div className="result-empty compact-empty"><div className="result-empty-art"><ClipboardList size={30}/></div><strong>{msg("No investigations yet", "अभी कोई जाँच नहीं")}</strong><p>{msg("Analyze a message or simplify a document. You can then save it and review the workflow here.", "संदेश जाँचें या दस्तावेज़ सरल करें। फिर रिपोर्ट सहेजकर यहाँ देखें।")}</p><button className="btn btn-primary" onClick={()=>go("investigator")}>{msg("Start an investigation", "जाँच शुरू करें")}<ArrowUpRight size={15}/></button></div>}
      </section>
      <section className="panel investigation-detail">
        <div className="panel-head"><div><h2>{msg("Investigation trace", "जाँच की प्रक्रिया")}</h2><p>{selected ? new Date(selected.createdAt || Date.now()).toLocaleString() : msg("Choose an investigation", "जाँच चुनें")}</p></div><div className="panel-head-icon purple"><Activity size={18}/></div></div>
        {selected ? <>
          <div className={`risk-banner ${selected.level}`}><div className="risk-ring"><ShieldAlert size={23}/></div><div><span>{sourceName}</span><h3>{riskLabel(selected.level,t)}</h3><p>{selected.type==="document" ? selected.document?.summary?.overview : selected.analysis?.contentResult?.summary || msg("URL text inspection completed.", "URL टेक्स्ट जाँच पूरी हुई।")}</p></div></div>
          <h3 className="investigation-section-title">{msg("Workflow steps", "प्रक्रिया के चरण")}</h3>
          <div className="trace-timeline">{timeline.map((step,index)=><div className={`trace-step ${step.done?"complete":"pending"}`} key={`${step.title}-${index}`}><div className="trace-marker">{step.done?<CircleCheck size={17}/>:<CircleX size={17}/>}</div><div><strong>{step.title}</strong><p>{step.detail}</p><span>{step.done?msg("Completed by demo", "डेमो द्वारा पूरा"):msg("Not performed", "नहीं किया गया")}</span></div></div>)}</div>
          <h3 className="investigation-section-title">{msg("Evidence & explanations", "प्रमाण और व्याख्या")} <span className="evidence-count">{evidenceCount}</span></h3>
          {contentIndicators.map(item=><div className="indicator-row" key={`text-${item.key}`}><div className="indicator-bullet"><AlertTriangle size={15}/></div><div><strong>{item.label}</strong><p>{item.detail}</p>{item.evidence && <p className="evidence-excerpt"><b>{msg("Matched text:", "मिला हुआ टेक्स्ट:")}</b> “{item.evidence}”</p>}</div></div>)}
          {urlIndicators.map((item,index)=><div className="simple-indicator" key={`url-${index}`}><Link2 size={14}/>{item}</div>)}
          {docIndicators.map(item=><div className="indicator-row" key={`doc-${item.key}`}><div className="indicator-bullet"><AlertTriangle size={15}/></div><div><strong>{item.label}</strong><p>{item.detail}</p></div></div>)}
          {terms.length>0 && <div className="investigation-term-list"><strong>{msg("Financial terms detected", "पहचाने गए वित्तीय शब्द")}</strong>{terms.map(term=><div key={term.term}><b>{term.term}</b><p>{term.meaning}</p></div>)}</div>}
          {selected.document?.summary?.keyPoints?.length>0 && <div className="investigation-term-list"><strong>{msg("Document excerpts", "दस्तावेज़ के अंश")}</strong>{selected.document.summary.keyPoints.slice(0,4).map((line,index)=><p key={index}>{line}</p>)}</div>}
          {evidenceCount===0 && terms.length===0 && <p className="muted">{msg("No indicators matched the limited rules. This is not proof of safety.", "सीमित नियमों से कोई संकेत नहीं मिला। यह सुरक्षा का प्रमाण नहीं है।")}</p>}
          <div className="notice notice-amber investigation-caveat"><AlertTriangle size={17}/><p>{msg("Next action: verify claims through independently located official sources. This demo does not perform live verification or guarantee detection.", "अगला कदम: स्वतंत्र रूप से खोजे गए आधिकारिक स्रोतों से दावों की जाँच करें। यह डेमो लाइव सत्यापन या पहचान की गारंटी नहीं देता।")}</p></div>
          <div className="investigation-actions"><button className="btn btn-outline" onClick={()=>downloadInvestigationReport(selected,lang)}><FileDown size={15}/>{msg("Download report (.txt)", "रिपोर्ट डाउनलोड करें (.txt)")}</button><button className="btn btn-outline" onClick={()=>go(selected.type==="document"?"documents":"investigator")}>{selected.type==="document"?msg("Open Document Simplifier", "दस्तावेज़ सरल करें"):msg("Open Scam Investigator", "स्कैम जाँच खोलें")}<ArrowUpRight size={15}/></button><button className="btn btn-outline" onClick={()=>go("reports")}><History size={15}/>{msg("All reports", "सभी रिपोर्ट")}</button></div>
        </> : <div className="result-empty"><ClipboardList size={30}/><strong>{msg("Nothing selected", "कुछ चुना नहीं गया")}</strong><p>{msg("Save an investigation to see its evidence and workflow here.", "प्रमाण और प्रक्रिया देखने के लिए जाँच रिपोर्ट सहेजें।")}</p></div>}
      </section>
    </div>
  </div>;
}

function Documents({t,file,setFile,busy,error,result,onSubmit,saveReport}) {
  return <div className="page">
    <PageHeading eyebrow="DOCUMENT WORKSPACE" title={t.documents} description={t.documentTitle} icon={FileText}/>
    <div className="notice notice-amber"><LockKeyhole size={18}/><p>{t.uploadHelp} Do not upload OTPs, passwords, bank credentials, or unredacted identity documents.</p></div>
    <div className="two-column doc-layout">
      <form className="panel form-panel" onSubmit={onSubmit}>
        <div className="panel-head"><div><h2>Upload a document</h2><p>PDF and plain-text TXT files, up to 5 MB.</p></div><div className="panel-head-icon purple"><Upload size={19}/></div></div>
        <label className="drop-zone" htmlFor="document"><div className="upload-circle"><Upload size={23}/></div><strong>{file?file.name:"Choose a PDF or TXT file"}</strong><span>{file?`${(file.size/1024).toFixed(1)} KB`:"Click to browse from your device"}</span><input id="document" type="file" accept=".pdf,.txt,application/pdf,text/plain" onChange={e=>setFile(e.target.files?.[0]||null)}/></label>
        <div className="file-rules"><span><CheckCircle2 size={14}/> PDF / TXT</span><span><CheckCircle2 size={14}/> Max 5 MB</span><span><LockKeyhole size={14}/> Local processing</span></div>
        {error && <div className="inline-error" role="alert"><AlertTriangle size={16}/>{error}</div>}
        <button className="btn btn-primary full-btn" type="submit" disabled={busy}>{busy?<LoaderCircle className="spin" size={17}/>:<FileSearch size={17}/>} {busy?t.extracting:t.extract}</button>
        <div className="privacy-note"><ShieldCheck size={14}/> Files are held in memory for processing, not saved by this app.</div>
      </form>
      <div className="panel doc-results">
        <div className="panel-head"><div><h2>{t.extracted}</h2><p>Plain-language reading aid</p></div><div className="panel-head-icon green"><BookOpen size={19}/></div></div>
        {!result ? <div className="result-empty"><div className="result-empty-art"><FileText size={35}/></div><strong>Your document summary will appear here</strong><p>Upload a readable document to extract its text, surface terms, and identify clauses to review.</p></div> : <div className="document-result">
          <div className="file-title"><div className="file-icon"><FileText size={20}/></div><div><strong>{result.fileName}</strong><span>{result.summary.overview}</span></div></div>
          <h3>Key text excerpts</h3><ul className="key-points">{result.summary.keyPoints.map((p,i)=><li key={i}>{p}</li>)}</ul>
          <h3>Financial terms found</h3>{result.summary.terms.length ? result.summary.terms.map(term=><div className="term-card" key={term.term}><strong>{term.term}</strong><p>{term.meaning}</p></div>) : <p className="muted">No terms from the small built-in glossary were detected.</p>}
          <h3>Clauses worth a second look</h3>{result.summary.indicators.length ? result.summary.indicators.map(item=><div className="simple-indicator" key={item.key}><AlertTriangle size={14}/>{item.detail}</div>) : <p className="muted">No matching patterns found by the limited screening rules.</p>}
          <div className="notice notice-amber small-notice"><AlertTriangle size={16}/><p>{result.warning} {result.summary.note}</p></div>
          <button className="btn btn-outline full-btn document-save-btn" onClick={saveReport}><History size={16}/>{t.saveReport}</button>
        </div>}
      </div>
    </div>
    <div className="panel extracted-preview"><div className="panel-head"><div><h2>Extracted text preview</h2><p>Review the source text used for the summary.</p></div></div><pre>{result?.extractedText || "Extracted text will be shown here after processing."}</pre></div>
  </div>;
}

function Learn({t}) {
  const cards = [
    {icon:AlertTriangle,title:"Recognize pressure tactics",body:"Scammers may create urgency, threaten consequences, or promise an opportunity that disappears quickly.",tag:"RED FLAGS",color:"amber"},
    {icon:ShieldCheck,title:"Verify independently",body:"Find official contact details yourself. Do not rely only on a link, phone number, or screenshot supplied in a message.",tag:"VERIFY",color:"blue"},
    {icon:LockKeyhole,title:"Protect your credentials",body:"Never share OTPs, PINs, passwords, CVVs, or remote access with someone who contacts you unexpectedly.",tag:"PRIVACY",color:"green"},
    {icon:FileText,title:"Read the fine print",body:"Look for fees, lock-in periods, withdrawal limits, penalties, exclusions, and who is legally responsible.",tag:"DOCUMENTS",color:"purple"}
  ];
  const links = [
    ["SEBI Investor Education","https://investor.sebi.gov.in/"],
    ["RBI Financial Education","https://www.rbi.org.in/"],
    ["National Cyber Crime Reporting Portal","https://cybercrime.gov.in/"]
  ];
  return <div className="page">
    <PageHeading eyebrow="LEARNING CENTRE" title={t.learnTitle} description={t.learnIntro} icon={BookOpen}/>
    <div className="learn-grid">{cards.map(c=><div className="learn-card" key={c.title}><div className={`learn-icon ${c.color}`}><c.icon size={22}/></div><span className={`learn-tag ${c.color}`}>{c.tag}</span><h3>{c.title}</h3><p>{c.body}</p><div className="learn-card-foot"><CheckCircle2 size={15}/> Practical safety habit</div></div>)}</div>
    <div className="panel checklist-panel"><div className="panel-head"><div><h2>Before you act, ask yourself</h2><p>Use this quick checklist when an offer or message feels unusual.</p></div><div className="panel-head-icon green"><CheckCircle2 size={19}/></div></div><div className="checklist">{t.guides.map((g,i)=><ChecklistItem key={g} text={g} index={i}/>)}</div></div>
    <div className="panel resources-panel"><div className="panel-head"><div><h2>{t.source}</h2><p>{t.sourceNote}</p></div><div className="panel-head-icon blue"><ExternalLink size={19}/></div></div>{links.map(([name,url],i)=><a className="resource-row" href={url} target="_blank" rel="noreferrer" key={name}><div className="resource-number">0{i+1}</div><div><strong>{t.sources[i]}</strong><span>{new URL(url).hostname}</span></div><ExternalLink size={16}/></a>)}</div>
  </div>;
}
function ChecklistItem({text,index}) { const [checked,setChecked]=useState(false); return <label className={`checklist-item ${checked?"checked":""}`}><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/><span className="custom-check">{checked&&<Check size={13}/>}</span><span>{text}</span></label>; }

function Reports({t,reports,setReports}) {
  const [selected,setSelected]=useState(null);
  function clear() { if (window.confirm(t.clearConfirm)) { setReports([]); setSelected(null); } }
  return <div className="page">
    <PageHeading eyebrow="LOCAL ACTIVITY" title={t.reportsTitle} description={t.reportsIntro} icon={History}/>
    <div className="reports-toolbar"><div className="report-count"><History size={17}/><strong>{reports.length}</strong><span>saved reports</span></div>{reports.length>0&&<button className="btn btn-danger-ghost" onClick={clear}><Trash2 size={15}/>{t.clear}</button>}</div>
    {reports.length===0?<div className="empty-card large-empty"><div className="empty-icon"><History size={25}/></div><strong>{t.noReports}</strong><p>{t.noReportsText}</p></div>:<div className="reports-layout"><div className="report-list">{reports.map(r=><button key={r.id} className={`report-row-button ${selected?.id===r.id?"selected":""}`} onClick={()=>setSelected(r)}><ReportRow report={r}/></button>)}</div><div className="panel report-detail">{selected?<><div className="panel-head"><div><h2>Report details</h2><p>{new Date(selected.createdAt).toLocaleString()}</p></div><span className={`tiny-tag ${selected.level}`}>{riskLabel(selected.level,t)}</span></div><h3>{selected.title}</h3><p>{selected.document?.summary?.overview || selected.analysis?.contentResult?.summary || selected.analysis?.urlResult?.note || "Saved screening report"}</p><div className="notice notice-amber"><AlertTriangle size={17}/><p>{t.disclaimerLong}</p></div>{selected.analysis?.contentResult?.indicators?.map(i=><div className="indicator-row" key={i.key}><div className="indicator-bullet"><AlertTriangle size={15}/></div><div><strong>{i.label}</strong><p>{i.detail}</p>{i.evidence && <p className="evidence-excerpt"><b>Matched text:</b> “{i.evidence}”</p>}</div></div>)}{selected.analysis?.urlResult&&<div className="simple-indicator"><Link2 size={14}/>{selected.analysis.urlResult.hostname}: {selected.analysis.urlResult.note}</div>}{selected.document?.summary?.indicators?.map(i=><div className="indicator-row" key={i.key}><div className="indicator-bullet"><AlertTriangle size={15}/></div><div><strong>{i.label}</strong><p>{i.detail}</p></div></div>)}{selected.document?.summary?.terms?.map(term=><div className="term-card" key={term.term}><strong>{term.term}</strong><p>{term.meaning}</p></div>)}</>:<div className="result-empty"><History size={30}/><strong>Select a report</strong><p>Choose a saved report to review its details.</p></div>}</div></div>}
  </div>;
}
function ReportRow({report}) { return <div className="report-row"><div className={`report-status ${report.level}`}><ShieldAlert size={17}/></div><div className="report-row-main"><strong>{report.title||"Untitled investigation"}</strong><span>{new Date(report.createdAt).toLocaleString()}</span></div><span className={`tiny-tag ${report.level}`}>{report.level}</span><ChevronRight size={16} className="report-chevron"/></div>; }

function SettingsPage({t}) {
  return <div className="page">
    <PageHeading eyebrow="PREFERENCES" title={t.settingsTitle} description="Understand how this local demo handles your information." icon={Settings}/>
    <div className="settings-grid">
      <div className="panel setting-card"><div className="setting-heading"><div className="panel-head-icon green"><LockKeyhole size={19}/></div><div><h2>Privacy & storage</h2><p>Local-first by design</p></div></div><p>{t.privacyText}</p><div className="setting-status"><CheckCircle2 size={16}/> Report history is browser-local</div><div className="setting-status"><CheckCircle2 size={16}/> Uploaded files are not persisted by the app</div><div className="setting-status"><CheckCircle2 size={16}/> No paid AI API configured</div></div>
      <div className="panel setting-card"><div className="setting-heading"><div className="panel-head-icon blue"><Activity size={19}/></div><div><h2>{t.localMode}</h2><p>Transparent preliminary screening</p></div></div><p>{t.localModeText}</p><div className="mode-detail"><span>Analysis engine</span><strong>Keyword + pattern rules</strong></div><div className="mode-detail"><span>URL inspection</span><strong>Text only; no external fetch</strong></div><div className="mode-detail"><span>AI provider</span><strong>Not configured</strong></div></div>
    </div>
    <div className="notice notice-blue"><CircleHelp size={18}/><p>{t.disclaimerLong}</p></div>
  </div>;
}
