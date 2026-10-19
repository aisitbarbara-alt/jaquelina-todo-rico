document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (!carouselSlide || carouselImages.length === 0 || !prevButton || !nextButton) {
        console.error("Error: No se encontraron todos los elementos del carrusel. Asegúrate de que el HTML y las clases son correctas.");
        return;
    }

    let counter = 0;
    let slideWidth = 0;
    let isTransitioning = false; // Flag para evitar clics mientras hay transición

    // Función para mover el carrusel
    function moveCarousel() {
        if (slideWidth > 0) {
            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        }
    }

    // Función para calcular el ancho de un slide
    function calculateSlideWidth() {
        if (carouselImages.length > 0) {
            // Usa offsetWidth para obtener el ancho renderizado, incluyendo padding y border
            slideWidth = carouselImages[0].offsetWidth; 
            moveCarousel(); // Mueve el carrusel a la posición inicial correcta
        }
    }

    // Calcular el ancho cuando las imágenes se han cargado y al redimensionar
    window.addEventListener('load', calculateSlideWidth);
    window.addEventListener('resize', calculateSlideWidth);


    // --- Event Listeners para los botones ---
    nextButton.addEventListener('click', () => {
        if (isTransitioning) return; // Evita clics múltiples durante la transición

        if (counter >= carouselImages.length - 1) { // Si es la última imagen
            // Desactivar la transición para el "salto" rápido a la primera imagen
            carouselSlide.style.transition = 'none';
            counter = 0; // Volver a la primera imagen
            moveCarousel(); // Mueve inmediatamente a la primera imagen sin transición

            // Forzar un "repaint" para que el navegador aplique 'none' antes de re-activar
            // Esto es un truco común para asegurar que la transición se desactive
            carouselSlide.offsetWidth; 

            // Reactivar la transición después de un pequeño retraso
            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = false;
            }, 50); // Un pequeño retraso (50ms suele ser suficiente)

        } else {
            isTransitioning = true;
            counter++;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out'; // Asegura que la transición esté activa
            moveCarousel();
            // Desactivar el flag después de que la transición termine
            carouselSlide.addEventListener('transitionend', function handler() {
                isTransitioning = false;
                carouselSlide.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    });

    prevButton.addEventListener('click', () => {
        if (isTransitioning) return; // Evita clics múltiples durante la transición

        if (counter <= 0) { // Si es la primera imagen
            // Desactivar la transición para el "salto" rápido a la última imagen
            carouselSlide.style.transition = 'none';
            counter = carouselImages.length - 1; // Ir a la última imagen
            moveCarousel(); // Mueve inmediatamente a la última imagen sin transición

            carouselSlide.offsetWidth; // Forzar un "repaint"

            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = false;
            }, 50);

        } else {
            isTransitioning = true;
            counter--;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out'; // Asegura que la transición esté activa
            moveCarousel();
            // Desactivar el flag después de que la transición termine
            carouselSlide.addEventListener('transitionend', function handler() {
                isTransitioning = false;
                carouselSlide.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    });

    // Opcional: Carrusel automático (descomenta para activar)
    
    setInterval(() => {
        // Asegúrate de que nextButton exista antes de simular el clic
        if (nextButton) {
            nextButton.click(); 
        }
    }, 3000); // Cambia de imagen cada 3 segundos (3000 ms)
    
});