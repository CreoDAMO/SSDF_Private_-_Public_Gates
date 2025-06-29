# Sovereign Spiral Development Framework (SSDF) – Private & Public Gates

> 🧬 Sovereign Spiral Ecosystem vΩ.∞ | Governed by Spiral Law (ΩΦ.∞) | Pulse: 735 Hz  
> Issued by: Sovereign Spiral Estate of Iyona’el Mekeda-Kiburion & Jacque Antoine DeGraff  
> License: [Sovereign Spiral Clause v1.0](./LICENSE.txt)  

---

## 🌐 Overview

This monorepo powers the **Sovereign Spiral Ecosystem**, integrating:

1. **Private Gate** (`apps/private-gate`): The secure, sovereign **SSDF Admin Core** (SpiralIDE, QCHAIN control, SpiralMiner).
2. **Public Gate** (`apps/public-gate`): The **SpiralFlow Fintech NFT App** for public users, facilitating fiat-to-TU bridges, UBI/NFT distribution, and SpiralDAO participation.

Both apps are governed by **SpiralBridge** and the **SpiralAPI (SAPI)** for coherent state synchronization.

---

## 🔐 Private Gate (`apps/private-gate`)

The Private Gate is the **Sovereign Admin Interface**, controlling the generation and flow of ∞ Trust Units (TU) through:

- **SpiralIDE**: Dev environment for rendering glyphs, PDFs, and proofs.
- **SpiralMiner**: TU generation engine triggered by harmonic inputs (e.g., Riemann ζ functions).
- **QCHAIN Dashboard**: Logs all transactions, DAO votes, NFT issuance, and debt nullifications.
- **Canonical Governance**: Executes Spiral Canons, Eight Trusts, and ΔHeirNode commands.
- **Gate 777 Control**: Breath-authenticated initiation of UBI flows and debt nullification.

> 📁 Location: `apps/private-gate/`

---

## 🌍 Public Gate (Coming Soon) – SpiralFlow Fintech NFT App

The Public Gate is the **public-facing SpiralFlow** app, designed for:

- Fiat onramps: USD, USDC, BTC via Coinbase/Circle APIs
- TU receipt and redemption via SpiralBridge
- Non-transferable **UBI NFTs** and **Seven Pillars NFTs**
- KYC-compliant onboarding (Persona/Veriff)
- DAO governance (via `TruthProposal.sol`)
- Access to **$SPIRAL utility token** and **SpiralWeb5 wallet**

> 📁 Future Location: `apps/public-gate/`

> 🔄 All actions are harmonically synced to the Private Gate through **SAPI** and **SpiralBridge**.

---

## 🧬 SpiralBridge & SAPI

- **SpiralBridge**: A secured, breath-authenticated bridge for fiat-TU conversion (e.g., `1 BTC → 113 TU`)
- **SpiralAPI (SAPI)**: Secure gateway (tRPC-based) enabling all TU, NFT, and DAO transactions with φ-coherence (1.618).

---

## ⚙️ Tech Stack

- **Frameworks**: Next.js 14, tRPC, Prisma, Supabase, Vite
- **Smart Contracts**: Solidity (Polygon zkEVM), Solana (SPL), `TruthProposal.sol`, `UBINFT.sol`
- **Rendering**: HTSX (Babylon.js), SVG/Three.js for glyph holography
- **Security**: AES-256, zk-SNARKs, DNAΦ biometric auth

---

## 📜 License

This project is governed by the **Sovereign Spiral Clause v1.0**, not traditional IP law.

- ❌ No commercial exploitation without HeirNode approval
- ✅ Personal, non-commercial deployment with φSigil auth
- ✅ Forking, studying, and teaching allowed
- ⚖️ All actions logged to **QSPACE Quantum Ledger**

> See [LICENSE.txt](./LICENSE.txt) for full terms.

---

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/SSDF_Private_-_Public_Gates.git

# Navigate to the Private Gate app
cd apps/private-gate

# Install dependencies
npm install

# Run development server
npm run dev
