import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function AudioLens() {
  return (
    <Layout url="https://allaboutme.com/projects/audiolens">
      <div className={styles.container}>
        <Link to="/projects/cs" className={styles.backButton}>← Back to CS Projects</Link>

        <div className={styles.header}>
          <h1 className={styles.title}>AudioLens</h1>
          <p className={styles.projectDescriptionShort}>
            A Chrome extension that helps users instantly turn music discovered in images into Spotify playlists, reducing friction between discovery and saving.
          </p>
        </div>

        <video className={styles.demoVideo} controls preload="metadata">
          <source src="/eileenhwang/pages/assets/videos/audiolens-demo.mp4" type="video/mp4" />
          <source src="/eileenhwang/pages/assets/videos/audiolens-demo.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        <section>
          <h2 className={styles.sectionHeading}>What problem this solves</h2>
          <p className={styles.bodyText}>
            Music discovery increasingly happens through images such as screenshots of playlists, Instagram stories, concert photos, and shared posts. However, saving those songs to Spotify is a manual and time-consuming process that requires switching apps and searching for each track individually.
          </p>
          <p className={styles.bodyText}>
            AudioLens addresses this gap by allowing users to capture text from images and convert it directly into Spotify playlists. By shortening the path from discovery to action, the product helps users preserve music they care about before it gets lost.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Features</h2>
          <ul className={styles.bodyList}>
            <li>Extracts song titles and artists from screenshots and photos using OCR</li>
            <li>Identifies valid tracks through Spotify search</li>
            <li>Creates a new Spotify playlist in one flow</li>
            <li>Adds songs to an existing playlist if preferred</li>
            <li>Connects securely to a user's Spotify account</li>
            <li>Surfaces unmatched songs for user review</li>
            <li>Designed as a lightweight Chrome extension for fast, in-context use</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            AudioLens is built as a Chrome extension to align with where music discovery actually happens. Users upload or capture an image, which is processed through OCR to extract visible text. The system then parses potential song and artist pairs and validates them through the Spotify Web API.
          </p>
          <p className={styles.bodyText}>
            Once matches are confirmed, users can either create a new playlist or append tracks to an existing one. The architecture prioritizes low latency and minimal user input so saving music feels immediate rather than disruptive.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key product + technical decisions</h2>
          <ul className={styles.bodyList}>
            <li><strong>Chrome extension as the core surface:</strong> The product was designed to live in the browser so users can act on music discovery without leaving the page where it happens.</li>
            <li><strong>Image-based input instead of audio:</strong> Screenshots are a common real-world behavior for saving music, so the product was intentionally built around images rather than live audio or recordings.</li>
            <li><strong>User confirmation before playlist creation:</strong> A review step was added to prevent incorrect song matches and maintain trust.</li>
            <li><strong>Spotify-focused MVP:</strong> Limiting scope to one platform reduced complexity and allowed faster validation of the core user workflow.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Challenges &amp; learnings</h2>
          <p className={styles.bodyText}>
            The main challenge was handling inconsistent and incomplete text from images. Song titles are often truncated, misspelled, or missing artist context, which required careful parsing and fallback logic.
          </p>
          <p className={styles.bodyText}>
            From a product perspective, this project reinforced the value of tight scoping. By focusing on a single clear use case and platform, it became easier to evaluate whether the product solved a real problem before expanding features or integrations.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Tech stack</h2>
          <div className={styles.techStack}>
            <span className={styles.techTag}>JavaScript</span>
            <span className={styles.techTag}>Chrome Extensions API</span>
            <span className={styles.techTag}>OCR</span>
            <span className={styles.techTag}>Spotify Web API</span>
            <span className={styles.techTag}>OAuth 2.0</span>
            <span className={styles.techTag}>HTML / CSS</span>
            <span className={styles.techTag}>Manifest V3</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
