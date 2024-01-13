import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HOME_PAGE } from '../constants';
import { Session } from '../modules/auth/models/session.model';
import { User } from '../modules/auth/models/user.model';
import { getSessionFromLS } from '../utils';
import { UserService } from '../modules/user/user.service';

interface IRegisterResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  kind: string;
}

interface ILoginResponse extends IRegisterResponse {
  registred: boolean;
}

enum AuthType {
  Login,
  Register,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey} `;
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;
  public session = new BehaviorSubject<Session | null>(getSessionFromLS());

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  //REGISTER
  registerUser(email: string, password: string, userDetails: Partial<User>) {
    return this.handleAuth(email, password, AuthType.Register).pipe(
      switchMap((authResponse) => {
        return this.userService.createNewUser({
          ...userDetails,
          id: authResponse.localId,
        });
      })
    );
  }

  //LOGIN
  loginUser(email: string, password: string) {
    return this.handleAuth(email, password, AuthType.Login);
  }

  handleAuth(email: string, password: string, authType: AuthType) {
    const authUrl =
      authType === AuthType.Login ? this.loginUrl : this.registerUrl;

    return this.httpClient
      .post<ILoginResponse | IRegisterResponse>(authUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleAuthErrors),
        tap((authResponse: ILoginResponse | IRegisterResponse) => {
          const { localId, idToken } = authResponse;
          const currentSession = new Session(localId, idToken);
          localStorage.setItem(
            'currentSession',
            JSON.stringify(currentSession)
          );
          this.session.next(currentSession);
          this.router.navigate([HOME_PAGE]);
        })
      );
  }

  private handleAuthErrors(authError: HttpErrorResponse) {
    const errorID = authError.error.error.message;
    let errorMessage;
    switch (errorID) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email exists';
        break;

      case 'INVALID_EMAIL':
        errorMessage = 'Email invalid';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found!';
        break;

      default:
        errorMessage = 'Email or password incorrect';
    }
    return throwError({ authError, errorMessage });
  }

  get loggedInUserId() {
    return this.session.getValue()?.id;
  }
}
