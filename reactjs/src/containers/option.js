import React from 'react';
import API from '../API';

export default function container(Component) {
  return class OptionContainer extends React.Component {
    // the default state
    state = {
      option: {},
    }

    fetchOption = async (id) => {
      // get the id from the route params
      // get the details of the option
      const option = await API.get(`/options/${id}`);
      this.setState({ option });
    }

    saveOption = async (option) => {
      if (option.id) {
        return API.put(`/options/${option.id}`, option);
      }

      return API.post('/options', option);
    }

    deleteOption = async (id) => {
      await API.delete(`/options/${id}`);
    }

    render() {
      const { option } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          option={option}
          fetchOption={this.fetchOption}
          saveOption={this.saveOption}
          deleteOption={this.deleteOption}
        />
      );
    }
  };

}
