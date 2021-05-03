import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // pour les formulaire
  nomAssignment = '';
  dateDeRendu = '';
  remarques = '';
  nomEleve = '';
  matiere = '';
  note = 0;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  onSubmit() {
    let nouvelAssignment = new Assignment();
    if(!this.nomAssignment) return;
    if(!this.dateDeRendu) return;
    if(!this.matiere) return;
    if(!this.remarques) return;
    if(!this.nomEleve) return;

    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = new Date(this.dateDeRendu);
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.auteur = this.nomEleve;
    nouvelAssignment.remarques = this.remarques;
    nouvelAssignment.note = this.note;
    nouvelAssignment.rendu = false;

    if ( nouvelAssignment.matiere === "securite") {
      nouvelAssignment.photoProf = "../assets/images/cp_prof.jpg";
      nouvelAssignment.photoMat = "../assets/images/securite_logo.jpg";
    }

    if ( nouvelAssignment.matiere === "bd") {
      nouvelAssignment.photoProf = "../assets/images/bd_prof.jpg";
      nouvelAssignment.photoMat = "../assets/images/mysql_logo.jpg";
    }

    if ( nouvelAssignment.matiere === "ang") {
      nouvelAssignment.photoProf = "../assets/images/prof_angul.jpg";
      nouvelAssignment.photoMat = "../assets/images/Angular_full_color_logo.svg.png";
    }

    if ( nouvelAssignment.matiere === "angl") {
      nouvelAssignment.photoProf = "../assets/images/angl_prof.jfif";
      nouvelAssignment.photoMat = "../assets/images/angl_logo.jpg";
    }

    if ( nouvelAssignment.matiere === "tw") {
      nouvelAssignment.photoProf = "../assets/images/cp_prof.jpg";
      nouvelAssignment.photoMat = "../assets/images/Java_Logo.svg.jpg";
    }

    if ( nouvelAssignment.matiere === "cp") {
      nouvelAssignment.photoProf = "../assets/images/cp_prof.jpg";
      nouvelAssignment.photoMat = "../assets/images/cp_logo.png";
    }
    
    
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((reponseObject) => {
      console.log(reponseObject.message);

    this._snackBar.open(nouvelAssignment.nom + " ajouté", "Fermer");

      // naviguer programmatiquement vers "/home" pour afficher la liste
      this.router.navigate(['/home', { outlets: { 'nonRendu': null} }]);
    });


  }

}
