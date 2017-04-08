import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { HomePage } from '../home/home';
import { SelectPage } from '../select/select';

//validator imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseStatsValidator } from '../../validators/baseStats';
import { abilityScoreValidator } from '../../validators/abilityScore';
import { skillsValidator } from '../../validators/skills';

@Component({
  selector: 'page-contact',
  templateUrl: 'create.html'
})
export class CreatePage {

  sectionOne: FormGroup;
  sectionTwo: FormGroup;
  sectionThree: FormGroup;
  sectionFour: FormGroup;
  sectionFive: FormGroup;
  sectionSix: FormGroup;

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
  showAbilityScoresAndModifiers: boolean;
  showBasicInformation = true;
  showSkills: boolean;
  showAbilities: boolean;
  showGear: boolean;
  showJournal: boolean;
  

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  af: AngularFire, public actionSheetCtrl: ActionSheetController, public formBuilder: FormBuilder) {

    this.sectionOne = formBuilder.group({
            name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            class: ['', Validators.required],
            race: ['', Validators.required],
            alignment: ['', Validators.required],
        });
    
        this.sectionTwo = formBuilder.group({
            hp: ['', Validators.compose([Validators.required, baseStatsValidator.isValid])],
            ac: ['', Validators.compose([Validators.required, baseStatsValidator.isValid])],
            speed: ['', Validators.compose([Validators.required, baseStatsValidator.isValid])],
        });

        this.sectionThree = formBuilder.group({
            str: ['', Validators.compose([Validators.required, abilityScoreValidator.isValid])],
            strmod: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[\-\+0][0-9]*'), Validators.required])],
            dex: ['', Validators.compose([Validators.required, abilityScoreValidator.isValid])],
            dexmod: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[\-\+0][0-9]*'), Validators.required])],
            con: ['', Validators.compose([Validators.required, abilityScoreValidator.isValid])],
            conmod: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[\-\+0][0-9]*'), Validators.required])],
            int: ['', Validators.compose([Validators.required, abilityScoreValidator.isValid])],
            intmod: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[\-\+0][0-9]*'), Validators.required])],
            wis: ['', Validators.compose([Validators.required, abilityScoreValidator.isValid])],
            wismod: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[\-\+0][0-9]*'), Validators.required])],
            cha: ['', Validators.compose([Validators.required, abilityScoreValidator.isValid])],
            chamod: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[\-\+0][0-9]*'), Validators.required])],
        });

        this.sectionFour = formBuilder.group({
            athletics: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            acrobatics: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            sleightofhand: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            stealth: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            arcana: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            history: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            investigation: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            nature: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            religion: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            animalhandling: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            insight: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            medicine: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            perception: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            survival: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            deception: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            intimidation: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            performance: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
            persuasion: ['', Validators.compose([Validators.required, skillsValidator.isValid])],
        });

        this.sectionFive = formBuilder.group({
          senses: ['', Validators.required],
          languages: ['', Validators.required],
          passives: ['', Validators.required],
        });

        this.sectionSix = formBuilder.group({
          weapons: ['', Validators.required],
          equipment: ['', Validators.required],
        });

  this.characters = af.database.list('/characters');
}
cancelCreation(){
  this.navCtrl.push(HomePage);
}
nextToAbilityScoresAndModifiersButton(){
  if(this.sectionOne.valid && this.sectionTwo.valid){ 
      this.showAbilityScoresAndModifiers = true;
      this.showBasicInformation = false;
    }
}
previousToShowBasicInformationButton(){
  this.showAbilityScoresAndModifiers = false;
  this.showBasicInformation = true;
}

nextToSkillsButton(){
  if(this.sectionThree.valid){ 
    this.showSkills = true;
    this.showAbilityScoresAndModifiers = false;
  }
}

previousToShowAbilityScoresAndModifiersButton(){
  this.showSkills = false;
  this.showAbilityScoresAndModifiers = true;
}
nextToShowAbilitiesButton(){
  if(this.sectionFour.valid){ 
    this.showAbilities = true;
    this.showSkills = false;
  }
}
previousToShowSkillsButton(){
  this.showAbilities = false;
  this.showSkills = true;
}
nextToShowGearButton(){
  if(this.sectionFive.valid){ 
    this.showGear = true;
    this.showAbilities = false;
  }
}
previousToShowAbilitiesButton(){
  this.showGear = false;
  this.showAbilities = true;
}
addCharacter(){
  if(this.sectionOne.valid && this.sectionTwo.valid && this.sectionThree.valid && this.sectionFour.valid && this.sectionFive.valid && this.sectionSix.valid){ 
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
      //just saves a journal variable with the  characters name so that it can be accessed later
      journal: this.name
    })
    // Will eventually navigate to Stat Block view instead
    this.navCtrl.push(SelectPage/*, {database: this.characters}*/);
  }
}

}
