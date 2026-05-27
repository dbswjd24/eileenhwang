import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function PathPilot() {
  return (
    <Layout url="https://allaboutme.com/projects/pathpilot">
      <div className={styles.container}>
        <Link to="/hackathons" className={styles.backButton}>← Back to Hackathons</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>🗺🚗📍</div>
          <h1 className={styles.title}>PathPilot</h1>
          <p className={styles.projectMeta}>2024.01 - 2024.01 (LikeLion Hackathon 2024)</p>
          <div className={styles.rolesRow}>
            <span className={styles.role}>UI/UX Designer</span>
          </div>
          <a
            href="https://github.com/idery325/Road-Trip"
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}
          >
            View GitHub Repository
          </a>
          <p className={styles.introText}>
            As a passionate UI/UX designer, I spearheaded the design for PathPilot, an innovative
            mobile app that seamlessly integrates trip planning with social engagement and local
            insights. My focus was on crafting an intuitive user experience that addresses the
            growing demand for independent travel and the challenges associated with it.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Project Overview</h2>
          <p className={styles.bodyText}>
            PathPilot is a mobile application designed to revolutionize the way users plan their
            road trips. With the rise of autonomous vehicles and a growing preference for
            independent travel experiences, PathPilot offers a personalized approach to itinerary
            planning. The app provides key services, including:
          </p>
          <ul className={styles.bodyList}>
            <li>Customized recommendations for hidden gems suggested by locals.</li>
            <li>Curated amenities for a safe and enjoyable travel experience.</li>
            <li>Social media integration for discovering trending hotspots.</li>
          </ul>
        </section>

        <img src="/eileenhwang/pages/assets/img/projectoverview.png" alt="Project Overview" className={styles.projectImage} />

        <section>
          <h2 className={styles.sectionHeading}>Design Process</h2>
          <p className={styles.bodyText}>
            My design process was user-centric, involving extensive research into user needs
            and travel planning behaviors. I identified the problem space by recognizing the
            stress associated with trip planning and the lack of comprehensive multi-stop route
            optimization tools. Through surveys and user testing, I mapped out the journey of our
            primary personas, understanding their pain points and preferences, which guided the
            design of the app's core features.
          </p>
        </section>

        <img src="/eileenhwang/pages/assets/img/design1.png" alt="Design Process" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/design2.png" alt="Key Features Screenshot 1" className={styles.projectImageSmall} />

        <div className={styles.featureSection}>
          <h2 className={styles.sectionHeading}>Key Features</h2>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Intuitive Planning Interface: </span>
            A clean and engaging interface that invites users to input their starting point, like Berkeley, and visualize recommended stops and destinations.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Personalized Itineraries: </span>
            Leveraging user preferences for rest stops, meal times, and interests to generate optimal route recommendations.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Local and Social Insights: </span>
            Integration with social media and local content creators to provide up-to-date and authentic travel suggestions.
          </div>
        </div>

        <img src="/eileenhwang/pages/assets/img/design3.png" alt="Key Features Screenshot 2" className={styles.projectImageSmall} />

        <section>
          <h2 className={styles.sectionHeading}>Outcomes</h2>
          <p className={styles.bodyText}>
            The app's design emphasizes simplicity and personalization, allowing users to plan
            their road trips with ease and confidence. The final product offers a balance between
            guided recommendations and personal customization, empowering users to discover
            and explore with PathPilot as their co-pilot.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Future Scope</h2>
          <p className={styles.bodyText}>
            Looking ahead, the app aims to incorporate real-time navigation and community
            features to further enhance user engagement. PathPilot is poised for scalability with
            plans to establish partnerships with local businesses and content creators, offering
            unique monetization avenues through targeted advertising and affiliate marketing.
          </p>
        </section>

        <img src="/eileenhwang/pages/assets/img/design4.png" alt="Key Features Screenshot 3" className={styles.projectImageSmall} />
      </div>
    </Layout>
  );
}
