import { Injectable } from '@angular/core';
import { isUndefined } from 'util';
import { user } from '../assignments/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  loggedInAsAdmin = false;

  users :user[] = [
    {
     id : 1,
     login : "armelle",
     password : "qwerty",
     role:"user"
    },
    {
      id : 3,
      login : "jeanne",
      password : "qwert",
      role:"user"
     },
     {
      id : 4,
      login : "armel",
      password : "qwert",
      role:"admin"
     },

  ]

  constructor() { }

  logIn(Login:any,password:any) {
    var User = new user();
    User.login = Login;
    User.password = password;
    this.users.forEach(e => {
      if (e.login === Login && e.password === password && e.role === "user") {
        this.loggedIn = true;
        this.loggedInAsAdmin = false;
        console.log("user");
      }
      if (e.login === Login && e.password === password && e.role === "admin") {
        console.log(this.loggedInAsAdmin);
        this.loggedInAsAdmin = true;
        console.log(this.loggedInAsAdmin);
        
      }
    });
   
  }


  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedInAsAdmin)
    });
  };
}
