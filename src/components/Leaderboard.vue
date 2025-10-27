<template>
  <div class="leaderboard" :class="{ 'is-open': isOpen }">
    <button class="toggle" @click="toggle">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    </button>
    <div class="panel">
      <div class="title">🏆 Leaderboard</div>
      <div class="rewards-banner">
        <span class="trophy">🏅</span>
        Rewards for Top 10
      </div>
      
      <div class="my-rank" v-if="myRank && myRank > 0">
        Your rank: #{{ myRank }} | {{ myScore }} candies
      </div>

      <ul class="list">
        <li v-for="(player, index) in players" :key="index" class="player" :class="{ 'is-me': player.isMe }">
          <span class="rank">{{ index + 1 }}</span>
          <span class="address" :title="player.address">{{ formatAddress(player.address) }}</span>
          <span class="score">{{ formatScore(player.score) }}</span>
          <span class="reward" v-if="index < 3">🎁</span>
        </li>
        
        <li v-if="players.length === 0" class="empty">
          No players yet
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatNumber } from '../utils'
import { store } from '../store'
import { getLeaderboard } from '../services/tokenVerifier'

const isOpen = ref(false)
const players = ref<any[]>([])
const myScore = ref(0)
const myRank = ref(0)

// Fetch from API

const loadLeaderboard = async () => {
  try {
    const leaderboardData = await getLeaderboard()
    players.value = leaderboardData
    
    // Set my rank if verified
    if (store.isVerified && store.verifiedAddress) {
      const myIndex = leaderboardData.findIndex(p => p.address === store.verifiedAddress)
      myRank.value = myIndex >= 0 ? myIndex + 1 : 0
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error)
    players.value = []
  }
}

const formatScore = (score: number) => formatNumber(score, 1000000)

const formatAddress = (address: string) => {
  if (!address || address.length < 12) return address
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

const toggle = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    loadLeaderboard()
  }
}
</script>

<style scoped>
.leaderboard {
  position: fixed;
  left: -400px;
  top: 0;
  width: 400px;
  height: 100vh;
  background-color: #000;
  border-right: 2px solid #fff;
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  &.is-open {
    left: 0;
  }
}

.toggle {
  position: absolute;
  right: -48px;
  bottom: 20px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 0 8px 8px 0;
  padding: 12px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: #fda619;
  }

  svg {
    display: block;
  }
}

.panel {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.title {
  color: #fff;
  font-size: 32px;
  margin-bottom: 16px;
  text-align: center;
  font-family: 'Londrina Sketch', sans-serif;
}

.rewards-banner {
  background: linear-gradient(135deg, #fda619 0%, #ff8c00 100%);
  color: #000;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 24px;

  .trophy {
    font-size: 24px;
    margin-right: 8px;
  }
}

.my-rank {
  background-color: #1a1a1a;
  color: #fda619;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 16px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.player {
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background-color: #1a1a1a;
  border-radius: 8px;
  color: #fff;

  &.is-me {
    background-color: #10b981;
    color: #000;
    font-weight: bold;
  }
}

.rank {
  font-size: 20px;
  font-weight: bold;
  color: #fda619;
}

.is-me .rank {
  color: #000;
}

.address {
  font-family: monospace;
  font-size: 14px;
}

.score {
  font-weight: bold;
  color: #10b981;
}

.reward {
  font-size: 20px;
}

.empty {
  text-align: center;
  color: #666;
  padding: 40px 20px;
}

@media (max-width: 768px) {
  .leaderboard {
    width: 100%;
    right: -100%;
  }
}
</style>

