require('dotenv').config();
const { OpenAI } = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const baseURL = "https://api.groq.com/openai/v1";

console.log(`Using BaseURL: ${baseURL}`);
console.log(`Using API Key: ${apiKey ? apiKey.substring(0, 8) + '...' : 'MISSING'}`);

const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL
});

async function listModels() {
    try {
        const list = await openai.models.list();
        const ids = list.data.map(m => m.id);
        const fs = require('fs');
        fs.writeFileSync('models.txt', ids.join('\n'));
        console.log("Written to models.txt");
        console.log("First 5 IDs:", ids.slice(0, 5));
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
