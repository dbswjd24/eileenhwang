// Tesseract worker auto-detects WebAssembly SIMD support and tries to load
// tesseract-core-simd-lstm.wasm.js, which is not bundled in this extension.
// Override WebAssembly.validate to return false so the worker falls back to
// the bundled tesseract-core.wasm.js instead.
WebAssembly.validate = () => false;

// In Chrome extension web workers, fetch() for chrome-extension:// URLs can fail
// with "TypeError: Failed to fetch". XHR works reliably. Override fetch with XHR.
self.fetch = function(url, opts) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open((opts && opts.method) || 'GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            resolve(new Response(xhr.response, {
                status: xhr.status,
                statusText: xhr.statusText || 'OK',
            }));
        };
        xhr.onerror = function() {
            reject(new TypeError('Failed to fetch'));
        };
        xhr.ontimeout = function() {
            reject(new TypeError('Request timed out'));
        };
        xhr.send((opts && opts.body) || null);
    });
};

// Load the real Tesseract worker (same directory, relative path)
importScripts('worker.min.js');
