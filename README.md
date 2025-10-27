# 👑 PumpKing - Tournament-Based Clicker

> Click-to-Win Solana Tournament • 20% Dev Fees Reward • Every 5 Minutes

[![Vercel](https://img.shields.io/badge/deployed-Vercel-black)](https://pumpking.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A competitive blockchain-based clicker game where the fastest clicker wins 20% of the accumulated dev fees every 5 minutes. Built with Vue 3, TypeScript, and Solana integration.

---

## 🎮 Gameplay

- **Click the pumpkin** to earn candies and climb the leaderboard
- **Buy upgrades** (knife, sword, witch, etc.) to boost your damage
- **Ranked by real clicks only** - no auto-damage cheating
- **Fastest clicker wins** 20% of dev fees every 5 minutes

---

## 🏆 Tournament System

### How It Works

1. **5-Minute Rounds** - Each round lasts exactly 5 minutes
2. **Real-Time Leaderboard** - Ranked by actual clicks (not auto-damage)
3. **Winner Takes 20%** - Top clicker receives 20% of accumulated dev fees
4. **Auto-Resolution** - Rounds resolve automatically via GitHub Actions
5. **Complete History** - All rounds and players are permanently saved

### Anti-Cheat Protection

✅ **Rate limiting** - Max 5 clicks per second  
✅ **Session reset** - Clicks reset on page refresh  
✅ **Click-based ranking** - Only real user clicks count (no auto-damage)  
✅ **Token verification** - Must hold required Solana token to play

---

## 💻 Tech Stack

- **Frontend:** Vue 3 + TypeScript + Vite
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase PostgreSQL
- **Blockchain:** Solana (Helius RPC)
- **Automation:** GitHub Actions (every 5 minutes)
- **Hosting:** Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Solana RPC endpoint

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/pumpking.git
cd pumpking

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

Create `.env.local`:

```env
VITE_TOKEN_MINT=your_token_mint_address
VITE_RPC_ENDPOINT=your_helius_rpc_endpoint
VITE_API_URL=http://localhost:5173
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Database Setup

Run the SQL script in Supabase SQL Editor:

```sql
-- See INSTALL_COMPLET.sql for full database schema
```

---

## 📊 Database Schema

### Tables

- **scores** - Current leaderboard
- **round_history** - All completed rounds
- **round_players** - All players with ranks per round
- **current_round** - Active round tracking

### Key Features

- Automatic round resolution every 5 minutes
- Complete tournament history preservation
- Winner tracking with rewards
- Click-based ranking system

---

## 🤖 Automation

GitHub Actions automatically executes every 5 minutes:

1. Identifies winner (top clicker)
2. Saves all players to history
3. Calculates rewards (20% of dev fees)
4. Clears current leaderboard
5. Starts new round

See `.github/workflows/claim-winners.yml` for details.

---

## 🎯 Key Features

- ✅ **Blockchain Verified** - Solana token ownership required
- ✅ **Competitive Tournaments** - 5-minute rounds with real-time leaderboard
- ✅ **Anti-Cheat System** - Rate limiting and click-based ranking
- ✅ **Automated Rewards** - 20% of dev fees to winners
- ✅ **Complete History** - All rounds and players saved permanently
- ✅ **Real-Time Updates** - Leaderboard refreshes every 10 seconds

---

## 🛡️ Security

- Rate limiting prevents bot farming
- Token ownership verification via Solana RPC
- Session-based click counting (resets on refresh)
- Click-only ranking (auto-damage excluded)

---

## 📈 Architecture

```
Frontend (Vue 3)
    ↓
Backend API (Vercel)
    ↓
Database (Supabase)
    ↓
GitHub Actions (Auto-resolve rounds)
```

---

## 🗺️ Project Structure

```
├── src/
│   ├── components/     # Vue components
│   ├── services/       # API integrations
│   ├── store.ts        # State management
│   └── App.vue         # Main app
├── api/                # Serverless functions
│   ├── verify-token.js
│   ├── submit-score.js
│   ├── leaderboard.js
│   └── claim-round-winners.js
├── .github/
│   └── workflows/      # Automation
└── vercel.json         # Deployment config
```

---

## 🎮 How to Play

1. **Verify Wallet** - Enter your Solana address (must own required token)
2. **Click Pumpkin** - Earn candies and climb the leaderboard
3. **Buy Upgrades** - Increase your damage per click
4. **Win Tournaments** - Top clicker every 5 minutes wins 20% dev fees

---

## 💰 Rewards System

- **Winner receives:** 20% of accumulated dev fees
- **Payout:** Every 5 minutes automatically
- **History:** All winners saved in database
- **Verification:** Winners listed in `round_history` table

---

## 🔧 Development

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 📝 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

- Original Halloween Clicker by [anawan-yt](https://github.com/anawan-yt/halloween-clicker)
- Solana Web3.js
- Helius RPC for reliable blockchain queries
- Vercel for seamless deployment

---

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

---

**Built with ❤️ for the Solana community**

*Click. Win. Reign.* 👑
