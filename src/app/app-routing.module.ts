import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { IsLoggedGuard } from './shared/guards/is-logged.guard';
import { NewQuestionComponent } from './new-question/new-question.component';

export const routes: Routes = [
  {path: '', component: RegistrationComponent, canActivate: [IsLoggedGuard], data :{ isHeaderShow: true}},
  {path: 'login', component: LoginComponent, canActivate: [IsLoggedGuard], data :{ isHeaderShow: false}},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'new-question', component: NewQuestionComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
