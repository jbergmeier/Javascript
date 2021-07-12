
    // Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact, image) {
    this.species = species
    this.weight = weight
    this.height = height
    this.diet = diet
    this.where = where
    this.when = when
    this.fact = fact
    this.image = image
}

// Human Constructor
function Human(species, weight, height, diet, image) {
    this.species = species
    this.weight = weight
    this.height = height
    this.diet = diet
    this.image = image
}
        
// Create Dino Objects


const createDinoGrid = function() {
    (async function getData () {
        var dino = await fetch("dino.json")
        .then(result => result.json())
        .then(result => result.Dinos);
    
    // Create Dino Objects
    var dinosaur = dino.map(dinosaur => new Dino(
        dinosaur.species,
        dinosaur.weight,
        dinosaur.height,
        dinosaur.diet,
        dinosaur.where,
        dinosaur.when,
        dinosaur.fact,
        dinosaur.image));
    console.log(dinosaur)
   
     
    // Create Human Object
    const humanFacts = new Human();

    // Use IIFE to get human data from form
    const humanData = function(humanFacts) {
        {
            // Todo: Catch Event nothing is entered!
            humanFacts.height = parseInt(document.getElementById('feet').value * 12) + parseInt(document.getElementById('inches').value)
            humanFacts.species = document.getElementById('name').value
            humanFacts.weight = document.getElementById('weight').value
            humanFacts.diet = document.getElementById('diet').value
            humanFacts.image = "images/human.png"
        }
    }(humanFacts)
    console.log(humanFacts)
    
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const compareWeight = function(dinoWeight) {
        if(humanFacts.weight > dinoWeight){
            console.log("Lighter")
            return "This dino is lighter than the human"
        }
        else {
            console.log("heavier")
            return "This dino is heavier than the human."
        }
    }
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareHeight = function(dinoHeight) {
        if(humanFacts.height > dinoHeight){
            console.log("Higher")
            return "This dino is bigger than the human"
        }
        else {
            console.log("Smaller")
            return "This dino is smaller than the human."
        }
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareDiet = function(dinodiet) {
        if(humanFacts.diet.toLowerCase() == dinodiet.toLowerCase()){
            console.log("Same Diet")
            return "The Human and the Dino have the same diet"
        }
        else {
            console.log(`The Human is ${humanFacts.diet} and the Dino is ${dinodiet}`)
            return `The Human is ${humanFacts.diet} and the Dino is ${dinodiet}`;
        }
    }

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM
    dinosaur.forEach(dinoElement => {
        console.log(dinoElement)
        dinoElement.fact.push(compareWeight(dinoElement.weight))
        dinoElement.fact.push(compareHeight(dinoElement.height))
        dinoElement.fact.push(compareDiet(dinoElement.diet))
        console.log("Human Height: " + humanFacts.height)
        console.log("Dino Height: " + dinoElement.height)
      
    });
}  )()}
// Remove form from screen
// add css class hide to hide the form
function hideForm () {
    hideForm = document.getElementById("dino-compare")
    hideForm.classList.add("hide");
}

// On button click, prepare and display infographic
// Eventlistener for the Buttons
const button = document.getElementById("btn")
    button.addEventListener('click', (function () {
        createDinoGrid();
        hideForm();
        
    }))