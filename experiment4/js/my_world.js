"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  // 1) Noise parameters (keep in sync with your beach logic)
  const noiseScale = 0.05; // controls continent size
  const beachScale = 0.02; // controls beach thickness

  // 2) Sample height
  let h = noise(i * noiseScale, j * noiseScale);

  // 3) Determine this tile’s sand-width (1 or 2)
  let sandNoise = noise(i * noiseScale * 2 + 123.4, j * noiseScale * 2 + 567.8);
  let sandWidth = sandNoise < 0.8 ? 1 : 2; // 80% one-tile beach

  // 4) Compute thresholds
  let waterThresh = 0.5 - sandWidth * beachScale;
  let landThresh = 0.5 + sandWidth * beachScale;

  // 5) Classify & color
  let fillColor;

  if (h < waterThresh) {
    // candidate water → check for “ocean” status
    let isOcean = true;
    // four cardinal neighbors
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let [dx, dy] of dirs) {
      let ni = i + dx,
        nj = j + dy;
      let hn = noise(ni * noiseScale, nj * noiseScale);
      // neighbor’s own sandWidth & threshold
      let sn = noise(ni * noiseScale * 2 + 123.4, nj * noiseScale * 2 + 567.8);
      let sw = sn < 0.8 ? 1 : 2;
      let wT = 0.5 - sw * beachScale;
      if (hn >= wT) {
        // neighbor is either beach or land → not interior
        isOcean = false;
        break;
      }
    }

    // pick dark vs light blue
    if (isOcean) {
      fillColor = color(0, 0, 139, 200); // dark blue = ocean
    } else {
      fillColor = color(173, 216, 230, 200); // light blue = coastal water
    }
  } else if (h > landThresh) {
    // land
    fillColor = color(139, 69, 19, 200); // brown
  } else {
    // beach
    fillColor = color(255, 230, 100, 200); // yellow
  }

  // 6) Draw the diamond
  push();
  fill(fillColor);
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  // 7) Click-marker overlay (unchanged)
  let n = clicks[[i, j]] | 0;
  if (n % 2 === 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }
  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
