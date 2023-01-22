/*
 Code : Classe Carte
 But : Avoir des cartes modifiables en direct dans le jeu du Memory
 Date de dernière modification : 17 Janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/

// On créé la classe Carte
export class Carte{

    // ATTRIBUTS
    #positionCarte      // La position de la carte (entre AA et FF)
    #valeur             // La valeur de la carte (entre 1 et 18)
    #estRetournee       // Booléen indiquant si la carte est retournée ou non (true = face de la carte ; false = dos de la carte)

    // CONSTRUCTEUR
    constructor(position, val){
        this.#positionCarte = position  // On donne sa position à la carte
        this.#valeur = val              // On donne sa valeur à la carte
        this.#estRetournee = false      // On indique à la carte qu'elle n'est pas retournée
    }

    // ENCAPSULATION
    //        >> getPosition() >> positionCarte
    getPosition(){
        return this.#positionCarte
    }
    // position >> setPosition() >>
    setPosition(position){
        this.#positionCarte = position
    }

    //        >> getValeur() >> valeur
    getValeur(){
        return this.#valeur
    }
    // val >> setValeur() >>
    setValeur(val){
        this.#valeur = val
    }

    //        >> getEstRetournee() >> estRetournee
    getEstRetournee(){
        return this.#estRetournee
    }
    // unBool >> setEstRetournee() >>
    setEstRetournee(unBool){
        this.#estRetournee = unBool
    }

    // METHODES USUELLES
    // On transcrit la carte en une chaîne de caractères compréhensibles par l'homme
    toString(){
        // Si la carte est retournée ou non on annonce ce qui est visible
        if(this.#estRetournee){
            return "Cette carte a pour position " + this.#positionCarte + " et pour valeur " + this.#valeur + ". On voit la face de la carte."
        }
        else {
            return "Cette carte a pour position " + this.#positionCarte + " et pour valeur " + this.#valeur + ". On voit le dos de la carte."
        }
    }

    // On vérifie si cette carte a la même valeur que uneCarte
    equals(uneCarte){
        // Si elles ont la même valeur on renvoie true, sinon false
        if(this.#valeur == uneCarte.getValeur()){
            return true
        }
        else{
            return false
        }
    }

    // METHODES SPÉCIFIQUES -non-

    // METHODES MÉTIER
    // On affiche cette Carte
    afficherCarte(){
        // On créé une liste contenant les deux lettres de positionnement de la carte
        let liste = this.#positionCarte.split('')
        // On créé un élément appelé laCarte
        let laCarte = document.createElement("p")
        // L'élément laCarte a trois classes, la première correspond à sa ligne, la deuxième sa colonne, et la troisième indique qu'il s'agit d'une carte
        laCarte.className = "un" + liste[0] + " deux" + liste[1] + " carte"

        // Si la carte est retournée
        if(this.#estRetournee){
            //localStorage.setItem('Valeur', this.getValeur())
            // On affiche la valeur de la carte
            laCarte.textContent = this.getValeur()
        }
        // Sinon
        else{
            // On affiche la position de la carte
            laCarte.textContent = this.getPosition()
        }

        // On récupère la grille d'affichage des cartes
        let grille = document.getElementById('laGrilleDeJeu')

        // On lui ajoute comme enfant laCarte
        grille.appendChild(laCarte)
        
    }

    // On retourne notre carte
    retournerCarte(){
        // Si la variable estRetournee est vrai, il devient faux
        if(this.#estRetournee){
            this.#estRetournee = false
        }
        // Sinon il devient vrai
        else{
            this.#estRetournee = true
        }
    }

    // On affiche cette Carte dans la mémoire du robot
    afficherPosition(){
        // On créé une liste contenant les deux lettres de positionnement de la carte
        let liste = this.#positionCarte.split('')
        // On créé un élément appelé laCarte
        let laCarte = document.createElement("p")
        // L'élément laCarte a trois classes, la première correspond à sa ligne, la deuxième sa colonne, et la troisième indique qu'il s'agit d'une carte
        laCarte.className = "un" + liste[0] + " deux" + liste[1] + " carte"

        laCarte.textContent = this.getValeur()
        
        // On récupère la grille d'affichage des cartes
        let grille = document.getElementById('grilleMemoire')

        // On lui ajoute comme enfant laCarte
        grille.appendChild(laCarte)
        
    }

}