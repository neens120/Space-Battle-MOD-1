//Creating the base ship model for myShip and alienShips
class Ship {
    constructor(name, hull, firepower, accuracy){// 4 stats in total 
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
}
    attack(shipBeingAttacked){
        if (Math.random() < this.accuracy) {
            shipBeingAttacked.hull -= this.firepower;
            console.log(shipBeingAttacked.name, " was hit!", shipBeingAttacked.hull);
        }
        }
    //Ship that is attacking = this  
    //myShip.attack() 
}

//--------------------------
//alienShip Ship Stats
//--------------------------

// function for random numbers for alien hull & firepower
const randomNumInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
//function for random decimal number for alien accuracy
const randomDecimalInRange = (min, max) => {
    return Number((Math.random() * (max - min) + min).toFixed(1));
}
//Defining myShip stat values and alienShip stat values
let myShip = new Ship("myShip",20,2,.7); 


class Army {
    constructor (name){
        this.name = name;
        this.ships = [];
    }
    addShip(){
        var randomHull = randomNumInRange(3,6);
        var randomFirePower = randomNumInRange(2,4);
        var randomAccuracy = randomDecimalInRange(.6,.8);
        let newShip = new Ship("Alien",randomHull, randomFirePower,randomAccuracy);
        this.ships.push(newShip);
    }
}
//Creating the 6 alien ships for battle
let enemyFleet = new Army("Alien")
enemyFleet.addShip();
enemyFleet.addShip();
enemyFleet.addShip();
enemyFleet.addShip();
enemyFleet.addShip();
enemyFleet.addShip();
console.log(enemyFleet);

//--------------------------
//Displaying the ship stats at Start of Game
//--------------------------

//Loop through HTML ships to display alienShip stats (hull,firepower,accuracy)
const htmlAlienShips = document.querySelectorAll(".alien-Ship");
console.log(htmlAlienShips);
//Start looping
htmlAlienShips.forEach((individualShip,index) =>{
console.log(individualShip.children);
//hull is index 1 
individualShip.children.item(2).textContent=`Hull:  ${enemyFleet.ships[index].hull}`;
//firepower is index 2
individualShip.children.item(3).textContent=`Firepower:${enemyFleet.ships[index].firepower}`;
//accuracy is index 3
individualShip.children.item(4).textContent=`Accuracy: ${enemyFleet.ships[index].accuracy}`;
})

//Loop through HTML ships to display myShip stats (hull,firepower,accuracy)
const htmlMyShip = document.querySelector(".my-Ship");
console.log(htmlAlienShips);
console.log(htmlMyShip.children);
htmlMyShip.children.item(2).textContent=`Hull:  ${myShip.hull}`;
htmlMyShip.children.item(3).textContent=`Firepower:${myShip.firepower}`;
htmlMyShip.children.item(4).textContent=`Accuracy: ${myShip.accuracy}`;


//--------------------------
//Setting ID to update both myShip and alienShip Stats
//--------------------------
const alienShipHull = document.getElementsByClassName("alien-ship-hull");

//--------------------------
//myShip and alienShip battle
//--------------------------

//Turn-based attack: 1 alienShip vs myShip
const battle = () => {
//Loop through alien ships (6 by the array) 
for(let i = 0; i<enemyFleet.ships.length; i++){
    let specificAlienShip = enemyFleet.ships[i];
    console.log(specificAlienShip);

//Turns between my Ship and one alien ship
let keepLooping = true;
    while(keepLooping){
        console.log("%cStarting the battle sequence-- looping", "color:green");//console check
        //keepLooping = false;
        //Step 1: Check to see if any of the stats are 0 (if myShip is at 0 end game -- end loop)
        if(myShip.hull<=0){
            keepLooping = false;
            break; 
        }
        //(In Step 1:) Check to stop the battle loop if the alienShip hull is 0
        if(specificAlienShip.hull <=0){
            keepLooping = false;
            break;
        }

        //Step 2: Battle sequence begins-- myShip attacks the alien first
        console.log("%cAttacking the alien Ship...", "color:orange");//console check
        myShip.attack(specificAlienShip);
        console.log("Alien Ship Hull is now: " + specificAlienShip.hull)
        htmlAlienShips[i].children.item(2).textContent=`Hull: ${specificAlienShip.hull}`;
        
        //alienShipHull[0].innerHTML = enemyFleet.ships[0].hull;//Updates html-- alien hull
        //(In Step 2:) Check the alien ship hull
        if (specificAlienShip.hull <= 0) {
            const alienImage = document.getElementsByClassName(`alienShipImg`);//Updates img--alien img html for destroyed alien ship
                alienImage.src = "/images/explosion.gif";
            console.log("%cAlien ship has been destroyed!", "color:red");//console check
            break;
        }
        //(In Step 2:) alienShip survives attack --> Now they attack myShip
        else {
            console.log("%cThe alien survived! Alien ship is returning fire!", "color:orange");//console check
            specificAlienShip.attack(myShip);
            var myShipDamageImage = document.getElementById(`myShipDamage`);//Updates img-- myship img html for damage
                myShipDamageImage.src = "/images/Main Ship/PNGs/Main Ship - Base - Damaged.png";
            console.log("myShip Hull is now: " + myShip.hull);//console check
            htmlMyShip.children.item(2).textContent=`Hull: ${myShip.hull}`
        }
        // check if myShip hull = 0
          if (myShip.hull <= 0) {
            console.log("myShip Hull is now: " + myShip.hull);
            console.log("You lost! Aliens have wiped you!");
            break;
        }
    }
}
//--------------------------
//Gamestate options
//--------------------------
//This is inside the battle function
//check ship hull greater than 0 
if (myShip.hull > 0) {
    console.log("%cAll alien ships destroyed-- You've won the battle against the aliens!", "color:blue");
}
else if (myShip.hull <= 0){
    console.log("%c The Alien Fleet was too strong-- Your ship has exploded!", "color:blue");
    myShipDamageImage.src = "/images/explosion.gif";
}
}
//--------------------------
//Attack! Button
//--------------------------
const attackBtn = document.getElementById("attack-button");
attackBtn.addEventListener("click", () => {
    battle();
});
//--------------------------
//Play Again? Button
//--------------------------
