
<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>Memory</title>
        <link rel="stylesheet" href="VisuelsPage/Css/jeu.css">
    </head>
    <body>
        <?php
            //ini_set('display_errors', 1);
            //ini_set('display_startup_errors', 1);
            //error_reporting(E_ALL);
            include (dirname(__FILE__) . "./Classes/Memory.php");
            include (dirname(__FILE__) . "./Classes/Carte.php");
            $monMemory = new Memory();
            $monMemory->initCartes();
            $monMemory->afficherJeu();
            

        ?>
    </body>
</html>