import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { HomePage } from '../home/home';
import { SelectPage } from '../select/select';
import { ViewStatsPage } from '../viewStats/viewStats';

//validator imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseStatsValidator } from '../../validators/baseStats';
import { abilityScoreValidator } from '../../validators/abilityScore';
import { skillsValidator } from '../../validators/skills';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {

  //Section Form Groups
  sectionOne: FormGroup;
  sectionTwo: FormGroup;
  sectionThree: FormGroup;
  sectionFour: FormGroup;
  sectionFive: FormGroup;
  sectionSix: FormGroup;

  //NEEDS VALIDATION
  
  //Basic Character Info
  name: string;
  race: string;
  class: string;
  alignment: string;
  
  //Base Stats
  hitPoints: number;
  armourClass: number;
  speed: number;

  //Ability Scores
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

  //Skills
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

  //Basic Actions
  senses: string;
  languages: string;
  passives: string;

  //Miscillaneous
  weapons: string;
  equipment: string;
  journal: string;

  //Flags
  showAbilityScoresAndModifiers: boolean;
  showBasicInformation = true;
  showSkills: boolean;
  showAbilities: boolean;
  showGear: boolean;
  showJournal: boolean;
  selectedCharacter: any;
  

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
  
  this.selectedCharacter = navParams.get('selectedCharacter');
  
  if(this.selectedCharacter != null){
    this.getCharacterInfo(this.selectedCharacter);
  }
  
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
    if(this.selectedCharacter){
      this.characters.update(this.selectedCharacter.$key, {
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
      perception: this.perception,
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
      });
    }
    else{
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
      perception: this.perception,
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

    } 
    // Will eventually navigate to Stat Block view instead
    this.navCtrl.push(SelectPage);
  }
}

/**
 * @desc Fill Local Variables with Character Data
 * @param character 
 */
public getCharacterInfo(character){
   this.name = character.name;
   this.race = character.race;
   this.class = character.class;
   this.alignment = character.alignment;
   
   this.hitPoints = character.hitPoints;
   this.armourClass = character.armourClass;
   this.speed = character.speed;

   this.STR = character.STR;
   this.STRMod = character.STRMod;
   this.DEX = character.DEX;
   this.DEXMod = character.DEXMod;
   this.CON = character.CON;
   this.CONMod = character.CONMod;
   this.INT = character.INT;
   this.INTMod = character.INTMod;
   this.WIS = character.WIS;
   this.WISMod = character.WISMod;
   this.CHA = character.CHA;
   this.CHAMod = character.CHAMod;

   this.athletics = character.athletics;
   this.acrobatics = character.acrobatics;
   this.sleightOfHand = character.sleightOfHand;
   this.stealth = character.stealth;
   this.arcana = character.arcana;
   this.history = character.history;
   this.investigation = character.investigation;
   this.nature = character.nature;
   this.religion = character.religion;
   this.animalHandling = character.animalHandling;
   this.insight = character.insight;
   this.medicine = character.medicine;
   this.perception = character.perception;
   this.survival = character.survival;
   this.deception = character.deception;
   this.intimidation = character.intimidation;
   this.performance = character.performance;
   this.persuasion = character.persuasion;

   this.senses = character.senses;
   this.languages = character.languages;
   this.passives = character.passives;

   this.weapons = character.weapons;
   this.equipment = character.equipment;
   this.journal = character.journal;

}

}
