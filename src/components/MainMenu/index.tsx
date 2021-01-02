import React from 'react';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PanoramaIcon from '@material-ui/icons/Panorama';
import styles from './MainMenu.module.scss';
import { Link } from 'react-router-dom';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import EqualizerIcon from '@material-ui/icons/Equalizer';
var classNames = require('classnames');

const MainMenu = () => {
  const [activeCategory, setactiveCategory] = React.useState(null);

  return (
    <ul className={styles.Menu}>
      <li className={ classNames(styles.Menu_item, {
        [styles.active]: activeCategory === 0
      })} onClick={ () => setactiveCategory(0)}>
        <Link to="/home/myplaylists">
          <PanoramaIcon  fontSize="small" className={styles.IconMenu}/>
          <div className={styles.Users}>Мои курсы</div>
        </Link>
      </li>
      <li className={ classNames(styles.Menu_item, {
        [styles.active]: activeCategory === 1
      })} onClick={ () => setactiveCategory(1)}>
        <Link to="/home/users">
            <GroupAddIcon  className={styles.IconMenu}/>
          <div className={styles.Users}>Пользователи</div>
        </Link>
      </li>
      <li className={ classNames(styles.Menu_item, {
        [styles.active]: activeCategory === 2
      })} onClick={ () => setactiveCategory(2)}>
      <Link to="/home/mysubscribes">
            <SubscriptionsIcon   className={styles.IconMenuSub}/>
          <div className={styles.Users}>Мои подписки</div>
        </Link>
      </li>
      <li className={ classNames(styles.Menu_item, {
        [styles.active]: activeCategory === 3
      })} onClick={ () => setactiveCategory(3)}>
      <Link to="/home/feed">
            <FiberNewIcon className={styles.IconMenuNew}/>
          <div className={styles.Users}>Лента</div>
        </Link>
      </li>
      <li className={ classNames(styles.Menu_item, {
        [styles.active]: activeCategory === 4
      })} onClick={ () => setactiveCategory(4)}>
      <Link to="/home/stat">
            <EqualizerIcon className={styles.IconMenuStat}/>
          <div className={styles.Users}>Статистика</div>
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
