import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function Food() {
  return (
    <Layout url="https://allaboutme.com/projects/food">
      <div className={styles.container}>
        <Link to="/designathons" className={styles.backButton}>← Back to Designathons</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>🍔🛵</div>
          <h1 className={styles.title}>Food For Thought</h1>
          <p className={styles.projectMeta}>2023.11 (Design@Berkeley x UX@Berkeley Designathon sponsored by DoorDash)</p>
          <div className={styles.rolesRow}>
            <span className={styles.role}>UI/UX Designer</span>
          </div>
          <p className={styles.introText}>
            As a UI/UX Designer for the "Food For Thought" initiative with DoorDash, I focused on creating a user-friendly interface that encourages healthier eating habits among college students. My role involved designing intuitive and engaging visual elements and ensuring a seamless interaction experience across different devices.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Project Overview</h2>
          <p className={styles.bodyText}>
            "Food For Thought" introduces innovative features designed to tackle unhealthy eating behaviors among college students through DoorDash:
          </p>
          <ul className={styles.bodyList}>
            <li>Mood-Based Dietary Suggestions: Provides recommendations based on the emotional state of the user to promote healthier eating choices.</li>
            <li>Nutritional Insight Tracking: Offers a dashboard that helps users monitor their eating habits and gain insights into their nutritional intake.</li>
            <li>Behavioral Feedback Mechanism: Delivers constructive feedback on users' eating patterns, encouraging positive dietary changes.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Design &amp; Development Process</h2>
          <p className={styles.bodyText}>
            I spearheaded the design process with a strong emphasis on user-centric strategies and iterative feedback to refine the application's functionality:
          </p>
          <ul className={styles.bodyList}>
            <li>User Research: Extensive interface testing and feedback collection to understand student needs and preferences.</li>
            <li>Iterative Design: Regular updates to the design based on user feedback, focusing on enhancing user engagement and satisfaction.</li>
            <li>Responsive Interface: Ensured the application's compatibility and responsiveness across a variety of devices and platforms.</li>
          </ul>
        </section>

        <img src="/eileenhwang/pages/assets/img/food1.png" alt="Design Process" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/food2.png" alt="Key Features Screenshot 1" className={styles.projectImageSmall} />

        <section>
          <h2 className={styles.sectionHeading}>Outcomes</h2>
          <p className={styles.bodyText}>
            The deployment of "Food For Thought" within the DoorDash app has achieved notable user engagement and positive behavioral change:
          </p>
          <ul className={styles.bodyList}>
            <li>Enhanced User Awareness: Users have shown improved awareness and management of their dietary habits.</li>
            <li>Positive Behavioral Change: Preliminary feedback indicates a reduction in impulsive eating due to increased mindfulness and better nutritional choices.</li>
          </ul>
        </section>

        <img src="/eileenhwang/pages/assets/img/food3.png" alt="Food For Thought 3" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/food4.png" alt="Food For Thought 4" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/food5.png" alt="Food For Thought 5" className={styles.projectImage} />

        <section>
          <h2 className={styles.sectionHeading}>Future Scope</h2>
          <p className={styles.bodyText}>Looking forward, "Food For Thought" aims to expand its impact by:</p>
          <ul className={styles.bodyList}>
            <li>Broadening Feature Set: Introducing more comprehensive tools for diet tracking and management.</li>
            <li>Cross-Platform Integration: Planning integration with other health and wellness apps to offer a more holistic approach to health management.</li>
            <li>Customization Enhancements: Enhancing the personalization of dietary suggestions based on user preferences and past behavior.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
