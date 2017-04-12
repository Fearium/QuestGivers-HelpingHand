import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-viewStats',
  templateUrl: 'viewStats.html'
})
export class ViewStatsPage {

  public selectedCharacter:any;
  public pluralName: string;

  characters: FirebaseListObservable<any>;

  showSkillsToggle: boolean = true;
  hideSkillsToggle: boolean = false;
  skillsBlock: boolean = false;
  showAbilitiesToggle: boolean = true;
  hideAbilitiesToggle: boolean = false;
  abilitiesBlock: boolean = false;
  showGearToggle: boolean = true;
  hideGearToggle: boolean = false;
  gearBlock: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
      this.selectedCharacter = params.get("selectedCharacter");
      this.characters = af.database.list('/characters');
      this.pluralName = this.plural();
  }

  showSkillsBlock(){
    this.showSkillsToggle = false;
    this.hideSkillsToggle = true;
    this.skillsBlock = true;
  }
  hideSkillsBlock(){
    this.showSkillsToggle = true;
    this.hideSkillsToggle = false;
    this.skillsBlock = false;
  }
    showAbilitiesBlock(){
    this.showAbilitiesToggle = false;
    this.hideAbilitiesToggle = true;
    this.abilitiesBlock = true;
  }
  hideAbilitiesBlock(){
    this.showAbilitiesToggle = true;
    this.hideAbilitiesToggle = false;
    this.abilitiesBlock = false;
  }
    showGearBlock(){
    this.showGearToggle = false;
    this.hideGearToggle = true;
    this.gearBlock = true;
  }
  hideGearBlock(){
    this.showGearToggle = true;
    this.hideGearToggle = false;
    this.gearBlock = false;
  }
  public plural(){
    var full = this.selectedCharacter.name;
    var last = (full[full.length -1]);

    if(last.toLowerCase() == "s"){
      full = full + "'"
    }
    else{
      full = full + "'s"
    }
    return full;
  }

}
