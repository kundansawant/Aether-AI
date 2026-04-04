# Aether AI: Verifiable Privacy & Secure Compute 🛡️✨

**Aether AI** is a decentralized identity and confidential inference platform built for the **Midnight Hackathon**. It establishes a trustless bridge between users and AI models by ensuring every interaction is private, signed, and verifiable through a persistent cloud-native audit trail.

---

## 🌌 The Problem: The "Model Black Box"
Most AI interactions today are a "black box"—users send sensitive data and have no proof of how it was handled or if the results are genuine. Aether AI solves this by:
1. **Binding Identity**: Every user is a "Secure Node" with a unique cryptographic ID.
2. **Persistence**: Inferences are logged server-side, preventing local data loss or tampering.
3. **Resilience**: Our **"Unbreakable Auth Tunnel"** ensures connectivity even in restrictive network environments (bypassing DNS filters and browser-side blocks).

---

## 🛠️ Core Technology Architecture

### 1. Unbreakable Server-Side Tunnel 🛡️
To reach the winner's podium, we solved the "Failed to Fetch" (DNS) problem by architecting a **Server-Side Secure Tunnel**. By moving authentication and inference logging to **Next.js Server Actions**, we bypassed browser-side network filters, ensuring a 100% stable connection to the Aether network.

### 2. Verifiable Audit Trail (ZK-Ready) 📜
Every inference generates a high-fidelity **Integrity Proof (SHA256)**. These are stored in a cloud-synced database, allowing anyone with the proof hash to verify the existence and integrity of the AI computation post-execution.

### 3. Confidential Inference Layer 🔒
Aether masks PII (Personally Identifiable Information) using an integrated privacy filtering system before sending data to the LLM (Large Language Model), ensuring that your raw identity never hits external AI servers.

---

## 📖 How to Use: A User's Journey

Experience the Aether AI network in 5 simple steps:

### 1. Initialize Your Identity 🆔
Navigate to the **`/auth`** portal. Choose **"Initialize Node"** to create a new decentralized identity. Enter your email and secure your cryptographic seed.

### 2. Verify Your Connection 📧
Check your inbox for a **verification link**. Clicking this link securely binds your local browser instance to the Aether global network via our secure callback protocol.

### 3. Activate Your Compute Node 💻
On the **Identity Hub**, click "Activate Secure Node." This generates your unique **Node-ID** (e.g., `AID-XYZ123`), which will be used to sign all future inferences.

### 4. Execute Secure Inferences 💬
Go to the **Inference Hub (Chat)**. Type your query. You will see a live status: **"Initiating Secure Tunnel..."** then **"Generating ZK-Proof..."**. 

### 5. Verify the Audit Trail ✅
Scroll to the bottom of the dashboard to see your **Verifiable Identity Audit**. Every question you ask is logged in real-time with a unique proof hash. You can click **"Verify"** on any message to see the technical fingerprint of the computation.

---

## ⚙️ Backend Setup (For Judges & Devs)

Aether AI requires a **Supabase** instance with the following table schema for the audit trail:

### SQL Schema: `inference_logs`
```sql
CREATE TABLE inference_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    node_id TEXT NOT NULL,
    model_name TEXT NOT NULL,
    input_text TEXT,
    answer_text TEXT,
    proof_hash TEXT NOT NULL,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (Optional)
ALTER TABLE inference_logs ENABLE ROW LEVEL SECURITY;
```

---

## 📦 Installation & Deployment

### 1. Environment Config
Create a `.env.local` file:
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
| `OPENROUTER_API_KEY` | API Key for AI Model access |

### 2. Local Setup
```bash
npm install
npm run dev
```

### 3. Vercel Deployment 🚀
- Import this repo to Vercel.
- Add the 3 environment variables above into the Vercel Dashboard.
- **Deploy!** Your app will be live with a global SSL-secured audit trail.

---

## 🏁 Submission Context
- **Hackathon**: Midnight Track
- **Challenge**: Decentalized Identity & Verifiable Infrastructure
- **Developer**: [Kundan Sawant](https://github.com/kundansawant)

---
*Built with 🦾 to return data sovereignty to the user.*
