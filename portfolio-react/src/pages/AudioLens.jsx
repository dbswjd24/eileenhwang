import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function AudioLens() {
  return (
    <Layout url="https://allaboutme.com/projects/audiolens">
      <div className={styles.container}>
        <Link to="/projects/cs" className={styles.backButton}>← Back to CS Projects</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>🎵📸</div>
          <h1 className={styles.title}>AudioLens</h1>
          <p className={styles.projectDescriptionShort}>
            A Chrome extension (v2) that detects tracklists from YouTube videos and turns them into Spotify playlists in one click — with screenshot OCR as a fallback.
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
            YouTube is one of the biggest surfaces for music discovery — DJ sets, curated mixes, and playlist videos often include full tracklists in the video description. But saving those songs to Spotify means manually searching each one, which is slow and tedious.
          </p>
          <p className={styles.bodyText}>
            AudioLens v2 solves this by automatically reading the video description for timestamped tracklists and converting them into a Spotify playlist in seconds. For cases where the tracklist lives in a pinned comment or a screenshot, the extension falls back to OCR to extract the tracks from any image.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Features</h2>
          <ul className={styles.bodyList}>
            <li>Auto-detects timestamped tracklists from YouTube video descriptions</li>
            <li>Falls back to screenshot OCR when no tracklist is found in the description</li>
            <li>Editable track list — fix titles or artists before syncing</li>
            <li>Names the playlist after the video title automatically</li>
            <li>Creates a new Spotify playlist and opens it directly in Spotify on success</li>
            <li>Connects securely to a user's Spotify account via OAuth 2.0</li>
            <li>Source tag shows whether tracks came from YouTube or a screenshot</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            The extension uses a content script to read the active YouTube video's description and parse timestamped lines into track/artist pairs. When no tracklist is found, users can upload a screenshot which is processed by Tesseract.js (running locally via WebAssembly) to extract text through OCR.
          </p>
          <p className={styles.bodyText}>
            Parsed tracks are validated and added to Spotify through the Spotify Web API. Authentication uses Chrome's identity API with OAuth 2.0. All heavy OCR work runs in an offscreen document to avoid blocking the extension popup.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key decisions</h2>
          <ul className={styles.bodyList}>
            <li><strong>YouTube description as the primary source:</strong> Most DJ mixes and curated videos already include timestamped tracklists in the description — parsing this directly is faster and more accurate than OCR.</li>
            <li><strong>OCR as a fallback, not the primary flow:</strong> v1 was entirely OCR-based. v2 flips the model — YouTube parsing is the happy path, OCR handles edge cases like pinned comments or external screenshots.</li>
            <li><strong>Editable track list before syncing:</strong> A review step lets users correct parsing errors before the playlist is created, improving accuracy without requiring perfect parsing.</li>
            <li><strong>Offscreen document for Tesseract:</strong> Running OCR in an offscreen document keeps the popup responsive and avoids Manifest V3 service worker limitations.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Challenges &amp; learnings</h2>
          <p className={styles.bodyText}>
            Parsing timestamped tracklists from video descriptions required handling a wide range of formats — some videos use "00:00 Artist - Title", others flip the order, and some omit artists entirely. Building a parser robust enough to handle these variations without false positives was the core engineering challenge.
          </p>
          <p className={styles.bodyText}>
            Manifest V3's restrictions on background scripts also added complexity — moving OCR to an offscreen document was a key architectural decision to keep Tesseract.js (WebAssembly-based) working within the new extension model.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Tech stack</h2>
          <div className={styles.techStack}>
            <span className={styles.techTag}>JavaScript</span>
            <span className={styles.techTag}>Chrome Extensions API</span>
            <span className={styles.techTag}>Manifest V3</span>
            <span className={styles.techTag}>Tesseract.js (OCR)</span>
            <span className={styles.techTag}>WebAssembly</span>
            <span className={styles.techTag}>Spotify Web API</span>
            <span className={styles.techTag}>OAuth 2.0</span>
            <span className={styles.techTag}>HTML / CSS</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
