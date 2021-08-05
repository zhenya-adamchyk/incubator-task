import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { routes } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './shared/services/question.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewQuestionComponent } from './new-question/new-question.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainPageComponent,
    LoginComponent,
    HeaderComponent,
    FiltersComponent,
    CardComponent,
    NewQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuard, QuestionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
