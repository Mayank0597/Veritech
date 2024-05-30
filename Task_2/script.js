// Placeholder for any JavaScript functionality, like a simple carousel
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel img');
    let currentImageIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    setInterval(nextImage, 3000); // Change image every 3 seconds
    showImage(currentImageIndex); // Show the first image initially
});
