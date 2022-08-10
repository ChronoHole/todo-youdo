import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GridListModule } from './components/grid-list/grid-list.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    ToolbarModule,
    GridListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
