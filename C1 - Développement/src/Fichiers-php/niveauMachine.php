<?php
    // On renvoit vers la page main.html
    header("Refresh:0.1; url=../Main.html");

    // Si on connait le niveau de la machine
    if(isset($_POST['lvlMachine'])){
        // On récupère le niveau de la machine
        $niveauMachine = $_POST['lvlMachine'];

        // On place le niveau de la machine dans une variable locale javascript
        print "<script type='text/javascript'>localStorage.setItem('nivMachine', '$niveauMachine')</script>";
    }
    else{
        // Sinon on place qu'il n'y a pas de machine dans une variable locale javascript
        print "<script type='text/javascript'>localStorage.setItem('nivMachine', 'none')</script>";
    }



?>