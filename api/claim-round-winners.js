// API endpoint to claim round winners and reset leaderboard
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured')
      return res.status(500).json({ error: 'Database not configured' })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get top 10 winners
    const { data: winners, error: fetchError } = await supabase
      .from('scores')
      .select('address, total_clicks, score')
      .order('total_clicks', { ascending: false })
      .limit(10)

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return res.status(500).json({ error: 'Failed to fetch winners', details: fetchError.message })
    }

    if (!winners || winners.length === 0) {
      return res.status(200).json({ 
        success: true, 
        winners: [],
        message: 'No winners this round' 
      })
    }

    // TODO: Send rewards to these addresses (you'll implement this with your Solana wallet)
    const rewards = {
      1: 1.0,  // 1 SOL for 1st
      2: 0.5, // 0.5 SOL for 2nd
      3: 0.3, // 0.3 SOL for 3rd
      top10: 0.1 // 0.1 SOL for 4-10
    }

    console.log('🏆 Round Winners:', winners.map((w, i) => ({
      rank: i + 1,
      address: w.address,
      clicks: w.total_clicks,
      reward: i < 3 ? rewards[i + 1] : rewards.top10
    })))

    // Delete all scores to start fresh round
    const { error: deleteError } = await supabase
      .from('scores')
      .delete()
      .neq('id', 0) // Delete all rows

    if (deleteError) {
      console.error('Supabase delete error:', deleteError)
      return res.status(500).json({ error: 'Failed to reset leaderboard', details: deleteError.message })
    }

    return res.status(200).json({
      success: true,
      winners: winners.map((w, i) => ({
        rank: i + 1,
        address: w.address,
        clicks: w.total_clicks,
        reward: i < 3 ? rewards[i + 1] : rewards.top10
      })),
      message: 'Round ended and leaderboard reset'
    })

  } catch (error) {
    console.error('Error processing round winners:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

