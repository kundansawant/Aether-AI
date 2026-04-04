export interface Model {
  id: string;
  remoteId: string;
  name: string;
  description: string;
  category: "NLP" | "Computer Vision" | "Audio" | "Finance" | "Healthcare";
  type: string;
  cost: string;
  accuracy: string;
  latency: string;
  tags: string[];
  stars: number;
  usage: string;
  developer: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  overview: string;
}

export const MODELS: Model[] = [
  {
    id: "aether-ai",
    remoteId: "minimax/minimax-m2.5:free",
    name: "Aether AI Assistant",
    description: "Multi-purpose conversational model trained for secure summarization and reasoning.",
    category: "NLP",
    type: "Text-to-Text",
    cost: "0.05",
    accuracy: "98.2%",
    latency: "1.2s",
    tags: ["Conversational", "Secure", "Verified"],
    stars: 1240,
    usage: "1.2M",
    developer: { name: "Aether Labs", verified: true },
    overview: "The Aether AI Assistant is a high-performance LLM optimized for edge execution. It ensures zero-data leakage by processing all requests within your local node while providing a verifiable ZK-proof of the computation's integrity."
  },
  {
    id: "vision-ocr",
    remoteId: "google/gemma-2-9b-it:free",
    name: "Vision Insight OCR",
    description: "High-precision character recognition for document digitization and analysis.",
    category: "Computer Vision",
    type: "Image-to-Text",
    cost: "0.08",
    accuracy: "99.1%",
    latency: "0.8s",
    tags: ["OCR", "Vision", "Enterprise"],
    stars: 890,
    usage: "450k",
    developer: { name: "Vision Research", verified: true },
    overview: "Vision Insight provides enterprise-grade OCR capabilities. It is designed to handle complex layouts, handwritten text, and low-quality scans with industry-leading precision."
  },
  {
    id: "fraud-predictor",
    remoteId: "mistralai/mistral-7b-instruct:free",
    name: "FraudLens Predictor",
    description: "Real-time anomaly detection for financial transactions and risk assessment.",
    category: "Finance",
    type: "Data-to-Score",
    cost: "0.12",
    accuracy: "97.5%",
    latency: "0.4s",
    tags: ["Finance", "ML", "Security"],
    stars: 560,
    usage: "2.1M",
    developer: { name: "FinSecure", verified: true },
    overview: "FraudLens is a predictive model that identifies patterns indicative of fraudulent activity in real-time financial data streams."
  },
  {
    id: "bio-diagnostics",
    remoteId: "meta-llama/llama-3-8b-instruct:free",
    name: "BioShield Medical",
    description: "Diagnostic assistant for medical imaging and patient report analysis.",
    category: "Healthcare",
    type: "PDF/Report",
    cost: "0.15",
    accuracy: "99.8%",
    latency: "2.5s",
    tags: ["Healthcare", "Diagnostics", "HIPAA Ready"],
    stars: 2300,
    usage: "120k",
    developer: { name: "BioShield Health", verified: true },
    overview: "BioShield delivers state-of-the-art diagnostic insights for healthcare professionals, focusing on clinical precision and patient data anonymity."
  },
  {
    id: "legal-guardian",
    remoteId: "meta-llama/llama-3.1-8b-instruct:free",
    name: "ClauseGuardian",
    description: "Legal contract analysis and risk identification for enterprise agreements.",
    category: "NLP",
    type: "Text Analysis",
    cost: "0.30",
    accuracy: "96.9%",
    latency: "3.2s",
    tags: ["Legal", "Contracts", "NLP"],
    stars: 420,
    usage: "85k",
    developer: { name: "LegalAI Soft", verified: false },
    overview: "ClauseGuardian automates the review of complex legal documents, identifying high-risk clauses and ensuring compliance with regulatory standards."
  },
  {
    id: "echo-audio",
    remoteId: "qwen/qwen-2-7b-instruct:free",
    name: "EchoShield Audio",
    description: "Secure speech-to-text transcription with speaker identification.",
    category: "Audio",
    type: "Audio-to-Text",
    cost: "0.15",
    accuracy: "95.5%",
    latency: "1.5s",
    tags: ["Audio", "Transcription", "Speaker ID"],
    stars: 310,
    usage: "300k",
    developer: { name: "Echo Dynamics", verified: true },
    overview: "EchoShield provides secure audio processing for meetings, interviews, and recordings, maintaining complete acoustic privacy."
  }
];
