# ⚡ UI Generator Agent

The UI Generator Agent is an automated developer tool built to streamline frontend development timelines. It uses an advanced AI planning and generating architecture (powered by Llama 3.3 via Groq) to interpret natural language prompts and output clean, deterministic React components. It features a built-in live preview environment and a version history system.

## 🚀 Features
* **AI-Driven Generation:** Converts text descriptions into functional React JSX using a fixed, deterministic component system.
* **Live Code Preview:** Instantly renders the generated UI components in the browser using `react-live`.
* **Version History:** Automatically saves your prompts, AI reasoning, and generated code to a database for easy retrieval.
* **Monorepo Architecture:** Clean separation of concerns with a Vite/React client and a Node/Express backend.

## 🛠️ Prerequisites
Before running this project, ensure you have the following installed:
* Node.js (v18 or higher)
* Git
* A free MongoDB Atlas Account

## 🔑 Getting Your API Keys & URIs
This project requires a cloud database and an AI API key.

* **Groq API Key (The AI Engine):**
  1. Visit the Groq Cloud Console.
  2. Sign up/Login and click Create API Key.
  3. Copy the key starting with `gsk_`.
* **MongoDB URI (The Database):**
  1. Create a free M0 cluster on MongoDB Atlas.
  2. Set up a Database User and allow network access from anywhere (`0.0.0.0/0`).
  3. Copy your Node.js connection string.

## 💻 Installation Guide (Run Locally)
Follow these steps to run the monorepo on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/piyushmauryacodes/ui-generator-agent.git](https://github.com/piyushmauryacodes/ui-generator-agent.git)
cd ui-generator-agent
