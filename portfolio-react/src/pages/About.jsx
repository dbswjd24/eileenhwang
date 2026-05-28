import Layout from '../components/Layout';
import styles from './About.module.css';

export default function About() {
  return (
    <Layout url="https://about_me.com">
      <main className={`page-main ${styles.mainContent}`}>
        <div className={styles.profileSection}>
          <img
            src="/eileenhwang/pages/assets/img/headshot.jpg"
            alt="Eileen Hwang Profile Picture"
            className={styles.profileImage}
          />
        </div>

        <div className={styles.contentSection}>
          <p className={styles.greeting}>
            Hello, my name is Yoonjung. You can call me Eileen.
          </p>

          <p className={styles.description}>
            I am a passionate UI/UX designer, software engineer, and aspiring product manager
            dedicated to creating digital solutions that enhance user engagement and streamline
            processes. With a strong background in computer science and design, I specialize in
            developing intuitive, responsive, and visually appealing applications.
          </p>

          <p className={styles.experienceText}>
            My experience in cross-functional collaboration has sparked my enthusiasm for bridging
            technology and business, aiming to leverage this through a PM role. I am committed to
            leveraging both my technical skills and strategic insights to craft seamless digital
            experiences that resonate with users and achieve business objectives.
          </p>

          <div className={styles.contactInfo}>
            <a href="mailto:eileenhwang@berkeley.edu" className={styles.email}>
              EILEENHWANG@BERKELEY.EDU
            </a>

            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/eileenyj-hwang/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <img
                  src="/eileenhwang/linkedin.svg"
                  alt="LinkedIn"
                  style={{ filter: 'invert(27%) sepia(96%) saturate(1982%) hue-rotate(195deg) brightness(93%) contrast(101%)' }}
                />
              </a>
              <a
                href="https://github.com/dbswjd24/eileenhwang"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <img
                  src="/eileenhwang/github.svg"
                  alt="GitHub"
                />
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
