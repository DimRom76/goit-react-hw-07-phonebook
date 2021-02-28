import Filter from '../Filter/Filter';
import AddIcon from '@material-ui/icons/Add';
import s from './Mainbar.module.css';

function Mainbar({ onClick }) {
  return (
    <div>
      <Filter />
      <button className={s.addBtn} type="button" onClick={onClick}>
        <AddIcon />
      </button>
    </div>
  );
}

export default Mainbar;
