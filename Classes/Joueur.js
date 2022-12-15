import {Memory} from "./Memory.js"

export class Joueur {

    // ATTRIBUTS
    #pseudo
    #score = 0
    #monMemory

    // CONSTRUCTEUR
    constructor(pseudonyme){
        if(this.constructor === Joueur){
            throw new TypeError('Classe abstraite "Joueur" ne peut pas être instanciée directement')
        }
        this.#pseudo = pseudonyme
    }

    // ENCAPSULATION
    getPseudo(){
        return this.#pseudo
    }
    setPseudo(str){
        this.#pseudo = str
    }

    getScore(){
        return this.#score
    }
    setScore(newScore){
        this.#score = newScore
    }

    getMonMemory(){
        return this.#monMemory
    }

    // METHODES Usuelles
    toString(){
        let message = "Le joueur " + this.#pseudo + " a un score de " + this.#score + "."
        return message
    }

    // METHODES Spécifiques
    afficherScoreJoueur(){
        let leJoueur = document.createElement("p")
        leJoueur.textContent = this.#pseudo + " : " + this.#score + " points."
        let mesScores = document.getElementById('lesScores')
        mesScores.appendChild(leJoueur)
    }

    lierMonMemory(unMemory){
        this.#monMemory = unMemory
        if(!(unMemory.existeJoueur(this))){
            unMemory.ajouterJoueur(this)
        }
    }

    delierMonMemory(){
        this.#monMemory.retirerJoueur(this)
        this.#monMemory = null;
    }

    // METHODES Métier
    notifierCoup(carte1, carte2){
        this.#monMemory.unJoueurJoue(carte1, carte2)
    }

    // METHODES Abstrites
    retenirCartesHumains(carte1, carte2){
        throw new Error('Cette méthode est abstraite dans une classe abstraite')
    }

    methodeDeJeu(){
        throw new Error('Cette méthode est abstraite dans une classe abstraite')
    }

}