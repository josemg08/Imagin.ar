const BASE_BACKGROUND_COLOR = '#000';

// Define the grid line color
const GRID_LINE_COLOR_R = 50;
const GRID_LINE_COLOR_G = 50;
const GRID_LINE_COLOR_B = 50;
const GRID_LINE_COLOR_A = 0.3 * 125;

const GRID_SPACING = 4;
const LINE_WEIGHT = 1;

// Variables for noise animation
let noiseOffset = 0;
const NOISE_SCALE = 0.020;
const NOISE_STRENGTH = 30;
const NOISE_SPEED = 0.010;

// Resolution for drawing the wavy lines
const SEGMENT_RESOLUTION = 50;

// Extra padding to ensure lines extend beyond viewport
const PADDING = NOISE_STRENGTH * 2;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    background(BASE_BACKGROUND_COLOR);
}

function draw() {
    background(BASE_BACKGROUND_COLOR);
    stroke(GRID_LINE_COLOR_R, GRID_LINE_COLOR_G, GRID_LINE_COLOR_B, GRID_LINE_COLOR_A);
    strokeWeight(LINE_WEIGHT);
    noFill();

    // Draw vertical wavy lines
    for (let x = -PADDING; x < width + PADDING; x += GRID_SPACING) {
        beginShape();
        // Add extra points above and below viewport
        curveVertex(x, -PADDING);
        curveVertex(x, -PADDING);

        for (let y = -PADDING; y <= height + PADDING; y += SEGMENT_RESOLUTION) {
            let displacementX = noise(x * NOISE_SCALE, y * NOISE_SCALE, noiseOffset) * NOISE_STRENGTH - (NOISE_STRENGTH / 2);
            curveVertex(x + displacementX, y);
        }

        curveVertex(x, height + PADDING);
        curveVertex(x, height + PADDING);
        endShape();
    }

    // Draw horizontal wavy lines
    for (let y = -PADDING; y < height + PADDING; y += GRID_SPACING) {
        beginShape();
        // Add extra points before and after viewport
        curveVertex(-PADDING, y);
        curveVertex(-PADDING, y);

        for (let x = -PADDING; x <= width + PADDING; x += SEGMENT_RESOLUTION) {
            let displacementY = noise(x * NOISE_SCALE, y * NOISE_SCALE, noiseOffset) * NOISE_STRENGTH - (NOISE_STRENGTH / 2);
            curveVertex(x, y + displacementY);
        }

        curveVertex(width + PADDING, y);
        curveVertex(width + PADDING, y);
        endShape();
    }

    noiseOffset += NOISE_SPEED;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
