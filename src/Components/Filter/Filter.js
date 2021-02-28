import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { contactsSelectors, changeFilter } from '../../redux/contacts';

import s from './filter.module.css';

function Filter({ value, onChange }) {
  return (
    <form className={s.root} noValidate autoComplete="off" onSubmit={onChange}>
      <TextField id="standard-basic" label="Поиск по имени" />
      <IconButton type="submit" className={s.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </form>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

const mapStateToProps = state => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
