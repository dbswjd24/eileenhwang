import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function GoodNotes() {
  return (
    <Layout url="https://allaboutme.com/projects/goodnotes">
      <div className={styles.container}>
        <Link to="/designathons" className={styles.backButton}>← Back to Designathons</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>📚💡</div>
          <h1 className={styles.title}>GoodNotes Classroom: ClearCollab</h1>
          <p className={styles.projectMeta}>2025.04 (Invention Corps of Berkeley Designathon sponsored by GoodNotes)</p>
          <div className={styles.rolesRow}>
            <span className={styles.role}>UI/UX Designer</span>
          </div>
          <p className={styles.introText}>
            As a product-focused designer, I contributed to the concept and strategy for ClearCollab, a classroom collaboration experience built around GoodNotes. My focus was on identifying shared pain points between students and teachers and proposing solutions that reduce participation anxiety while keeping classroom collaboration manageable and accessible.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Project Overview</h2>
          <p className={styles.bodyText}>
            ClearCollab is a conceptual extension of GoodNotes Classroom designed to reimagine how collaboration works in educational settings. As classrooms become increasingly digital, students and teachers face new challenges around participation, communication, and tool complexity. ClearCollab aims to support more inclusive, low-pressure collaboration while fitting naturally into existing classroom workflows.
          </p>
          <p className={styles.bodyText}>The project explores key ideas including:</p>
          <ul className={styles.bodyList}>
            <li>Anonymous and private question submission to lower participation barriers.</li>
            <li>Real-time grouping of student questions to surface common concerns.</li>
            <li>Teacher-facing tools that reduce cognitive and technical overload.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Design Process</h2>
          <p className={styles.bodyText}>
            The process began with identifying the core problem space around classroom participation and technology adoption. Through literature review, surveys, and qualitative feedback, we examined how fear of judgment affects student engagement and how tool complexity impacts teacher willingness to adopt collaborative features.
          </p>
          <p className={styles.bodyText}>
            We mapped shared frustrations across students and educators, focusing on moments where collaboration breaks down. These insights guided ideation around features that prioritize emotional safety, simplicity, and clarity over feature-heavy solutions.
          </p>
        </section>

        <img src="/eileenhwang/pages/assets/img/painpoint.png" alt="Design Process" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/user1.png" alt="User Research 1" className={styles.projectImageSmall} />
        <img src="/eileenhwang/pages/assets/img/user2.png" alt="User Research 2" className={styles.projectImageSmall} />

        <div className={styles.featureSection}>
          <h2 className={styles.sectionHeading}>Key Features</h2>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Anonymous Question Submission: </span>
            Students can submit questions privately during class, reducing fear of speaking up and encouraging broader participation.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>AI-Based Question Grouping: </span>
            Submitted questions are grouped by similarity, allowing teachers to quickly identify patterns and address common misunderstandings.
          </div>

          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Teacher Help Assistant: </span>
            An in-context assistant provides guidance on classroom tools and collaboration features, lowering the barrier for teachers who are less comfortable with new technology.
          </div>
        </div>

        <img src="/eileenhwang/pages/assets/img/sol1.png" alt="Solution 1" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/sol2.png" alt="Solution 2" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/sol3.png" alt="Solution 3" className={styles.projectImage} />
        <img src="/eileenhwang/pages/assets/img/sol4.png" alt="Solution 4" className={styles.projectImage} />

        <section>
          <h2 className={styles.sectionHeading}>Outcomes</h2>
          <p className={styles.bodyText}>
            ClearCollab proposes a collaboration model that balances student confidence with teacher control. By reducing participation anxiety and simplifying classroom management, the concept supports more active learning without adding complexity to existing teaching workflows.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Future Scope</h2>
          <p className={styles.bodyText}>
            Future iterations could explore deeper analytics on participation trends, expanded AI support for classroom facilitation, and enhanced real-time collaboration insights. ClearCollab is designed to scale alongside GoodNotes Classroom while maintaining ease of use and emotional safety for all users.
          </p>
        </section>
      </div>
    </Layout>
  );
}
