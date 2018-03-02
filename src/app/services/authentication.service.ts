import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginData) {
    var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }
    return this.http.post('http://localhost:3000/api/login', loginData, config)
      .map((response: Response) => response.json());
  }

  register(registerData) {
    var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }
    return this.http.post('http://localhost:3000/api/register', registerData, config)
      .map((response: Response) => response.json());
  }

}
