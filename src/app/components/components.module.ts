import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
    declarations: [PopoverComponent],
    imports : [CommonModule, IonicModule],
    exports: [PopoverComponent]
})
export class ComponentModule {}
