import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import s from './filter.module.css';

function Filter({ value, onChange }) {
  return (
    <>
      <h3>Поиск по имени</h3>
      <input
        className={s.form_input}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

const mapStateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
