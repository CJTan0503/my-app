import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeleteItemPage } from './edit-delete-item.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeleteItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeleteItemPageRoutingModule {}
