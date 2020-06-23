/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import HeaderContainer from './container';

class Header extends React.Component {
  componentDidMount(){
    console.log('hello>>>>',this.props.loggedIn)
  }
  logUserOut = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/');
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles.header__container}>
          <h1>
            <Link to="/" className={styles.header__brand}>Decision Maker</Link>
          </h1>
          <div className={styles.links}>
            {loggedIn && (
              <>
                <Link to="/admin/decisions" className={styles.header__link}>Dashboard</Link>
                <Link to="/admin/decisions/new" className={styles.header__link}>Create a Decision</Link>
                <button type="button" onClick={this.logUserOut} className={styles.header__link}>logout</button>
              </>
            )}

            {!loggedIn && (
              <Link to="/login" className={styles.header__link}>Login</Link>
            )}

          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
};

Header.defaultProps = {
  loggedIn: false,
};

export default HeaderContainer(Header);
