import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function FilmedHere() {
  return (
    <Layout url="https://allaboutme.com/projects/filmedhere">
      <div className={styles.container}>
        <Link to="/projects/cs" className={styles.backButton}>← Back to CS Projects</Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Filmed Here 🎬</h1>
          <p className={styles.projectDescriptionShort}>
            An interactive map app that lets you discover the real-world filming locations behind your favorite movies and TV shows.
          </p>
        </div>

        <img
          src="/eileenhwang/pages/assets/img/filmedhere.png"
          alt="Filmed Here app screenshot"
          className={styles.projectImage}
        />

        <section>
          <h2 className={styles.sectionHeading}>What it does</h2>
          <p className={styles.bodyText}>
            Filmed Here bridges the gap between watching a film and experiencing its world. Search any movie or TV title and the app automatically pulls verified filming locations from Wikidata and pins them on an interactive Mapbox map. If Wikidata doesn't have coordinates, you can drop a pin manually with a custom label.
          </p>
          <p className={styles.bodyText}>
            The "Filmed near me" feature uses your geolocation to surface filming locations within 10 km of wherever you are — so you can discover that your neighborhood was in a movie you've seen a dozen times.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Features</h2>
          <ul className={styles.bodyList}>
            <li>Search any movie or TV show title to auto-load filming locations onto the map</li>
            <li>"Filmed near me" — geolocates the user and fetches filming spots within 10 km</li>
            <li>Manual pin mode when Wikidata has no results, with a custom location label input</li>
            <li>Sidebar list of all pinned locations, with title and content type (movie/TV)</li>
            <li>Save / bookmark individual pins with a ⭐ indicator</li>
            <li>Right-side detail panel that opens when a pin is selected on the map</li>
            <li>Pins and saves persisted to localStorage so they survive page refreshes</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            When a user searches a title, the app hits the TMDB API to resolve the show or movie and get metadata. It then queries the Wikidata SPARQL endpoint using the filming location property (P915) to retrieve geotagged places associated with that title. Results are mapped to lat/lng coordinates and rendered as Mapbox pins.
          </p>
          <p className={styles.bodyText}>
            For the "near me" flow, a geospatial SPARQL query uses Wikidata's <code>wikibase:around</code> service to find any filming location within a configurable radius. All API calls are routed through Next.js API routes to keep keys server-side and handle timeouts cleanly.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key decisions</h2>
          <ul className={styles.bodyList}>
            <li><strong>Wikidata over a custom database:</strong> Wikidata's P915 (filming location) property gives structured, community-maintained geodata without needing to build or maintain a backend database.</li>
            <li><strong>TMDB for search:</strong> TMDB's search API handles fuzzy title matching and disambiguates between movies and TV shows, so users don't have to be exact.</li>
            <li><strong>Manual fallback for missing locations:</strong> Rather than showing an error when Wikidata has no data, the app falls back to a map-click flow so users can still contribute a pin themselves.</li>
            <li><strong>LocalStorage for persistence:</strong> Keeping pins client-side keeps the app stateless and avoids auth complexity, which was the right tradeoff for this scope.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Challenges &amp; learnings</h2>
          <p className={styles.bodyText}>
            The biggest challenge was Wikidata coverage — many well-known films have no P915 entries, or their entries lack coordinate data. Building the manual fallback flow was essential to keeping the app useful even when the data layer let us down.
          </p>
          <p className={styles.bodyText}>
            Writing SPARQL queries for the "nearby" and "by actor/franchise" modes required learning Wikidata's graph model and the quirks of the WDQS endpoint (rate limits, timeout behavior, prefix handling). It was a good deep dive into linked open data as a real data source rather than just a concept.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Tech stack</h2>
          <div className={styles.techStack}>
            <span className={styles.techTag}>Next.js</span>
            <span className={styles.techTag}>TypeScript</span>
            <span className={styles.techTag}>Mapbox GL</span>
            <span className={styles.techTag}>TMDB API</span>
            <span className={styles.techTag}>Wikidata SPARQL</span>
            <span className={styles.techTag}>Tailwind CSS</span>
            <span className={styles.techTag}>React</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
