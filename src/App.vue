<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { store, UPGRADES } from './store'
import Pumpkin from './components/Pumpkin.vue'
import HUD from './components/HUD.vue'
import WalletButton from './components/WalletButton.vue'
import Leaderboard from './components/Leaderboard.vue'

store.loadData()

// Submit final score when user leaves
const handleBeforeUnload = () => {
  if (store.isVerified && store.totalClicks > 0) {
    store.submitToLeaderboard() // Sync to server
  }
}

// Submit on page visibility change (minimize, close tab, etc)
const handleVisibilityChange = () => {
  if (document.hidden && store.isVerified && store.totalClicks > 0) {
    store.submitToLeaderboard() // Sync to server
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="game">
    <HUD />
    <Leaderboard />
    
    <!-- Message de félicitations -->
    <div class="congrats" :class="{ offset: store.isShopOpened, show: store.upgrades[UPGRADES.length - 1] === 1 }">
      Happy Halloween
    </div>
    
    <!-- Halloween verification message -->
    <div v-if="!store.isVerified" class="halloween-message">
      <h2>🎃 Halloween</h2>
      <p>Verify that u are ready to fight pumpkin demon by verifying ur Solana address</p>
      <div class="instructions">
        <p class="warning">Only token owner can fight pumpkin demon</p>
        <p class="arrow">↓ Your Solana address below ↓</p>
      </div>
    </div>
    
    <WalletButton />
    
    <Pumpkin />
  </div>
</template>

<style>
body {
  background-color: #000;
  height: 100svh;
  overflow: hidden;
}

.game {
  height: 100svh;
  user-select: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  background: url(assets/img/bg-forest.svg) center center / cover no-repeat;
}

.congrats {
  color: #fff;
  font-family: 'Londrina Sketch', sans-serif;
  font-size: 48px;
  line-height: 1;
  padding: 8px 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 20;
  border-radius: 8px;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  background-color: #000;
  animation: flickering 2s infinite linear;
  transition: transform 0.3s ease-in-out;
  display: none;

  &.show {
    display: block;
  }

  @media (min-width: 768px) {
    font-size: 76px;
    padding: 16px 32px;

    &.offset {
      transform: translate(-67%, -50%);
    }
  }
}

@keyframes flickering {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

.halloween-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  text-align: center;
  pointer-events: none;
  
  h2 {
    font-size: 64px;
    font-family: 'Londrina Sketch', sans-serif;
    color: #fda619;
    margin-bottom: 20px;
    animation: flickering 2s infinite linear;
    text-shadow: 0 0 20px rgba(253, 166, 25, 0.5);
  }
  
  p {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  }
  
  .instructions {
    margin-top: 30px;
    
    .warning {
      color: #fda619;
      font-size: 18px;
      font-weight: bold;
    }
    
    .arrow {
      color: #fff;
      font-size: 16px;
      margin-top: 10px;
      font-weight: normal;
    }
  }
}

</style>
