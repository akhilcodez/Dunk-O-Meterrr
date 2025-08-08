// Barcode to biscuit mapping
const barcodeToBiscuit = {
  '8901234567890': 'Parle-G',
  '8901234567891': 'Marie Gold',
  '8901234567892': 'Oreo',
  '8901234567893': 'Hide & Seek Fab'
  // Add real barcode values for your biscuits here
};

// Dynamically load QuaggaJS
function loadQuagga(callback) {
  if (window.Quagga) return callback();
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js';
  script.onload = callback;
  document.body.appendChild(script);
}

function startBarcodeScanner() {
  loadQuagga(() => {
    const cameraWindow = document.getElementById('cameraWindow');
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: cameraWindow,
        constraints: {
          facingMode: 'environment'
        }
      },
      decoder: {
        readers: ['ean_reader', 'upc_reader']
      }
    }, function(err) {
      if (err) {
        alert('Camera error: ' + err);
        return;
      }
      Quagga.start();
    });
    Quagga.onDetected(function(result) {
      const code = result.codeResult.code;
      if (barcodeToBiscuit[code]) {
        document.getElementById('biscuitSelect').value = barcodeToBiscuit[code];
        Quagga.stop();
        var cameraWindow = document.getElementById('cameraWindow');
        if (cameraWindow) cameraWindow.style.display = 'none';
        document.getElementById('scanBarcodeBtn').disabled = false;
        alert('Biscuit recognized: ' + barcodeToBiscuit[code]);
        // Start timer automatically
        if (typeof startTimer === 'function') {
          startTimer();
        } else {
          // Try to trigger the timer button if function is not available
          var startBtn = document.getElementById('startButton');
          if (startBtn) startBtn.click();
        }
      }
    });
  });
}

// Attach event listener
window.addEventListener('DOMContentLoaded', function() {
  const scanBtn = document.getElementById('scanBarcodeBtn');
  const cameraWindow = document.getElementById('cameraWindow');
  if (scanBtn && cameraWindow) {
    cameraWindow.style.display = 'none'; // Ensure hidden on load
    scanBtn.addEventListener('click', function() {
      scanBtn.disabled = true;
      cameraWindow.style.display = 'flex';
      startBarcodeScanner();
    });
  }
});
