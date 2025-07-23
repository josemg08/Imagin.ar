document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('.image-grid');

    // Function to shuffle grid items
    function shuffleGrid() {
        const items = Array.from(grid.children);
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            grid.appendChild(items[j]);
        }
    }

    // Shuffle the grid items before initializing Masonry
    shuffleGrid();

    const msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 12
    });

    // Update Masonry layout after images are loaded
    imagesLoaded(grid).on('progress', function () {
        msnry.layout();
    });

    // Remove the banner width constraint
    window.addEventListener('resize', function () {
        msnry.layout();
    });
});