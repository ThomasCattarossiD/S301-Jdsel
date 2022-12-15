import {Carte} from "./Carte.js"
import {Joueur} from "./Joueur.js"

export class Memory{
    
    #mesJoueurs
    #mesCartes

    // Constructeur
    constructor(){
        this.nbCartes = 36
        this.#mesJoueurs = []
        this.#mesCartes = []
        this.initCartes();
    }

    // Encapsulation
    getMesJoueurs(){
        return this.#mesJoueurs
    }
    setMesJoueurs(listeJoueurs){
        this.#mesJoueurs = listeJoueurs
    }

    getMesCartes(){
        return this.#mesCartes
    }
    setMesCartes(listeCartes){
        this.#mesCartes = listeCartes
    }

    // Méthodes spécifiques
    ajouterJoueur(unJoueur){
        this.#mesJoueurs.push(unJoueur)
    }
    retirerJoueur(unJoueur){
        for(let i = 0; i < this.#mesJoueurs.length; i ++){
            if(this.#mesJoueurs[i] == unJoueur){
                this.#mesJoueurs.slice(i, 1)
            }
        }
    }
    existeJoueur(unJoueur){
        return this.#mesJoueurs.includes(unJoueur)
    }

    ajouterCarte(uneCarte){
        this.#mesCartes.push(uneCarte)
    }
    retirerCarte(uneCarte){
        for(let i = 0; i < this.#mesCartes.length; i ++){
            if(this.#mesCartes[i] == uneCarte){
                this.#mesCartes.splice(i, 1)
            }
        }
        let listePositions = localStorage.getItem('lesPositions')
        listePositions.slice(listePositions.indexOf(uneCarte.getPosition()), 1)
        localStorage.setItem('lesPositions', listePositions)
        return Promise.resolve()
    }

    existeCarte(uneCarte){
        return this.#mesCartes.includes(uneCarte)
    }

    // METHODE Usuelle
    toString(){
        let message = "Un jeu de memory"
        return message
    }

    // METHODE Métier
    initCartes(){
        // ATTRIBUTS
        let lettres = ['A', 'B', 'C', 'D', 'E', 'F']
        let tailleLettres = 6
        let listeValeurs = []
        let indice = 0
        let listePosition = []

        // TRAITEMENTS
        
        for(let i = 1; i <= this.nbCartes / 2; i++){
            listeValeurs.push(i, i)
        }

        for(let i = 0; i < this.nbCartes; i++){
            let reste = indice % tailleLettres

            let lettreUne = lettres[(indice - reste)/tailleLettres]
            //window.alert(lettreUne)
            
            let position =  lettreUne + lettres[reste]
            
            let index = ~~(Math.random() * listeValeurs.length)

            let valeurCarte = listeValeurs[index]

            listeValeurs.splice(index, 1)

            let uneCarte = new Carte(position, valeurCarte)
            window.alert(listeValeurs)

            this.ajouterCarte(uneCarte)

            indice += 1

            listePosition.push(position)
            
        }
        localStorage.setItem('lesPositions', listePosition)
    }

    retournerIndexParPosition(position){
        for(let i = 0; i < this.#mesCartes.length; i++){
            if(this.#mesCartes[i].getPosition() == position){
                return i
            }
        }
        return -1
    }

    retournerIndexParPseudonyme(pseudo){
        for(let i = 0; i < this.#mesJoueurs.length; i++){
            if(this.#mesJoueurs[i].getPseudo() == pseudo){
                return i
            }
        }
        return -1
    }

    afficherUneCarte(laCarte){
        laCarte.afficherCarte()
    }

    afficherUnJoueur(leJoueur){
        leJoueur.afficherScoreJoueur()
    }

    async jouerJeu(){
        await this.afficherJeu();
        let indice = 0
        localStorage.setItem('paireTrouvee', 'yes')
        localStorage.setItem('paireJouee', 'no')
        while(this.#mesCartes.length != 0){
            let message = this.#mesJoueurs[indice].getPseudo() + " joue."
            let affichage = document.getElementById('affichage')
            affichage.textContent = message
            while(localStorage.getItem('paireTrouvee') == 'yes'){
                await this.#mesJoueurs[indice].methodeDeJeu()
                localStorage.setItem('paireJouee', 'no')
            }
            indice = (indice + 1) % this.#mesJoueurs.length
            localStorage.setItem('paireTrouvee', 'yes')
        }
    }

    afficherJeu(){
        let mesScores = document.getElementById('lesScores')
        mesScores.innerHTML = ""
        this.getMesJoueurs().forEach(this.afficherUnJoueur)
        let maGrille = document.getElementById('laGrilleDeJeu')
        maGrille.innerHTML = ""
        this.getMesCartes().forEach(this.afficherUneCarte)
        return Promise.resolve()
    }

    async unJoueurAJoue(pseudonyme){
        let coup1 = localStorage.getItem("Coup1")
        let coup2 = localStorage.getItem("Coup2")
        if(this.#mesCartes[this.retournerIndexParPosition(coup1)].equals(this.#mesCartes[this.retournerIndexParPosition(coup2)])){
            await this.retirerCarte(this.#mesCartes[this.retournerIndexParPosition(coup1)])
            await this.retirerCarte(this.#mesCartes[this.retournerIndexParPosition(coup2)])
            let indice = this.retournerIndexParPseudonyme(pseudonyme)
            this.#mesJoueurs[indice].setScore(this.#mesJoueurs[indice].getScore() + 1)
            localStorage.setItem('paireTrouvee', 'yes')
        }
        else{
            this.#mesCartes[this.retournerIndexParPosition(coup1)].retournerCarte()
            this.#mesCartes[this.retournerIndexParPosition(coup2)].retournerCarte()
            localStorage.setItem('paireTrouvee', 'no')
        }
        await this.sommeilAffichage()
        localStorage.setItem('paireJouee', 'yes')
        return Promise.resolve()
    }

    sommeilAffichage(){
        setTimeout(() => {this.afficherJeu()}, 3000)
        return Promise.resolve()
    }

}

