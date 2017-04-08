import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-about',
  templateUrl: 'viewStats.html'
})
export class ViewStatsPage {
  public firstParam:any;
  public secondParam:any;

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
      this.firstParam = params.get("firstPassed");
      this.characters = af.database.list('/characters');
  }
  showOptions(characterId, characterName) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Character',
        role: 'destructive',
        handler: () => {
          this.removeCharacter(characterId);
        }
      },{
        text: 'Edit Character',
        handler: () => {
          this.updateCharacter(characterId, characterName);
        }
      },{
        text: 'View Stat Block',
        handler: () => {
          this.viewCharacter(characterId, characterName);
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
  viewCharacter(characterId, characterName){
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
