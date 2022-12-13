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

    public function afficherCarte(){
        if($this->estRetournee){
            $affiche = $this->getValeur();
        }
        else{
            $affiche = $this->getPosition();
        }
        $liste = str_split($this->positionCarte);
        echo "<p class='un$liste[0] deux$liste[1] carte'>$affiche</p>";
    }
}


?>