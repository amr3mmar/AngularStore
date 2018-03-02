import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import * as sweetalert from 'sweetalert';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }
  
  addProduct(){
    var user = JSON.parse(localStorage.getItem('user'));
    var username = user.username;

    var product = {name:this.name.value,price:this.price.value,sellerName:username};

    var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }

    this.http.post('http://localhost:3000/api/product/createProduct', product, config)
    .subscribe(res=>{
      console.log(res);
      let product = res.data;
        if (product) {
            sweetalert("Success",
               "Product Added Successfully",
               "success");
        }else{
          sweetalert("Oops",
               "400 Bad request",
               "error");
        }
      }
    );
  }

}
