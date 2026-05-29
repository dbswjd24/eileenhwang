import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavHeader.module.css';

export default function NavHeader() {
  const location = useLocation();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isProjectsActive = isActive('/projects/design') || isActive('/projects/cs');

  return (
    <div className={`${styles.navHeader} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContent}>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" className={isActive('/') ? styles.active : ''}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about') ? styles.active : ''}>About Me</Link>
            </li>
            <li>
              <Link to="/experiences" className={isActive('/experiences') ? styles.active : ''}>Experiences</Link>
            </li>
            <li
              className={styles.dropdown}
              onMouseEnter={() => setProjectsOpen(true)}
              onMouseLeave={() => setProjectsOpen(false)}
            >
              <span className={`${styles.dropdownToggle} ${isProjectsActive ? styles.active : ''}`}>
                Projects <span className={styles.arrow}>▼</span>
              </span>
              {projectsOpen && (
                <div className={styles.dropdownContent}>
                  <Link to="/projects/design" onClick={() => setProjectsOpen(false)}>Design</Link>
                  <Link to="/projects/cs" onClick={() => setProjectsOpen(false)}>CS</Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/hackathons" className={isActive('/hackathons') ? styles.active : ''}>Hackathons</Link>
            </li>
            <li>
              <Link to="/designathons" className={isActive('/designathons') ? styles.active : ''}>Designathons</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
