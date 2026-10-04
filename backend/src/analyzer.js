const patterns = [
  {
    key: "urgency",
    label: "Pressure or urgency",
    regex: /(?:\b(urgent|immediately|right away|act now|last chance|within\s+\d+\s*(?:minutes?|hours?|days?)|today only|account will be (?:blocked|closed|suspended))\b|आज ही|तुरंत|अभी करें|जल्दी|खाता बंद|खाता ब्लॉक)/i,
    weight: 2,
    detail: "The message pressures the reader to act quickly or threatens a negative consequence. Pause and verify through an independently found official channel."
  },
  {
    key: "credentials",
    label: "Request for sensitive credentials",
    regex: /(?:\b(otp|one[- ]time password|atm pin|pin number|cvv|share your password|bank password|account password|login credentials)\b|ओटीपी|पासवर्ड|एटीएम पिन|सीवीवी)/i,
    weight: 4,
    detail: "The text mentions sensitive credentials. Never share an OTP, PIN, password, or CVV with someone who contacts you."
  },
  {
    key: "guaranteed",
    label: "Guaranteed or unusually high returns",
    regex: /(?:\b(guaranteed returns?|risk[- ]free returns?|double your money|assured profit|100\s*%\s*profit|\d+\s*%\s*(?:daily|weekly|monthly)?\s*(?:returns?|profit)|daily profit)\b|पक्का मुनाफा|गारंटीड रिटर्न|पैसा दोगुना)/i,
    weight: 3,
    detail: "Promises of guaranteed or unusually high returns deserve careful independent scrutiny. All investments involve risk, and claims should be verified."
  },
  {
    key: "reward",
    label: "Prize or reward used to persuade action",
    regex: /(?:\b(you have won|won a lottery|claim your prize|claim your reward|receive a .{0,25} reward|cash reward|congratulations.{0,50}(?:won|prize|reward))\b|इनाम जीत|लॉटरी जीती|इनाम प्राप्त)/i,
    weight: 2,
    detail: "A prize or reward claim can be used to pressure someone into clicking a link, sharing details, or paying a fee. Verify the claim independently."
  },
  {
    key: "advance_fee",
    label: "Possible advance-fee request",
    regex: /(?:\b(processing fee|release fee|claim fee|advance fee|pay (?:a |the )?(?:registration|verification|activation|delivery) fee|pay first to (?:receive|claim)|fee to release)\b|जमा शुल्क|प्रोसेसिंग फीस|पहले फीस जमा)/i,
    weight: 3,
    detail: "Requests to pay money upfront to receive a prize, loan, job, parcel, or investment benefit should be verified carefully."
  },
  {
    key: "payment",
    label: "Unusual payment or transfer request",
    regex: /(?:\b(send money|transfer now|pay now|personal account|crypto wallet|gift card payment|send the payment|bank transfer immediately)\b|पैसे भेजें|ट्रांसफर करें|रजिस्ट्रेशन फीस)/i,
    weight: 2,
    detail: "Review payment requests carefully, especially urgent transfers or payments to personal accounts or wallets."
  },
  {
    key: "account_threat",
    label: "Account or KYC threat",
    regex: /(?:\b(account (?:will be|has been|is being) (?:blocked|closed|suspended)|permanently blocked|complete (?:your )?kyc|update (?:your )?kyc|kyc verification|account suspension)\b|खाता (?:बंद|ब्लॉक)|केवाईसी अपडेट)/i,
    weight: 2,
    detail: "Messages threatening account access or demanding KYC updates may be impersonation attempts. Contact the institution using details you find independently."
  },
  {
    key: "impersonation",
    label: "Possible impersonation or authority claim",
    regex: /(?:\b(regulator approved|government approved|official account|SEBI approved|RBI approved|bank verification agent|government officer)\b|सरकारी मंजूरी|सेबी अप्रूव्ड|बैंक अधिकारी)/i,
    weight: 2,
    detail: "Claims of official approval or authority should be checked independently using official sources. The wording alone cannot confirm impersonation."
  },
  {
    key: "secrecy",
    label: "Secrecy or discouraging verification",
    regex: /(?:\b(keep this secret|don't tell anyone|do not tell anyone|do not verify|no need to check|don't contact your bank)\b|गुप्त रखें|किसी को न बताएं)/i,
    weight: 2,
    detail: "Attempts to discourage independent verification are a warning sign. Pause and check the claim with a trusted official source."
  }
];

function matchedEvidence(text, regex) {
  const match = text.match(regex);
  if (!match) return undefined;
  const start = Math.max(0, (match.index ?? 0) - 55);
  const end = Math.min(text.length, (match.index ?? 0) + match[0].length + 55);
  const excerpt = text.slice(start, end).replace(/\s+/g, " ").trim();
  return excerpt.length > 150 ? `${excerpt.slice(0, 147)}…` : excerpt;
}

function extractUrls(text) {
  const found = text.match(/(?:https?:\/\/|www\.)[^\s<>"']+/gi) || [];
  return [...new Set(found.map(value => value.replace(/[),.!?;:]+$/g, "")))].slice(0, 10);
}

export function analyzeText(text, language = "en") {
  const hits = patterns
    .filter(pattern => pattern.regex.test(text))
    .map(({ key, label, regex, weight, detail }) => ({
      key,
      label,
      weight,
      detail,
      evidence: matchedEvidence(text, regex)
    }));

  // Inspect URL text only. This intentionally does not visit or fetch the destination.
  for (const rawUrl of extractUrls(text)) {
    const normalizedUrl = rawUrl.toLowerCase().startsWith("www.") ? `https://${rawUrl}` : rawUrl;
    const urlResult = inspectUrl(normalizedUrl);
    const actionableSignals = urlResult.valid
      ? urlResult.indicators.filter(item => !item.startsWith("No URL-text indicators"))
      : ["The URL text could not be parsed as an absolute URL."];
    if (actionableSignals.length) {
      hits.push({
        key: `url_text_${hits.length + 1}`,
        label: "URL text deserves inspection",
        weight: 3,
        detail: `The message contains a URL with text-based warning sign(s): ${actionableSignals.slice(0, 3).join(" ")} The destination was not opened.`,
        evidence: rawUrl
      });
    }
  }

  const score = Math.min(100, hits.reduce((sum, hit) => sum + hit.weight * 15, 0));
  const level = score >= 60 ? "high" : score >= 30 ? "medium" : "low";
  const summary = hits.length
    ? `Found ${hits.length} indicator(s) that deserve further checking.`
    : "No indicators from this limited rule set were detected. This does not mean the message is safe.";

  return {
    score,
    level,
    indicators: hits,
    summary,
    method: "Keyword, pattern, and URL-text screening only; not an AI verdict."
  };
}

export function inspectUrl(input) {
  let parsed;
  try {
    parsed = new URL(input);
  } catch {
    return {
      valid: false,
      risk: "unknown",
      indicators: ["The input is not a valid absolute URL."],
      note: "No network request was made."
    };
  }

  const indicators = [];
  if (!["http:", "https:"].includes(parsed.protocol)) indicators.push("Unexpected URL scheme.");
  if (parsed.protocol !== "https:") indicators.push("The URL does not use HTTPS; this alone does not prove fraud.");
  if (parsed.username || parsed.password) indicators.push("The URL contains embedded username/password fields.");
  if (parsed.hostname.startsWith("xn--") || parsed.hostname.split(".").some(part => part.startsWith("xn--"))) {
    indicators.push("The hostname contains an internationalized/punycode label; inspect the spelling carefully.");
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(parsed.hostname)) {
    indicators.push("The hostname is an IP address rather than a typical domain name.");
  }
  if (parsed.hostname.split(".").length > 5) indicators.push("The hostname has many subdomain labels.");
  if (/(login|verify|secure|wallet|claim|bonus|gift|kyc|account|reward|prize)/i.test(parsed.hostname)) {
    indicators.push("The hostname contains words sometimes used in deceptive links; this alone is not proof of fraud.");
  }
  if (/(bit\.ly|tinyurl\.com|t\.co|goo\.gl|cutt\.ly|is\.gd)\b/i.test(parsed.hostname)) {
    indicators.push("The URL uses a link-shortening service, so the final destination is not clear from this text alone.");
  }
  if (parsed.hostname.includes("localhost") || parsed.hostname === "127.0.0.1" || parsed.hostname === "::1") {
    indicators.push("This URL points to a local host.");
  }

  return {
    valid: true,
    hostname: parsed.hostname,
    protocol: parsed.protocol,
    risk: indicators.length >= 3 ? "high" : indicators.length ? "medium" : "low",
    indicators: indicators.length ? indicators : ["No URL-text indicators from this limited rule set were detected."],
    note: "The destination was not visited. HTTPS, a familiar-looking domain, or a low indicator count does not establish legitimacy."
  };
}

export function simplifyDocument(text) {
  const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
  const terms = [
    { term: "capital", meaning: "Money invested or used to start/run an activity." },
    { term: "interest", meaning: "The cost of borrowing or the amount earned for lending/saving money." },
    { term: "principal", meaning: "The original amount borrowed or invested, before interest or returns." },
    { term: "maturity", meaning: "The date when a financial product or agreement reaches its scheduled end." },
    { term: "lock-in", meaning: "A period during which withdrawal or sale may be restricted." },
    { term: "penalty", meaning: "A charge or consequence for breaking a stated condition." },
    { term: "risk", meaning: "The possibility that an outcome differs from what is expected, including loss." },
    { term: "guaranteed", meaning: "A claim that should be checked carefully: who guarantees it, under what conditions, and with what legal backing?" },
    { term: "processing fee", meaning: "A fee charged for handling an application or transaction; check whether it is disclosed and payable to a verified organization." },
    { term: "prepayment", meaning: "Paying some or all of a loan before the scheduled due date; check whether charges apply." },
    { term: "default", meaning: "Failure to meet an obligation such as making a payment by its due date." },
    { term: "annual interest rate", meaning: "The stated interest rate over a year; fees and calculation method can affect the overall cost." }
  ];
  const foundTerms = terms.filter(term => new RegExp(term.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(text));
  const warning = analyzeText(text);
  return {
    overview: `Extracted ${text.length} characters across ${lines.length} non-empty text lines.`,
    keyPoints: lines.slice(0, 8).map(line => line.slice(0, 240)),
    terms: foundTerms,
    indicators: warning.indicators,
    note: "This is an automated reading aid, not legal, tax, or investment advice. It may omit important clauses."
  };
}
