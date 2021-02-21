import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';
import contactsOperation from '../../redux/contacts/contacts-operation';
import s from './ContactList.module.css';

function ContactList({ contacts, onDeleteContact, onEditContact }) {
  return (
    <ul className={s.older}>
      {contacts.map(({ id, name, number, description }) => {
        return (
          <li key={id}>
            <div className="contact_container">
              <p>Имя: {name}</p>
              <p>Номер: {number}</p>
              <p>Описание: {description}</p>
            </div>
            <div className={s.buttom_group}>
              <button
                className={s.button_list}
                onClick={() =>
                  onEditContact({ idContact: id, name, number, description })
                }
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

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(el => {
    const foundPos = el.name.toLowerCase().indexOf(normalizedFilter);
    return foundPos === -1 ? false : true;
  });
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperation.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
