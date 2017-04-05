import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { CreatePage } from '../pages/create/create';
import { JournalPage } from '../pages/journal/journal';
import { RollPage } from '../pages/roll/roll';
import { SelectPage } from '../pages/select/select';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // set our app's pages
  appPages: PageInterface[] = [
    { title: 'Home', component: HomePage, index:1, icon: 'home' },
    { title: 'Create', component: CreatePage, index: 2, icon: 'create' },
    { title: 'View', component: SelectPage, index: 3, icon: 'list-box' },
    { title: 'Journal', component: JournalPage, index: 4, icon: 'book' },
    { title: 'Roll Dice', component: RollPage, index: 5, icon: 'cube' }
  ];

  rootPage = TabsPage;

  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
      setTimeout(function() {
        Splashscreen.hide();
    }, 500);
    });

  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario

    this.menu.close();

    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }


  }

}
