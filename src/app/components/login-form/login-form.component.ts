import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication.service';
import swal from 'sweetalert';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide: boolean;
  token: any;
  @Output() authenticate = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.hide = true;
   }

  ngOnInit() {
  }

  login(){
    var user = {username:this.username.value,password:this.password.value};
    console.log(user)

    var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }

    this.http.post('http://localhost:3000/api/login', user, config)
    .subscribe(res=>{
      console.log(res);
      let token = res["token"];
        if (token) {
            // set token property
            this.token = token;
    
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify({ username: user.username, token: token }));
            this.authenticate.emit();
            console.log("Success",
               "Welcome, You are now logged in",
               "success");
        }else{
          console.log("Oops",
               "Wrong Credentials",
               "error");
        }
      }
    );
  }

}
