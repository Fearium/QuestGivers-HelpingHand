import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { SelectPage } from '../select/select';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
}
navToSelect(){
this.navCtrl.push(SelectPage);
}
navToCreate(){
this.navCtrl.push(CreatePage, {database: this.characters});
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