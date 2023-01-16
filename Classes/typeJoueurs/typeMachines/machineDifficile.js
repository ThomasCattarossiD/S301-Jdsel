/*
 Code : Classe MachineDifficile
 But :  La classe permettant à une machine de niveau difficile de jouer au Memory
 Date de dernière modification : 16 Janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/


// On importe la classe Joueur
import { JoueurMachine } from "../joueurMachine"

// On crée la classe MachineDifficile qui étend la classe abstraite JoueurMachine
export class MachineDifficile extends JoueurMachine{
    // ATTRIBUTS -non-

    // ENCAPSULATION -non-

    // CONSTRUCTEUR
    constructor(pseudonyme){
        super(pseudonyme)

        this.setCapaMem(24)
        this.setProbaOubli(0.3)
        this.setDifficulte(3)
    }

    // METHODES Métier
    retenirCartesHumains(carte1, carte2){
        // L'index de la carte en position carte1
        let index = this.getMonMemory().retournerIndexParPosition(carte1)
        // On récupère la carte en position carte1
        let carte = this.getMonMemory.getMesCartes()[index]
        // On place la carte dans notre mémoire
        this.retenirUneCarte(carte)

        // L'index de la carte en position carte2
        index = this.getMonMemory().retournerIndexParPosition(carte1)
        // On récupère la carte en position carte2
        carte = this.getMonMemory.getMesCartes()[index]
        // On place la carte dans notre mémoire
        this.retenirUneCarte(carte)
    }

    choixUneCarte(){
        // On récupère la liste des positions possibles
        let listePositions = localStorage.getItem("lesPositions")

        // On récupère la liste des positions des cartes que l'on connait
        let listeCartes = []
        // On parcourt la mémoire de 0 à la taille de la mémoire -1 avec un traitement systématique
        for(let i = 0; i < this.getMemoire().length; i ++){
            // On place la position dans listeCartes
            listeCartes.push(this.getMemoire()[i].getPosition())
        }

        // On créé une liste des positions que l'on ne connait pas
        let listeNonConnues = []
        // Pour chaque position de listePositions
        for(i = 0; i < listePositions.length; i++){
            // Si les positions des cartes de la mémoire de contiennent pas la position i
            if(!(listeCartes.includes(listePositions[i]))){
                // Alors on rajoute la position à la liste des positions que l'on ne connait pas
                listeNonConnues.push(listePositions[i])
            }
        }

        // On récupère une valeur aléatoire entre 0 et la taille de la liste des positions que l'on ne connait pas
        let index = ~~(Math.random() * listeNonConnues.length)

        // On récupère la position a cet index
        let position = listeNonConnues[index]

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