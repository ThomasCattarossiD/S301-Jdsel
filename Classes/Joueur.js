/*
 Code : Classe Abstraite Joueur
 But :  Une classe abstraite contenant des attributs et fonctions partagés par tous les joueurs. Certaines fonctions sont à redéfinir dans les classes filles
 Date de dernière modification : 17 janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/

// On inclue la classe Memory
import {Memory} from "./Memory.js"

// On créé la classe Joueur
export class Joueur {

    // ATTRIBUTS
    #pseudo     // Le pseudonyme du joueur
    #score      // Le score du joueur
    #monMemory  // La partie de Memory à laquelle joue le Joueur

    // CONSTRUCTEUR
    constructor(pseudonyme){
        // Si le constructeur appelé est celui de la classe abstraite Joueur on renvoie une Erreur
        if(this.constructor === Joueur){
            throw new TypeError('Classe abstraite "Joueur" ne peut pas être instanciée directement')
        }
        // Sinon on continue

        // On définit le pseudo et le score
        this.#pseudo = pseudonyme
        this.#score = 0
    }

    // ENCAPSULATION
    //        >> getPseudo() >> pseudo
    getPseudo(){
        return this.#pseudo
    }
    // pseudonyme >> setPseudo() >>
    setPseudo(pseudonyme){
        this.#pseudo = pseudonyme
    }

    //        >> getScore() >> score
    getScore(){
        return this.#score
    }
    // newScore >> setScore() >>
    setScore(newScore){
        this.#score = newScore
    }

    //        >> getMonMemory() >> monMemory
    getMonMemory(){
        return this.#monMemory
    }

    // METHODES USUELLES
    // On transforme l'élément Joueur en une chaîne de caractères compréhensible par l'homme
    toString(){
        // On créé le message puis on le retourne
        let message = "Le joueur " + this.#pseudo + " a un score de " + this.#score + "."
        return message
    }

    // METHODES SPÉCIFIQUES
    // On lie unMemory au joueur
    lierMonMemory(unMemory){
        // monMemory devient unMemory
        this.#monMemory = unMemory
        // Si le joueur n'existe pas dans la liste de joueurs du nouveau Memory on l'y ajoute
        if(!(unMemory.existeJoueur(this))){
            unMemory.ajouterJoueur(this)
        }
    }

    // On délie unMemory du joueur
    delierMonMemory(){
        // On retire le Joueur de la liste des joueurs de monMemory
        this.#monMemory.retirerJoueur(this)
        // On passe monMemory a null
        this.#monMemory = null;
    }

    // METHODES MÉTIER
    // Le joueur signale au Memory qu'il a joué son coup
    async notifierCoup(){
        // On attend que le Memory ait fini son traitement
        await this.#monMemory.unJoueurAJoue(this.#pseudo)
        // On indique a Javascript qu'il peut reprendre son fonctionnement normal
        return Promise.resolve()
    }
    
    // On affiche le score et le pseudo d'un joueur
    afficherScoreJoueur(){
        // On créé un élément texte 
        let leJoueur = document.createElement("p")
        leJoueur.textContent = this.#pseudo + " : " + this.#score + " points."
        // On ajoute l'élément texte à l'affichage des scores
        let mesScores = document.getElementById('lesScores')
        mesScores.appendChild(leJoueur)
    }

    // METHODES ABSTRAITES
    // On demande au joueur de retenir les cartes d'un joueur humain
    // Cette méthode est abstraite et à définir dans les classes filles
    retenirCartesHumains(carte1, carte2){
        throw new Error('Cette méthode est abstraite dans une classe abstraite')
    }

    // La méthode de Jeu est abstraite par défaut et sera définie par les classes enfant
    methodeDeJeu(){
        throw new Error('Cette méthode est abstraite dans une classe abstraite')
    }

}