import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
import { FriendsComponent } from './share-expenses/friends/friends.component';
import { GroupsComponent } from './share-expenses/groups/groups.component';
import { NewFriendsComponent } from './share-expenses/new-friends/new-friends.component';
import { NewGroupComponent } from './share-expenses/new-group/new-group.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { ShareWithFriendComponent } from './share-expenses/friends/share-with-friends/share-with-friends.component';
import { ExpenseDetailsComponent } from './share-expenses/friends/expense-details/expense-details.component';
import { GrpDetailsComponent } from './share-expenses/groups/grp-details/grp-details.component';
import { AddGrpExpenseComponent } from './share-expenses/groups/add-grp-expense/add-grp-expense.component';
import { AddBudgetComponent } from './budget/add-budget/add-budget.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'expense', component: ManageExpenseComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        { path: '', redirectTo: 'add', pathMatch: 'full' },
        { path: 'add', component: AddExpenseComponent },
        { path: 'update', component: DeleteExpenseComponent },
        { path: 'view', component: ViewExpenseComponent }]
    }]
  },
  {
    path: 'income', component: ManageIncomeComponent,
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'add', component: AddIncomeComponent },
      { path: 'update', component: UpdateIncomeComponent },
      { path: 'view', component: ViewIncomeComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'share', component: ShareExpensesComponent,
    children: [
      { path: '', redirectTo: 'friends', pathMatch: 'full' },
      {
        path: 'friends', component: FriendsComponent, children: [{
          path: '',
          canActivateChild: [AuthGuard],
          children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { path: 'details', component: ExpenseDetailsComponent },
            { path: 'add', component: ShareWithFriendComponent }]
        }]
      },
      {
        path: 'groups', component: GroupsComponent, children: [{
          path: '',
          canActivateChild: [AuthGuard],
          children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { path: 'details', component: GrpDetailsComponent },
            { path: 'add', component: AddGrpExpenseComponent }]
        }]
      },
      { path: 'new-friends', component: NewFriendsComponent },
      { path: 'new-group', component: NewGroupComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'analysis', component: AnalysisOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-budget', component: AddBudgetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-profile', component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
