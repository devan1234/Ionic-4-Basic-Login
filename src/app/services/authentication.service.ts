import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController, Platform} from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, share} from 'rxjs/operators';
import {ErrorHandlingService} from './errorHandling.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    isValid = false;
    public authState: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        @Inject(HttpClient) private http: HttpClient,
        private router: Router,
        private platform: Platform,
        public toastController: ToastController,
        public errorHandlingService: ErrorHandlingService
    ) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }

    ifLoggedIn() {
        this.authState.next(false);
    }

    login(name, pass) {
      if (name === 'ajax' && pass === 'ajax' ) {
        this.router.navigate(['dashboard']);
        this.authState.next(true);
      } else {
          alert('wrong');
      }
    }

    checkLogin(name, pass): Observable<any> {
        const url = '/api/login';
        return this.http.get(url).pipe(map((res: any) => {
            return res;
        }), share(), catchError(this.errorHandlingService.handleServerError));
    }

    logout() {
        this.router.navigate(['login']);
        this.authState.next(false);
    }

    isAuthenticated() {
        return this.authState.value;
    }


}
