import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link as RRLink } from 'react-router-dom';
import styles from '../styles.module.css';
import Link from '../../link';
import DecisionContainer from './container';

class DecisionDetail extends React.Component {
  componentDidMount() {
    // get the id from the route params
    const { fetchUserDecision, match: { params: { id } } } = this.props;
    fetchUserDecision(id);
  }

  delete = async () => {
    const { deleteDecision, decision: { id } } = this.props;
    await deleteDecision(id);
  }

  render() {
    const { decision, options } = this.props;
    return (
      <>
        <h1 className={styles.heading}>
          {decision.title}
          <Link url={`/admin/decisions/${decision.id}`} />
          <Link url={`/admin/decisions/edit/${decision.id}`} title="Edit" icon="fa-edit" />
          <span onClick={this.delete} role="presentation">
            <Link url="/admin/decisions" title="Delete" icon="fa-trash" className="linkSecondary" />
          </span>
        </h1>
        <h2 className={styles.headingSecondary}>Options</h2>
        <ul className={styles.list}>
          {options.map((option) => (
            <li className={styles.list__item} key={option.id}>
              <span className={styles.list__item__title}>{option.value}</span>
              <Link url={`/admin/options/edit/${option.id}?decisionId=${decision.id}`} title="Edit" icon="fa-edit" />
            </li>
          ))}

        </ul>
        <RRLink to={`/admin/options/new?decisionId=${decision.id}`} className={styles.button}>Add a new option</RRLink>
      </>
    );
  }
}

DecisionDetail.propTypes = {
  decision: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }),
  options: PropTypes.arrayOf(PropTypes.object),
  fetchUserDecision: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteDecision: PropTypes.func.isRequired,
};

DecisionDetail.defaultProps = {
  decision: {},
  options: [],
};

export default DecisionContainer(DecisionDetail);
