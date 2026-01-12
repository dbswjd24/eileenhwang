let workerPromise;

/**
 * Initializes the Tesseract worker using local extension files.
 * Uses gzip: false to match uncompressed .traineddata files.
 */
async function getWorker() {
  if (workerPromise) return workerPromise;
  
  workerPromise = (async () => {
    // Check if the script in offscreen.html loaded 'Tesseract' into the global scope
    if (typeof Tesseract === 'undefined') {
      throw new Error("Tesseract library not found. Check paths in offscreen.html.");
    }

    const worker = await Tesseract.createWorker({
      // Use chrome.runtime.getURL to point to local extension resources
      workerPath: chrome.runtime.getURL('tesseract/worker.min.js'),
      corePath: chrome.runtime.getURL('tesseract/tesseract-core.wasm.js'),
      langPath: chrome.runtime.getURL('tesseract/'),
      gzip: false, // Critical: set to false for raw .traineddata files
      logger: m => console.log('OCR Status:', m)
    });

    // Initialize with both English and Korean
    await worker.loadLanguage('eng+kor');
    await worker.initialize('eng+kor');
    return worker;
  })();
  
  return workerPromise;
}

/**
 * Listens for messages from the service worker to process OCR.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Only process if the message is targeted for this offscreen document
  if (message.target !== 'offscreen' || message.type !== 'process-ocr') return false;
  
  (async () => {
    try {
      const worker = await getWorker();
      const { data: { text } } = await worker.recognize(message.data);
      
      // Send the recognized text back to the service worker/popup
      sendResponse({ text: text || '' });
    } catch (err) {
      console.error('[offscreen] OCR processing error:', err);
      sendResponse({ error: err.message });
    }
  })();
  
  return true; // Keeps the message channel open for async sendResponse
});