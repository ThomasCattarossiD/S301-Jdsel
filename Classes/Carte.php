<?php

class Carte {
    // ATTRIBUTS
    private string $positionCarte;
    private int $valeur;
    private bool $estRetournee;
    private Memory $monMemory;


    // CONSTRUCTEUR
    public function __construct($position, $val){
        $this->positionCarte = $position;
        $this->valeur = $val;
        $this->estRetournee = false;
    }

    // ENCAPSULATION
    public function getPosition(){
        return $this->positionCarte;
    }
    public function setPosition($position){
        $this->positionCarte = $position;
    }

    public function getValeur(){
        return $this->valeur;
    }
    public function setValeur($val){
        $this->valeur = $val;
    }

    public function getEstRetournee(){
        return $this->estRetournee;
    }
    public function  setEstRetournee($face){
        $this->estRetournee = $face;
    }

    // METHODES Usuelles
    public function toString(){
        $retour = 'Cette carte a pour position ' . $this->getPosition() . ' et pour valeur ' . $this->getValeur() . '.';
        if($this->getEstRetournee()){
            $retour .= ' Cette carte est retournée.';
        }
        else {
            $retour .= " Cette carte n'est pas retournée.";
        }
        return $retour;
    }

    public function equals($uneCarte){
        return $this->getValeur() == $uneCarte->getValeur();
    }

    // METHODES Spécifiques
    public function lierMonMemory($unMemory){
        $this->monMemory = $unMemory;
        if(!($unMemory->existeCarte($this))){
            $unMemory->ajouterCarte($this);
        }
    }

    public function delierMonMemory(){
        $this->monMemory->retirerCarte($this);
        $this->monMemory = null;
    }

    // METHODES Métier
    public function retournerCarte(){
        $this->estRetournee = !$this->estRetournee;
    }

    // On cherche à afficher la carte
    public function afficherCarte(){
        // On vérifie si la carte est retournée
        if($this->estRetournee){
            // Si la carte est retournée on souhaite afficher sa valeur
            $affiche = $this->getValeur();
        }
        else{
            // Sinon on affiche sa position
            $affiche = $this->getPosition();
        }
        // On sépare la position de la carte en deux caractères, le premier correspond à la ligne et le second à la colonne
        $liste = str_split($this->positionCarte);
        // On place la carte dans la grille, les deux premières classes pour son placement et la dernière pour ce à quoi elle ressemble
        echo "<p class='un$liste[0] deux$liste[1] carte'>$affiche</p>";
    }
}


?>