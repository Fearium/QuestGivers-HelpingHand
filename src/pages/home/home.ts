import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { SelectPage } from '../select/select';
import { CreatePage } from '../create/create';
import { RollPage } from '../roll/roll';
import { JournalPage } from '../journal/journal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  flag: boolean = false;

  constructor(public navCtrl: NavController) {
}
navToSelect(){
this.navCtrl.push(SelectPage);
}
navToCreate(){
this.navCtrl.push(CreatePage/*, {database: this.characters}*/);
}
// Actually needs to navigate to SelectPage while passing variables
//through and then passing variables through again to edit the journal
//of the selected character.
navToJournalSelect(){
  this.flag = true;
  this.navCtrl.setRoot(SelectPage,{
    journalSelect: this.flag
  });
}
navToRoll(){
this.navCtrl.push(RollPage);
}

}