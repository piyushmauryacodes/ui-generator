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
```
### 2. Setup the Backend (Server)
```bash
cd server
npm install
```
* Create a .env file in the server folder:
```code snippet
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
OPENAI_API_KEY=your_groq_api_key_here
```
* Start the backend: `node index.js`
### 3. Setup the Frontend (Client)
Open a new terminal window and navigate back to the root folder, then:
```bash
cd client
npm install
```
* Create a .env file in the client folder:
```Code snippet
VITE_API_URL=http://localhost:5001
```
### 🌍 Deployment Guide (Go Live)

This project utilizes a split-deployment strategy: Vercel for the frontend and Render for the backend.

Step 1: Deploy Backend on Render
Create a New Web Service on Render and connect your GitHub repo.

Set the Root Directory to `server`.

Build Command: `npm install` | Start Command: `node index.js`.

Add `MONGO_URI` and `OPENAI_API_KEY` to the Environment Variables.

Deploy and copy your live Render URL.

Step 2: Deploy Frontend on Vercel
Import your GitHub repo into Vercel.

Set the Root Directory to `client` and Framework to Vite.

Add an Environment Variable: Key: `VITE_API_URL` | Value: [Your Render URL].

Deploy.
(Note: Ensure your Render backend CORS configuration accepts your new Vercel domain).

### 🤝 Contributing
Feel free to fork this repository and submit pull requests.

### 📄 License
This project is open-source and available under the MIT License.

Developed by Piyush Maurya








