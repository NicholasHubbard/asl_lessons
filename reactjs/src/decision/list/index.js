import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';
import Link from '../../link';
import ListContainer from './container';

class DecisionList extends React.Component {
  componentDidMount() {
    const { fetchUserDecisions } = this.props;
    fetchUserDecisions();
  }

  render() {
    const { userDecisions } = this.props;
    return (
      <>
        <h1 className={styles.heading}>My Decisions</h1>
        <ul className={styles.list}>
          {userDecisions.map((decision) => (
            <li className={styles.list__item} key={decision.id}>
              <span className={styles.list__item__title}>{decision.title}</span>
              <Link url={`/admin/decisions/${decision.id}`} />
              <Link url={`/admin/decisions/edit/${decision.id}`} title="Edit" icon="fa-edit" className="linkSecondary" />
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

export default ListContainer(DecisionList);
