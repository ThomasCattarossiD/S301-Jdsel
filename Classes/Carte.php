<?php

include("Memory.php")

class Carte {
    // ATTRIBUTS
    private string $positionCarte;
    private int $valeur;
    private boolean $estRetournee;
    private Memory monMemory;


    // CONSTRUCTEUR
    public Carte($position, $val){
        $this->$positionCarte = $position;
        $this->$valeur = $val;
        $this->$estRetournee = false;
    }

    // ENCAPSULATION
    public getPosition(){
        return $this->$positionCarte;
    }
    public setPosition($position){
        $this->$positionCarte = $position;
    }

    public getValeur(){
        return $this->$valeur;
    }
    public setValeur($val){
        $this->$valeur = $val;
    }

    public getEstRetournee(){
        return $this->$estRetournee;
    }
    public setEstRetournee($face){
        $this->$estRetournee = $face;
    }

    // METHODES Usuelles
    public toString(){
        $retour = 'Cette carte a pour position ' . $this->getPosition() . ' et pour valeur ' . $this->getValeur() . '.';
        if($this->getEstRetournee()){
            $retour .= ' Cette carte est retournée.';
        }
        else {
            $retour .= " Cette carte n'est pas retournée.";
        }
        return $retour;
    }

    public equals($uneCarte){
        return $this->getValeur() == $uneCarte->getValeur();
    }

    // METHODES Spécifiques
    public lierMonMemory($unMemory){
        $this->monMemory = $unMemory;
        if(!($unMemory->existeCarte($this))){
            $unMemory.ajouterCarte($this);
        }
    }

    public delierMonMemory(){
        $this->monMemory.retirerCarte($this);
        $this->monMemory = null;
    }

    // METHODES Métier
    public retournerCarte(){
        $this->$estRetournee = !$this->$estRetournee;
    }

    public afficherCarte(){
        if($this->$estRetournee){
            $affiche = $this->getValeur();
        }
        else{
            $affiche = $this->getPosition();
        }
        $liste = explode($this->getPosition());
        echo "<p class='1$liste[0] 2$liste[1]'>$affiche</p>";
    }
}


?>