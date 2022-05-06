var playerName = window.prompt("What's your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//RANDOM NUMBER GENERATOR, GIVEN MAX AND MIN VALUES
var randomNumber = function(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
};

var enemyNames = ["Roborto", "Amy Android", "Robo Tumble"];
var enemyHealth = randomNumber(40,60);
var enemyAttack = 12;

var fight = function(enemyName)
{
    //Ask if they want to fight or skip
    while(playerHealth > 0 && enemyHealth > 0)
    {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //SKIP
        if (promptFight === "skip" || promptFight === "SKIP")
        {
            //confirmation
            var confirmSkip = window.confirm("Are you sure you would like to quit?");

            if (confirmSkip)
            {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //FIGHT
        // enemyHealth = Math.max(0, enemyHealth - playerAttack);
        var damage = randomNumber(playerAttack -3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(playerName, " attacked ", enemyName, ". ", enemyName, " now has ", enemyHealth, " health remaining.");

        if (enemyHealth <= 0)
        {
            window.alert(enemyName + " has died!");
            break;
        }
        else
        {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //playerHealth = Math.max(0, playerHealth - enemyAttack);
        var damage = randomNumber(enemyAttack -3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(enemyName, " attacked ", playerName, ". ", playerName, " now has ", playerHealth, " health remaining.");

        if (playerHealth <= 0)
        {
            window.alert(playerName + " has died!");
            break;
        }
        else
        {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

//START GAME
var startGame = function()
{
    //RESET PLAYER STATS
    var playerHealth = 100;
    var playerAttack = 10;
    var playerMoney = 10;

    for(var i=0; i < enemyNames.length; i++)
    {
        if (playerHealth > 0)
        {
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);
            if ( playerHealth > 0 && i < enemyNames.length - 1)
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
    if (playerHealth > 0)
    {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else
    {
        window.alert("You have lost your robot in battle.");
    }

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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    switch (shopOptionPrompt)
    {
        //REFILL
        case "refill":
        case "REFILL":
            if (playerMoney >= 7)
            {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else
            {
                window.alert("You don't have enough money!");
            }
            break;

        //UPGRADE
        case "upgrade":
        case "UPGRADE":
            if (playerMoney >= 7)
            {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else
            {
                window.alert("You don't have enough money!");
            }
            break;

        //LEAVE
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");
            break;

        //ELSE / DEFAULT
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

//Start the game when page loads
startGame();