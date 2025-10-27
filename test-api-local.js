// Script de test pour les API locales
// Lancez avec: node test-api-local.js

const fetch = require('node-fetch')

const API_URL = 'http://localhost:5173/api'

async function testSubmitScore() {
  console.log('🧪 Test submit-score...')
  
  try {
    const response = await fetch(`${API_URL}/submit-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: 'test' + Date.now(),
        score: 12345,
        stats: { damagePerClick: 10, damagePerSecond: 5 }
      })
    })
    
    const data = await response.json()
    console.log('✅ Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function testLeaderboard() {
  console.log('\n🧪 Test leaderboard...')
  
  try {
    const response = await fetch(`${API_URL}/leaderboard`)
    const data = await response.json()
    console.log('✅ Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function testAll() {
  console.log('🚀 Starting API tests...\n')
  await testSubmitScore()
  await testLeaderboard()
  console.log('\n✨ Tests completed!')
}

// Lancer si direct
if (require.main === module) {
  testAll()
}

module.exports = { testSubmitScore, testLeaderboard }

