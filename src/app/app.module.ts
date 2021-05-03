import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { AssignmentsRendusComponent } from './assignments-rendus/assignments-rendus.component';
import { AssignmentsDetailsNonrenduComponent } from './assignments/assignments-details-nonrendu/assignments-details-nonrendu.component'; 

const routes:Routes = [
  {
    path:"", component:AssignmentsComponent
  },
  {
    path:"home", component:AssignmentsComponent
  },
  {
    path:"add", component:AddAssignmentComponent
  },
  {
    path:"assignments/:id", component:AssignmentDetailComponent,
  },
  {
    path:"NonRendus/:id", component:AssignmentsDetailsNonrenduComponent, outlet:"nonRendu"
  },
  {
    path:"assignments/:id/edit",
    component:EditAssigmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"NonRendus/:id/edit",
    component:EditAssigmentComponent,
    canActivate: [AuthGuard],
    outlet:"nonRendu"
  },
  {
    path:"NonRendus", component:AssignmentsRendusComponent, outlet:"nonRendu"
    
  },
  
]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    AssignmentsRendusComponent,
    AssignmentsDetailsNonrenduComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatSlideToggleModule,MatToolbarModule,MatGridListModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    RouterModule.forRoot(routes),MatStepperModule,
    HttpClientModule, MatTabsModule,ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
