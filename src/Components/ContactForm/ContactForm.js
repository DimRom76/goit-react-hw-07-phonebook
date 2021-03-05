import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { contactsOperation, contactsSelectors } from '../../redux/contacts';

const MyTextArea = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <div className={s.form_field}>
      <label htmlFor={props.id || props.name} className={s.form_label}>
        {label}
      </label>
      <textarea className="text-area" {...field} {...props} />
    </div>
  );
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={s.form_field}>
      <label htmlFor={props.id || props.name} className={s.form_label}>
        {label}
      </label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={s.error_message}>{meta.error}</div>
      ) : null}
    </div>
  );
};

function ContactForm({
  onSave,
  onSubmitNew,
  onChangeContact,
  contacts,
  editContact,
}) {
  function handleSubmit(values, { setSubmitting, resetForm }) {
    setSubmitting(false);
    const findEl = contacts.find(
      ({ name, number, id }) =>
        name.toLowerCase() === values.name.toLowerCase() ||
        (number === values.number && id !== idContact),
    );
    if (findEl) {
      toast.warn('Введенное имя или номер уже есть в справочнике!');
    } else {
      idContact
        ? onChangeContact({ ...values, id: idContact })
        : onSubmitNew(values);
      onSave();
      resetForm();
    }
  }

  let schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Requerid'),
    number: Yup.string().length(9, 'Wrong length!').required('Requerid'),
  });

  let { idContact, name, number, description } = editContact;
  if (!idContact) {
    name = '';
    number = '';
    description = '';
  }

  return (
    <>
      <Formik
        initialValues={{ name, number, description }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <MyTextInput
              label="Имя контакта"
              name="name"
              type="text"
              placeholder="Введите имя..."
            />

            <MyTextInput
              label="Номер контакта"
              name="number"
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
              placeholder="555-55-55"
            />

            <MyTextArea
              label="Описание"
              name="description"
              rows="6"
              placeholder="Описание контакта..."
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={s.form_field}
            >
              {idContact ? 'Редактировать' : 'Новый контакт'}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

ContactForm.propTypes = {
  onSubmitNew: PropTypes.func.isRequired,
  onChangeContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmitNew: value => dispatch(contactsOperation.addContact(value)),
  onChangeContact: value => dispatch(contactsOperation.editContact(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
