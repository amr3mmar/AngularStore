import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication.service';
import * as sweetalert from 'sweetalert';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide: boolean;
  token: any;

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.hide = true;
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  register(){
    var user = {username:this.username.value,password:this.password.value,
    firstname:this.firstName.value,lastname:this.lastName.value,email:this.email.value};

    var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }
    return this.http.post('http://localhost:3000/api/register', user, config)
    .subscribe(res=>{
      console.log(res);
      let message = res["msg"];
        if (message == "Registered successfully") {
          alert("Success User created successfully");
        }else{
          alert("Oops Wrong Credentials");
        }
      },
      err => {
        try {
          alert("user already exists");
        } catch (err) {
          alert('Unexpected error! Server might be down');
        }
      });
  }



}
