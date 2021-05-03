import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
})
export class EditAssigmentComponent implements OnInit {
  nomAssignment = '';
  dateDeRendu = null;
  assignment: Assignment;
  remarques = '';
  matiere = '';
  note:number;


  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAssignment();

    let nom = this.route.snapshot.queryParams.nom;

    console.log(this.route.snapshot.queryParams);

    console.log("fragment = " + this.route.snapshot.fragment)
  }

  // récupère l'id puis l'assignment correspondant
  getAssignment() {
    let id = +this.route.snapshot.params.id;
    console.log('Dans le ngOnInit id récupéré = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      // pour que le formulaire affiche les informations de l'assignment
      this.nomAssignment = this.assignment.nom;
      this.dateDeRendu = this.assignment.dateDeRendu;
      this.remarques = this.assignment.remarques;
      this.matiere = this.assignment.matiere;
      this.note = this.assignment.note;
    });
  }

  onSaveAssignment(event) {
    event.preventDefault();

    if(this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
      this.assignment.remarques = this.remarques;
      this.assignment.note = this.note;
      this.assignment.matiere = this.matiere;
    }

    if(this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if (this.assignment.note === 0) {
      this.assignment.rendu = false;
    }

    if ( this.assignment.matiere === "securite") {
      this.assignment .photoProf = "../assets/images/cp_prof.jpg";
      this.assignment.photoMat = "../assets/images/securite_logo.jpg";
    }

    if (this.assignment.matiere === "bd") {
      this.assignment .photoProf = "../assets/images/bd_prof.jpg";
      this.assignment.photoMat = "../assets/images/mysql_logo.jpg";
    }
    

    if ( this.assignment.matiere === "ang") {
      this.assignment .photoProf = "../assets/images/prof_angul.jpg";
      this.assignment.photoMat = "../assets/images/Angular_full_color_logo.svg.png";
    }
    

    if ( this.assignment.matiere === "angl") {
      this.assignment .photoProf = "../assets/images/angl_prof.jfif";
      this.assignment.photoMat = "../assets/images/angl_logo.jpg";
    }

    if ( this.assignment.matiere === "tw") {
      this.assignment .photoProf = "../assets/images/cp_prof.jpg";
      this.assignment.photoMat = "../assets/images/Java_Logo.svg.png";
    }

    if ( this.assignment.matiere === "cp") {
      this.assignment .photoProf = "../assets/images/cp_prof.jpg";
      this.assignment.photoMat = "../assets/images/cp_logo.png";
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponseObject) => {
      console.log(reponseObject.message);
    
      this._snackBar.open(this.assignment.nom + " modifé", "Fermer");

        if (this.assignment.rendu) {
          this.router.navigate(['/home', { outlets: { 'nonRendu': null} }]);
        } else {
          this.router.navigate([{ outlets: { 'nonRendu':['NonRendus',this.assignment.id]} }]);
        }
      });
  }
}
