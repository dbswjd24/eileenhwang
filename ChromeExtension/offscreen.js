let workerPromise;

// Wait for Tesseract to be available
function waitForTesseract() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 100; // 5 seconds max wait
    
    const check = setInterval(() => {
      attempts++;
      if (typeof Tesseract !== 'undefined' && Tesseract.createWorker) {
        clearInterval(check);
        resolve();
      } else if (attempts >= maxAttempts) {
        clearInterval(check);
        reject(new Error("Tesseract failed to load after timeout"));
      }
    }, 50);
  });
}

async function getWorker() {
  if (workerPromise) return workerPromise;
  workerPromise = (async () => {
    await waitForTesseract();
    if (typeof Tesseract === 'undefined') throw new Error("Tesseract not loaded");
    const worker = await Tesseract.createWorker({
      workerPath: chrome.runtime.getURL('tesseract/worker.min.js'),
      corePath: chrome.runtime.getURL('tesseract/tesseract-core.wasm.js'),
      langPath: chrome.runtime.getURL('tesseract/'),
      gzip: false, 
      logger: m => console.log(m)
    });
    await worker.loadLanguage('eng+kor');
    await worker.initialize('eng+kor');
    return worker;
  })();
  return workerPromise;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen' || message.type !== 'process-ocr') return false;
  (async () => {
    try {
      const worker = await getWorker();
      const { data: { text } } = await worker.recognize(message.data);
      sendResponse({ text: text || '' });
    } catch (err) {
      sendResponse({ error: err.message });
    }
  })();
  return true; 
});