import Filter from '../Filter/Filter';
import AddIcon from '@material-ui/icons/Add';
import s from './Mainbar.module.css';

function Mainbar({ onClick }) {
  return (
    <header className={s.Mainbar}>
      <Filter />
      <button className={s.addBtn} type="button" onClick={onClick}>
        <AddIcon />
      </button>
    </header>
  );
}

export default Mainbar;
