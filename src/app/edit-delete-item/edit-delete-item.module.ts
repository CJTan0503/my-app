import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeleteItemPageRoutingModule } from './edit-delete-item.page.module';

import { EditDeleteItemPage } from './edit-delete-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDeleteItemPageRoutingModule
  ],
  declarations: [EditDeleteItemPage]
})
export class EditDeleteItemPageModule {}
