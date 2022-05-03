var playerName = window.prompt("What's your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Tumble"];
var enemyHealth = 50;
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
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //FIGHT
        enemyHealth = enemyHealth - playerAttack;
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

        playerHealth = playerHealth - enemyAttack;
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
}

//Start the game when page loads
startGame();