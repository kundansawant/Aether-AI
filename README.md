# Aether AI: Verifiable Privacy & Secure Compute 🛡️✨

**Aether AI** is a decentralized identity and confidential inference platform built for the **Midnight Hackathon**. It establishes a trustless bridge between users and AI models by ensuring every interaction is private, signed, and verifiable through a persistent audit trail.

---

## 🌌 The Problem: The "Model Black Box"
Most AI interactions today are a "black box"—users send sensitive data and have no proof of how it was handled or if the results are genuine. Aether AI solves this by:
1. **Binding Identity**: Every user is a "Secure Node" with a unique cryptographic ID.
2. **Persistence**: Inferences are logged server-side in a local or cloud MySQL database, preventing local data loss.
3. **Resilience**: Our **"Unbreakable Auth Tunnel"** ensures connectivity by handling all database and AI processing on the server.

---

## 🛠️ Core Technology Architecture

### 1. Unbreakable Server-Side Tunnel 🛡️
To reach the winner's podium, we architected a **Server-Side Secure Tunnel**. By moving authentication and inference logging to **Next.js Server Actions**, we bypassed browser-side network filters, ensuring a stable connection to the Aether network.

### 2. MySQL Audit Trail 📜
Every inference generates a high-fidelity **Integrity Proof (SHA256)**. These are stored in a MySQL database, allowing session recovery and post-execution verification.

### 3. Confidential Inference Layer 🔒
Aether masks PII (Personally Identifiable Information) before sending data to the LLM, ensuring raw identity never hits external AI servers.

---

## ⚙️ Backend Setup (MySQL Integration)

Aether AI now uses **MySQL** for high-performance logging and authentication. You can manage the database via **MySQL Workbench**.

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
| `OPENROUTER_API_KEY` | API Key for AI Model access |

### 2. Local Setup
```bash
npm install
npm run dev
```

### 3. Vercel Deployment 🚀
- **Note**: For Vercel, you must use a **Cloud MySQL Provider** (like PlanetScale, Railway, or Aiven) as Vercel cannot connect to your `localhost`.
- Update your Environment Variables in Vercel to point to your cloud instance.
- **Deploy!** Your app will be live with a global secured audit trail.

---

## 🏁 Submission Context
- **Hackathon**: Midnight Track
- **Challenge**: Decentalized Identity & Verifiable Infrastructure
- **Developer**: [Kundan Sawant](https://github.com/kundansawant)

---
*Built with 🦾 to return data sovereignty to the user.*
