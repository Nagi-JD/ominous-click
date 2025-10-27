// Configuration de l'application

export const CONFIG = {
  // Token requis pour jouer (remplacez par votre vrai mint address)
  REQUIRED_TOKEN_MINT: import.meta.env.VITE_TOKEN_MINT || 'VOTRE_TOKEN_MINT_ADDRESS',
  
  // RPC Endpoint (utilisez Helius gratuit ou devnet)
  RPC_ENDPOINT: import.meta.env.VITE_RPC_ENDPOINT || 'https://mainnet.helius-rpc.com/?api-key=917e1df6-fac1-44e1-8338-f21346903851',
  
  // API Backend
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Leaderboard config
  LEADERBOARD_LIMIT: 100,
  TOP_REWARD_COUNT: 10,
  
  // Rewards (en SOL)
  REWARDS: {
    FIRST: 1.0,      // 1 SOL pour la 1ère place
    SECOND: 0.5,     // 0.5 SOL pour la 2ème
    THIRD: 0.3,      // 0.3 SOL pour la 3ème
    TOP10: 0.1,      // 0.1 SOL pour places 4-10
  },
  
  // Game config
  AUTO_SAVE_INTERVAL: 30000, // Auto-save toutes les 30 secondes
  LEADERBOARD_REFRESH_INTERVAL: 60000, // Refresh leaderboard toutes les minutes
}

