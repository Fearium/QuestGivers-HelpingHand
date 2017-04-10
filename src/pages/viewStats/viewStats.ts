import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-about',
  templateUrl: 'viewStats.html'
})
export class ViewStatsPage {

  public selectedCharacter:any;
  public pluralName: string;

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
      this.selectedCharacter = params.get("selectedCharacter");
      this.characters = af.database.list('/characters');
      this.pluralName = this.plural();
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
