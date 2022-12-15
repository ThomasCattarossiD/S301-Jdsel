import { Joueur } from "../Joueur.js"

export class JoueurHumain extends Joueur{
    // ATTRIBUTS 
    #cleCoup1 = 'Coup1'
    #cleCoup2 = 'Coup2'

    // CONSTRUCTEUR -Pas besoin, déjà défini dans la classe mère-

    // ENCAPSULATION -Déjà défini-

    // METHODES Métier
    retenirCartesHumains(carte1, carte2){
        return false
    }

    async btnClick(){
        let bouton = document.getElementById('leBoutonValider')
        return new Promise(resolve => bouton.onclick = () => resolve())
    }

    async methodeDeJeu(){
        localStorage.setItem(this.#cleCoup1, 'empty')
        localStorage.setItem(this.#cleCoup2, 'empty')
        let bouton = document.getElementById('leBoutonValider')
        let carteValable = false
        while(!carteValable){
            await this.btnClick()
            bouton.disabled = true
            let listePositions = localStorage.getItem('lesPositions')
            let leChoixUn = document.getElementById('leCoup').value
            if(listePositions.includes(leChoixUn)){
                carteValable = true
                let index = this.getMonMemory().retournerIndexParPosition(leChoixUn)
                this.getMonMemory().getMesCartes()[index].retournerCarte()
                localStorage.setItem("Coup1", leChoixUn)
                await this.getMonMemory().afficherJeu()
                bouton.disabled = false;
            }
            else{
                let affichage = document.getElementById('affichage')
                affichage.textContent = "Veuillez saisir l'une des coordonnées affichées dans le tableau"
                bouton.disabled = false;
            }
        }
        carteValable = false
        while(!carteValable){
            await this.btnClick()
            bouton.disabled = true
            let listePositions = localStorage.getItem('lesPositions')
            let leChoixDeux = document.getElementById('leCoup').value
            if(listePositions.includes(leChoixDeux) && localStorage.getItem("Coup1") != leChoixDeux){
                carteValable = true
                let index = this.getMonMemory().retournerIndexParPosition(leChoixDeux)
                this.getMonMemory().getMesCartes()[index].retournerCarte()
                localStorage.setItem("Coup2", leChoixDeux)
                await this.getMonMemory().afficherJeu()
                bouton.disabled = false;
            }
            else{
                let affichage = document.getElementById('affichage')
                affichage.textContent = "Veuillez saisir l'une des coordonnées affichées dans le tableau"
                bouton.disabled = false;
            }
        }

        await this.getMonMemory().unJoueurAJoue(this.getPseudo())

        return Promise.resolve()
        
    }


}