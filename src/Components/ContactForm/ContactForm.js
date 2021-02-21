import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactsAction from '../../redux/contacts/contacts-actions';

function ContactForm({ onSubmit, contacts }) {
  let schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Requerid'),
    number: Yup.string().length(9, 'Wrong length!').required('Requerid'),
  });

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //форма в режиме отправляется, кнопка неактивная пока не отменим
          //нужно если бросам запрос на сервер например
          setSubmitting(false);

          const findEl = contacts.find(
            ({ name, number }) =>
              name.toLowerCase() === values.name.toLowerCase() ||
              number === values.number,
          );

          if (findEl) {
            toast.warn('Введенное имя или номер уже есть в справочнике!');
            return;
          }

          onSubmit(values);

          //очищаем форму к начальным значениям
          resetForm();
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={s.form}>
            <div className={s.form_field}>
              <label
                htmlFor="name
                  "
                className={s.form_label}
              >
                Name
              </label>
              <Field
                className="form_input"
                name="name"
                placeholder="Input name..."
              />
              {errors.name && touched.name ? (
                <div className={s.error_message}>{errors.name}</div>
              ) : null}
            </div>

            <div className={s.form_field}>
              <label htmlFor="number" className={s.form_label}>
                Number
              </label>
              <Field
                className="form_input"
                type="tel"
                name="number"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
                placeholder="555-55-55"
              />
              {errors.number && touched.number ? (
                <div className={s.error_message}>{errors.number}</div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={s.form_field}
            >
              Add contact
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

const mapStateToProps = ({ contacts }) => ({
  contacts: contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: value => dispatch(contactsAction.addContacts(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
