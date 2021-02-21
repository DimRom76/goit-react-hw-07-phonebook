import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContactElement from './ContactElement/ContactElement';
import contactsAction from '../../redux/contacts/contacts-actions';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className="older">
      {contacts.map(el => {
        return (
          <ContactElement
            key={el.id}
            id={el.id}
            name={el.name}
            number={el.number}
            onDeleteContact={onDeleteContact}
          />
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
  onDeleteContact: id => dispatch(contactsAction.deleteContacts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
