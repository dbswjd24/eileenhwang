import Layout from '../components/Layout';
import styles from './Experiences.module.css';

const experiences = [
  {
    title: 'Senior Product Consultant',
    company: 'Adobe',
    date: 'Sep 2025 - Dec 2025',
    bullets: [
      'Architected an AI-driven strategy for Adobe\'s SDLC to streamline cross-functional collaboration and handoffs across product, design, and engineering teams',
      'Diagnosed workflow bottlenecks and communication gaps, then designed AI-powered solutions and process optimizations to eliminate redundancies and improve execution velocity',
      'Defined KPIs and implemented guidelines to operationalize AI capabilities, driving measurable gains in delivery speed, quality, and end-to-end pipeline visibility',
    ],
  },
  {
    title: 'Project Manager & Front-End Engineer',
    company: 'ZEP',
    date: 'Aug 2025 - Dec 2025',
    bullets: [
      'Led project strategy and engineering execution for ZEP & LikeLion by architecting structured, automation-ready quiz generation',
      'Engineered and validated a dataset pipeline, driving model experimentation and prompt stability for scalable content creation',
      'Owned end-to-end cross-functional delivery, coordinating Dockerized API layers and workflow automation scoping',
    ],
  },
  {
    title: 'Product Management Intern',
    company: 'Dorsal.fyi',
    date: 'May 2025 - Aug 2025',
    bullets: [
      'Spearheaded design and launch of a billing comparison tool that empowered patients to better understand medical costs',
      'Defined clear requirements and prioritized features for insurance dispute workflows based on user feedback and support data',
      'Coordinated daily with engineering and design teams to deliver patient-centric improvements on schedule, boosting overall product satisfaction',
    ],
  },
];

export default function Experiences() {
  return (
    <Layout url="https://allaboutme.com/experiences">
      <main className={`page-main ${styles.mainContent}`}>
        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <div key={i} className={styles.experienceItem} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
              <div className={styles.experienceCard}>
                <div className={styles.experienceHeader}>
                  <div>
                    <h2 className={styles.experienceTitle}>{exp.title}</h2>
                    <p className={styles.experienceCompany}>{exp.company}</p>
                  </div>
                  <p className={styles.experienceDate}>{exp.date}</p>
                </div>
                <div className={styles.experienceDescription}>
                  {exp.bullets.map((bullet, j) => (
                    <p key={j}>{bullet}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
