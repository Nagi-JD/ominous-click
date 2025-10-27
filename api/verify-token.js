// API endpoint to verify token ownership
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { Connection, PublicKey } = await import('@solana/web3.js')
    const { address } = req.body

    if (!address) {
      return res.status(400).json({ error: 'Address is required' })
    }

    // Get token mint from environment
    const tokenMint = process.env.VITE_TOKEN_MINT
    const rpcEndpoint = process.env.VITE_RPC_ENDPOINT || 'https://api.devnet.solana.com'

    if (!tokenMint || tokenMint === 'YOUR_TOKEN_MINT_ADDRESS_HERE') {
      // Token not configured, accept all addresses for testing
      return res.status(200).json({
        hasToken: true,
        address,
        timestamp: Date.now(),
        warning: 'Token not configured, verification skipped'
      })
    }

    // Verify token ownership via RPC
    const conn = new Connection(rpcEndpoint, 'confirmed')
    const publicKey = new PublicKey(address)
    const tokenMintPubkey = new PublicKey(tokenMint)
    
    // Get all token accounts for this address with the specific mint
    const tokenAccounts = await conn.getParsedTokenAccountsByOwner(publicKey, {
      mint: tokenMintPubkey,
    })
    
    // If address has any tokens of this mint, they pass verification
    const hasToken = tokenAccounts.value.length > 0

    return res.status(200).json({
      hasToken,
      address,
      timestamp: Date.now(),
      tokenCount: tokenAccounts.value.length
    })
  } catch (error) {
    console.error('Error verifying token:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

