import PropTypes from 'prop-types';
import s from './ContactElement.module.css';

export default function ContactElement({ id, name, number, onDeleteContact }) {
  return (
    <li>
      <p className={s.element}>
        {name}: {number}
      </p>
      <button className="close__button" onClick={() => onDeleteContact(id)}>
        X
      </button>
    </li>
  );
}

ContactElement.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
