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

    // Get ONLY the 1st place winner
    const { data: winner, error: fetchError } = await supabase
      .from('scores')
      .select('address, total_clicks, score')
      .order('total_clicks', { ascending: false })
      .limit(1)

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return res.status(500).json({ error: 'Failed to fetch winner', details: fetchError.message })
    }

    if (!winner || winner.length === 0) {
      console.log('🏆 No winner this round - leaderboard was empty')
      // Still clear the leaderboard even if empty
      const { error: deleteError } = await supabase
        .from('scores')
        .delete()
        .neq('id', 0)
      
      return res.status(200).json({ 
        success: true, 
        winner: null,
        message: 'No winner this round - leaderboard was empty' 
      })
    }

    const champion = winner[0]
    const rewardAmount = 1.0 // 1 SOL for the winner

    console.log('🏆 Round Champion:', {
      address: champion.address,
      clicks: champion.total_clicks,
      reward: rewardAmount + ' SOL'
    })

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
      winner: {
        address: champion.address,
        clicks: champion.total_clicks,
        reward: rewardAmount + ' SOL'
      },
      message: 'Round ended and leaderboard reset'
    })

  } catch (error) {
    console.error('Error processing round winners:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

