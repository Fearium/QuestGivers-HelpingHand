import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { HomePage } from '../home/home';
import { SelectPage } from '../select/select';
import { CreatePage } from '../create/create';
import { JournalPage } from '../journal/journal';
import { RollPage } from '../roll/roll';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = JournalPage;
  tab3Root: any = RollPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
