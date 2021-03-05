import { useFormik } from 'formik';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { connect } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import NameIcon from '@material-ui/icons/SupervisorAccount';
import PhoneIcon from '@material-ui/icons/Phone';
import { Button, TextField } from '@material-ui/core';

import InputMask from 'react-input-mask';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { contactsOperation, contactsSelectors } from '../../redux/contacts';

function ContactForm({
  onSave,
  onSubmitNew,
  onChangeContact,
  contacts,
  editContact,
}) {
  function onSubmitForm(values, setSubmitting, resetForm) {
    setSubmitting(false);
    const findEl = contacts.find(
      ({ name, number, id }) =>
        (name.toLowerCase() === values.name.toLowerCase() ||
          number === values.number) &&
        id !== idContact,
    );
    if (findEl) {
      toast.warn(
        `Запись уже есть в базе. Имя:${findEl.name}, номер:${findEl.number}`,
      );
      return;
    }

    idContact
      ? onChangeContact({ ...values, id: idContact })
      : onSubmitNew(values);
    onSave();
    resetForm();
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Requerid'),
    number: Yup.string().length(19, 'Wrong length!').required('Requerid'),
  });

  let { idContact, name, number } = editContact;
  if (!idContact) {
    name = '';
    number = '';
  }

  const formik = useFormik({
    initialValues: {
      name,
      number,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      onSubmitForm(values, resetForm, setSubmitting);
    },
  });

  function isValid() {
    if (formik.values.name === '') {
      return false;
    }
    if (formik.values.number === '') {
      return false;
    }

    return true;
  }

  return (
    <div>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          style={{ marginTop: 10 }}
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          className={s.inputs}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NameIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <InputMask
          mask="+38 (999) 999 99 99"
          maskChar=""
          value={formik.values.number}
          onChange={formik.handleChange}
          id="number"
          name="number"
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        >
          {props => {
            return (
              <TextField
                {...props}
                fullWidth
                style={{ marginTop: 10 }}
                label="Phone"
                type="tel"
                className={s.inputs}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        </InputMask>

        <Button
          disableRipple
          disabled={!isValid()}
          variant="outlined"
          className={s.button}
          style={{ marginTop: 10 }}
          type="submit"
        >
          {idContact ? 'Редактировать' : 'Новый контакт'}
        </Button>
      </form>
    </div>
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
