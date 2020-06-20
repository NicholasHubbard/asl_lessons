import React from 'react';
import API from '../API';

export default function container(Component) {
  return class DecisionsContainer extends React.Component {
    // the default state
    state ={
      userDecisions: [],
      publicDecisions: [],
    }

    // get the user's decisions
    fetchUserDecisions = async () => {
      // get the user decisions from the api
      const userDecisions = await API.get('/decisions');
      // update the state
      this.setState({ userDecisions });
    }

    // get this public decisions
    fetchPublicDecisions = async () => {
      // get the public decisions from the api
      const publicDecisions = await API.get('/decisions/public');
      // update the state
      this.setState({ publicDecisions });
    }

    render() {
      const { userDecisions, publicDecisions } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this compnent forward */
          {...this.props}
          userDecisions={userDecisions}
          publicDecisions={publicDecisions}
          fetchUserDecisions={this.fetchUserDecisions}
          fetchPublicDecisions={this.fetchPublicDecisions}
        />
      );
    }
  };
}
