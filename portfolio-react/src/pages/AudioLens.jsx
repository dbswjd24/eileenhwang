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
          <h1 className={styles.title}>Audiolens</h1>
          <p className={styles.projectDescriptionShort}>
            A Chrome extension that detects tracklists from YouTube videos and turns them into Spotify playlists in one click, with screenshot OCR and paste-text as fallbacks, and support for both English and Korean music apps.
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
            YouTube is one of the biggest surfaces for music discovery. DJ sets, curated mixes, and playlist videos often include full tracklists in the video description, but saving those songs to Spotify means manually searching each one. It is slow and tedious.
          </p>
          <p className={styles.bodyText}>
            Audiolens solves this by automatically reading the video description for timestamped tracklists and converting them into a Spotify playlist in seconds. When the tracklist lives in a screenshot, a pinned comment, or a blog post, the extension falls back to OCR or pasted text to extract the tracks from any source.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Features</h2>
          <ul className={styles.bodyList}>
            <li>Auto-detects timestamped tracklists from YouTube video descriptions via DOM scraping</li>
            <li>Screenshot OCR fallback using Tesseract.js (runs fully locally via WebAssembly)</li>
            <li>Paste-text input for tracklists copied from blogs, comments, or plain text</li>
            <li>Supports English and Korean, including Korean music app screenshot format (Melon, Genie, Bugs, Flo) where song title and artist appear on separate lines</li>
            <li>Per-row swap button (⇄) to flip title and artist fields when order is ambiguous</li>
            <li>Add tracks to an existing Spotify playlist or create a new one</li>
            <li>Playlist picker shows all user playlists with artwork and track counts</li>
            <li>Secure Spotify login via PKCE OAuth 2.0 (no client secret stored)</li>
            <li>Multi-strategy Spotify search to handle artist/title order variations</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            The extension uses <code>chrome.scripting.executeScript</code> to inject a scraper into the active YouTube tab and parse the video description for timestamped lines. When no tracklist is found, or when the user is not on YouTube, they can upload a screenshot or paste raw text directly into the popup.
          </p>
          <p className={styles.bodyText}>
            OCR runs entirely in the popup context using Tesseract.js v5 with bundled WebAssembly, bypassing Manifest V3 CSP restrictions on blob workers. The parser handles three formats: single-line with separators (e.g. <code>0:00 Song - Artist</code>), numbered lists (e.g. <code>1. Song - Artist</code>), and the two-line alternating format used by Korean music apps where song title and artist are on separate lines.
          </p>
          <p className={styles.bodyText}>
            Spotify integration uses the PKCE flow via <code>chrome.identity.launchWebAuthFlow</code>. The auth code is exchanged for a token directly in the service worker, with the token cached in <code>chrome.storage.local</code>. Track search uses multiple fallback query strategies (combined, reversed, structured) to maximize match rates across different tracklist orderings.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key decisions</h2>
          <ul className={styles.bodyList}>
            <li><strong>YouTube DOM scraping as primary source:</strong> Parsing the description directly is faster and more accurate than OCR. The scraper runs in the page context and handles YouTube's dynamically-rendered description elements.</li>
            <li><strong>OCR in the popup, not an offscreen document:</strong> MV3's offscreen API added complexity without benefit for this use case. Running Tesseract directly in the popup context simplified the architecture and eliminated cross-context messaging errors.</li>
            <li><strong>PKCE instead of implicit grant:</strong> Spotify deprecated the implicit grant flow. PKCE provides the same single-page app experience without exposing tokens in the URL, and works cleanly with Chrome's identity API.</li>
            <li><strong>Two-line Korean parser mode:</strong> Korean music apps (Melon, Genie, Flo) display song title and artist on separate lines with no separator. A dedicated auto-detection heuristic looks for trailing durations on every other line and switches the parser into alternating-pair mode for these screenshots.</li>
            <li><strong>Editable track list with swap buttons:</strong> Rather than trying to perfectly infer title/artist order from OCR output, every row is editable and swappable. This makes the extension robust to ambiguous formats without over-engineering the parser.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Challenges &amp; learnings</h2>
          <p className={styles.bodyText}>
            Manifest V3 introduced significant constraints: no remote code execution, strict CSP on extension pages, and service workers that cannot use <code>importScripts</code> with blob URLs. Getting Tesseract.js to run required patching broken UMD bundle string literals, overriding <code>WebAssembly.validate</code> to prevent SIMD WASM fetches, and setting <code>gzip: false</code> to stop the library from appending <code>.gz</code> to traineddata filenames.
          </p>
          <p className={styles.bodyText}>
            The Spotify auth migration from implicit grant to PKCE was triggered by Chrome blocking the redirect. The fix also required explicitly adding Spotify's token endpoint to <code>connect-src</code> in the extension CSP, since <code>host_permissions</code> alone does not gate service worker fetch requests.
          </p>
          <p className={styles.bodyText}>
            Supporting Korean required more than loading the <code>kor</code> Tesseract language pack. Korean music apps use no separators and put each track on two lines, so the parser needed a separate mode with its own auto-detection logic rather than a simple regex extension.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Tech stack</h2>
          <div className={styles.techStack}>
            <span className={styles.techTag}>JavaScript</span>
            <span className={styles.techTag}>Chrome Extensions API (MV3)</span>
            <span className={styles.techTag}>Tesseract.js (OCR)</span>
            <span className={styles.techTag}>WebAssembly</span>
            <span className={styles.techTag}>Spotify Web API</span>
            <span className={styles.techTag}>PKCE OAuth 2.0</span>
            <span className={styles.techTag}>HTML / CSS</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
