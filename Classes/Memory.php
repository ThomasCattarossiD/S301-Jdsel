<?php
include ("Joueur.php");
include ("Carte.php");

class Memory {
    // ATTRIBUTS
    private int $nbJoueurs;     // Un entier contenant le nombre de joueurs durant le jeu
    private array $mesJoueurs;    // Une array contenant les joueurs jouant au Jeu
    private array $mesCartes;     // Une array contenant les cartes restantes en Jeu

    // CONSTRUCTEUR
    public function __construct(){}

    // ENCAPSULATION
    public function getNbJoueurs(){
        return $this->$nbJoueurs;
    }
    public function setNbJoueurs($nombre){
        $this->$nbJoueurs = $nombre;
    }

    public function getMesJoueurs(){
        return $this->$mesJoueurs;
    }
    public function setMesJoueurs($liste){
        $this->$mesJoueurs = $liste;
    }

    public function getMesCartes(){
        return $this->$mesCartes;
    }
    public function setMesCartes($liste){
        $this->$mesCartes = $liste;
    }

    // METHODES Spécifiques
    public function ajouterJoueur($unJoueur){
        array_push($this->$mesJoueurs, $unJoueur);
    }

    public function retirerJoueur($unJoueur){
        array_diff($this->$mesJoueurs, [$unJoueur]);
    }

    public function viderJoueurs(){
        unset($this->$mesJoueurs);
    }

    public function ajouterCarte($uneCarte){
        array_push($this->$mesCartes, $uneCarte);
    }

    public function retirerCarte($uneCarte){
        array_diff($this->$mesCartes, [$uneCarte]);
    }

    public function viderCartes(){
        unset($this->$mesCartes);
    }

    // METHODE Usuelle
    public function toString(){
        $message = "Ce Jeu du Memory a " . (string)getNbJoueurs() . " Joueurs : ";
        return $message;
    }

    // METHODES Métier

}


?>