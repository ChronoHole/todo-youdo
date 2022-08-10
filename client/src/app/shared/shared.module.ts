import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ArraySortLengthPipe } from './pipes/sort-by-length.pipe';
import { ArraySortFieldPipe } from './pipes/sort-by-field.pipe';

const MaterialModule = [
  MatToolbarModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
];

@NgModule({
  declarations: [ArraySortFieldPipe, ArraySortLengthPipe],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModule],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    ArraySortFieldPipe,
    ArraySortLengthPipe,
    ...MaterialModule,
  ],
})
export class SharedModule {}
