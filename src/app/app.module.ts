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
import { CardComponent } from './main/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './shared/services/question.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewQuestionComponent } from './main/new-question/new-question.component';
import { CommentComponent } from './main/comment/comment.component';
import { ViewQuestionComponent } from './main/view-question/view-question.component';
import { EditQuestionComponent } from './main/edit-question/edit-question.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainPageComponent,
    LoginComponent,
    HeaderComponent,
    CardComponent,
    NewQuestionComponent,
    CommentComponent,
    ViewQuestionComponent,
    EditQuestionComponent,
    FilterPipe,
  ],
  imports: [
    MatSlideToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    BrowserAnimationsModule,
  ],
  providers: [AuthService, AuthGuard, QuestionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
