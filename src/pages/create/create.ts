import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { HomePage } from '../home/home';
import { SelectPage } from '../select/select';

@Component({
  selector: 'page-contact',
  templateUrl: 'create.html'
})
export class CreatePage {

  //NEEDS VALIDATION

  name: string;
  hitPoints: number;
  race: string;
  class: string;
  alignment: string;
  armourClass: number;
  speed: number;
  STR: number;
  STRMod: string;
  DEX: number;
  DEXMod: string;
  CON: number;
  CONMod: string;
  INT: number;
  INTMod: string;
  WIS: number;
  WISMod: string;
  CHA: number;
  CHAMod: string;
  athletics: string;
  acrobatics: string;
  sleightOfHand: string;
  stealth: string;
  arcana:string;
  history: string;
  investigation: string;
  nature: string;
  religion: string;
  animalHandling: string;
  insight: string;
  medicine: string
  perception: string;
  survival: string;
  deception: string;
  intimidation: string;
  performance: string
  persuasion: string;
  senses: string;
  languages: string;
  weapons: string;
  equipment: string;
  passives: string;
  journal: string;

  

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
}
cancelCreation(){
  this.navCtrl.push(HomePage);
}
addCharacter(){
  this.characters.push({
    name: this.name,
    hitPoints: this.hitPoints,
    race: this.race,
    class: this.class,
    alignment: this.alignment,
    armourClass: this.armourClass,
    speed: this.speed,
    STR: this.STR,
    STRMod: this.STRMod,
    DEX: this.DEX,
    DEXMod: this.DEXMod,
    CON: this.CON,
    CONMod: this.CONMod,
    INT: this.INT,
    INTMod: this.INTMod,
    WIS: this.WIS,
    WISMod: this.WISMod,
    CHA: this.CHA,
    CHAMod: this.CHAMod,
    athletics: this.athletics,
    acrobatics: this.acrobatics,
    sleightOfHand: this.sleightOfHand,
    stealth: this.stealth,
    arcana: this.arcana,
    history: this.history,
    investigation: this.investigation,
    nature: this.nature,
    religion: this.religion,
    animalHandling: this.animalHandling,
    insight: this.insight,
    medicine: this.medicine,
    survival: this.survival,
    deception: this.deception,
    intimidation: this.intimidation,
    performance: this.performance,
    persuasion: this.persuasion,
    senses: this.senses,
    languages: this.languages,
    weapons: this.weapons,
    equipment: this.equipment,
    passives: this.passives,
    journal: this.journal
  })
  // Will eventually navigate to Stat Block view instead
  this.navCtrl.push(SelectPage/*, {database: this.characters}*/);
}

}
