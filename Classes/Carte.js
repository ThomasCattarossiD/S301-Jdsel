export class Carte{

    // ATTRIBUTS
    #positionCarte
    #valeur
    #estRetournee 

    // CONSTRUCTEUR
    constructor(position, val){
        this.#positionCarte = position
        this.#valeur = val
        this.#estRetournee = false
    }

    // ENCAPSULATION
    getPosition(){
        return this.#positionCarte
    }
    setPosition(position){
        this.#positionCarte = position
    }

    getValeur(){
        return this.#valeur
    }
    setValeur(val){
        this.#valeur = val
    }

    getEstRetournee(){
        return this.#estRetournee
    }
    setEstRetournee(unBool){
        this.#estRetournee = unBool
    }

    // METHODES Usuelles
    toString(){
        if(this.#estRetournee){
            return "Cette carte a pour position " + this.#positionCarte + " et pour valeur " + this.#valeur + ". On voit la face de la carte."
        }
        else {
            return "Cette carte a pour position " + this.#positionCarte + " et pour valeur " + this.#valeur + ". On voit le dos de la carte."
        }
    }

    equals(uneCarte){
        if(this.#valeur == uneCarte.getValeur()){
            return true
        }
        else{
            return false
        }
    }

    // METHODES Spécifiques

    // METHODES Métier
    afficherCarte(){
        let liste = this.#positionCarte.split('')
        let laCarte = document.createElement("p")
        laCarte.className = "un" + liste[0] + " deux" + liste[1] + " carte"
        if(this.#estRetournee){
            localStorage.setItem('Valeur', this.getValeur())
            laCarte.textContent = this.getValeur()
        }
        else if(this.#estRetournee == false){
            laCarte.textContent = this.getPosition()
        }
        let grille = document.getElementById('laGrilleDeJeu')
        grille.appendChild(laCarte)
        
    }

    retournerCarte(){
        if(this.#estRetournee){
            this.#estRetournee = false
            return this.#estRetournee
        }
        else{
            this.#estRetournee = true
            return this.#estRetournee
        }
    }

}