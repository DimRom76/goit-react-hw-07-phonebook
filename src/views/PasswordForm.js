import React, { Component } from 'react';

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

class PasswordForm extends Component {
  state = {
    hidePassword: true,
  };

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  render() {
    const { hidePassword } = this.state;
    const { formik, label, name, error, helperText } = this.props;

    return (
      <TextField
        style={{ marginTop: 10 }}
        fullWidth
        id={name}
        name={name}
        label={label}
        type={hidePassword ? 'password' : 'input'}
        value={formik.values[{ name }]}
        onChange={formik.handleChange}
        error={error}
        helperText={helperText}
        InputProps={
          hidePassword
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffTwoToneIcon
                      onClick={this.showPassword}
                      color="primary"
                    />
                  </InputAdornment>
                ),
              }
            : {
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityTwoToneIcon
                      onClick={this.showPassword}
                      color="primary"
                    />
                  </InputAdornment>
                ),
              }
        }
      />
    );
  }
}

export default PasswordForm;
