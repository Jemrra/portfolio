const gallery = document.getElementById("gallery");
const lightbox = document.querySelector('.lightbox');
let imageCount = 0;
let currentIndex = 0;
let artworks = [];

    fetch('data/artworks.json') // Adjust the path as needed
        .then(response => response.json())  // Parse the JSON data
        .then(data => {
            artworks = data; // Assign the parsed data to the artworks array
            imageCount = artworks.length;
            console.log("Artworks loaded:", artworks);
            initializeGallery(); // Call a function to initialize the gallery once data is loaded
        })
        
    .catch(error => console.error("Error loading artworks:", error));

    function initializeGallery() {
        const gallery = document.getElementById("gallery");
    
        // Clear any existing thumbnails in the gallery (if necessary)
        gallery.innerHTML = '';
    
        // Loop through the artworks array and create thumbnails
        artworks.forEach((artwork, index) => {
            const thumbDiv = document.createElement("div");
            thumbDiv.className = "thumbnail";
            thumbDiv.onclick = () => openLightbox(index); // Pass the index to open the lightbox
    
            const img = document.createElement("img");
            img.src = `images/thumbnails/art${index}.jpg`; // Use the appropriate image path
            img.alt = artwork.title; // Use the artwork's title as the alt text
    
            const corner = document.createElement("div");
            corner.className = "corner-indicator";
    
            thumbDiv.appendChild(img);
            thumbDiv.appendChild(corner);
            gallery.appendChild(thumbDiv);
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        console.log("Lightbox opened for image:", currentIndex);
    
        const lightbox = document.getElementById("lightbox");
        lightbox.classList.add("active");
    
        updateLightboxContent(currentIndex);
    }

    function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("active");
    }

    function navigateLightbox(direction) {
        currentIndex += direction;
    
        // Wrap around if needed
        if (currentIndex < 0) currentIndex = artworks.length - 1;
        if (currentIndex >= artworks.length) currentIndex = 0;
    
        updateLightboxContent(currentIndex);
    }

    function updateLightboxContent(index) {
        const lightboxImg = document.getElementById("lightbox-img");
        const titleElement = document.getElementById("lightbox-title");
        const descriptionElement = document.getElementById("lightbox-description");
        const imageContainer = document.getElementById("lightbox-image-container");
    
        if (!artworks[index]) {
            console.error("Invalid index:", index);
            return;
        }
    
        // Update image, title, and description
        lightboxImg.classList.remove("show");
        lightboxImg.src = artworks[index].image; // Use the new "image" field
        titleElement.textContent = artworks[index].title;
        descriptionElement.textContent = artworks[index].description;
    
        console.log(artworks[index].title);
        console.log(artworks[index].description);
    
        // Wait for the new image to load before fading it in
        lightboxImg.onload = () => {
            lightboxImg.classList.add("show");
    
            // Adjust layout based on image aspect ratio
            if (lightboxImg.naturalHeight > lightboxImg.naturalWidth) {
                imageContainer.classList.add("portrait");
            } else {
                imageContainer.classList.remove("portrait");
            }
        };
    }
    

    document.addEventListener("keydown", function (e) {
        const lightbox = document.getElementById("lightbox");

        // Only respond to keys if the lightbox is active
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "ArrowRight") {
            navigateLightbox(1); // go to next image
        } else if (e.key === "ArrowLeft") {
            navigateLightbox(-1); // go to previous image
        } else if (e.key === "Escape") {
            closeLightbox(); // close lightbox
        }
    })

    lightbox.addEventListener('click', function(event) {
        // Check if the clicked target is the lightbox container (i.e., outside the content)
        if (event.target === lightbox || event.target === event.currentTarget) {
            console.log("click");
            closeLightbox();
        }
    })
