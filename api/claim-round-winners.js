// API endpoint to claim round winners, SAVE HISTORY, and reset leaderboard
// This API is called by GitHub Actions every 5 minutes
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

    // 1. Get current round info
    const { data: currentRound, error: roundError } = await supabase
      .from('current_round')
      .select('*')
      .single()

    const roundNumber = currentRound?.round_number || 1
    const roundStartTime = currentRound?.started_at || new Date()
    const roundEndTime = new Date()

    // 2. Get ALL players in current leaderboard (to save them)
    const { data: allPlayers, error: fetchError } = await supabase
      .from('scores')
      .select('address, total_clicks, score, damage_per_click, damage_per_second, timestamp')
      .order('total_clicks', { ascending: false })

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError)
      return res.status(500).json({ error: 'Failed to fetch players', details: fetchError.message })
    }

    if (!allPlayers || allPlayers.length === 0) {
      console.log('🏆 No players this round - leaderboard was empty')
      
      // Still create a round history entry
      const { error: historyError } = await supabase
        .from('round_history')
        .insert({
          round_number: roundNumber,
          started_at: roundStartTime,
          ended_at: roundEndTime,
          winner_address: null,
          winner_clicks: 0,
          total_players: 0,
          winner_reward: 0
        })
      
      // Update round number for next round
      if (currentRound) {
        await supabase
          .from('current_round')
          .update({
            round_number: roundNumber + 1,
            started_at: roundEndTime
          })
          .eq('id', 1)
      }
      
      return res.status(200).json({ 
        success: true, 
        round: roundNumber,
        winner: null,
        totalPlayers: 0,
        message: 'Round ended with no players' 
      })
    }

    // 3. Identify winner (first player)
    const winner = allPlayers[0]
    const rewardAmount = 1.0 // 1 SOL for the winner (vous pouvez changer ça plus tard)

    console.log('🏆 Round Champion:', {
      round: roundNumber,
      address: winner.address,
      clicks: winner.total_clicks,
      reward: rewardAmount + ' SOL'
    })

    // 4. Save round to history
    const { data: savedRound, error: historyError } = await supabase
      .from('round_history')
      .insert({
        round_number: roundNumber,
        started_at: roundStartTime,
        ended_at: roundEndTime,
        winner_address: winner.address,
        winner_clicks: winner.total_clicks,
        total_players: allPlayers.length,
        winner_reward: rewardAmount
      })
      .select()
      .single()

    if (historyError) {
      console.error('Error saving round history:', historyError)
      // Continue anyway
    }

    // 5. Save ALL players to round_players table
    if (allPlayers.length > 0 && savedRound) {
      const playersToInsert = allPlayers.map((p, index) => ({
        round_id: savedRound.id,
        address: p.address,
        total_clicks: p.total_clicks,
        score: p.score,
        rank: index + 1
      }))
      
      const { error: playersError } = await supabase
        .from('round_players')
        .insert(playersToInsert)

      if (playersError) {
        console.error('Error saving players:', playersError)
      } else {
        console.log(`✅ Saved ${playersToInsert.length} players to round history`)
      }
    }

    // 6. Update round number for next round
    const { error: updateRoundError } = await supabase
      .from('current_round')
      .update({
        round_number: roundNumber + 1,
        started_at: roundEndTime
      })
      .eq('id', 1)

    if (updateRoundError) {
      console.error('Error updating current round:', updateRoundError)
    }

    // 7. Clear leaderboard for next round
    const { error: deleteError } = await supabase
      .from('scores')
      .delete()
      .neq('id', 0) // Delete all rows

    if (deleteError) {
      console.error('Supabase delete error:', deleteError)
      return res.status(500).json({ error: 'Failed to reset leaderboard', details: deleteError.message })
    }

    console.log(`🎉 Round ${roundNumber} completed! Next round: ${roundNumber + 1}`)

    return res.status(200).json({
      success: true,
      round: roundNumber,
      winner: {
        address: winner.address,
        clicks: winner.total_clicks,
        reward: rewardAmount + ' SOL'
      },
      totalPlayers: allPlayers.length,
      savedToHistory: true,
      message: 'Round ended, history saved, leaderboard reset'
    })

  } catch (error) {
    console.error('Error processing round winners:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

