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
    
    <!-- GitHub Link -->
    <a href="https://github.com/Nagi-JD/ominous-click" target="_blank" rel="noopener noreferrer" class="github-link">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    </a>
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

.github-link {
  position: fixed;
  bottom: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background-color: rgba(253, 166, 25, 0.9);
    transform: scale(1.1);
  }
  
  img {
    width: 24px;
    height: 24px;
    filter: invert(1);
  }
}

</style>
