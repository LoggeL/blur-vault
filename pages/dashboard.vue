<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8 font-orbitron text-primary">
      Image Protection Dashboard
    </h1>

    <!-- Credits display -->
    <div class="stats shadow bg-neutral border border-primary/30 mb-8">
      <div class="stat">
        <div class="stat-figure text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        </div>
        <div class="stat-title text-base-content/70">Available Credits</div>
        <div class="stat-value text-accent">{{ userCredits }}</div>
        <div class="stat-desc text-base-content/60">1 image = 1 credit</div>
      </div>
    </div>

    <!-- No credits warning -->
    <div v-if="userCredits <= 0" class="alert alert-warning mb-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <div>
        <h3 class="font-bold">Out of Credits!</h3>
        <div class="text-xs">
          You've used all your image processing credits.
        </div>
      </div>
    </div>

    <!-- Image Upload Section -->
    <div
      class="card bg-neutral shadow-xl border border-primary/30 mb-8 overflow-hidden"
    >
      <div class="card-body">
        <h2 class="card-title text-primary font-orbitron mb-4">Upload Image</h2>

        <div
          v-if="isProcessing"
          class="flex flex-col items-center justify-center p-8"
        >
          <div
            class="loading loading-spinner loading-lg text-accent mb-4"
          ></div>
          <p class="text-accent animate-pulse">PROCESSING IMAGE...</p>
        </div>

        <div v-else-if="!processedImageUrl" class="upload-area">
          <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer',
              isDragging
                ? 'border-accent bg-accent/10'
                : 'border-primary/50 hover:border-primary/80 hover:bg-primary/5',
            ]"
            @click="$refs.fileInput.click()"
          >
            <input
              type="file"
              ref="fileInput"
              @change="handleFileInput"
              accept="image/*"
              class="hidden"
              :disabled="userCredits <= 0"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 mx-auto mb-4 text-primary/80"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>

            <h3 class="text-xl font-orbitron mb-2 text-accent">
              Drag & Drop or Click to Upload
            </h3>
            <p class="text-base-content/70">
              Upload an image to detect and blur faces
            </p>
            <p v-if="userCredits <= 0" class="text-error mt-2">
              You need credits to process images
            </p>
          </div>

          <div v-if="uploadError" class="alert alert-error mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ uploadError }}</span>
          </div>
        </div>

        <!-- Result Section -->
        <div v-else class="result-section">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Original Image Preview -->
            <div class="card bg-base-100 shadow-xl border border-primary/30">
              <div class="card-body">
                <h3 class="card-title text-base-content font-orbitron">
                  Original Image
                </h3>
                <figure class="mt-4">
                  <img
                    :src="originalImageUrl"
                    alt="Original image"
                    class="rounded-lg max-h-96 object-contain mx-auto"
                  />
                </figure>
              </div>
            </div>

            <!-- Processed Image Preview -->
            <div class="card bg-base-100 shadow-xl border border-accent/30">
              <div class="card-body">
                <h3 class="card-title text-accent font-orbitron">
                  Protected Image
                </h3>
                <figure class="mt-4">
                  <img
                    :src="processedImageUrl"
                    alt="Processed image with blurred faces"
                    class="rounded-lg max-h-96 object-contain mx-auto"
                  />
                </figure>
                <div class="card-actions justify-end mt-4">
                  <button @click="downloadImage" class="btn btn-accent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 mr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-8">
            <button @click="resetImage" class="btn btn-outline btn-primary">
              Process Another Image
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Processing History -->
    <div
      class="card bg-neutral shadow-xl border border-primary/30 overflow-hidden"
    >
      <div class="card-body">
        <h2 class="card-title text-primary font-orbitron mb-4">
          Processing History
        </h2>

        <div
          v-if="processingHistory.length === 0"
          class="text-center py-8 text-base-content/70"
        >
          <p>No processing history yet.</p>
          <p>Upload an image to get started!</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Date</th>
                <th>Image</th>
                <th>Faces Detected</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in processingHistory" :key="index">
                <td>{{ formatDate(item.timestamp) }}</td>
                <td>
                  <img
                    :src="item.thumbnailUrl"
                    alt="Thumbnail"
                    class="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{{ item.facesDetected }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import * as faceapi from 'face-api.js'
import download from 'downloadjs'

// Auth and database
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Redirect if user is not logged in
watchEffect(() => {
  if (user.value === null) {
    router.push('/login')
  }
})

// State
const userCredits = ref(5) // Default 5 credits
const isProcessing = ref(false)
const isDragging = ref(false)
const uploadError = ref('')
const originalImageUrl = ref(null)
const processedImageUrl = ref(null)
const processingHistory = ref([])
const fileInput = ref(null)

// Load face detection models
onMounted(async () => {
  isProcessing.value = true
  try {
    // Create models directory if it doesn't exist
    const modelsPath = '/models'

    // Only load the tiny face detector model which is sufficient for our needs
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath)
    console.log('TinyFaceDetector model loaded successfully')

    // No need for these additional models for basic face detection
    // await faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath);
    // await faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath);

    await fetchUserCredits()
    await fetchProcessingHistory()
  } catch (error) {
    console.error('Error loading face detection models:', error)
    uploadError.value =
      'Failed to load face detection models. Please check your internet connection and refresh the page.'
  } finally {
    isProcessing.value = false
  }
})

// Fetch user credits
const fetchUserCredits = async () => {
  if (!user.value) return

  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.value.id)
      .single()

    if (error) {
      console.error('Error fetching user credits:', error)
      // If the table doesn't exist yet, initialize it
      if (error.code === '42P01') {
        await initializeUserCredits()
      }
      return
    }

    if (data) userCredits.value = data.credits
  } catch (error) {
    console.error('Error fetching user credits:', error)
  }
}

// Initialize user credits if not exists
const initializeUserCredits = async () => {
  if (!user.value) return

  try {
    // Check if we need to create the user_credits record
    const { data, error } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        credits: 5, // Default starting credits
        is_admin: false,
      },
    ])

    if (error) throw error
    userCredits.value = 5 // Set default credits
    console.log('User credits initialized successfully')
  } catch (error) {
    console.error('Error initializing user credits:', error)
  }
}

// Fetch processing history
const fetchProcessingHistory = async () => {
  if (!user.value) return

  try {
    const { data, error } = await supabase
      .from('processing_history')
      .select('*')
      .eq('user_id', user.value.id)
      .order('timestamp', { ascending: false })
      .limit(10)

    if (error) throw error
    if (data) processingHistory.value = data
  } catch (error) {
    console.error('Error fetching processing history:', error)
  }
}

// Update user credits
const updateUserCredits = async () => {
  if (!user.value) return { error: 'User not authenticated' }

  try {
    const { data, error } = await supabase
      .from('user_credits')
      .update({ credits: userCredits.value })
      .eq('user_id', user.value.id)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating user credits:', error)
    return { data: null, error }
  }
}

// Add processing history entry
const addProcessingHistoryEntry = async (facesDetected, thumbnailUrl) => {
  if (!user.value) return { error: 'User not authenticated' }

  try {
    const { data, error } = await supabase.from('processing_history').insert([
      {
        user_id: user.value.id,
        timestamp: new Date().toISOString(),
        faces_detected: facesDetected,
        thumbnail_url: thumbnailUrl,
      },
    ])

    if (error) throw error

    // Refresh history
    await fetchProcessingHistory()
    return { data, error: null }
  } catch (error) {
    console.error('Error adding processing history entry:', error)
    return { data: null, error }
  }
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// File input handler
const handleFileInput = (event) => {
  const file = event.target.files[0]
  if (file) processFile(file)
}

// Drag and drop handler
const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) processFile(file)
}

// Process the uploaded file
const processFile = async (file) => {
  // Check if user has credits
  if (userCredits.value <= 0) {
    uploadError.value = 'You have no credits left to process images.'
    return
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    uploadError.value = 'Please upload an image file.'
    return
  }

  // Clear previous error
  uploadError.value = ''
  isProcessing.value = true

  try {
    // Create URL for original image
    originalImageUrl.value = URL.createObjectURL(file)

    // Load image for processing
    const img = await createImageElement(originalImageUrl.value)

    // Detect faces
    const detections = await faceapi.detectAllFaces(
      img,
      new faceapi.TinyFaceDetectorOptions()
    )

    // If no faces detected
    if (detections.length === 0) {
      uploadError.value = 'No faces detected in the image.'
      isProcessing.value = false
      return
    }

    // Process image (blur faces)
    const processedImage = await blurFaces(img, detections)
    processedImageUrl.value = processedImage

    // Deduct credit - ensure this happens
    userCredits.value -= 1
    const updateResult = await updateUserCredits()

    if (updateResult.error) {
      console.error('Error updating credits:', updateResult.error)
      uploadError.value = 'Error updating credits. Please try again.'
      return
    }

    // Create thumbnail for history
    const thumbnail = await createThumbnail(processedImage)

    // Add to history - ensure this happens
    const historyResult = await addProcessingHistoryEntry(
      detections.length,
      thumbnail
    )

    if (historyResult.error) {
      console.error('Error adding to history:', historyResult.error)
      // If the table doesn't exist yet, try to create it
      if (historyResult.error.code === '42P01') {
        await initializeProcessingHistory(detections.length, thumbnail)
      } else {
        uploadError.value =
          'Error updating processing history. Please try again.'
      }
    }
  } catch (error) {
    console.error('Error processing image:', error)
    uploadError.value = 'Error processing image. Please try again.'
  } finally {
    isProcessing.value = false
  }
}

// Initialize processing history table if needed
const initializeProcessingHistory = async (facesDetected, thumbnailUrl) => {
  if (!user.value) return

  try {
    // Try to create the processing_history table and add the first entry
    const { data, error } = await supabase.rpc('ensure_tables_exist')

    if (error) throw error

    // Try adding the entry again
    await addProcessingHistoryEntry(facesDetected, thumbnailUrl)
    console.log('Processing history initialized successfully')
  } catch (error) {
    console.error('Error initializing processing history:', error)
  }
}

// Create image element from URL
const createImageElement = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

// Blur faces in the image
const blurFaces = async (img, detections) => {
  // Create canvas
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  // Set canvas dimensions
  canvas.width = img.width
  canvas.height = img.height

  // Draw original image
  context.drawImage(img, 0, 0, img.width, img.height)

  // Apply blur to each face
  detections.forEach((detection) => {
    const { x, y, width, height } = detection.box

    // Add padding to make sure we catch the whole face
    const paddingX = width * 0.1
    const paddingY = height * 0.1
    const blurX = Math.max(0, x - paddingX)
    const blurY = Math.max(0, y - paddingY)
    const blurWidth = width + paddingX * 2
    const blurHeight = height + paddingY * 2

    // Apply blur effect (using multiple passes for stronger effect)
    for (let i = 0; i < 15; i++) {
      context.filter = 'blur(8px)'
      context.drawImage(
        canvas,
        blurX,
        blurY,
        blurWidth,
        blurHeight,
        blurX,
        blurY,
        blurWidth,
        blurHeight
      )
    }

    // Reset filter
    context.filter = 'none'

    // Draw a semi-transparent overlay for cyberpunk effect
    context.fillStyle = 'rgba(0, 251, 255, 0.1)'
    context.fillRect(blurX, blurY, blurWidth, blurHeight)

    // Remove the border outline as requested
    // context.strokeStyle = '#ff4ecd';
    // context.lineWidth = 2;
    // context.strokeRect(blurX, blurY, blurWidth, blurHeight);
  })

  // Return data URL of processed image
  return canvas.toDataURL('image/jpeg', 0.9)
}

// Create thumbnail for history
const createThumbnail = async (dataUrl) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Set thumbnail size
      canvas.width = 100
      canvas.height = 100

      // Calculate aspect ratio
      const aspectRatio = img.width / img.height

      // Draw image centered and cropped
      let sourceX, sourceY, sourceWidth, sourceHeight

      if (aspectRatio > 1) {
        // Landscape
        sourceHeight = img.height
        sourceWidth = img.height
        sourceX = (img.width - sourceWidth) / 2
        sourceY = 0
      } else {
        // Portrait
        sourceWidth = img.width
        sourceHeight = img.width
        sourceX = 0
        sourceY = (img.height - sourceHeight) / 2
      }

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      )

      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.src = dataUrl
  })
}

// Download processed image
const downloadImage = () => {
  if (!processedImageUrl.value) return

  const filename = `blur-vault-protected-${Date.now()}.jpg`
  download(processedImageUrl.value, filename, 'image/jpeg')
}

// Reset image state for another upload
const resetImage = () => {
  originalImageUrl.value = null
  processedImageUrl.value = null
  uploadError.value = ''

  // Clear the file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
</style>
