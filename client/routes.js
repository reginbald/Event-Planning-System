import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './components/home/HomePage';
import ProfilePage from './components/profile/ProfilePage';
import BudgetRequestPage from './components/budgetRequest/BudgetRequestPage';
import ClientPage from './components/client/ClientPage';
import EmployeePage from './components/employee/EmployeePage';
import EventRequestPage from './components/eventRequest/EventRequestPage';
import EventPage from './components/event/EventPage';
import ResourceRequestPage from './components/resourceRequest/ResourceRequestPage';
import TaskPage from './components/task/TaskPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/profile/budgetrequest" component={BudgetRequestPage} />
    <Route path="/profile/client" component={ClientPage} />
    <Route path="/profile/employee" component={EmployeePage} />
    <Route path="/profile/eventrequest" component={EventRequestPage} />
    <Route path="/profile/event" component={EventPage} />
    <Route path="/profile/resourcerequest" component={ResourceRequestPage} />
    <Route path="/profile/task" component={TaskPage} />
  </Route>
);
