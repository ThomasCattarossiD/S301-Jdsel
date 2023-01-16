/**
 * Code: Classe JoueurMachine
 * But : La classe permet à la machine de jouer au jeu du Memory 
 * Date de dernière modification: 16 janvier 2023
 * Auteur: L. Gaigne
 * Remarques: Code conforme aux spécification internes données en cours
 */

//On import la classe Joueur
import { Joueur } from "../Joueur.js"

//On crée la classe JoueurMachine qui étend la classe abstraite Joueur
export class JoueurMachine extends Joueur{
    //ATTRIBUT
    #capaMem        //Nombre maximum de cartes que la machine peux se souvenir
    #memoire        //Tableau des cartes que la machine à en mémoire
    #probaOubli     //Nombre représentant la probabilité que une carte soit oublier par la machine
    #difficulte     //Nombre qui reprsente la difficulte de la machine entre 1 et 3 où une machine de difficulte 1 est faible et une machine de difficulte 3 est très fort
    
    //CONSTRUCTEUR - Pas besoin car déjà défini dans la classe Joueur

    //ENCAPSULATION
    //Permet de récuperer la capacité memoire de la machine
    getCapaMem(){
        return this.#capaMem;
    }
    //Permet d'initialiser la capacite de memoire de la machine
    setCapaMem(cM){
        this.#capaMem=cM;
    }

    //Permet de récuperer les cartes connu par la machine
    getMemoire(){
        return this.#memoire
    }
    //Transmettre une liste de carte au joueur machine qu'il doit connaître
    setMemoire(listeCartes){
        this.#memoire = listeCartes
    }
    
    //Permet de récuperer la probabilite d'oubli de carte de la machine
    getProbaOubli(){
        return this.#probaOubli;
    }
    //Permet d'initialiser la probabilite d'oubli de carte de la machine
    setProbaOubli(probabilite){
        this.#probaOubli=probabilite;
    }

    //METHODES METIERS
    retournerUneCarte(positionCarte){
        // On récupère l'index de la carte dans le jeu memory
        let indexCarte = this.getMonMemory().retournerIndexParPosition(positionCarte)

        // On retourne la carte
        this.getMonMemory().getMesCartes()[indexCarte].retournerCarte()

    }

    //Permet d'oublier la premiere carte mise dans la mémoire de la machine
    oublierPremiereCarte(){
        // On récupère une valeur aléatoire entre 0 et 1
        valeurAleatoire = Math.random();
        // Si cette valeur est inférieure à la probabilité qu'a la machine d'oublier une carte
        if(this.#probaOubli > valeurAleatoire){
            this.#memoire.splice(0,1);
        }
    }

    //Permet de retenir une carte dans la mémoire de la machine
    retenirUneCarte(Carte){
        // On vérifie si la carte se trouve dans la mémoire
        let trouve = false 
        // On fait une recherche de première occurrence
        for(let i = 0; i < this.#memoire.length; i++){
            if(this.#memoire[i].getPosition() == Carte.getPosition()){
                trouve = true
            }
        }
        // Si on ne trouve pas la carte à mémoriser dans la mémoire
        if(!trouve){
            if(this.#memoire.length() + 1 > this.#capaMem){
                this.oublierPremiereCarte()
            }
            this.#memoire[Carte]
        }
    }

    //Permet de retirer une carte de la mémoire de la machine
    retirerUneCarte(positionCarte){
        let index = -1
        // On fait une recherche de première occurrence
        for(let i = 0; i < this.#memoire.length; i++){
            if(this.#memoire[i].getPosition() == positionCarte){
                index = i
            }
        }
        if(index != -1){
            this.#memoire.splice(index, 1)

        }
    }

    async methodeDeJeu(){
        // Si la machine peut déjà trouver une paire
        let unePaire = this.recherchePairesDebutJeu()
        // Alors
        if(unePaire){
            // On lance la fonction pour notifier au Memory que l'on a joué un Coup puis l'on attend la fin de cette fonction
            await this.notifierCoup()

            // On indique à Javascript qu'il peut reprendre son déroulement normal
            return Promise.resolve()
        }

        await choixUneCarte()

        // Si la machine trouve une paire avec le coup qu'elle vient de jouer
        unePaire = this.recherchePaires()
        // Alors
        if(unePaire){
            // On lance la fonction pour notifier au Memory que l'on a joué un Coup puis l'on attend la fin de cette fonction
            await this.notifierCoup()

            // On indique à Javascript qu'il peut reprendre son déroulement normal
            return Promise.resolve()
        }

        await choixUneCarte()

        // On lance la fonction pour notifier au Memory que l'on a joué un Coup puis l'on attend la fin de cette fonction
        await this.notifierCoup()

        // On indique à Javascript qu'il peut reprendre son déroulement normal
        return Promise.resolve()

    }

    // Permet de rechercher une paire existante dans la mémoire de la machine avant de jouer une carte
    recherchePairesDebutJeu(){
        // On considère qu'on ne trouvera pas de paire
        let trouve = false
        // On parcourt la mémoire de 0 à la taille de la mémoire -1
        for(let i = 0; i < this.#memoire.length; i ++){
            // On parcourt la mémoire de i à la taille de la mémoire -1
            for(let j = i; j < this.#memoire.length; j ++){
                // Si les valeurs des deux cartes sont les mêmes et que i et différent de j (différentes positions)
                if(this.#memoire[i].getValeur() == this.#memoire[j].getValeur() && (j != i)){
                    // On place les positions des coups dans la mémoire
                    localStorage.setItem("Coup1", this.#memoire[i].getPosition())
                    localStorage.setItem("Coup2", this.#memoire[j].getPosition())
                    // On retourne qu'on a trouvé une paire
                    trouve = true
                    return trouve
                }
            }
        }
        // On retourne qu'on a pas trouvé de paire
        return trouve
    }

    //Permet de rechercher une carte qui serait paire à la première carte jouée du joueur
    recherchePaires(){
        // On récupère la position de la première carte jouée
        let positionCoup1 = localStorage.getItem("Coup1")

        // On récupère la valeur que l'on va chercher dans les cartes
        let index = this.getMonMemory().retournerIndexParPosition(positionCoup1)
        let valeurCoup1 = this.getMonMemory().getMesCartes()[index].getValeur()

        // On considère qu'on ne trouvera pas de paire
        let trouve = false
        // On parcourt la mémoire de 0 à la taille de la mémoire -1
        for(let i = 0; i < this.#memoire.length; i ++){
            // Si les valeurs des deux cartes sont les mêmes et que i et différent de j (différentes positions)
            if(this.#memoire[i].getValeur() == valeurCoup1 && (positionCoup1 != this.#memoire[i].getPosition())){
                // On place la position du coup 2 dans la mémoire
                localStorage.setItem("Coup2", this.#memoire[j].getPosition())
                // On retourne qu'on a trouvé une paire
                trouve = true
                return trouve
            }
        }
        // On retourne qu'on a pas trouvé de paire
        return trouve
    }

    //METHODES ABSTRAITES
    choixUneCarte(){
        throw new Error('Cette méthode est abstraite dans une classe abstraite')
    }
    verifPremierCarte(){
        throw new Error('Cette méthode est abstraite dans une classe abstraite')
    }

}