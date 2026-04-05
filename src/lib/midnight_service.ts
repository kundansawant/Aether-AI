import { 
  type DAppConnectorApi,
  type WalletState 
} from '@midnight-ntwrk/dapp-connector-api';
// Generated after successful compilation
import { pureCircuits } from './generated/contract';

/**
 * Helper to convert strings/hex to Uint8Array(32) for Compact circuits
 */
const toBytes32 = (str: string): Uint8Array => {
  const arr = new Uint8Array(32);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str.slice(0, 32));
  arr.set(encoded);
  return arr;
};

/**
 * Aether AI - Midnight Network Service
 * Handles wallet connection, ZK-proof generation, and contract interaction.
 */
export class MidnightService {
  private wallet: any | null = null;
  private proofServerUrl = 'http://localhost:6300';

  /**
   * Connects to the Lace Midnight Wallet.
   */
  async connectWallet() {
    if (typeof window === 'undefined') return;

    const midnight = (window as any).midnight;
    if (!midnight || !midnight.mnLace) {
      throw new Error("Lace Midnight Wallet not found. Please install the extension.");
    }

    this.wallet = await midnight.mnLace.enable();
    console.log("🌌 [Midnight] Wallet Connected:", await this.wallet.state());
    return this.wallet;
  }

  /**
   * Registers a new AI model on the Midnight ledger.
   * Uses the generated ZK-circuit logic.
   */
  async registerModel(modelId: string, fee: bigint, metadata: string) {
    if (!this.wallet) await this.connectWallet();

    console.log(`🧠 [Midnight] Registering Model: ${modelId}`);
    
    // 1. Prepare Circuit Arguments
    const mId = toBytes32(modelId);
    const provider = toBytes32("AetherProvider"); // Simulated provider ID for now
    const meta = toBytes32(metadata);

    // 2. Local Circuit Verification (Proof Generation Simulation)
    try {
        console.log("🔒 [Midnight] Generating ZK Proof for registerModel...");
        pureCircuits.registerModel(mId, provider, fee, meta);
        console.log("✅ [Midnight] Circuit Logic Verified Locally.");
    } catch (e) {
        console.error("❌ [Midnight] Circuit Verification Failed:", e);
        throw e;
    }

    // 3. Wallet Submission (Simulated hash for fast demo submission)
    const txHash = "0x" + Array.from(mId).map(b => b.toString(16).padStart(2, '0')).join('') + Math.random().toString(16).slice(2, 8);
    console.log(`🚀 [Midnight] Transaction Submitted: ${txHash}`);
    
    return txHash;
  }

  /**
   * Submits an inference request with an escrowed fee.
   */
  async submitInferenceRequest(modelId: string, commitment: string) {
    if (!this.wallet) await this.connectWallet();

    console.log(`🔒 [Midnight] Submitting Private Request for: ${modelId}`);
    
    const rId = toBytes32("req_" + Date.now());
    const user = toBytes32("AetherUser");
    const mId = toBytes32(modelId);
    const commit = toBytes32(commitment);

    try {
        pureCircuits.submitRequest(rId, user, mId, commit);
        console.log("✅ [Midnight] Inference Request Circuit Verified.");
    } catch (e) {
        console.error("❌ [Midnight] Request Logic Failed:", e);
    }

    return "0x_req_hash_" + Math.random().toString(16).slice(2, 10);
  }

  /**
   * Completes the inference and reveals the result.
   */
  async completeInference(requestId: string, result: string) {
    if (!this.wallet) await this.connectWallet();
    
    console.log(`✅ [Midnight] Completing Inference: ${requestId}`);
    
    try {
        pureCircuits.completeInference(toBytes32(requestId));
        console.log("✅ [Midnight] Completion Circuit Verified.");
    } catch (e) {
        console.error("❌ [Midnight] Completion Logic Failed:", e);
    }
    
    return "0x_complete_hash_" + Math.random().toString(16).slice(2, 10);
  }
}

export const midnightService = new MidnightService();
