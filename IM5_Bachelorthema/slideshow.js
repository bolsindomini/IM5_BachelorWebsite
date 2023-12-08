document.addEventListener("DOMContentLoaded", function () {
    const slideshowContainer = document.getElementById("slideshow-container");
    const body = document.body;

    const pathMap = {
        "filmlooks_2000s.html": [
            "img/2000er_1.jpeg",
            "img/2000er_2.jpeg",
            "img/2000er_3.jpeg",
            "img/2000er_4.jpeg",
            "img/2000er_5.jpeg",
            "img/2000er_6.jpeg",
            "img/2000er_7.jpeg",
            "img/2000er_8.jpeg",
            "img/2000er_9.jpeg",
            "img/2000er_10.jpeg",
            // Add more image paths for the 2000s
        ],
        "filmlooks_2010s.html": [
            "img/2010er_1.jpeg",
            "img/2010er_2.jpeg",
            "img/2010er_3.jpeg",
            "img/2010er_4.jpeg",
            "img/2010er_5.jpeg",
            "img/2010er_6.jpeg",
            "img/2010er_7.jpeg",
            "img/2010er_8.jpeg",
            "img/2010er_9.jpeg",
            "img/2010er_10.jpeg",
            // Add more image paths for the 2010s
        ],
        "filmlooks_2020s.html": [
            "img/2020er_1.jpeg",
            "img/2020er_2.jpeg",
            "img/2020er_3.jpeg",
            "img/2020er_4.jpeg",
            "img/2020er_5.jpeg",
            "img/2020er_6.jpeg",
            "img/2020er_7.jpeg",
            "img/2020er_8.jpeg",
            "img/2020er_9.jpeg",
            "img/2020er_10.jpeg",
            // Add more image paths for the 2020s
        ],
    };

    const currentPath = window.location.pathname.split("/").pop(); // Get the current HTML file name

    const imagePaths = pathMap[currentPath];

    if (!imagePaths) {
        console.error("Invalid HTML file or missing image paths");
        return;
    }

    let currentSlideIndex = 0;

    function showSlides() {
        const slides = document.getElementsByClassName("mySlides");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        currentSlideIndex++;

        if (currentSlideIndex > slides.length) {
            currentSlideIndex = 1;
        }

        slides[currentSlideIndex - 1].style.display = "block";

        // Change background color with a blurry effect based on the current image
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable cross-origin resource sharing (CORS)
        img.src = imagePaths[currentSlideIndex - 1];
        img.onload = function () {
            const color = getAverageColor(img);
            body.style.backgroundColor = color;
        };

        setTimeout(showSlides, 2000); // Change slide every 2 seconds
    }

    // Create slides dynamically
    imagePaths.forEach((path) => {
        const slide = document.createElement("div");
        slide.className = "mySlides";
        const img = document.createElement("img");
        img.src = path;
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    });

    // Start the slideshow
    showSlides();

    // Function to get average color from an image using HTML5 Canvas
    function getAverageColor(img) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;

        for (let i = 0; i < data.length; i += 4) {
            totalR += data[i];
            totalG += data[i + 1];
            totalB += data[i + 2];
        }

        const pixelCount = data.length / 4;
        const avgR = Math.round(totalR / pixelCount);
        const avgG = Math.round(totalG / pixelCount);
        const avgB = Math.round(totalB / pixelCount);

        return `rgb(${avgR}, ${avgG}, ${avgB})`;
    }
});
