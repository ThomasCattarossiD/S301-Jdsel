<?php

class Memory {
    // ATTRIBUTS
    const NB_CARTES = 36;      // Le nombre de cartes
    private int $nbJoueurs;     // Un entier contenant le nombre de joueurs durant le jeu
    private array $mesJoueurs;    // Une array contenant les joueurs jouant au Jeu
    private array $mesCartes;     // Une array contenant les cartes restantes en Jeu

    // CONSTRUCTEUR
    public function __construct(){
        $this->mesCartes = array();
        $this->mesJoueurs = array();
    }

    // ENCAPSULATION
    function getNbJoueurs(){
        return $this->nbJoueurs;
    }
    function setNbJoueurs($nombre){
        $this->nbJoueurs = $nombre;
    }

    function getMesJoueurs(){
        return $this->mesJoueurs;
    }
    function setMesJoueurs($liste){
        $this->mesJoueurs = $liste;
    }

    function getMesCartes(){
        return $this->mesCartes;
    }
    function setMesCartes($liste){
        $this->mesCartes = $liste;
    }

    // METHODES Spécifiques
    function ajouterJoueur($unJoueur){
        $liste = $this->getMesJoueurs();
        array_push($liste, $unJoueur);
        $this->setMesJoueurs($liste);
    }

    function retirerJoueur($unJoueur){
        $liste = array_diff($this->getMesJoueurs(), array($unJoueur));
        $this->setMesJoueurs($liste);
    }

    function existeJoueur($unJoueur){
        return in_array($unJoueur, $this->getMesJoueurs());
    }

    function ajouterCarte($uneCarte){
        $liste = $this->getMesCartes();
        array_push($liste, $uneCarte);
        $this->setMesCartes($liste);
    }

    function retirerCarte($uneCarte){
        $cle = array_search($uneCarte, $this->getMesCartes());
        $liste = $this->getMesCartes();
        unset($liste[$cle]);
        $this->setMesCartes($liste);
    }

    function existeCarte($uneCarte){
        return in_array($uneCarte, $this->getMesCartes());
    }

    // METHODE Usuelle
    function toString(){
        $message = "Ce Jeu du Memory a " . (string)$this->getNbJoueurs() . " Joueurs : ";
        return $message;
    }

    // METHODES Métier

    // On créé toutes nos cartes et on les place dans la variable mesCartes
    // >> initCartes >> this->mesCartes
    function initCartes(){
        // ATTRIBUTS
        $lettres = array(0=>'A', 1=>'B', 2=>'C', 3=>'D', 4=>'E', 5=>'F');   // Une liste contenant les lettres utilisées pour le positionnement des cartes
        $listeValeurs = array();    // Une liste contenant les valeurs possibles pour les cartes
        $indice = 0;        // Un indice dont nous nous servirons pour placer la carte dans sa ligne

        // TRAITEMENTS

        // On remplit la liste de valeurs listeValeurs
        // On créé une boucle avec un indice i qui va de 1 au nombre de cartes / 2
        for($i = 1; $i <= (Memory::NB_CARTES) / 2; $i ++){
            // Pour chaque i, on l'ajoute deux fois à la liste des valeurs car la valeur i apparaitra deux fois (paire de carte)
            array_push($listeValeurs, $i, $i);
        }

        // On crée nos cartes et on les place dans la variable mesCartes
        // On créé une boucle avec un indice i qui va de 0 au nombre de cartes
        for($i = 0; $i < (Memory::NB_CARTES); $i ++){
            // On récupère le reste de la division de l'indice par le nombre de carte
            $reste = $indice % sizeof($lettres);    // Le reste correspond au numéro de la colonne
            // Si le reste vaut 0 alors on calcule le quotient, la clé permettant d'obtenir la lettre correspondant à la ligne
            if($reste == 0){
                $quotient = $indice / sizeof($lettres);
                $lettreUne = $lettres[$quotient];
            }
            // On compose la position de la carte
            $position = $lettreUne . $lettres[$reste];
            // Parmis les valeurs possible, on récupère de manière aléatoire la clé pointant vers l'une d'entre elles
            $cle = array_rand($listeValeurs);
            // On crée une carte à partir de la position et de la valeur liée à la clé
            $nouvelleCarte = new Carte($position, $listeValeurs[$cle]);
            // On ajoute la carte à this-mesCartes
            $this->ajouterCarte($nouvelleCarte);
            // On sort la valeur de listeValeurs se trouvant à l'indice clé
            array_diff_key($listeValeurs, array($cle));
            // On incrémente l'indice
            $indice += 1;
        }
    }

    // On cherche à afficher le jeu
    function afficherJeu(){
        // On ouvre un article dont la classe en css permet de créer une grille
        echo "<article class='grilleJeu'>";
        // Pour chaque carte on lance la fonction afficherCarte()
        foreach($this->getMesCartes() as $uneCarte){
            $uneCarte->afficherCarte();
        }
        // On ferme l'article
        echo "</article>";
    }
}


?>