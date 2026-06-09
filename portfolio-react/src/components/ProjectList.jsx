import { Link } from 'react-router-dom';
import styles from './ProjectList.module.css';

export default function ProjectList({ projects }) {
  return (
    <div className={styles.list}>
      {projects.map((project, i) => (
        <div key={i} className={styles.projectItem} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
          {project.link ? (
            <Link to={project.link} className={styles.imageLink}>
              <div className={`${styles.projectImage}${project.contain ? ' ' + styles.contain : ''}`}>
                <img src={project.image} alt={project.title} />
              </div>
            </Link>
          ) : project.href ? (
            <a href={project.href} target="_blank" rel="noreferrer" className={styles.imageLink}>
              <div className={`${styles.projectImage}${project.contain ? ' ' + styles.contain : ''}`}>
                <img src={project.image} alt={project.title} />
              </div>
            </a>
          ) : (
            <div className={`${styles.projectImage}${project.contain ? ' ' + styles.contain : ''}`}>
              <img src={project.image} alt={project.title} />
            </div>
          )}

          <div className={styles.descSection}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.concepts}>
              {project.tags.map((tag, j) => (
                <span key={j} className={styles.conceptTag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
