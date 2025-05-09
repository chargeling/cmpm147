/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
    return [
      {
        name: "Lunch atop a Skyscraper", 
        assetUrl: "img/lunch-on-a-skyscraper.jpg",
        credit: "Lunch atop a Skyscraper, Charles Clyde Ebbets, 1932"
      },
      {
        name: "Train Wreck", 
        assetUrl: "img/train-wreck.jpg",
        credit: "Train Wreck At Monteparnasse, Levy & fils, 1895"
      },
      {
        name: "Migrant mother", 
        assetUrl: "img/migrant-mother.jpg",
        credit: "Migrant Mother near Nipomo, California, Dorothea Lange, 1936"
      },
      {
        name: "Disaster Girl", 
        assetUrl: "img/girl-with-fire.jpg",
        credit: "Four-year-old Zoë Roth, 2005"
      },
      {
        name: "Atri", 
        assetUrl: "img/atri.jpg",
        credit: "Atri My Dear Moments"
      },
    ];
  }
  
// Define a limited color palette (choose any colors you like)
const PALETTE = [
    [239, 71, 111],  // pink
    [255, 209, 102], // yellow
    [6, 214, 160],   // mint
    [17, 138, 178],  // teal
    [7, 59, 76]      // dark blue
  ];
  
// Available shape types
const SHAPE_TYPES = ["rect", "ellipse"];
  
  
// Create a random design with shape type, position, size, and color
function initDesign(inspiration) {
    let design = [];
    for (let i = 0; i < 200; i++) {
      let col = random(PALETTE);
      design.push({
        type: random(SHAPE_TYPES),
        x: random(width),
        y: random(height),
        w: random(10, width / 4),
        h: random(10, height / 4),
        r: col[0],
        g: col[1],
        b: col[2],
        a: random(100, 200)
      });
    }
    return design;
  }
  
// Render each gene as either a rectangle or ellipse
function renderDesign(design, inspiration) {
    background(255);
    noStroke();
    for (let gene of design) {
      fill(gene.r, gene.g, gene.b, gene.a);
      if (gene.type === "rect") {
        rect(gene.x, gene.y, gene.w, gene.h);
      } else if (gene.type === "ellipse") {
        ellipse(
          gene.x + gene.w * 0.5,
          gene.y + gene.h * 0.5,
          gene.w,
          gene.h
        );
      }
    }
  }
  
// Mutate properties and occasionally switch shape type (~1 in 20 chance)
function mutateDesign(design, inspiration, rate) {
    const TYPE_MUTATION_RATE = 1/20;
    for (let gene of design) {
      if (random() < rate) {
        gene.x = constrain(gene.x + randomGaussian() * 10, 0, width);
        gene.y = constrain(gene.y + randomGaussian() * 10, 0, height);
        gene.w = constrain(gene.w + randomGaussian() * 10, 1, width);
        gene.h = constrain(gene.h + randomGaussian() * 10, 1, height);
        gene.r = constrain(gene.r + randomGaussian() * 10, 0, 255);
        gene.g = constrain(gene.g + randomGaussian() * 10, 0, 255);
        gene.b = constrain(gene.b + randomGaussian() * 10, 0, 255);
        gene.a = constrain(gene.a + randomGaussian() * 5, 50, 255);
      }
      // Rarely mutate the shape type itself
      if (random() < TYPE_MUTATION_RATE) {
        gene.type = random(SHAPE_TYPES);
      }
    }
  }