import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Comp1Component } from '../../components/comp1/comp1';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
