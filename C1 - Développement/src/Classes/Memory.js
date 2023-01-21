/*
 Code : Classe Memory
 But :  Permettre à un utilisateur de jouer au jeu du Memory contre un autre utilisateur local ou un ordinateur
 Date de dernière modification : 17 janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/

// On importe les classes qui seront nécessaires au bon déroulement du code
import {Carte} from "./Carte.js"
import {Joueur} from "./Joueur.js"


// On créé la classe Memory
export class Memory{
    
    // ATTRIBUTS
    #mesJoueurs     // La liste contenant les Joueurs
    #mesCartes      // La liste contenant les Cartes
    #nbCartes       // Le nombre de cartes dans le jeu

    // CONSTRUCTEUR
    //        >> constructor >> (un jeu de Memory)
    constructor(){
        this.nbCartes = 36      // On place le nombre de cartes à 36
        this.#mesJoueurs = []   // On indique que mesJoueurs est une liste vide
        this.#mesCartes = []    // On indique que mesCartes est une liste vide
        this.initCartes();      // On lance la fonction d'initialisation des cartes
    }

    // ENCAPSULATION
    //        >> getMesJoueurs() >> mesJoueurs
    getMesJoueurs(){
        return this.#mesJoueurs
    }
    // listeJoueurs >> setMesJoueurs() >>
    setMesJoueurs(listeJoueurs){
        this.#mesJoueurs = listeJoueurs
    }

    //        >> getMesCartes() >> mesCartes
    getMesCartes(){
        return this.#mesCartes
    }
    // listeCartes >> setMesCartes() >>
    setMesCartes(listeCartes){
        this.#mesCartes = listeCartes
    }

    //   >> getNbCartes() >> nbCartes
    getNbCartes(){
        return this.#nbCartes
    }
    // unEntier >> setNbCartes() >> 
    setNbCartes(unEntier){
        if((unEntier % 2) != 0){
            throw new Error("Le nombre de cartes doit être pair")
        } 
        this.#nbCartes = unEntier
    }

    // MÉTHODES SPÉCIFIQUES
    // On ajoute un joueur à la liste mesJoueurs
    ajouterJoueur(unJoueur){
        // On place le joueur dans la liste
        this.#mesJoueurs.push(unJoueur)
        // Si le Memory que le joueur connait n'est pas celui-ci alors on change son Memory
        if(unJoueur.getMonMemory() != this){
            unJoueur.lierMonMemory(this)
        }
    }

    // On retire un joueur de la liste mesJoueurs
    retirerJoueur(unJoueur){
        // On parcourt la liste des joueurs
        for(let i = 0; i < this.#mesJoueurs.length; i ++){
            // Si le Joueur est présent dans la liste à l'indice i, on le retire et on retourne vrai
            if(this.#mesJoueurs[i] == unJoueur){
                this.#mesJoueurs.slice(i, 1)
                return true
            }
        }
        // Si le Joueur n'était pas dans la liste on retourne faux
        return false
    }

    // On vérifie l'existence d'un Joueur dans la liste
    existeJoueur(unJoueur){
        return this.#mesJoueurs.includes(unJoueur)
    }

    // On ajoute une carte à la liste mesCartes
    ajouterCarte(uneCarte){
        this.#mesCartes.push(uneCarte)
    }

    // On retire une carte de la liste mesCartes
    retirerCarte(uneCarte){
        // On parcourt la liste des cartes
        for(let i = 0; i < this.#mesCartes.length; i ++){
            // Si la Carte est présente dans la liste à l'indice i
            if(this.#mesCartes[i].getPosition() == uneCarte){
                // On retire la carte
                this.#mesCartes.splice(i, 1)
                // On récupère la liste des positions valables du stockage local
                let listePositions = localStorage.getItem('lesPositions')
                // On enlève la position de la carte
                let lesPositions = listePositions.substring(0, listePositions.indexOf(uneCarte))+ listePositions.substring(listePositions.indexOf(uneCarte) + 3)
                // On replace la liste des positions valables au même endroit
                localStorage.setItem('lesPositions', lesPositions)
                // On retourne vrai tout en disant à Javascript qu'il peut reprendre son cours normal
                return Promise.resolve(true)
            }
        }
        // On retourne faux tout en disant à Javascript qu'il peut reprendre son cours normal
        return Promise.resolve(false)
    }

    // On vérifie l'existence d'une carte dans la liste mesCartes
    existeCarte(uneCarte){
        return this.#mesCartes.includes(uneCarte)
    }

    // METHODE USUELLE
    // On transforme la classe Memory en une chaîne de caractères compréhensible par l'être humain
    toString(){
        // On créé le message
        let message = "Un jeu de memory"
        // On retourne le message
        return message
    }

    // METHODES MÉTIER

    // Création et placement dans la liste de toutes les cartes de notre jeu
    initCartes(){
        // ATTRIBUTS
        let lettres = ['A', 'B', 'C', 'D', 'E', 'F']    // Les lettres possibles pour le positionnement (de AA à FF)
        let tailleLettres = 6   // La taille de la liste lettres
        let listeValeurs = []   // La liste des valeurs qui pourront être prises par les cartes
        let listePosition = []  // Une liste qui contiendra toutes les positions des cartes

        // TRAITEMENTS
        
        // Chaque carte fait partie d'une paire dont les valeurs vont de 1 à nbCartes / 2
        // Pour chaque valeur allant de 1 à nbCartes / 2 (36 à la date 28 décembre 2022)
        for(let i = 1; i <= this.nbCartes / 2; i++){
            // On place deux foix cette valeur dans la liste des valeurs possibles
            listeValeurs.push(i, i)
        }

        // Pour toutes les cartes qui seront dans le jeu
        for(let i = 0; i < this.nbCartes; i++){

            // On récupère le reste de la division euclidienne de l'indice i par la taille du tableau lettres
            let reste = i % tailleLettres

            // On calcule la première lettre comme étant la division de l'indice i par la taille du tableau lettres.
            // On soustrait le reste à l'indice i afin d'obtenir un entier entre 0 et 6 et non un flottant
            let lettreUne = lettres[(i - reste)/tailleLettres]
            //window.alert(lettreUne)
            
            // La position de la carte correspond donc à la première lettre, suivie de la lettre du tableau dont l'indice correspond au reste
            let position =  lettreUne + lettres[reste]
            
            // On récupère aléatoirement l'index d'une valeur parmis la liste des valeurs possible
            let index = ~~(Math.random() * listeValeurs.length)

            // Cette valeur aléatoire correspond à la valeur de la carte
            let valeurCarte = listeValeurs[index]

            // On enlève cette valeur de la liste des valeurs possibles
            listeValeurs.splice(index, 1)

            // On créé une carte avec sa position et sa valeur
            let uneCarte = new Carte(position, valeurCarte)
            //window.alert(listeValeurs)

            // On ajoute la carte à la liste
            this.ajouterCarte(uneCarte)

            // On rajoute la position dans la liste des positions des cartes
            listePosition.push(position)
            
        }
        // On place la liste des positions des cartes dans le stockage local
        localStorage.setItem('lesPositions', listePosition)
    }

    // On cherche l'index d'une carte par sa position
    retournerIndexParPosition(position){
        // On fait une recherche de première occurrence
        for(let i = 0; i < this.#mesCartes.length; i++){
            if(this.#mesCartes[i].getPosition() == position){
                return i
            }
        }
        // Si rien n'est trouvé on retourne -1
        return -1
    }

    // On cherche l'index d'un joueur par son pseudonyme
    retournerIndexParPseudonyme(pseudo){
        // On fait une recherche de première occurrence
        for(let i = 0; i < this.#mesJoueurs.length; i++){
            if(this.#mesJoueurs[i].getPseudo() == pseudo){
                return i
            }
        }
        // Si rien n'est trouvé on retourne -1
        return -1
    }

    // Une fonction pour lancer l'affichage d'une carte
    afficherUneCarte(laCarte){
        laCarte.afficherCarte()
    }

    // Une fonction pour lancer l'affichage du score d'un joueur
    afficherUnJoueur(leJoueur){
        leJoueur.afficherScoreJoueur()
    }

    // Les joueurs jouent la partie
    // Cette fonction est asynchrone car on souhaite attendra la fin de certaines fonctions avant de continuer à jouer
    async jouerJeu(){
        // VARIABLES
        let indice = 0      // L'indice du joueur qui est actuellement entrain de jouer

        // TRAITEMENTS
        // On place dans le stockage local l'information que la partie est en cours
        localStorage.setItem("EtatPartie", "EnCours")
        // On commence par placer dans le stockage local qu'une paire a été trouvée mais qu'aucune n'a été jouée
        localStorage.setItem('paireTrouvee', 'yes') // Si on ne place pas ceci tous les joueurs passeront leurs tours de force
        localStorage.setItem('paireJouee', 'no')    // Si on ne place pas ceci les joueurs ne pourront pas jouer durant leur tour

        // On lance la fonction d'affichage du jeu et on attend sa fin
        await this.afficherJeu();

        // On continue à joueur tant qu'il y a des cartes
        while(this.#mesCartes.length != 0){
            // On créé le message déclarant qui joue
            let message = this.#mesJoueurs[indice].getPseudo() + " joue."

            // On récupère l'élément d'affichage des messages et on y place notre message
            let affichage = document.getElementById('affichage')
            affichage.textContent = message

            // Tant que le joueur a trouvé une paire il continue
            while(localStorage.getItem('paireTrouvee') == 'yes'){

                // Le programme attend que le joueur ait fini de joueur
                await this.#mesJoueurs[indice].methodeDeJeu()

                if(this.#mesCartes.length == 0){
                    break;
                }
                // Si le joueur a fini de jouer alors il a joué une paire, pour que le prochain puisse jouer on remodifie le stockage local
                localStorage.setItem('paireJouee', 'no')
            }

            // On ajoute un à l'indice tout en le gardant dans la taille de la liste des joueurs pour que les joueurs puissent passer plusieurs fois
            indice = (indice + 1) % this.#mesJoueurs.length

            // On modifie cela pour que les joueurs suivants puissent jouer
            localStorage.setItem('paireTrouvee', 'yes')
        }
        
        this.finirJeu()

    }

    // On traite la fin du jeu
    finirJeu(){
        let egalite = false // Un bouléen indiquant s'il y a eu égalité ou non au niveau du plus grand score
        let pseudo          // Le pseudonyme de la personne ayant le score le plus grand
        let score = 0       // Le score le plus grand 

        // On fait un parcours complet avec traitement conditionnel
        for(let i = 0; i < this.#mesJoueurs.length; i++){
            // Pour chaque joueur si le score est égal au plus grand score
            if(this.#mesJoueurs[i].getScore() == score){
                // L'égalité est vraie
                egalite = true
            }
            // Si le score est supérieur au plus grand score
            else if(this.#mesJoueurs[i].getScore() > score){
                // L'égalité est fausse
                egalite = false
                // On récupère le pseudonyme du joueur dont le score est le plus grand
                pseudo = this.#mesJoueurs[i].getPseudo()
                // Le score le plus grand devient le score du joueur
                score = this.#mesJoueurs[i].getScore()
            }
        }

        // S'il y a eu une égalité on l'affiche
        if(egalite){
            window.alert("Il y a égalité")
        }
        else{
            window.alert("Le joueur " + pseudo + " a gagné avec " + score + " paires.")
        }
    }

    // On souhaite afficher le jeu
    afficherJeu(){

        // On récupère l'élément d'affichage des scores et on le vide
        let mesScores = document.getElementById('lesScores')
        mesScores.innerHTML = ""

        // On lance l'affichage du score de chaque joueur
        this.getMesJoueurs().forEach(this.afficherUnJoueur)

        // On récupère l'élément d'affichage des cartes et on le vide
        let maGrille = document.getElementById('laGrilleDeJeu')
        maGrille.innerHTML = ""

        // On lance l'affichage de chaque carte
        this.getMesCartes().forEach(this.afficherUneCarte)

        // On dit à Javascript qu'il peut reprendre son déroulement normal
        return Promise.resolve()
    }

    // Cette fonction permet la vérification du coup d'un Joueur que l'on connait par son pseudonyme
    async unJoueurAJoue(pseudonyme){
        this.afficherJeu()

        // On récupère les indexs des coups du joueur
        let coup1 = localStorage.getItem("Coup1")
        let coup2 = localStorage.getItem("Coup2")
        // On dit à tous les joueurs sauf celui qui vient de jouer que l'un d'entre eux à joué
        for(let i = 0; i < this.#mesJoueurs.length; i++){
            if(this.#mesJoueurs[i].getPseudo() != pseudonyme){
                this.#mesJoueurs[i].retenirCartesHumains(coup1, coup2)
            }
        }
        // Si les cartes ont les mêmes valeurs
        if(this.#mesCartes[this.retournerIndexParPosition(coup1)].equals(this.#mesCartes[this.retournerIndexParPosition(coup2)])){
            // On attend d'avoir retirer les deux cartes du jeu
            await this.retirerCarte(coup1)
            await this.retirerCarte(coup2)
            
            // On récupère l'indice du joueur
            let indice = this.retournerIndexParPseudonyme(pseudonyme)

            // On ajoute un au score du joueur
            this.#mesJoueurs[indice].setScore(this.#mesJoueurs[indice].getScore() + 1)

            // On indique que le joueur a trouvé une paire et qu'il peut donc continuer à jouer
            localStorage.setItem('paireTrouvee', 'yes')

        }
        // Sinon
        else{
            // On retourne les deux cartes
            this.#mesCartes[this.retournerIndexParPosition(coup1)].retournerCarte()
            this.#mesCartes[this.retournerIndexParPosition(coup2)].retournerCarte()

            // On indique que le joueur n'a pas trouvé de paire et qu'il ne peut pas continuer à jouer
            localStorage.setItem('paireTrouvee', 'no')
        }

        // On attend trois secondes avant de poursuivre l'exécution
        await new Promise(r => setTimeout(r, 3000))
        await this.afficherJeu()

        // On indique que le joueur a tout de même joué une paire de cartes
        localStorage.setItem('paireJouee', 'yes')

        // On dit à Javascript qu'il peut reprendre son déroulement normal
        return Promise.resolve()
    }

}

