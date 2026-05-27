import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function Unetic() {
  return (
    <Layout url="https://allaboutme.com/projects/unetic">
      <div className={styles.container}>
        <Link to="/projects/design" className={styles.backButton}>← Back to Design Projects</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>📅📝</div>
          <h1 className={styles.title}>Unetic</h1>
          <p className={styles.projectMeta}>2024.02 - 2024.12</p>
          <div className={styles.rolesRow}>
            <span className={styles.role}>Product Manager</span>
            <span className={styles.role}>UI/UX</span>
            <span className={styles.role}>Front End</span>
          </div>
          <a
            href="https://unetic.org"
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}
          >
            View Website
          </a>
          <p className={styles.introText}>
            As a product manager, UI/UX Designer, and a Front-End Developer, I was tasked with
            creating a user-friendly interface and implementing front-end functionalities that
            ensure a seamless user experience. My responsibilities included designing the visual
            elements, coding the interactive features, and ensuring the platform's
            responsiveness across various devices.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Project Overview</h2>
          <p className={styles.bodyText}>
            Unetic stands as a pivotal platform that streamlines the complexities of university
            club management by providing:
          </p>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Comprehensive Club Searching Tool: </span>
            An intuitive search feature that allows students to easily find and explore clubs that match their interests, enhancing the overall user experience by simplifying how students engage with club activities on campus.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Centralized Management: </span>
            A single platform for all university club activities, facilitating streamlined management and access.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Enhanced Communication: </span>
            Tools that enhance interaction among students, improving engagement and participation in club activities.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Simplified Verification: </span>
            A robust system for verifying student memberships, ensuring a secure and trustworthy community environment.
          </div>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Design &amp; Development Process</h2>
          <p className={styles.bodyText}>
            In my dual role as a UI/UX designer and front-end developer for Unetic, I led the
            project from its initial concept through to its final implementation. The design
            process was characterized by a deep focus on user-centric methodologies and the
            application of advanced technical practices, ensuring a seamless and engaging user
            experience:
          </p>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>User-Centered Research: </span>
            Conducted extensive surveys and user testing sessions to understand the needs and preferences of university students regarding club participation.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Iterative Prototyping: </span>
            Developed multiple iterations of the app interface, using feedback from potential users to refine functionality and aesthetics.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Responsive Design: </span>
            Focused on creating a flexible and responsive design that ensures usability across various devices and platforms.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Secure Verification Features: </span>
            Implemented robust verification systems to maintain the integrity and security of the platform, ensuring that only verified university students could access and manage club information.
          </div>
        </div>

        <img
          src="/eileenhwang/pages/assets/img/unetic.png"
          alt="Design Process Screenshot 1"
          className={styles.projectImageSmall}
        />
        <img
          src="/eileenhwang/pages/assets/img/unetic1.png"
          alt="Design Process Screenshot 2"
          className={styles.projectImageSmall}
        />

        <section>
          <h2 className={styles.sectionHeading}>Outcomes</h2>
        </section>

        <div className={styles.achievement}>
          <h3>🏆 Placed 1st in the Korean Startup Competition</h3>
          <p>
            The launch of Unetic successfully met the anticipated goals, providing a platform
            that significantly improved the efficiency of club management and student
            engagement on campus. Feedback from users highlighted the ease of navigation and
            the effectiveness of the verification process, leading to higher participation rates in
            club activities.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Future Scope</h2>
          <p className={styles.bodyText}>
            Plans for the future development of Unetic include expanding its features to support
            more comprehensive event planning tools, deeper integration with campus
            information systems, and the introduction of machine learning algorithms to predict
            and suggest clubs based on student interests and engagement levels. These
            enhancements aim to foster a more connected and vibrant university community.
          </p>
        </section>
      </div>
    </Layout>
  );
}
