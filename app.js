
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
        
// getRandom for dino fact
const getRandomFact = function(array) {
    return (array[Math.floor(Math.random() * array.length)])
}

// create the grid
const createDinoGrid = function() {
    (async function getData () {
        const dino = await fetch('dino.json')
        .then(result => result.json())
        .then(result => result.Dinos);
    
    // Create Dino Objects
    const dinosaur = dino.map(dinosaur => new Dino(
        dinosaur.species,
        dinosaur.weight,
        dinosaur.height,
        dinosaur.diet,
        dinosaur.where,
        dinosaur.when,
        dinosaur.fact,
        dinosaur.image));
     
    // Create Human Object
    const humanFacts = new Human();

    // Use IIFE to get human data from form
    (function(humanFacts) {
    {
        humanFacts.height = parseInt(document.getElementById('feet').value * 12) + parseInt(document.getElementById('inches').value)
        humanFacts.species = document.getElementById('name').value
        humanFacts.weight = document.getElementById('weight').value
        humanFacts.diet = document.getElementById('diet').value
        humanFacts.image = 'images/human.png'
        humanFacts.fact = ''
    }
    })(humanFacts)

    dinosaur.splice(4, 0, humanFacts);
    
    // Create Tiles
    const createTileContructor = function(objectElement) {
        const gridCreate = document.createElement('div');
        const gridTitle = document.createElement('h3');
        const gridImage = document.createElement('img');
        const gridFact = document.createElement('p');
    
        gridCreate.className = 'grid-item';
        grid.appendChild(gridCreate);
        gridCreate.appendChild(gridTitle);
        gridCreate.appendChild(gridImage);
        gridCreate.appendChild(gridFact);
    
        gridTitle.innerHTML = objectElement.species;
        gridImage.setAttribute('src', objectElement.image);  

        // Choose Random Fact
        if(objectElement.fact === '') {
            gridFact.innerHTML = '';
        }else{
            
            gridFact.innerHTML = getRandomFact(objectElement.fact);
        }
    
    }
    
    // Create Dino Compare Method 1
    // compares the weight of the human and the dino
    const compareWeight = function(dinoWeight) {
        if(humanFacts.weight > dinoWeight){
            return 'This dino is lighter than the human'
        }
        else {
            return 'This dino is heavier than the human.'
        }
    }

    // Create Dino Compare Method 2
    // compares the height of the human and the dino
    const compareHeight = function(dinoHeight) {
        if(humanFacts.height > dinoHeight){
            return 'This dino is bigger than the human'
        }
        else {
            return 'This dino is smaller than the human.'
        }
    }
    
    // Create Dino Compare Method 3
    // compares the diet of the human and the dino
    const compareDiet = function(dinodiet) {
        if(humanFacts.diet.toLowerCase() == dinodiet.toLowerCase()){
            return 'The Human and the Dino have the same diet'
        }
        else {
            return `The Human is ${humanFacts.diet} and the Dino is ${dinodiet}`;
        }
    }

    // get Elements for Grid in HTML
    const grid = document.getElementById('grid');
    
    // Add comarison facts to the dinos and creates the tiles (not for the pigeon and human)
    dinosaur.forEach(dinoElement => {  
        if(dinoElement.species != 'Pigeon' && dinoElement.fact != ''){
            dinoElement.fact.push(compareWeight(dinoElement.weight))
            dinoElement.fact.push(compareHeight(dinoElement.height))
            dinoElement.fact.push(compareDiet(dinoElement.diet))
        }
        createTileContructor(dinoElement)
    });

}  )()}

// Remove form from screen
// add css class hide to hide the form
function hideForm () {
    hideForm = document.getElementById('dino-compare')
    hideForm.classList.add('hide');
}

// On button click, prepare and display infographic
// Eventlistener for the Buttons
const button = document.getElementById('btn')
button.addEventListener('click', (function () {
    createDinoGrid();
    hideForm();
}))