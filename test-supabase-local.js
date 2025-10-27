// Test Supabase directement en local
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

console.log('🔍 Testing Supabase connection...')
console.log('URL:', supabaseUrl ? '✅ ' + supabaseUrl.substring(0, 30) + '...' : '❌ Missing')
console.log('KEY:', supabaseKey ? '✅ Set' : '❌ Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ Missing Supabase credentials!')
  console.error('Make sure .env.local exists with:')
  console.error('  SUPABASE_URL=...')
  console.error('  SUPABASE_KEY=...')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSubmit() {
  console.log('\n🧪 Testing submit score...')
  
  const testData = {
    address: 'test-local-' + Date.now(),
    score: 99999,
    damage_per_click: 50,
    damage_per_second: 25
  }
  
  console.log('Sending:', testData)
  
  const { data, error } = await supabase
    .from('scores')
    .upsert(testData, { onConflict: 'address' })
    .select()
  
  if (error) {
    console.error('❌ Error:', error)
    console.error('Details:', JSON.stringify(error, null, 2))
  } else {
    console.log('✅ Success!')
    console.log('Response:', JSON.stringify(data, null, 2))
  }
}

async function testRead() {
  console.log('\n🧪 Testing read leaderboard...')
  
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(10)
  
  if (error) {
    console.error('❌ Error:', error)
  } else {
    console.log('✅ Success!')
    console.log('Records found:', data?.length || 0)
    if (data && data.length > 0) {
      console.log('Data:', JSON.stringify(data, null, 2))
    }
  }
}

async function main() {
  try {
    await testSubmit()
    await testRead()
    console.log('\n✨ Tests completed!')
  } catch (error) {
    console.error('❌ Fatal error:', error)
  }
}

main()

