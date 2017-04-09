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
    var name = this.selectedCharacter.name;
    var last = (name[name.length -1]);

    if(last.toLowerCase() == "s"){
      name = name + "'"
    }
    else{
      name = name + "'s"
    }

    return name;
  }

}
