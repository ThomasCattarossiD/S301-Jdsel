/*
 Code : Classe JoueurHumain
 But :  La classe permettant à un joueur humain de jouer au jeu du Memory
 Date de dernière modification : 17 Janvier 2023
 Auteur : D. Lanusse
 Remarques : Code conforme aux spécification internes données en cours
*/

// On importe la classe Joueur
import { Joueur } from "../Joueur.js"

// On crée la classe JoueurHumain qui étend la classe abstraite Joueur
export class JoueurHumain extends Joueur{

    // ATTRIBUTS 

    // CONSTRUCTEUR -Pas besoin, déjà défini dans la classe mère-

    // ENCAPSULATION -Déjà défini-

    // METHODES Métier
    // Lorsque cette fonction est appelé le système ne modifie rien pour le joueur humain
    // Elle est placée afin que le memory n'est pas à regarder qui est une machine et qui ne l'est pas
    retenirCartesHumains(carte1, carte2){
        return false
    }

    // Une fonction permettant l'attente d'un click bouton
    async btnClick(){
        // On récupère le bouton de validation
        let bouton = document.getElementById('leBoutonValider')
        // Lorsque le bouton est appuyé, on résout la promesse permettant à Javascript de reprendre le cours normal de son fonctionnement
        return new Promise(resolve => bouton.onclick = () => resolve())
    }

    // La méthode de jeu du Joueur Humain
    async methodeDeJeu(){
        // VARIABLES
        let carteValable = false    // Par défaut la carte sélectionnée n'est pas valable

        // TRAITEMENTS
        // On déclare que les emplacement du stockage local pour les deux clés ont pour valeur empty
        localStorage.setItem("Coup1", 'empty')
        localStorage.setItem("Coup2", 'empty')

        // On récupère le bouton puis on l'active
        let bouton = document.getElementById('leBoutonValider')
        bouton.disabled = false;

        // On joue la première carte
        // Tant que la carte n'est pas valable
        while(!carteValable){
            // On attend le clic du bouton valider avant de continuer
            await this.btnClick()

            // On désactive le bouton
            //bouton.disabled = true

            // On récupère la liste des positions valables
            let listePositions = localStorage.getItem('lesPositions')

            // On passe cette liste en tableau
            let tableau = listePositions.split(',')

            // On récupère le choix du joueur quant à la position de la carte qu'il joue
            let leChoixUn = document.getElementById('leCoup').value

            // Si la liste des positions valables contient le texte saisi (s'il n'y a pas de problème de saisi comme AK)
            if(tableau.includes(leChoixUn)){
                // La carte est valable et on modifie carteValable
                carteValable = true

                // On retourne la carte en récupérant son index puis en allant la chercher dans la liste
                let index = this.getMonMemory().retournerIndexParPosition(leChoixUn)
                this.getMonMemory().getMesCartes()[index].retournerCarte()

                // On place dans le stockage local quelle carte a été jouée
                localStorage.setItem("Coup1", leChoixUn)

                // On attend que le jeu est été affiché correctement avec une carte retournée
                await this.getMonMemory().afficherJeu()
            }
            // Sinon
            else{
                // On récupère l'élément d'affichage puis on indique à l'utilisateur qu'il a fait une erreur
                let affichage = document.getElementById('affichage')
                affichage.textContent = "Veuillez saisir l'une des coordonnées affichées dans le tableau"
            }

            // On réactive le bouton
            //bouton.disabled = false;
        }
        
        // La prochaine carte est par défaut non valable
        carteValable = false

        // On joue la deuxieme carte
        // Tant que la carte n'est pas valable
        while(!carteValable){
            // On attend le clic du bouton valider
            await this.btnClick()

            // On désactive le bouton valider
            //bouton.disabled = true

            // On récupère la liste des positions valables
            let listePositions = localStorage.getItem('lesPositions')

            // On passe cette liste en tableau
            let tableau = listePositions.split(',')

            // On récupère le choix du joueur
            let leChoixDeux = document.getElementById('leCoup').value

            // Si la liste des positions valable contient le choix du joueur
            if(tableau.includes(leChoixDeux) && localStorage.getItem("Coup1") != leChoixDeux){
                // La carte est valable et on modifie carteValable
                carteValable = true

                // On retourne la carte en récupérant son index puis en allant la chercher dans la liste
                let index = this.getMonMemory().retournerIndexParPosition(leChoixDeux)
                this.getMonMemory().getMesCartes()[index].retournerCarte()

                // On place dans le stockage local quelle carte a été jouée
                localStorage.setItem("Coup2", leChoixDeux)

                // On attend que le jeu est été affiché correctement avec une carte retournée
                await this.getMonMemory().afficherJeu()
            }
            // Sinon
            else{
                // On récupère l'élément d'affichage puis on indique à l'utilisateur qu'il a fait une erreur
                let affichage = document.getElementById('affichage')
                affichage.textContent = "Veuillez saisir l'une des coordonnées affichées dans le tableau"

                // On réactive le bouton
                //bouton.disabled = false;
            }
        }

        // On lance la fonction pour notifier au Memory que l'on a joué un Coup puis l'on attend la fin de cette fonction
        await this.notifierCoup()

        // On indique à Javascript qu'il peut reprendre son déroulement normal
        return Promise.resolve()
        
    }


}