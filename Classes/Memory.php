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
        $liste = array_diff($this->getMesJoueurs(), [$unJoueur]);
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
        $liste = array_diff($this->getMesCartes(), [$uneCarte]);
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
    function initCartes(){
        $lettres = array(0=>'A', 1=>'B', 2=>'C', 3=>'D', 4=>'E', 5=>'F');
        $listeValeurs = array();
        for($i = 1; $i <= (Memory::NB_CARTES) / 2; $i ++){
            array_push($listeValeurs, $i, $i);
        }
        $indice = 0;
        for($i = 0; $i < (Memory::NB_CARTES); $i ++){
            $reste = $indice % sizeof($lettres);
            if($reste == 0){
                $quotient = $indice / sizeof($lettres);
                $lettreUne = $lettres[$quotient];
            }
            $reste = $i % sizeof($lettres);
            $message = $lettreUne . $lettres[$reste];
            $cle = array_rand($listeValeurs);
            $nouvelleCarte = new Carte($message, $listeValeurs[$cle]);
            $this->ajouterCarte($nouvelleCarte);
            array_diff_key($listeValeurs, array($cle));
            $indice += 1;
        }
    }

    function afficherJeu(){
        echo "<article class='grilleJeu'>";
        foreach($this->getMesCartes() as $uneCarte){
            $uneCarte->afficherCarte();
        }
        echo "</article>";
    }
}


?>