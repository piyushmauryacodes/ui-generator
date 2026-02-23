/* server/index.js */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({
  origin: 'https://vercel.com/piyushmauryacodes-projects/ui-generator',
  credentials: true
})); 
app.use(express.json());

// Absolute log path
const LOG_FILE = path.join(__dirname, 'server_error_absolute.log');

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- DEBUGGING ---
console.log("Checking Environment...");
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ FATAL: OPENAI_API_KEY is missing from .env!");
  // process.exit(1); // Don't exit, just log
} else {
  console.log("✅ API Key found starting with:", process.env.OPENAI_API_KEY.substring(0, 5));
}
// -----------------

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const VersionSchema = new mongoose.Schema({
  prompt: String,
  plan: String,
  code: String,
  explanation: String,
  timestamp: { type: Date, default: Date.now }
});
const Version = mongoose.model('Version', VersionSchema);

// 2. AI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const SYSTEM_PROMPT = `
You are a React UI Generator. You strictly adhere to a FIXED Component System.
You MUST use these components:
<Container>, <Card title="" footer="">, <Button variant="primary|secondary|danger">, <Input label="">, <Alert type="info|success|warning">, <Row>, <Col>
RULES:
1. Return ONLY the JSX code. No markdown, no \`\`\`.
2. Do NOT include import statements or 'export default'.
`;

app.post('/api/generate', async (req, res) => {
  const { userPrompt, currentCode } = req.body;

  try {
    console.log("🤖 Agent Step 1: Planning...");

    // STEP 1: PLANNER
    const planResponse = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a UI Architect. Create a brief 3-step plan." },
        { role: "user", content: userPrompt }
      ]
    }).catch(e => {
      throw new Error(`PLANNING FAILED: ${e.message}`);
    });

    const plan = planResponse.choices[0]?.message?.content || "No plan generated";

    console.log("🤖 Agent Step 2: Generating Code...");

    // STEP 2: GENERATOR
    const codeResponse = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `PLAN: ${plan}\nCURRENT CODE: ${currentCode}\nUSER REQUEST: ${userPrompt}\nGenerate JSX:` }
      ]
    }).catch(e => {
      throw new Error(`GENERATION FAILED: ${e.message}`);
    });

    let generatedCode = codeResponse.choices[0]?.message?.content || "";
    // Clean markdown if AI adds it despite instructions
    generatedCode = generatedCode.replace(/```jsx/g, '').replace(/```/g, '').trim();

    console.log("🤖 Agent Step 3: Explaining...");

    // STEP 3: EXPLAINER
    const explainResponse = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Explain in 1 sentence why you chose these components." },
        { role: "user", content: `Request: ${userPrompt}` }
      ]
    }).catch(e => {
      throw new Error(`EXPLANATION FAILED: ${e.message}`);
    });

    const explanation = explainResponse.choices[0]?.message?.content || "Generated successfully";

    // Save Version
    const newVersion = new Version({
      prompt: userPrompt,
      plan,
      code: generatedCode,
      explanation
    });
    await newVersion.save();

    res.json({ plan, code: generatedCode, explanation, versionId: newVersion._id });

  } catch (error) {
    // THIS LOG IS CRITICAL
    try {
      const errMsg = `[${new Date().toISOString()}] ERROR: ${error.message}\nSTACK: ${error.stack}\n\n`;
      fs.appendFileSync(LOG_FILE, errMsg);
    } catch (logErr) {
      console.error("LOGGING FAILED", logErr);
    }
    console.error("❌ AI GENERATION ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/versions', async (req, res) => {
  try {
    const versions = await Version.find().sort({ timestamp: -1 }).limit(10);
    res.json(versions);
  } catch (err) {
    res.status(500).json({ error: "DB Fetch Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));