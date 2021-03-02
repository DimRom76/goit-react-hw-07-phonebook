import Filter from '../Filter/Filter';
import AddIcon from '@material-ui/icons/Add';
import s from './Mainbar.module.css';

function Mainbar({ onClick }) {
  return (
    <div className={s.mainBar}>
      <Filter />
      <button className={s.addBtn} type="button" onClick={onClick}>
        <AddIcon />
      </button>
    </div>
  );
}

export default Mainbar;
