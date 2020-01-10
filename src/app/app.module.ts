import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ManageExpenseComponent } from './manage-expense/manage-expense.component';
import { ManageIncomeComponent } from './manage-income/manage-income.component';
import { AnalysisOverviewComponent } from './analysis-overview/analysis-overview.component';
import { ShareExpensesComponent } from './share-expenses/share-expenses.component';
import { AddExpenseComponent } from './manage-expense/add-expense/add-expense.component';
import { DeleteExpenseComponent } from './manage-expense/delete-expense/delete-expense.component';
import { ViewExpenseComponent } from './manage-expense/view-expense/view-expense.component';
import { AddIncomeComponent } from './manage-income/add-income/add-income.component';
import { UpdateIncomeComponent } from './manage-income/update-income/update-income.component';
import { ViewIncomeComponent } from './manage-income/view-income/view-income.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FriendsComponent } from './share-expenses/friends/friends.component';
import { GroupsComponent } from './share-expenses/groups/groups.component';
import { NewFriendsComponent } from './share-expenses/new-friends/new-friends.component';
import { NewGroupComponent } from './share-expenses/new-group/new-group.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ExpenseDetailsComponent } from './share-expenses/friends/expense-details/expense-details.component';
import { DatePipe } from '@angular/common';
import { PersistenceModule } from 'angular-persistence';
import { ShareWithFriendComponent } from './share-expenses/friends/share-with-friends/share-with-friends.component';
import { GrpDetailsComponent } from './share-expenses/groups/grp-details/grp-details.component';
import { AddGrpExpenseComponent } from './share-expenses/groups/add-grp-expense/add-grp-expense.component';
import { AddBudgetComponent } from './budget/add-budget/add-budget.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ExpenseComponent } from './analysis-overview/expense/expense.component';
import { IncomeComponent } from './analysis-overview/income/income.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ManageExpenseComponent,
    AddExpenseComponent,
    DeleteExpenseComponent,
    ViewExpenseComponent,
    ManageIncomeComponent,
    AnalysisOverviewComponent,
    ShareExpensesComponent,
    AddIncomeComponent,
    UpdateIncomeComponent,
    ViewIncomeComponent,
    FriendsComponent,
    GroupsComponent,
    NewFriendsComponent,
    NewGroupComponent,
    ExpenseDetailsComponent,
    ShareWithFriendComponent,
    GrpDetailsComponent,
    AddGrpExpenseComponent,
    AddBudgetComponent,
    ExpenseComponent,
    IncomeComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    PersistenceModule,
    NgbModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
