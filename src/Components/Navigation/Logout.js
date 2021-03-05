import React from 'react';
import { connect } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { Button } from '@material-ui/core';

function Logout({ name, logoutUser }) {
  return (
    <div>
      <span>Welcome, {name}</span>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={logoutUser}
      >
        Logout
      </Button>
    </div>
  );
}

const mapStateToProps = state => ({
  name: authSelectors.getUsername(state),
});

const mapDispatchToProps = {
  logoutUser: authOperations.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
