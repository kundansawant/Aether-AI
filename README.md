# Aether AI: Verifiable Privacy & Secure Compute 🛡️✨

**Aether AI** (formerly High Noise) is a high-performance decentralized identity and confidential inference platform built for the **Midnight Hackathon**. It establishes a trustless bridge between users and AI models by ensuring every interaction is private, signed, and verifiable through a persistent audit trail.

---

## 🌌 The Problem: The "Model Black Box"
Most AI interactions today are a "black box"—users send sensitive data and have no proof of how it was handled or if the results are genuine. Aether AI solves this by:
1. **Binding Identity**: Every user is a "Secure Node" with a unique cryptographic ID.
2. **Persistent Audit**: Inferences are logged server-side in a MySQL database, preventing local data loss and providing a verifiable history.
3. **Resilience**: Our **"Unbreakable Auth Tunnel"** ensures connectivity by handling all database and AI processing on the server.

---

## 🛠️ Core Technology Architecture

### 1. 7-Layer Secure Inference Pipeline 🛡️
Every request passes through a rigorous security stack:
- **Layer 1: Input Guard**: Detects PII and prompt injection patterns.
- **Layer 2: Privacy Layer**: Masks sensitive data (emails, keys) before model execution.
- **Layer 3: Model Router**: Selects the optimal model based on query sensitivity.
- **Layer 4: AI Processing**: Executes via OpenRouter with automatic fallback (e.g., to Llama 3.1) if primary providers fail.
- **Layer 5: Verification Layer**: Generates an **Execution Fingerprint (SHA256)** for auditability.
- **Layer 6: Output Guard**: Filters response for safety and toxicity.
- **Layer 7: Server-Side Audit Log**: Persists the transaction to MySQL.

### 2. Midnight Network Integration 🔒
- **Lace Wallet Support**: Securely connect and sign transactions.
- **ZK-Proof Generation**: Uses **Compact** smart contracts to generate Zero-Knowledge proofs of compute integrity.
- **On-Chain Commitments**: Binds inference results to the Midnight ledger for immutable verification.

### 3. MySQL Audit Trail 📜
High-fidelity logging ensures session recovery and post-execution verification. Manage your audit trail via a centralized dashboard.

---

## ⚙️ Backend Setup (MySQL Integration)

Aether AI uses **MySQL** for high-performance logging and authentication.

### SQL Schema
Run this in your MySQL instance to prepare the database:

```sql
CREATE DATABASE IF NOT EXISTS aether_db;
USE aether_db;

-- Table for Audit Logs
CREATE TABLE inference_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    node_id VARCHAR(255),
    model_id VARCHAR(255),
    model_name VARCHAR(255),
    proof_id VARCHAR(255),
    proof_hash TEXT,
    safety_score INT,
    input_text TEXT,
    output_text TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Node Identities
CREATE TABLE identities (
    node_id VARCHAR(255) PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE,
    user_id VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for Users (Custom Auth)
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📦 Installation & Deployment

### 1. Environment Config
Update your `.env.local` file:
| Variable | Description |
| :--- | :--- |
| `MYSQL_HOST` | Database Host (e.g., `localhost`) |
| `MYSQL_USER` | Database User (e.g., `root`) |
| `MYSQL_PASSWORD` | Your MySQL Password |
| `MYSQL_DATABASE` | `aether_db` |
| `MYSQL_PORT` | `3306` |
| `OPENROUTER_API_KEY` | API Key for AI Model access |

### 2. Local Setup
```bash
npm install
npm run dev
```

### 3. Vercel Deployment 🚀
For Vercel, you **must** use a **Cloud MySQL Provider** (e.g., Aiven, Railway, or PlanetScale).

**How to add Environment Variables in Vercel:**
1. Go to your project dashboard on [Vercel](https://vercel.com).
2. Navigate to **Settings** > **Environment Variables**.
3. Add the keys listed in the "Environment Config" table above.
4. Click **Save** and redeploy.

---

## 🏁 Submission Context
- **Hackathon**: Midnight Track
- **Challenge**: Decentalized Identity & Verifiable Infrastructure
- **Developer**: [Kundan Sawant](https://github.com/kundansawant)

---
*Built with 🦾 to return data sovereignty to the user.*
