//GAME FUNCTIONS:

//RANDOM NUMBER GENERATOR, GIVEN MAX AND MIN VALUES
var randomNumber = function(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
};

//FIGHT OR SKIP OPTION
var fightOrSkip = function()
{
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "" || promptFight === null)
    {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    //Change input to all lower case for logic
    promptFight = promptFight.toLowerCase();
    //SKIP
    if (promptFight === "skip")
    {
        //confirmation
        var confirmSkip = window.confirm("Are you sure you would like to quit?");

        if (confirmSkip)
        {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            //console.log("playerMoney", playerInfo.money);
            return true;
        }
    }
    return false;
};

//FIGHT
var fight = function(enemy)
{
    //Keep track of who goes first
    var isPlayerTurn = true;

    //Randomly change turn order
    if (Math.random() > 0.5)
    {
        isPlayerTurn = false;
    }

    //Ask if they want to fight or skip
    while(playerInfo.health > 0 && enemy.health > 0)
    {
        if (isPlayerTurn)
        {
            if(fightOrSkip())
            {
                break;
            }


            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name, " attacked ", enemy.name, ". ", enemy.name, " now has ", enemy.health, " health remaining.");

            if (enemy.health <= 0)
            {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            else
            {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }
        else
        {
            var damage = randomNumber(enemy.attack -3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name, " attacked ", playerInfo.name, ". ", playerInfo.name, " now has ", playerInfo.health, " health remaining.");

            if (playerInfo.health <= 0)
            {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else
            {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};

//START GAME
var startGame = function()
{
    //RESET PLAYER STATS
    playerInfo.reset();

    for(var i=0; i < enemyInfo.length; i++)
    {
        console.log(playerInfo);

        if (playerInfo.health > 0)
        {
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            if ( playerInfo.health > 0 && i < enemyInfo.length - 1)
            {
                var storeConfirm = window.confirm("The fight is over; do you want to visit the store before the next round?");
                if (storeConfirm)
                {
                    shop();
                }
            }
        }
        else
        {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

//END GAME, ASK TO PLAY AGAIN
var endGame = function()
{
    window.alert("The game has now ended. Let's see how you did!");

    //HIGHSCORE
    var highScore = localStorage.getItem("highscore");
    if (highScore === null)
    {
        highScore = 0;
    }

    if (playerInfo.money > highScore)
    {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else
    {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    //PLAY AGAIN?
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm)
    {
        startGame();
    }
    else
    {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function()
{
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt)
    {
        //REFILL
        case 1:
            playerInfo.refillHeath();
            break;
        //UPGRADE
        case 2:
            playerInfo.upgradeAttack();
            break;
        //LEAVE
        case 3:
            window.alert("Leaving the store.");
            break;
        //ELSE / DEFAULT
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var getPlayerName = function()
{
    var name = "";

    while(name === "" || name === null)
    {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

//GAME OBJECTS:

//PLAYER OBJECT
var playerInfo =
{
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function()
        {
            this.health = 100;
            this.money = 10;
            this.attack = 10;
        },
    refillHeath: function()
    {
        if (this.money >= 7)
        {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else
        {
            window.alert("You don't have enough money :(");
        }
    },
    upgradeAttack: function()
    {
        if (this.money >= 7)
        {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else
        {
            window.alert("You don't have enough money :(");
        }
    }
};

//ENEMY OBJECT
var enemyInfo =
[
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Tumble",
        attack: randomNumber(10,14)
    }
];

//Start the game when page loads
startGame();