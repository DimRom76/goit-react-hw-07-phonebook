import { Component } from 'react';
import { connect } from 'react-redux';

import { Paper } from '@material-ui/core';

import ContactList from '../Components/ContactList';
import ContactForm from '../Components/ContactForm';
import Mainbar from '../Components/Mainbar';
import Modal from '../Components/Modal';

import { contactsOperation, contactsSelectors } from '../redux/contacts';

class ContactsView extends Component {
  state = {
    showModal: false,
    editContact: {},
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
      editContact: {},
    }));
  };

  setEditContact = editContact => {
    this.setState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
      editContact,
    }));
  };

  render() {
    const { showModal, editContact } = this.state;

    return (
      <div className="container">
        {this.props.isContactsLoading && (
          <Modal>
            <h1>Обработка данных...</h1>
          </Modal>
        )}

        <Paper className="paper">
          <Mainbar onClick={this.toggleModal} />

          <h2>Phonebook</h2>

          <ContactList onEditContact={this.setEditContact} />
        </Paper>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm onSave={this.toggleModal} editContact={editContact} />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isContactsLoading: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperation.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
