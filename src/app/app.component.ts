import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titre = "Application de gestion d'assignments";
  hide = true;
  selectedIndex : number = 0;

  //pour l'authentification
  Login:string;
  Password:string;
  Logged = false;
  NotLogged = true;
  updateSubscription: any;
  index:number;

  constructor(private authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService) {
              }

              ngOnInit(): void {
                // appelée avant affichage du composant
                console.log(
                  'Composant assignments, dans le ngOnInit, on demande aux service le tableau des assignments'
                );
               
              }
  
  login() {
    if(this.authService.loggedIn) {
      this.authService.logOut();
      this.router.navigate(["/home"]);
    } else {
      console.log("connected")
      console.log(this.Login);
      console.log(this.Password);
      this.authService.logIn(this.Login,this.Password);
      this.Logged = true;
      this.router.navigate(["/home"]);
    }
  }

  logout(){
   this.authService.logOut();
   this.Logged = false;
   this.router.navigate(["/"]);
  }
  
  SelectedIndex(){
    this.index = 0;
  }
  NSelectedIndex(){
    this.index = 1;
  }

}
