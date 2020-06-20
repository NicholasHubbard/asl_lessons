import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';
import Link from '../../link';
import DecisionsContainer from '../../containers/decisions';

class DecisionList extends React.Component {
  componentDidMount() {
    const { fetchUserDecisions } = this.props;
    fetchUserDecisions();
  }

  render() {
    const { userDecisions } = this.prop;
    return (
      <>
        <h1 className={styles.heading}>My Decisions</h1>
        <ul className={styles.list}>
          {userDecisions.map((decision) => (
            <li className={styles.list__item} key={decision.id}>
              <span className={styles.list__item__title}>{decision.title}</span>
              <Link url={`/decisions/${decision.id}`} />
              <Link url={`/admin/decisions/${decision.id}`} title="Edit" icon="fa-edit" className="linkSecondary" />
            </li>
          ))}

        </ul>
      </>
    );
  }
}

DecisionList.propTypes = {
  userDecisions: PropTypes.arrayOf(PropTypes.object),
  fetchUserDecisions: PropTypes.func.isRequired,
};

DecisionList.defaultProps = {
  userDecisions: [],
};

export default DecisionsContainer(DecisionList);
