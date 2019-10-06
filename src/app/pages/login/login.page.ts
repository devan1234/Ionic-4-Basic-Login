import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name: string;
  pass: string;
  loginSubscription: Subscription = null;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.login(this.name, this.pass);
  }


  checkLogin() {
    this.loginSubscription =  this.auth.checkLogin(this.name, this.pass).subscribe((data) => {
      if (data) {
      }
    });
  }

}
