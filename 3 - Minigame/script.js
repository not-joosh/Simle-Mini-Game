
// Constants
let playBtn = document.querySelector(".playBtn");
let gameOverMenu = document.querySelector(".game-over-menu");
let healthBar = document.querySelector(".health-bar");
let healthValue = document.querySelector(".health-value");
let roundText = document.querySelector('.round');

//
let scoreBoard = document.querySelector('.score');
//

let round = 0;
roundText.textContent = 'Round: ' + round;
let health = 100;
let objectsPerRound = 4;
let score = 0;

// Sounds
let clickSound = new Audio("sounds/click.mp3");
let song = new Audio("sounds/song1.mp3");


// Functionality
playBtn.addEventListener("click", function() {
    health = 100;
    round = 0;
    gameOverMenu.classList.add("hidden");
    healthBar.style.display = "block";
    healthValue.innerHTML = `${health} HP`;
    roundText.classList.add("visible"); 
    clickSound.play();
    song.play();
    startRound();
});

let items = [
    {
        src: "enemy/pants.png",
        clickCount: 1,
    },
    {
        src: "enemy/beanie.png",
        clickCount: 1
    },
    {
        src: "enemy/satelite.png",
        clickCount: 5
    },
    {
        src: "enemy/stella.png",
        clickCount: 6
    },
    {
        src: "enemy/moe.png",
        clickCount: 7
    },
    {
        src: "enemy/zach.png",
        clickCount: 10
    }
];
document.querySelector(".health-bar").addEventListener("healthChanged", function() {
    healthValue.textContent = `${health} HP`;
});


function startRound() {
    if (health <= 0) {
        return;
    }
    // Clear any existing objects
    roundText.textContent = 'Round: ' + (round + 1);
    round++;
    let objectContainer = document.querySelector(".object-container");

    // Generate a random number of objects based on the current round
    let numberOfObjects = round * objectsPerRound;

    for (let i = 0; i < numberOfObjects; i++) {
        let randomIndex = Math.floor(Math.random() * items.length);
        let item = items[randomIndex];

        // Creating a new object element and set its properties
        let object = document.createElement("div");
        object.classList.add("object");
        object.innerHTML = `<img src="${item.src}" alt="">`;
        object.style.left = (objectContainer.offsetWidth / 2) + "px";
        object.style.top = (objectContainer.offsetHeight / 2) + "px";
        objectContainer.appendChild(object);
        console.log("Successfully Loaded: " + item);
        // Determining the direction of the object towards the border
        let speedX = (Math.random() > 0.5) ? 2 : -2;
        let speedY = (Math.random() > 0.5) ? 2 : -2;
        object.style.left = window.innerWidth/2 + "px";
        object.style.top = window.innerHeight/2 + "px";
        // Moving the objects towards the border
        let intervalId = setInterval(function() {
            // Moving the objects
            object.style.left = parseInt(object.style.left) + speedX + 'px';
            object.style.top = parseInt(object.style.top) + speedY + 'px';
            // Checking if the object has reached the border
            // Checking if the object has reached the border
            if (parseInt(object.style.left) >= window.innerWidth || parseInt(object.style.left) <= 0 || parseInt(object.style.top) >= window.innerHeight || parseInt(object.style.top) <= 0) {
                clearInterval(intervalId);
                objectContainer.removeChild(object);
                health -= item.clickCount;
                healthValue.textContent = `${health} HP`;
                if (health <= 0) {
                    gameOverMenu.classList.remove("hidden");
                    healthBar.style.display = "none";
                    healthValue.classList.remove("visible");
                    roundText.classList.remove("visible");
                    clearInterval(intervalId);
                    song.pause();
                }
            }
        }, 80);
            object.addEventListener("click", function() {
            score += item.clickCount;
            healthValue.textContent = `${health} HP`;
            objectContainer.removeChild(object);
            clickSound.play();
            clearInterval(intervalId);
        });
        objectContainer.appendChild(object);
    }
    healthValue.innerHTML = health + " HP";
    healthValue.classList.add("visible");
    //Starting the next round after 3 seconds
    setTimeout(startRound, 3000);
}
