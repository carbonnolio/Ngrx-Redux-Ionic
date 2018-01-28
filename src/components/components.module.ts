import { NgModule } from '@angular/core';
import { Comp1Component } from './comp1/comp1';
import { Comp2Component } from './comp2/comp2';

import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [Comp1Component,
    Comp2Component
],
	imports: [
    IonicModule
  ],
	exports: [Comp1Component,
    Comp2Component]
})
export class ComponentsModule {}
