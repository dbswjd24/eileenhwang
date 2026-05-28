import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function FilmedHere() {
  return (
    <Layout url="https://allaboutme.com/projects/filmedhere">
      <div className={styles.container}>
        <Link to="/projects/cs" className={styles.backButton}>← Back to CS Projects</Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Filmed Here</h1>
          <p className={styles.projectDescriptionShort}>
            A web app that lets users discover filming locations from their favorite movies and TV shows.
          </p>
        </div>
      </div>
    </Layout>
  );
}
