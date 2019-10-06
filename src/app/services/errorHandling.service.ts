import {empty as observableEmpty,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private router: Router) {}
  handleError() {
    this.router.navigate(['client/error/404']);
  }
  handleServerError = (error: Response) => {
    this.handleError();
    return observableEmpty();
  }
}
