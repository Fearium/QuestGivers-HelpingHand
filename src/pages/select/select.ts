import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
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
  flag: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
  this.flag = navParams.get('journalSelect');
}

  showMenu(character){
    if(this.flag){
      this.flag = false;
      
      this.navCtrl.push(CreatePage,{
        selectedCharacter: character,
        flag: this.flag
      });
    }
    else{
      this.showOptions(character);
    }
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
}
