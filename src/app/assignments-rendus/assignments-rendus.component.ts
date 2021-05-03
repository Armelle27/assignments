import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments-rendus',
  templateUrl: './assignments-rendus.component.html',
  styleUrls: ['./assignments-rendus.component.css']
})
export class AssignmentsRendusComponent implements OnInit {

  titre = 'Liste des assignments : ';
  assignments: Assignment[];

  // pour la pagination
  page=1;
  limit=10;
  prevPage;
  nextPage;
  totalDocs;
  totalPages;
  hasPrevPage;
  hasNextPage;
  updateSubscription: any;

  // ici injection des services utilisés, en pas oublier "private"
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    // appelée avant affichage du composant
    console.log(
      'Composant assignments, dans le ngOnInit, on demande aux service le tableau des assignments'
    );
   
  }

  getAssignmentsPourAffichage() {
    this.assignmentsService.getAssignmentsNonRendu(this.page, this.limit)
    .subscribe(data => {
      this.page = data["page"];
      this.prevPage = data["prevPage"];
      this.nextPage = data["nextPage"];
      this.totalDocs = data['totalDocs'];
      this.totalPages = data["totalPages"];
      this.hasPrevPage = data["hasPrevPage"];
      this.hasNextPage = data["hasNextPage"];
      console.log("count = " + this.totalDocs, " nbPages = " + this.totalPages);

      this.assignments = data["docs"];
    })
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsPourAffichage()
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsPourAffichage()
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsPourAffichage()
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsPourAffichage()
  }

}
