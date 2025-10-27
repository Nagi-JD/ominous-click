// API endpoint to get leaderboard with Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured')
      // Return mock data if not configured
      const mockPlayers = [
        { address: 'Gh3v...9K2p', score: 987654321, rank: 1 },
        { address: 'Xy8a...3Mnq', score: 654321987, rank: 2 },
        { address: 'Abc2...7Pq8', score: 123456789, rank: 3 }
      ]
      return res.status(200).json({ players: mockPlayers, total: 3, limit: 100 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const limit = parseInt(req.query.limit) || 100

    // Get top players from Supabase
    const { data: players, error } = await supabase
      .from('scores')
      .select('address, score, damage_per_click, damage_per_second, timestamp')
      .order('score', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error', details: error.message })
    }

    // Format response with rank
    const formattedPlayers = (players || []).map((p, index) => ({
      address: p.address,
      score: p.score,
      rank: index + 1,
      stats: {
        damagePerClick: p.damage_per_click,
        damagePerSecond: p.damage_per_second
      },
      timestamp: p.timestamp
    }))

    return res.status(200).json({
      players: formattedPlayers,
      total: formattedPlayers.length,
      limit
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

