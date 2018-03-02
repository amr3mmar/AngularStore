import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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
    console.log(user)

    this.authenticationService.register(user)
    .subscribe(res=>{
      console.log(res);
      let message = res["msg"];
      console.log(message);
        if (message == "Registered successfully") {
      //       // set token property
      //       this.token = token;
    
      //       // store username and jwt token in local storage to keep user logged in between page refreshes
      //       localStorage.setItem('user', JSON.stringify({ username: user.username, token: token }));
          sweetalert("Success",
          "User created successfully",
          "success");
        }else{
          sweetalert("Oops",
               "Wrong Credentials",
               "error");
        }
      });
  }



}
