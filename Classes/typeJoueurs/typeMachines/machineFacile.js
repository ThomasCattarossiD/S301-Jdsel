/*
 Code : Classe MachineFacile
 But :  La classe permettant à une machine de niveau facile de jouer au Memory
 Date de dernière modification : 16 Janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/


// On importe la classe JoueurMachine
import { JoueurMachine } from "../joueurMachine"

// On crée la classe MachineFacile qui étend la classe abstraite JoueurMachine
export class MachineFacile extends JoueurMachine{
    // ATTRIBUTS -non-

    // ENCAPSULATION -non-

    // CONSTRUCTEUR
    constructor(pseudonyme){
        super(pseudonyme)

        this.setCapaMem(0)
        this.setProbaOubli(0.7)
        this.setDifficulte(1)
    }

    // METHODES Métier
    retenirCartesHumains(carte1, carte2){
        
    }

    choixUneCarte(){
        // On récupère la liste des positions possibles
        let listePositions = localStorage.getItem("lesPositions")

        // On récupère une valeur aléatoire entre 0 et la taille de la liste des positions possibles
        let index = ~~(Math.random() * listePositions.length)

        // On récupère la position a cet index
        let position = listePositions[index]

        // Si coup1 est vide dans le local storage
        if(localStorage.getItem("Coup1") == "empty"){
            // La position est placée dans Coup1
            localStorage.setItem("Coup1", position)
        }
        // Sinon
        else{
            // La position est placée dans Coup2
            localStorage.setItem("Coup2", position)
        }
    }


}