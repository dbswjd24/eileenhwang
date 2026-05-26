import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './Home.module.css';
import heroImg from '../assets/hero.png';

const folders = [
  { id: 'about',       label: 'About Me',      path: '/about' },
  { id: 'experiences', label: 'Experiences',   path: '/experiences' },
  { id: 'projects',    label: 'Projects',      path: '/projects/cs' },
  { id: 'hackathons',  label: 'Hackathons',    path: '/hackathons' },
  { id: 'designathons',label: 'Designathons',  path: '/designathons' },
];

export default function Home() {
  const navigate = useNavigate();
  const folderRefs = useRef([]);
  const hoverState = useRef(folders.map(() => false));
  const animFrameRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();

    function animate() {
      folderRefs.current.forEach((el, i) => {
        if (!el || hoverState.current[i]) return;
        const y = Math.sin((Date.now() - startTime) * 0.001 + i) * 2;
        el.style.transform = `translateY(${y}px)`;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  function handleFolderClick(path, idx) {
    const el = folderRefs.current[idx];
    if (el) {
      el.style.transform = 'translateY(-4px) scale(0.98)';
      setTimeout(() => { el.style.transform = 'translateY(-8px) scale(1.02)'; }, 100);
    }
    setTimeout(() => navigate(path), 150);
  }

  return (
    <Layout url="https://allaboutme.com">
      <main className={`page-main ${styles.mainContent}`}>
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <img src={heroImg} alt="folder" className={styles.heroImage} />
            <h1 className={styles.mainTitle}>All About Me</h1>
            <p className={styles.subtitle}>
              A look into my passions, interests, and the things that shape me
            </p>
          </div>

          <div className={styles.foldersContainer}>
            {folders.map((folder, i) => (
              <div
                key={folder.id}
                ref={(el) => (folderRefs.current[i] = el)}
                className={`${styles.folder} ${styles[folder.id]}`}
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                onClick={() => handleFolderClick(folder.path, i)}
                onMouseEnter={() => { hoverState.current[i] = true; }}
                onMouseLeave={() => { hoverState.current[i] = false; }}
              >
                <span className={styles.folderLabel}>{folder.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
