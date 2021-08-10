import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { IsLoggedGuard } from './shared/guards/is-logged.guard';
import { NewQuestionComponent } from './main/new-question/new-question.component';
import { ViewQuestionComponent } from './main/view-question/view-question.component';

export const routes: Routes = [
  {path: '', component: RegistrationComponent, canActivate: [IsLoggedGuard]},
  {path: 'login', component: LoginComponent, canActivate: [IsLoggedGuard]},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'new-question', component: NewQuestionComponent, canActivate: [AuthGuard]},
  {path: 'edit-question/:id', component: ViewQuestionComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
