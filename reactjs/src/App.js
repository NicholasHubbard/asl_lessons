/*  eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Header from './header';
import Login from './login';
import DecisionList from './decision/list';
import Landing from './decision/landing';
import DecisionDetail from './decision/detail';
import DecisionForm from './forms/decision';
import OptionForm from './forms/option';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Route path="/" component={Header} />
          <main className={styles.main__container}>
            <Route path="/" exact component={Landing} />
            <Route path="(/login||/slack/callback)" exact component={Login} />
            <Route path="/admin/decisions" exact component={DecisionList} />

            <Switch>
              <Route path="/admin/decisions/new" exact component={DecisionForm} />
              <Route path="/admin/decisions/edit/:id" exact component={DecisionForm} />
              <Route path="/admin/decisions/:id" exact component={DecisionDetail} />
              <Route path="/admin/options/new" exact component={OptionForm} />
              <Route path="/admin/options/edit/:id" exact component={OptionForm} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
