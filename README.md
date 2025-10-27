Contract adress of the MEMECOIN : 9HcQHwpiqFces6WPoZddjhYHk7DHipntxF2LGDEnpump



# PumpKing - Tournament-Based Clicker

A competitive blockchain-based clicker game where the fastest clicker wins 20% of accumulated dev fees every 5 minutes. Built with Vue 3, TypeScript, and Solana integration.

## Features

- **Real-time leaderboard** - Ranked by actual user clicks, not auto-damage
- **5-minute tournaments** - Automatic round resolution via GitHub Actions
- **Anti-cheat system** - Rate limiting and session-based click counting
- **Solana integration** - Token ownership verification required
- **Complete history** - All rounds and winners permanently saved
- **Winner rewards** - 20% of dev fees distributed every 5 minutes

## Tech Stack

- Frontend: Vue 3, TypeScript, Vite
- Backend: Vercel Serverless Functions
- Database: Supabase PostgreSQL
- Blockchain: Solana (Helius RPC)
- Automation: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Supabase account
- Solana RPC endpoint

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_TOKEN_MINT=your_token_mint_address
VITE_RPC_ENDPOINT=your_helius_rpc_endpoint
VITE_API_URL=http://localhost:5173
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Database Setup

Run `INSTALL_COMPLET.sql` in Supabase SQL Editor to create all required tables.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/      # Vue components
  ├── services/       # API integrations
  ├── store.ts        # State management
  └── App.vue         # Main application

api/                   # Vercel serverless functions
  ├── verify-token.js
  ├── submit-score.js
  ├── leaderboard.js
  └── claim-round-winners.js

.github/workflows/     # GitHub Actions automation
```

## How It Works

### Tournament System

1. Players click the pumpkin to earn candies and climb the leaderboard
2. Rankings are based on actual user clicks only (no auto-damage)
3. Every 5 minutes, the round automatically resolves
4. Top clicker wins 20% of accumulated dev fees
5. Complete round history is saved to database
6. Leaderboard resets for next round

### Anti-Cheat

- Rate limiting: Maximum 5 clicks per second
- Session reset: Clicks reset on page refresh
- Click-based ranking: Only real user clicks count
- Token verification: Must hold required Solana token

### Automation

GitHub Actions automatically:
- Resolves rounds every 5 minutes
- Identifies the winner (top clicker)
- Saves complete round history
- Distributes rewards
- Resets leaderboard

## Database Schema

- **scores** - Current leaderboard
- **round_history** - Completed rounds with winners
- **round_players** - All players per round with ranks
- **current_round** - Active round tracking

## Deployment

The application is deployed on:
- Frontend: Vercel
- API: Vercel Serverless Functions
- Database: Supabase
- Automation: GitHub Actions

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome. Please see CONTRIBUTING.md for guidelines.

## Acknowledgments

- Original Halloween Clicker by anawan-yt
- Solana Web3.js for blockchain integration
- Helius RPC for reliable blockchain queries
- Vercel for seamless deployment
