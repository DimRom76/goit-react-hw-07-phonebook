import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

import { contactsOperation, contactsSelectors } from '../../redux/contacts';

import s from './ContactList.module.css';

function ContactList({ contacts, onDeleteContact, onEditContact }) {
  return (
    <ul className={s.older}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <div className="contact_container">
              <p>Имя: {name}</p>
              <p>Номер: {number}</p>
            </div>
            <div className={s.buttom_group}>
              <button
                className={s.button_list}
                onClick={() => onEditContact({ idContact: id, name, number })}
              >
                <EditIcon />
              </button>
              <button
                className={s.button_list}
                onClick={() => onDeleteContact(id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperation.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
