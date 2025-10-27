// Version avec Supabase - Copiez dans api/submit-score.js après setup

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
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { address, score, stats, timestamp } = req.body

    if (!address || score === undefined) {
      return res.status(400).json({ error: 'Address and score are required' })
    }

    // Upsert (insert or update) le score
    const { data, error } = await supabase
      .from('scores')
      .upsert(
        { 
          address, 
          score,
          damage_per_click: stats?.damagePerClick || 0,
          damage_per_second: stats?.damagePerSecond || 0,
          timestamp: new Date(timestamp || Date.now()).toISOString()
        },
        { 
          onConflict: 'address',
          ignoreDuplicates: false 
        }
      )
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    // Get rank (position in leaderboard)
    const { data: leaderboardData, error: rankError } = await supabase
      .from('scores')
      .select('address')
      .order('score', { ascending: false })

    const rank = leaderboardData.findIndex(s => s.address === address) + 1

    return res.status(200).json({
      success: true,
      address,
      score,
      rank,
      message: 'Score submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting score:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

