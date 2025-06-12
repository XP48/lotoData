document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.element');
    let delays = [0, 0.2, 0.4, 0.6]; // Délais en secondes
    let lastScrollPosition = window.pageYOffset;
    
    function checkVisibility() {
        const currentScrollPosition = window.pageYOffset;
        const scrollingDown = currentScrollPosition > lastScrollPosition;
        lastScrollPosition = currentScrollPosition;
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            const isInView = elementTop < windowHeight * 0.8 && elementBottom > windowHeight * 0.2;
            
            if (isInView) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, delays[index] * 1000);
                console.log(element)
            } else {
                element.classList.remove('visible');
                console.log(element)

            }
        });
    }
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
});



document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    const scrollThreshold = 300; // Seuil de défilement pour afficher le bouton

    function toggleBackToTop() {
        if (window.pageYOffset > scrollThreshold) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', toggleBackToTop);
    
    // Vérifier au chargement initial
    toggleBackToTop();
});