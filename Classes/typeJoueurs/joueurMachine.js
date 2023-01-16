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
    #capaMem;//Nombre maximum de cartes que la machine peux se souvenir
    #mesCartesConnues=[]; //Tableau des cartes que la machine à en mémoire
    #probaOubli;//Nombre représentant la probabilité que une carte soit oublier par la machine
    #difficulte; //Nombre qui reprsente la difficulte de la machine entre 1 et 3 où une machine de difficulte 1 est faible et une machine de difficulte 3 est très fort
    #mesCartes;
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
    /** A REFAIRE
    //Permet de récuperer les cartes connu par la machine
    getMesCartesConnues(){
        return this.#mesCartesConnues;
    }
    //Permet d'initialiser les cartes connu par la machine dans un tableau
    setMesCartesConnues(cartesConnu){
        this.#mesCartesConnues=cartesConnu;
    }
    */
    //Permet de récuperer la probabilite d'oubli de carte de la machine
    getProbaOubli(){
        return this.#probaOubli;
    }
    //Permet d'initialiser la probabilite d'oubli de carte de la machine
    setProbaOubli(probabilite){
        this.#probaOubli=probabilite;
    }
    //Permet de récuperer le niveau de difficulte de la machine
    getDifficulte(){
        return this.#difficulte;
    }
    //Permet d'initialiser le niveau difficulte de la machine
    setDifficulte(difficulte){
        this.#difficulte=difficulte;
    }
    //METHODES METIERS
    retournerUneCarte(Carte){

    }
    //Permet d'oublier la premiere carte mise dans la mémoire de la machine
    oublierPremierCarte(){
        valeurAleatoire=Math.random();
        if(this.#probaOubli<valeurAleatoire){
            this.#mesCartesConnues[0]=null;
        }
    }
    //Permet de retenir une carte dans la mémoire de la machine
    retenirUneCarte(Carte){
        this.#mesCartesConnues[Carte];
    }
    //Permet de retirer une carte de la mémoire de la machine
    retirerUneCarte(Carte){
        this.#mesCartesConnues[Carte]=null;
    }
    methodeDeJeu(){

    }
    //Permet de rechercher un paire existante dans la mémoire de la machine
    recherchePaires(){
        trouve = false;
        indCarteA=null;
        indCarteB=null;
        i=1;
        while(trouve ==false){
            if(i>=this.#capaMem){
                break;
            }
            if(trouve == true){
                break;
            }
            i++;
            for(j=0;j<this.#capaMem-1;j++){
                if(this.#mesCartesConnues[i]==this.#mesCartesConnues[j] && i!= j){
                    indCarteA= i;
                    indCarteB=j;
                    trouve=true;
                }
            }
        }
    }

    //METHODES ABSTRAITES
    choixUneCarte(){

    }
    verifPremierCarte(){

    }

}