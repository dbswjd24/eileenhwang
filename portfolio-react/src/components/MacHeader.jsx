import { useRef } from 'react';
import styles from './MacHeader.module.css';

export default function MacHeader({ url }) {
  const mainRef = useRef(null);

  function handleTrafficLight(action, e) {
    const btn = e.currentTarget;
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);

    const main = document.querySelector('.page-main');
    if (!main) return;
    switch (action) {
      case 'close':
        document.body.style.opacity = '0.5';
        setTimeout(() => { document.body.style.opacity = '1'; }, 300);
        break;
      case 'minimize':
        main.style.transform = 'scale(0.95)';
        setTimeout(() => { main.style.transform = 'scale(1)'; }, 300);
        break;
      case 'maximize':
        main.style.transform = 'scale(1.02)';
        setTimeout(() => { main.style.transform = 'scale(1)'; }, 300);
        break;
    }
  }

  return (
    <div className={styles.macHeader}>
      <div className={styles.left}>
        <div
          className={`${styles.trafficLight} ${styles.red}`}
          onClick={(e) => handleTrafficLight('close', e)}
        />
        <div
          className={`${styles.trafficLight} ${styles.yellow}`}
          onClick={(e) => handleTrafficLight('minimize', e)}
        />
        <div
          className={`${styles.trafficLight} ${styles.green}`}
          onClick={(e) => handleTrafficLight('maximize', e)}
        />
      </div>
      <div className={styles.center}>
        <div className={styles.searchBar}>
          <span className={styles.lockIcon}>🔒</span>
          <span className={styles.url}>{url}</span>
        </div>
      </div>
    </div>
  );
}
