import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-contact',
  templateUrl: 'create.html'
})
export class CreatePage {

  name: string;
  health: number;
  race: string;

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
}
addCharacter(){
  this.characters.push({
    name: this.name,
    health: this.health,
    race: this.race
  })
}

createCharacter(){
  let prompt = this.alertCtrl.create({
    title: 'Character Name',
    message: "Enter the information for your character",
    inputs: [
      {
        name: 'name',
        placeholder: 'Name'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.characters.push({
            name: data.name
          });
        }
      }
    ]
  });
  prompt.present();
  }

}
