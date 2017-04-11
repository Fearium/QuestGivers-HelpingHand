import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { Die } from './die';

@Component({
  selector: 'page-roll',
  templateUrl: 'roll.html'
})

export class RollPage {

  sides: number;
  amount: number;
  result: number;
  count: number;
  results: Die[];

  characters: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  this.sides = 4;
  this.amount = 1;
  this.result = 0;
  this.results = [];
}

rollDie(max: number, min: number){
  return Math.floor(Math.random() *(max - min + 1)) + min;
}

rollDice(){
    this.count = this.amount;

    if(this.results.length > 0){
     while(this.results.length > 0){
       this.results.pop();
     }
    }

    for(var i = 0; i < this.count; i++){
      this.result = this.rollDie(this.sides, 1);
      this.addDie(this.result);
    }
    
    return this.results;
}

addDie(roll: number){
  var newDie = new Die(roll);
  this.results.push(newDie);
}

}
