import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { data } from './assignmentsData';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  index:number;
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

   ur = "https://api-emsi.herokuapp.com/api/assignmentsNr";
   uri = "https://api-emsi.herokuapp.com/api/assignments";

  getAssignments(params):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri,{ params });
  }

  getAssignmentsPagines(page:number, limit:number):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri+ "?page=" + page + "&limit=" + limit);
  }

  getAssignmentsNonRendu(page:number, limit:number):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.ur+ "?page=" + page + "&limit=" + limit);
    }

  getAssignment(id:number):Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
      tap(a => {
        console.log("Dans pipe/tap j'ai récupéré assignement nom = " +a.nom)
      }),
      catchError(this.handleError<Assignment>("getAssignment avec id = " + id))
    );
  }

  private handleError<T>(operation, result?:T) {
    return(error:any):Observable<T> => {
      console.log(error); // pour afficher l'erreur dans la console
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    }
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = Math.floor(Math.random() * 100000);

    this.loggingService.log(assignment.nom, "ajouté")

    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // ici envoyer requête PUT à une base de données...
    this.loggingService.log(assignment.nom, "modifié")

    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");
    return this.http.delete(this.uri + "/" + assignment._id);
  }

  peuplerBaseAvecDonneesDeTest() {
    data.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;
      newAssignment.id = a.id;

      this.addAssignment(newAssignment)
      .subscribe(reponseObject => {
        console.log(reponseObject.message);
      })
    })
  }
}
