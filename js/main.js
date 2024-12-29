// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Filter functionality for gallery and blog
function initializeFilter(buttonSelector, itemSelector) {
    const filterButtons = document.querySelectorAll(buttonSelector);
    const items = document.querySelectorAll(itemSelector);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter') || button.getAttribute('data-category');
            
            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category') || 
                                   item.querySelector('.blog-card-tag')?.textContent;
                
                if (filter === 'all') {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    if (itemCategory === filter) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// Gallery modal functionality
function initializeModal() {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    let currentImageIndex = 0;

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateModalImage();
            modal.classList.add('active');
        });
    });

    modalClose?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    function updateModalImage() {
        const items = document.querySelectorAll('.gallery-item');
        const currentItem = items[currentImageIndex];
        if (modalImg && currentItem) {
            modalImg.src = currentItem.querySelector('img').src;
        }
    }

    prevBtn?.addEventListener('click', () => {
        const items = document.querySelectorAll('.gallery-item');
        currentImageIndex = (currentImageIndex - 1 + items.length) % items.length;
        updateModalImage();
    });

    nextBtn?.addEventListener('click', () => {
        const items = document.querySelectorAll('.gallery-item');
        currentImageIndex = (currentImageIndex + 1) % items.length;
        updateModalImage();
    });
}

// Particle animation for home page
function createParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        particle.style.animation = `moveParticle ${duration}s ${delay}s infinite linear`;
        
        container.appendChild(particle);
    }
}

// Initialize all functionality
function initializeAll() {
    createParticles();
    initializeModal();
    initializeFilter('.filter-btn', '.gallery-item');
    initializeFilter('.category-btn', '.blog-card');
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAll);