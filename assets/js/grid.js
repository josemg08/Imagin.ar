/**
 * @typedef {import('masonry-layout')} Masonry
 * @typedef {import('imagesloaded')} ImagesLoaded
 */
let masonry;

document.addEventListener('DOMContentLoaded', async function () {
    const grid = document.querySelector('.image-grid');
    const images = await loadImages();

    createGridItems(images, grid)

    // Shuffle the grid items before initializing Masonry
    shuffleGrid(grid);

    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 12
    });

    // Update Masonry layout after images are loaded
    imagesLoaded(grid).on('progress', function () {
        masonry.layout();
    });

    // Remove the banner width constraint
    window.addEventListener('resize', function () {
        masonry.layout();
    });
});

// Function to shuffle grid items
function shuffleGrid(grid) {
    const items = Array.from(grid.children);
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        grid.appendChild(items[j]);
    }
}

// Load images from JSON
async function loadImages() {
    try {
        const response = await fetch('/assets/data/gallery.json');
        if (!response.ok) throw new Error('Failed to load gallery data');
        const data = await response.json();
        return data.images;
    } catch (error) {
        console.error('Error loading images:', error);
        return [];
    }
}

// Create grid items
function createGridItems(images, grid) {
    images.forEach(image => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;

        gridItem.appendChild(img);
        grid.appendChild(gridItem);
    })
}