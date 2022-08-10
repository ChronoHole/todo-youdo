import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from '../card/card.module';
import { GridListComponent } from './grid-list.component';

@NgModule({
  declarations: [GridListComponent],
  imports: [CardModule, SharedModule],
  exports: [GridListComponent],
})
export class GridListModule {}
