import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { routes } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FiltersComponent } from './main/filters/filters.component';
import { CardComponent } from './main/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './shared/services/question.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewQuestionComponent } from './main/new-question/new-question.component';
import { CommentComponent } from './main/comment/comment.component';
import { ViewQuestionComponent } from './main/view-question/view-question.component';
import { EditQuestionComponent } from './main/edit-question/edit-question.component'

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainPageComponent,
    LoginComponent,
    HeaderComponent,
    FiltersComponent,
    CardComponent,
    NewQuestionComponent,
    CommentComponent,
    ViewQuestionComponent,
    EditQuestionComponent
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
    NgbModule,
  ],
  providers: [AuthService, AuthGuard, QuestionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
