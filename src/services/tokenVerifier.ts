import { Connection, PublicKey } from '@solana/web3.js'
import { CONFIG } from '../config'

const connection = new Connection(CONFIG.RPC_ENDPOINT, 'confirmed')

/**
 * Vérifie si une adresse Solana possède le token requis
 */
export async function verifyTokenOwnership(address: string): Promise<boolean> {
  try {
    const publicKey = new PublicKey(address)
    const tokenMint = new PublicKey(CONFIG.REQUIRED_TOKEN_MINT)
    
    // Obtenir tous les tokens de l'adresse
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      mint: tokenMint,
    })
    
    // Vérifier si l'adresse possède au moins un token
    return tokenAccounts.value.length > 0
  } catch (error) {
    console.error('Error verifying token ownership:', error)
    return false
  }
}

/**
 * Vérifie l'adresse pour voir si elle a le token via une API backend
 * Utile si vous avez un backend qui cache ces données
 */
export async function verifyTokenOwnershipViaAPI(address: string): Promise<boolean> {
  try {
    const response = await fetch(`${CONFIG.API_URL}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    })
    
    const data = await response.json()
    return data.hasToken
  } catch (error) {
    console.error('Error verifying via API:', error)
    return false
  }
}

/**
 * Soumet un score au leaderboard
 */
export async function submitScore(
  address: string, 
  score: number, 
  stats: { damagePerClick: number; damagePerSecond: number; totalClicks?: number }
): Promise<boolean> {
  try {
    const response = await fetch(`${CONFIG.API_URL}/api/submit-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        address, 
        score, 
        stats,
        totalClicks: stats.totalClicks || 0,
        timestamp: Date.now() 
      }),
    })
    
    return response.ok
  } catch (error) {
    console.error('Error submitting score:', error)
    return false
  }
}

/**
 * Récupère le leaderboard
 */
export async function getLeaderboard(): Promise<any[]> {
  try {
    const response = await fetch(`${CONFIG.API_URL}/api/leaderboard?limit=${CONFIG.LEADERBOARD_LIMIT}`)
    const data = await response.json()
    return data.players || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

