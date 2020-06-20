import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import DecisionContainer from '../../containers/decision';

class DecisionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      type: undefined,
    };
  }

  componentDidMount() {
    // get the id from the route params
    const { fetchDecision, match: { params: { id } } } = this.props;
    console.log("fetchDecision >>>>", this.props.match);
    if (id) fetchDecision(id);
  }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the even object
    const { target: { name, value } } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const { decision: { id }, saveDecision, history } = this.props;
    const { title, type = 'public' } = this.state;
    const data = await saveDecision({ id, title, type });
    console.log('DATA >>>> ', id)
    history.push(`/admin/decisions/${data.id}`);
  }

  render() {
    const {
      decision: { id, title: defaultTitle = '', type: defaultType = 'public' },
    } = this.props;
    const {
      title = defaultTitle,
      type = defaultType,
    } = this.state;

    return (
      <>
        <h1 className={styles.heading}>{id ? 'Edit Decision' : 'New Decision'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="title">
            <span>title</span>
            <input
              type="text"
              name="title"
              value={title}
              className={styles.form__input}
              id="title"
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label} htmlFor="public">
            <span className={styles.form__labelInline}>Is this decision public?</span>
            <label className={styles.form__labelInline} htmlFor="public">
              <input
                type="radio"
                name="type"
                value="public"
                checked={type === 'public'}
                className={styles.form__input__radio}
                id="public"
                onChange={this.handleInputChange}
              />
              <span>yes</span>
            </label>
            <label className={styles.form__labelInline} htmlFor="private">
              <input
                type="radio"
                name="type"
                value="private"
                checked={type === 'private'}
                className={styles.form__input__radio}
                id="private"
                onChange={this.handleInputChange}
              />
              <span>no</span>
            </label>
          </label>
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </>
    );
  }
}

DecisionForm.propTypes = {
  decision: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
  saveDecision: PropTypes.func.isRequired,
  fetchDecision: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

DecisionForm.defaultProps = {
  decision: {},
};

export default DecisionContainer(DecisionForm);
