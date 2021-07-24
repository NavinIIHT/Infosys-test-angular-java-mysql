import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternshipComponent } from './internship/internship.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InternshipTypePipe } from './internship/internship-type.pipe';
import { InternshipService } from './internship/internship.service';

@NgModule
({
  declarations: [
    AppComponent,
    InternshipComponent,
    HomeComponent,
    InternshipTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [InternshipService],
  bootstrap: [AppComponent]
})

export class AppModule { }