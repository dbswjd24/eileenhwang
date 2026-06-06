import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './ProjectDetail.module.css';

export default function FilmedHere() {
  return (
    <Layout url="https://allaboutme.com/projects/filmedhere">
      <div className={styles.container}>
        <Link to="/projects/cs" className={styles.backButton}>← Back to CS Projects</Link>

        <div className={styles.header}>
          <div className={styles.iconTitle}>🎬🗺️</div>
          <h1 className={styles.title}>Filmed Here</h1>
          <a
            href="#"
            className={styles.githubLink}
          >
            View Website
          </a>
          <p className={styles.introText}>
            An interactive map app that lets you discover the real-world filming locations behind
            your favorite movies and TV shows. Search any title to auto-load verified spots from
            Wikidata, or use "Filmed near me" to find locations within 10 km of wherever you are.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>What it does</h2>
          <p className={styles.bodyText}>
            Filmed Here bridges the gap between watching a film and experiencing its world. Search
            any movie or TV title and the app automatically pulls verified filming locations from
            Wikidata and pins them on an interactive Mapbox map. If Wikidata doesn't have
            coordinates, you can drop a pin manually with a custom label.
          </p>
          <p className={styles.bodyText}>
            The "Filmed near me" feature uses your geolocation to surface filming locations within
            10 km of wherever you are, so you can discover that your neighborhood was in a movie
            you've seen a dozen times.
          </p>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Title Search: </span>
            Search any movie or TV show to auto-load its filming locations onto the map via Wikidata.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Filmed Near Me: </span>
            Geolocates the user and fetches filming spots within 10 km using a SPARQL geospatial query.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Manual Pin Mode: </span>
            When Wikidata has no results, click the map to drop a pin with a custom location label.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Save &amp; Explore: </span>
            Bookmark favorite locations with a ⭐, view details in a right-side panel, and persist all pins to localStorage.
          </div>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            When a user searches a title, the app hits the TMDB API to resolve the show or movie
            and get metadata. It then queries the Wikidata SPARQL endpoint using the filming
            location property (P915) to retrieve geotagged places associated with that title.
            Results are mapped to lat/lng coordinates and rendered as Mapbox pins.
          </p>
          <p className={styles.bodyText}>
            For the "near me" flow, a geospatial SPARQL query uses Wikidata's{' '}
            <code>wikibase:around</code> service to find any filming location within a configurable
            radius. All API calls are routed through Next.js API routes to keep keys server-side
            and handle timeouts cleanly.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key decisions</h2>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Wikidata over a custom database: </span>
            Wikidata's P915 (filming location) property gives structured, community-maintained geodata without needing to build or maintain a backend database.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>TMDB for search: </span>
            TMDB's search API handles fuzzy title matching and disambiguates between movies and TV shows, so users don't have to be exact.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Manual fallback for missing locations: </span>
            Rather than showing an error when Wikidata has no data, the app falls back to a map-click flow so users can still contribute a pin themselves.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>LocalStorage for persistence: </span>
            Keeping pins client-side keeps the app stateless and avoids auth complexity, which was the right tradeoff for this scope.
          </div>
        </div>

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
