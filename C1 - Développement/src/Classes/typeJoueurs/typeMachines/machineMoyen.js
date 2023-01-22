/*
 Code : Classe MachineMoyen
 But :  La classe permettant à une machine de niveau moyenne de jouer au Memory
 Date de dernière modification : 17 janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/


// On importe la classe JoueurMachine
import { JoueurMachine } from "../joueurMachine.js"

// On crée la classe MachineMoyen qui étend la classe abstraite JoueurMachine
export class MachineMoyen extends JoueurMachine{
    // ATTRIBUTS -non-

    // ENCAPSULATION -non-

    // CONSTRUCTEUR
    constructor(pseudonyme){
        super(pseudonyme)

        this.setCapaMem(6)
        this.setProbaOubli(0.5)
        this.setDifficulte(2)
    }

    // METHODES Métier
    async retenirCartesHumains(posCarte1, posCarte2){
        // On récupère les indexs des cartes
        let index1 = this.getMonMemory().retournerIndexParPosition(posCarte1)
        let index2 = this.getMonMemory().retournerIndexParPosition(posCarte2)

        // On récupère les cartes elle memes
        let carte1 = this.getMonMemory().getMesCartes()[index1]
        let carte2 = this.getMonMemory().getMesCartes()[index2]

        if(!carte1.equals(carte2)){
            // On place la carte dans notre mémoire
            this.retenirUneCarte(carte2)
        }
        else{
            await this.retirerUneCarte(carte1)
            await this.retirerUneCarte(carte2)

        }

        //await this.afficherMemoire()
    }

    choixUneCarte(){
        // On récupère la liste des positions possibles
        let listePositions = localStorage.getItem("lesPositions")

        // On transforme la liste des positions possibles en un tableau
        let tableau = listePositions.split(',')

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
        for(let i = 0; i < tableau.length; i++){
            // Si les positions des cartes de la mémoire de contiennent pas la position i
            if(!(listeCartes.includes(tableau[i]))){
                // Alors on rajoute la position à la liste des positions que l'on ne connait pas
                listeNonConnues.push(tableau[i])
            }
        }

        // On récupère une valeur aléatoire entre 0 et la taille de la liste des positions que l'on ne connait pas
        let index = ~~(Math.random() * (listeNonConnues.length - 1))

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

        // On récupère l'index de la position dans le memory
        index = this.getMonMemory().retournerIndexParPosition(position)
        
        // On retourne la carte
        this.getMonMemory().getMesCartes()[index].retournerCarte()

        // On récupère la carte
        let carte = this.getMonMemory().getMesCartes()[index]
        // On place la carte dans notre mémoire
        this.retenirUneCarte(carte)

        //localStorage.setItem('memoryMoyen', this.getMemoire())

        return Promise.resolve
    }


}