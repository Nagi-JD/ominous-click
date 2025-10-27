// API endpoint to submit scores to leaderboard with Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ Supabase credentials not configured!')
  console.error('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.error('SUPABASE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing')
}

export default async function handler(req, res) {
  // Debug: Log environment variables
  console.log('🔍 Debug - Environment variables:')
  console.log('SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.log('SUPABASE_KEY:', supabaseKey ? '✅' : '❌')
  
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
      console.error('❌ Supabase credentials not configured')
      console.error('Check Vercel Environment Variables!')
      return res.status(500).json({ error: 'Database not configured' })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { address, score, stats, timestamp } = req.body

    if (!address || score === undefined) {
      return res.status(400).json({ error: 'Address and score are required' })
    }

    // Upsert (insert or update) le score
    console.log('📊 Submitting score:', { address, score, stats })
    
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

    console.log('✅ Supabase response:', { data, error })

    if (error) {
      console.error('❌ Supabase error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return res.status(500).json({ error: 'Database error', details: error.message })
    }

    // Get rank (position in leaderboard)
    const { data: leaderboardData, error: rankError } = await supabase
      .from('scores')
      .select('address')
      .order('score', { ascending: false })

    if (rankError) {
      console.error('Rank error:', rankError)
    }

    const rank = leaderboardData ? leaderboardData.findIndex(s => s.address === address) + 1 : 1

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
