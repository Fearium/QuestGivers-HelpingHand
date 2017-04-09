import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ViewStatsPage } from '../viewStats/viewStats';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-about',
  templateUrl: 'select.html'
})
export class SelectPage {

  storedCharacterId : string;
  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
}

  showOptions(character) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Character',
        role: 'destructive',
        handler: () => {
          this.removeCharacter(character.$key);
        }
      },{
        text: 'View Stat Block',
        handler: () => {
          this.viewCharacter(character);
        }
      },
      {
        text: 'Edit Character',
        handler: () => {
          this.navCtrl.push(CreatePage,{
            selectedCharacter: character
          });
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
removeCharacter(characterId: string){
  this.characters.remove(characterId);
}
viewCharacter(selectedCharacter){

  this.navCtrl.push(ViewStatsPage,{
            selectedCharacter: selectedCharacter
          });
}

updateCharacter(characterId, characterName){
  let prompt = this.alertCtrl.create({
    title: 'Character Name',
    message: "Update the name for this Character",
    inputs: [
      {
        name: 'name',
        placeholder: 'Name',
        value: characterName
      },
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
          this.characters.update(characterId, {
            name: data.name
          });
        }
      }
    ]
  });
  prompt.present();
}

}
