import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  firebase  from 'firebase/app';
import 'firebase/auth'
import { Observable } from 'rxjs';
import { User} from '../interfaces/User'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData!: User;

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  checkAuth(): Observable<boolean> {
    return this.fireAuth.authState.pipe(map((user: unknown) => {
      this.userData = user as User;
      if (!(!!user)) {
        this.router.navigate([''])
      }
      return !!user;
    }))
  }

  async loginWithGoogle() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(err => console.log('cant log with google', err));
  }

  async loginWithFaceBook() {
    await this.fireAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .catch(err => console.log('cant log with FaceBook', err));
  }

  async loginWithGithub() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .catch(err => console.log('cant log with Github', err));
  }

  async SignUp(email: string, password: string) {
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
    .catch(error => console.log('Something is wrong:', error.message));
  }

 SignIn(email: string, password: string) {
   this.fireAuth.signInWithEmailAndPassword(email, password)
   .then(res => {
     console.log('You are in!', res);
     this.router.navigate(['/main']);
   })
   .catch(error => console.log('Something went wrong:', error.message));
 }

  SignOut(): void {
    this.fireAuth.signOut();
  }
}
