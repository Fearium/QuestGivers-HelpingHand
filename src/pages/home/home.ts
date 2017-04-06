import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { SelectPage } from '../select/select';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
}
navToSelect(){
this.navCtrl.push(SelectPage);
}
navToCreate(){
this.navCtrl.push(CreatePage/*, {database: this.characters}*/);
}
}