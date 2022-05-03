var playerName = window.prompt("What's your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Tumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName)
{
    //window.alert("Welcome to Robot Gladiators!");
    //Ask if they want to fight or skip
    while(enemyHealth > 0)
    {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //FIGHT
        if (promptFight === "fight" || promptFight === "FIGHT")
        {
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName, " attacked ", enemyName, ". ", enemyName, " now has ", enemyHealth, " health remaining.");

            if (enemyHealth <= 0)
            {
                window.alert(enemyName + " has died!");
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
            }
            else
            {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }

        //SKIP
        else if (promptFight === "skip" || promptFight === "SKIP")
        {
            //confirmation
            var confirmSkip = window.confirm("Are you sure you would like to quit?");

            if (confirmSkip)
            {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                playerMoney = playerMoney - 2;
            }
            else
            {
                fight();
            }
        }

        //Invalid response
        else
        {
            window.alert("You need to choose a valid option. Try again!");
        }
    }

};


for(var i=0; i < enemyNames.length; i++)
{
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(enemyNames[i]);
}