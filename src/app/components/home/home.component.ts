import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTab: string;
  authenticated: boolean;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    if(localStorage.getItem('user'))
      this.authenticated = true;

    this.currentTab = "welcome"
  }

  changeTab(tab){
    this.currentTab = tab;
  }

  authenticate(){
    this.authenticated = true;
    this.currentTab = "store";
  }

  logout(){
    this.http.get('http://localhost:3000/api/logout');
    this.authenticated = false;
    localStorage.removeItem('user');
    this.currentTab = "welcome";
  }

}
