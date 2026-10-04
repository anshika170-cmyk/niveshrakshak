# NiveshRakshak AI

A standalone, beginner-friendly financial scam-awareness and document-explanation website.
It runs locally without paid AI APIs. The current analysis engine uses rule-based message, evidence-excerpt, and URL-text checks and clearly labels results as preliminary indicators, not verified fraud determinations or financial advice.

## Requirements
- Node.js 20+ (Node 24 is fine)
- npm

## Run locally

Open two terminals in VS Code.

### 1. Backend
```powershell
cd backend
npm install
npm run dev
```
Backend runs at `http://localhost:5000`.

### 2. Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite, usually `http://localhost:5173`.

## What works
- Responsive React interface with Dashboard, Scam Investigator, Investigation Center, Document Simplifier, Learn & Stay Safe, and Reports.
- English/Hindi interface toggle for main navigation and core workflow labels.
- Rule-based scam-indicator analysis for urgency, credential requests, account/KYC threats, prizes/rewards, advance fees, payment requests, guaranteed returns, secrecy, and possible impersonation.
- Matched text excerpts shown beside indicators to make the reason for a warning easier to review.
- URL syntax and risk-indicator inspection without visiting the submitted URL, including URL text found inside a pasted message.
- TXT and PDF text extraction through the backend, followed by local rule-based explanation.
- Browser-local report history (stored in localStorage), including saved document summaries.
- Investigation Center showing workflow steps, matched evidence, warning explanations, and checks not performed by the demo.
- Safety-focused outputs with indicators, uncertainty, and practical verification steps.
- Browser-native voice assistance: read current page/results aloud and dictate message text in English or Hindi where supported.
- Included sample financial PDF and suspicious-message test cases in `sample-data/`.

## Investigation Center
The center combines the latest message/URL screening and document summary with saved reports. It distinguishes completed local checks from checks that still require a person to verify independently. It does not visit links, query regulator databases, or establish that an offer is legitimate. Save a message result from Scam Investigator or a document summary from Document Simplifier to retain it in Reports.

## Important limitations
- This is a demo / educational screening tool, not a regulator verification service, legal opinion, or financial adviser.
- It does not confirm whether an investment or URL is legitimate.
- URL inspection does not fetch the target website. It only inspects the URL text, avoiding server-side request forgery risks.
- No paid AI provider is configured. No API key is needed. The analysis is rule-based, not a fully autonomous AI agent.
- Report history stays in the current browser and is not synced to a server.
- Do not upload documents containing passwords, OTPs, bank credentials, account numbers, or other sensitive personal information.

## Production hardening before public deployment
Add authentication, access controls, stronger upload limits/scanning, privacy notice and retention controls,
automated security tests, and a carefully reviewed deployment configuration. Never put secrets in frontend code.


## Voice assistance

The frontend includes browser-native voice features:
- **Read this page aloud** in the top bar reads the current page's main guidance or available result summary. Use the same button to stop speech.
- **Speak message** on the Scam Investigator uses browser speech recognition to dictate text into the message box. It follows the selected language (English or Hindi).
- Voice features depend on browser support. Speech recognition is supported best in Chromium-based browsers such as Chrome and requires microphone permission.
- Speech is processed by the browser's built-in capabilities; this project does not send voice recordings to a separate AI service. Browser vendors may implement speech recognition differently, so check your browser's privacy settings.

## Run locally

Open two terminals from the extracted project root. In terminal 1:

```powershell
cd backend
npm install
npm run dev
```

In terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the frontend terminal (usually `http://localhost:5173`).
