import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-contact',
  templateUrl: 'roll.html'
})
export class RollPage {

  die1: number;
  die2: number;

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.characters = af.database.list('/characters');
}
rollDice(){
  this.characters.push({
    die1: this.die1,
    die2: this.die2,
  })
}

}
