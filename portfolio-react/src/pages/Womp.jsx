import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function Womp() {
  return (
    <Layout url="https://allaboutme.com/projects/womp">
      <div className={styles.container}>
        <Link to="/designathons" className={styles.backButton}>← Back to Designathons</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>👩🏻‍💻🖌️</div>
          <h1 className={styles.title}>Womp</h1>
          <p className={styles.projectMeta}>2024.11 (Design@Berkeley Designathon sponsored by Womp)</p>
          <div className={styles.rolesRow}>
            <span className={styles.role}>UI/UX Designer</span>
          </div>
          <p className={styles.introText}>
            As a UI/UX Designer for the WOMP initiative, I focused on creating an intuitive interface that makes 3D design accessible to users of all skill levels. My role involved designing user-friendly visual elements and ensuring a seamless interaction experience across different devices.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Project Overview</h2>
          <p className={styles.bodyText}>
            WOMP is an innovative 3D design software that addresses the accessibility challenges in the 3D modeling industry. It aims to bridge the gap between professional and novice users by offering a platform that is both powerful and intuitive:
          </p>
          <ul className={styles.bodyList}>
            <li>Adaptive Interface: Automatically adjusts to the user's skill level, providing a customized experience that grows with the user.</li>
            <li>Guided and Pro Modes: Features two distinct modes to cater to beginners and advanced users, enhancing usability and satisfaction.</li>
            <li>Skill Progression System: Incorporates gamification elements like levels and achievements to motivate users and track their progression in 3D modeling skills.</li>
          </ul>
        </section>

        <img src="/eileenhwang/pages/assets/img/womp1.png" alt="Project Overview" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/womp2.png" alt="Project Overview" className={styles.projectImageSmall} />

        <section>
          <h2 className={styles.sectionHeading}>Design &amp; Development Process</h2>
          <p className={styles.bodyText}>
            I led the design process, focusing on a user-centric approach to ensure the software meets the needs of diverse users:
          </p>
          <ul className={styles.bodyList}>
            <li>User Research: Conducted extensive interviews and usability testing to gather insights from both beginner and experienced designers.</li>
            <li>Iterative Prototyping: Developed multiple iterations of the user interface, incorporating real-time feedback to refine the user experience.</li>
            <li>Responsive Design: Ensured the software's interface is responsive and functional across all platforms and devices.</li>
          </ul>
        </section>

        <img src="/eileenhwang/pages/assets/img/womp3.png" alt="Design Process" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/womp4.png" alt="Key Features Screenshot 1" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/womp5.png" alt="Key Features Screenshot 2" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/womp6.png" alt="Key Features Screenshot 3" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/womp7.png" alt="Key Features Screenshot 4" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/womp8.png" alt="Key Features Screenshot 5" className={styles.projectImageSmall} />

        <section>
          <h2 className={styles.sectionHeading}>Future Scope</h2>
          <p className={styles.bodyText}>The future development plans for WOMP include:</p>
          <ul className={styles.bodyList}>
            <li>Advanced Tool Integration: To introduce more sophisticated tools that cater to professional designers without compromising simplicity for beginners.</li>
            <li>Community Features: To develop a community platform within the software that allows users to share, collaborate, and learn from each other.</li>
            <li>Expansion to Educational Institutions: To tailor the software for use in schools and universities, enhancing the educational tools and features.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
