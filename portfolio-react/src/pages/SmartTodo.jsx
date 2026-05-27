import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function SmartTodo() {
  return (
    <Layout url="https://allaboutme.com/projects/smarttodo">
      <div className={styles.container}>
        <Link to="/projects/cs" className={styles.backButton}>← Back to CS Projects</Link>

        <div className={styles.header}>
          <h1 className={styles.title}>SmartTodo</h1>
          <p className={styles.projectDescriptionShort}>
            A cross-platform desktop to-do list application that intelligently prioritizes tasks based on deadlines, urgency, and user-defined categories.
          </p>
          <a
            href="https://github.com/eileenhwang/SmartTodo"
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}
          >
            View GitHub Repository
          </a>
        </div>

        <video className={styles.demoVideo} controls preload="metadata">
          <source src="/eileenhwang/pages/assets/videos/smarttodo-demo.mp4" type="video/mp4" />
          <source src="/eileenhwang/pages/assets/videos/smarttodo-demo.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        <section>
          <h2 className={styles.sectionHeading}>What problem this solves</h2>
          <p className={styles.bodyText}>
            Traditional to-do apps treat all tasks equally, making it hard to focus on what actually matters.
            SmartTodo automatically surfaces urgent and deadline-driven tasks while keeping everything organized by category.
            It eliminates the mental overhead of constantly re-prioritizing your task list.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Features</h2>
          <ul className={styles.bodyList}>
            <li>Intelligent task prioritization based on deadlines and urgency</li>
            <li>Category-based organization with custom category creation</li>
            <li>Dark mode support for comfortable extended use</li>
            <li>Progress tracking with visual indicators</li>
            <li>Deadline-based filtering to focus on time-sensitive tasks</li>
            <li>Local data persistence using browser storage</li>
            <li>Cross-platform desktop support via Electron</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            SmartTodo is built with Electron, which separates the application into two processes: the main process
            (Node.js backend) handles window management and system integration, while the renderer process (web frontend)
            manages the UI and user interactions. This architecture allows the app to feel native while leveraging web technologies.
          </p>
          <p className={styles.bodyText}>
            Task data is persisted locally using the browser's localStorage API, ensuring all your tasks remain available
            even after closing the application. The prioritization algorithm runs client-side, providing instant updates
            as deadlines approach or tasks are modified.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key product + technical decisions</h2>
          <ul className={styles.bodyList}>
            <li><strong>Electron over native frameworks:</strong> Chose Electron to leverage existing web development skills
            and enable rapid iteration. The trade-off of slightly larger bundle size was acceptable for faster development
            and cross-platform compatibility.</li>
            <li><strong>Local storage over cloud sync:</strong> Prioritized privacy and offline functionality. Users own their
            data completely, and the app works without internet connectivity. This also simplified the architecture by removing
            authentication and backend infrastructure needs.</li>
            <li><strong>Automatic prioritization:</strong> Designed the system to calculate task urgency automatically rather
            than requiring manual priority assignment. This reduces cognitive load and ensures users always see what needs
            attention first.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Challenges &amp; learnings</h2>
          <p className={styles.bodyText}>
            Building a desktop app with Electron required understanding the main/renderer process communication model,
            which was initially unfamiliar. Managing state persistence across app restarts while maintaining performance
            taught me the importance of efficient data structures for real-time sorting and filtering.
          </p>
          <p className={styles.bodyText}>
            The biggest learning was balancing feature richness with simplicity. Early versions had too many configuration
            options, which overwhelmed users. Simplifying to automatic prioritization with minimal settings made the app
            more approachable while still being powerful.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Tech stack</h2>
          <div className={styles.techStack}>
            <span className={styles.techTag}>Electron</span>
            <span className={styles.techTag}>JavaScript</span>
            <span className={styles.techTag}>HTML/CSS</span>
            <span className={styles.techTag}>localStorage API</span>
            <span className={styles.techTag}>Node.js</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
