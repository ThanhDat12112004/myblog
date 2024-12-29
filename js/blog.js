document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Get selected category
            const selectedCategory = button.getAttribute('data-category');

            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.querySelector('.blog-card-tag').textContent;
                
                if (selectedCategory === 'all') {
                    card.classList.remove('hidden');
                } else {
                    if (cardCategory === selectedCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});