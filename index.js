const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generatebtn = document.getElementById('generatebtn');
const downloadbtn = document.getElementById('downloadbtn');

const qrContainer = document.querySelector('.qr-body');
let size = sizes.value;
let qrCode = null;

generatebtn.addEventListener('click', (e) => {
  e.preventDefault();
  size = sizes.value; // Update size based on selected value
  generateQRCode();
});

function generateQRCode() {
  // Clear previous QR code
  qrContainer.innerHTML = "";

  // Generate new QR code
  qrCode = new QRCode(qrContainer, {
    text: qrText.value,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });
}

// Download QR code image
downloadbtn.addEventListener('click', () => {
  if (!qrCode) {
    alert("Please generate a QR code first.");
    return;
  }

  // Get the canvas element with the generated QR code
  const qrCanvas = qrContainer.querySelector('canvas');
  if (qrCanvas) {
    // Convert canvas to data URL
    const qrImageUrl = qrCanvas.toDataURL("image/png");

    // Create a temporary link element and set attributes for download
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "qr-code.png";

    // Trigger download
    link.click();
  } else {
    alert("Failed to download QR code.");
  }
});
