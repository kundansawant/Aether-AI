# Aether AI: Verifiable Privacy & Secure Compute 🛡️✨

**Aether AI** is a decentralized identity and confidential inference platform built for the **Midnight Hackathon**. It ensures that your AI interactions are private, verifiable, and protected from browser-side interference.

## 🚀 Key Features

- **Unbreakable Auth Tunnel**: A custom server-side authentication flow that bypasses DNS resolution issues and browser extension interference.
- **Verifiable Audit Trail**: Every inference is cryptographically signed and logged to a secure cloud database, providing a trustless execution history.
- **Confidential Inference**: Integrated privacy layers that mask PII (Personally Identifiable Information) before it ever reaches the AI model.
- **ZK-Proof Integration**: SHA256 integrity hashes generated for every response, ensuring "Proof of Compute" for every user query.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide icons.
- **Backend/Auth**: Supabase (Server Actions + Edge Database).
- **AI Engine**: OpenRouter API (Multi-model fallback with Gemma 2.5 & Minimax).
- **Security**: AES-256 equivalent hashing and server-side secret management.

## 📦 Getting Started

### 1. Prerequisite
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENROUTER_API_KEY=your_api_key
```

### 2. Installation
```bash
npm install
npm run dev
```

### 3. Verification
Visit `http://localhost:3000/auth` to initialize your secure Node Identity. 

## 🏆 Submission Context
This project was developed for the **Midnight Track** to showcase how decentralized identity and verifiable computation can solve real-world AI privacy challenges.

---
Built with 🖤 by [Kundan Sawant](https://github.com/kundansawant)
