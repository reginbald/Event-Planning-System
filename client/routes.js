import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './components/home/HomePage';
import ProfilePage from './components/profile/ProfilePage';
import BudgetRequestPage from './components/budgetRequest/BudgetRequestPage';
import ClientPage from './components/client/ClientPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/profile/budgetrequest" component={BudgetRequestPage} />
    <Route path="/profile/client" component={ClientPage} />
  </Route>
);
