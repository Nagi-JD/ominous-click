<template>
  <div class="address-input" v-if="!verified">
    <input 
      v-model="address" 
      type="text" 
      placeholder="Your Solana address (ex: Gh3v...9K2p)"
      class="input"
    />
    <button class="verify-btn" @click="verifyAddress" :disabled="verifying || !address">
      {{ verifying ? 'Verifying...' : 'Verify' }}
    </button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">
      ✓ Address verified! You can play.
    </div>
  </div>
  
  <div class="verified-badge" v-else>
    <span class="address-display">{{ shortenedAddress }}</span>
    <button class="change-btn" @click="changeAddress">Change</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { store, UPGRADES } from '../store'
import { verifyTokenOwnership } from '../services/tokenVerifier'

const address = ref('')
const verified = ref(false)
const verifying = ref(false)
const error = ref('')
const success = ref(false)

// Load verification status from store on mount
onMounted(() => {
  if (store.isVerified && store.verifiedAddress) {
    verified.value = true
    address.value = store.verifiedAddress
  }
})

// Sync with store when verification changes
watch(() => store.isVerified, (isVerified) => {
  verified.value = isVerified
})

watch(() => store.verifiedAddress, (addr) => {
  if (addr) {
    address.value = addr
  }
})

const shortenedAddress = computed(() => {
  if (!address.value) return ''
  return `${address.value.slice(0, 4)}...${address.value.slice(-4)}`
})

const verifyAddress = async () => {
  verifying.value = true
  error.value = ''
  success.value = false
  
  try {
    // Verification simulation - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // TODO: Call API to verify address has the required token
    const hasToken = await checkTokenOwnership(address.value)
    
    if (hasToken) {
      verified.value = true
      success.value = true
      // Save to store
      store.verifiedAddress = address.value
      store.isVerified = true
      store.saveData() // Persist to localStorage
    } else {
      error.value = 'This address does not own the required token'
    }
  } catch (err) {
    error.value = 'Error during verification'
    console.error(err)
  } finally {
    verifying.value = false
  }
}

const checkTokenOwnership = async (addr: string): Promise<boolean> => {
  // Basic address validation
  if (addr.length < 32 || addr.length > 44) {
    return false
  }
  
  // Verify token ownership
  return await verifyTokenOwnership(addr)
}

const changeAddress = () => {
  verified.value = false
  address.value = ''
  store.isVerified = false
  store.verifiedAddress = ''
  // Reset all game stats for new address
  store.count = 0
  store.damagePerClick = 1
  store.damagePerSecond = 0
  store.totalClicks = 0
  store.upgrades = Array(UPGRADES.length).fill(0)
  store.saveData() // Persist the change
}
</script>

<style scoped>
.address-input {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  z-index: 200;
}

.input {
  padding: 16px 20px;
  border-radius: 8px;
  border: 2px solid #fda619;
  background-color: #000;
  color: #fda619;
  font-size: 18px;
  width: 100%;
  font-family: monospace;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
  
  &::placeholder {
    color: #fda619;
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
    border-color: #ffbb33;
    box-shadow: 0 0 10px rgba(253, 166, 25, 0.5);
  }
}

.verify-btn {
  background-color: #fda619;
  color: #000;
  border: 0;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  
  &:hover:not(:disabled) {
    background-color: #ffbb33;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.error {
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}

.success {
  color: #10b981;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}

.verified-badge {
  background-color: #10b981;
  color: #fff;
  padding: 14px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: fixed;
  bottom: 16px;
  right: 16px;
  font-size: 16px;
  z-index: 200;
  
  .address-display {
    font-family: monospace;
    font-weight: bold;
    font-size: 16px;
  }
  
  .change-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 0;
    padding: 6px 16px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>

