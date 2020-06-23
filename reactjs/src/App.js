/*  eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styles from './app.module.css';
import Header from './header';
import Login from './login';
import { DecisionList, Landing, DecisionDetail } from './decision';
import { DecisionForm, OptionForm } from './forms';
import { store } from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
              </Switch>
              <Route path="/admin/options/new" exact component={OptionForm} />
              <Route path="/admin/options/edit/:id" exact component={OptionForm} />
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
