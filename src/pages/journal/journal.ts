import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {

  journalText: string;

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
}
writeJournal(){
  this.characters.push({
  })
}

}
