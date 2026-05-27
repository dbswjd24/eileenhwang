import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function BusCheck() {
  return (
    <Layout url="https://allaboutme.com/projects/bus">
      <div className={styles.container}>
        <Link to="/projects/design" className={styles.backButton}>← Back to Design Projects</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>🚌🚏</div>
          <h1 className={styles.title}>Bus Check n' Go</h1>
          <p className={styles.projectMeta}>2023.09 - Present</p>
          <div className={styles.rolesRow}>
            <span className={styles.role}>UI/UX Front End</span>
          </div>
          <p className={styles.introText}>
            Navigating campus transportation challenges with innovation, I served as a key
            player in creating Bus Check n' Go, a holistic website/ mobile app designed for the
            bustling life of Berkeley campus. My dual expertise in design and front-end
            development was instrumental in transforming complex transit problems into a
            streamlined digital solution.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Project Overview</h2>
          <p className={styles.bodyText}>
            Bus Check n' Go stands out as a specialized transit application that resolves the
            complexities of campus transportation by offering:
          </p>
          <ul className={styles.bodyList}>
            <li>A centralized platform for real-time bus tracking tailored to the Berkeley campus community.</li>
            <li>Personalized navigation aids addressing common student and faculty transit pain points.</li>
            <li>Enhanced user safety through integrated night-time transit features.</li>
          </ul>
        </section>

        <img src="/eileenhwang/pages/assets/img/bus1.png" alt="Bus Check n' Go Overview 1" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/bus2.png" alt="Bus Check n' Go Overview 2" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/bus3.png" alt="Bus Check n' Go Overview 3" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/bus4.png" alt="Bus Check n' Go Overview 4" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/bus5.png" alt="Bus Check n' Go Overview 5" className={styles.projectImageSmall} />

        <section>
          <h2 className={styles.sectionHeading}>Design &amp; Development Process</h2>
          <p className={styles.bodyText}>
            In my capacity as both UI/UX designer and front-end developer, I steered the app
            from conceptualization to execution. My strategy hinged on extensive user
            research and the application of modern development methodologies to deliver:
          </p>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Visually Intuitive Maps: </span>
            Combining my design sensibilities with front-end skills for a superior user experience.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Calendar-Integrated Transit Suggestions: </span>
            Automating travel planning in line with individual user schedules.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Localized Recommendations: </span>
            Offering engagement beyond transit by suggesting on-campus activities and dining.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Comprehensive Safety Measures: </span>
            Prioritizing user security with features like Bear Walk and night shuttles.
          </div>
        </div>

        <img src="/eileenhwang/pages/assets/img/bus6.png" alt="Design Process" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/bus7.png" alt="Design Process" className={styles.projectImage} />

        <section>
          <h2 className={styles.sectionHeading}>Future Scope</h2>
          <p className={styles.bodyText}>
            Our work on Bus Check n' Go is actively progressing with a number of exciting
            enhancements on the horizon. We're currently focusing on adding machine
            learning to make travel suggestions even more tailored and responsive to user
            habits. Expansion to include a wider array of transportation options is also
            underway, aiming to create a more integrated and sustainable campus travel
            system. We're also laying the groundwork for potential collaborations that will
            bring added value to our users. Finally, we're exploring ways to bring the
            convenience of Bus Check n' Go to other campuses, broadening our impact.
          </p>
        </section>
      </div>
    </Layout>
  );
}
