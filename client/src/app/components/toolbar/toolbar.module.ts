import { NgModule, ChangeDetectionStrategy } from '@angular/core';
import { DialogModule } from './../dialog/dialog.module';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [DialogModule, SharedModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
