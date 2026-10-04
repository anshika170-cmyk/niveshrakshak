import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { createRequire } from "node:module";
import { analyzeText, inspectUrl, simplifyDocument } from "./src/analyzer.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse/lib/pdf-parse.js");

const app = express();

// Render runs the app behind a proxy.
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT || 5000);
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "100kb" }));
app.use("/api", rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ok = file.mimetype === "text/plain" ||
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".txt") ||
      file.originalname.toLowerCase().endsWith(".pdf");
    cb(ok ? null : new Error("Only PDF and TXT files are supported."), ok);
  }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", app: "NiveshRakshak AI", mode: "local-rule-based-demo" }));

app.post("/api/analyze", (req, res) => {
  const { text = "", url = "", language = "en" } = req.body || {};
  if (typeof text !== "string" || typeof url !== "string") {
    return res.status(400).json({ error: "Text and URL must be strings." });
  }
  if (text.length > 20_000 || url.length > 2_000) {
    return res.status(413).json({ error: "Input is too long. Keep text under 20,000 characters and URL under 2,000." });
  }
  const contentResult = text.trim() ? analyzeText(text, language) : null;
  const urlResult = url.trim() ? inspectUrl(url, language) : null;
  if (!contentResult && !urlResult) return res.status(400).json({ error: "Enter a message or URL to analyze." });
  res.json({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    mode: "rule-based-demo",
    disclaimer: "Preliminary indicators only. This result does not verify legitimacy or prove fraud.",
    contentResult,
    urlResult,
    nextSteps: [
      "Do not send money or share OTPs, passwords, or banking credentials under pressure.",
      "Verify the organization using contact details from its independently located official website.",
      "Check relevant official regulator resources yourself; this demo does not perform regulator verification.",
      "Preserve messages and transaction records if you suspect a scam."
    ]
  });
});

app.post("/api/document/extract", upload.single("document"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Upload a PDF or TXT document." });
    const isPdf = req.file.originalname.toLowerCase().endsWith(".pdf") || req.file.mimetype === "application/pdf";
    let extractedText = "";
    if (isPdf) {
      const parsed = await pdf(req.file.buffer);
      extractedText = parsed.text || "";
    } else {
      extractedText = req.file.buffer.toString("utf8");
    }
    if (!extractedText.trim()) return res.status(422).json({ error: "No readable text found. Scanned PDFs may require OCR, which is not included." });
    if (extractedText.length > 30_000) extractedText = extractedText.slice(0, 30_000);
    res.json({
      fileName: req.file.originalname,
      extractedText,
      summary: simplifyDocument(extractedText),
      warning: "Text extraction and explanations are automated and may miss context. Review the original document carefully."
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.code === "LIMIT_FILE_SIZE" ? "File exceeds the 5 MB limit." : "Upload rejected." });
  }
  const message = err?.message === "Only PDF and TXT files are supported." ? err.message : "The request could not be processed.";
  console.error("Request error:", err?.message || "unknown");
  res.status(400).json({ error: message });
});

app.listen(PORT, () => console.log(`NiveshRakshak AI API running at http://localhost:${PORT}`));
