import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [SharedModule],
  exports: [DialogComponent],
})
export class DialogModule {}
