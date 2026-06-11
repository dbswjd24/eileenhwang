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
            href="https://filmed-here.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}
          >
            View Website
          </a>
          <p className={styles.introText}>
            An interactive map app that lets you discover the real-world filming locations behind
            your favorite movies and TV shows. Click any pin to see the movie poster, cast,
            rating, and the exact scene that was shot there.
          </p>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>What it does</h2>
          <p className={styles.bodyText}>
            Filmed Here bridges the gap between watching a film and experiencing its world. Browse
            34 hand-curated filming locations from iconic movies and TV shows — from Full House's
            Painted Ladies in San Francisco to Harry Potter's Alnwick Castle in England to Game of
            Thrones' Dark Hedges in Northern Ireland.
          </p>
          <p className={styles.bodyText}>
            Click any pin on the map or in the sidebar to open a detail panel with the TMDB
            backdrop image, title, year, star rating, plot overview, genre tags, and a poster
            strip — plus a description of the exact scene filmed at that location.
          </p>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Movie Info Panel: </span>
            Each pin loads the TMDB poster, backdrop, cast photo, rating, and plot overview directly from The Movie Database API.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Scene Descriptions: </span>
            Every location includes a description of the exact scene or sequence filmed there, not just a generic address.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Filmed Near Me: </span>
            Geolocates you and filters the map to filming locations within 100 km, so you can discover that your city was in a movie.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Search & Save: </span>
            Search by title, location, or city. Bookmark favorite spots with ⭐ — saved pins persist via localStorage.
          </div>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Technical overview</h2>
          <p className={styles.bodyText}>
            The app is built with Next.js (App Router) and TypeScript, with Mapbox GL JS rendering
            the interactive map client-side via a dynamic import with SSR disabled. The 34 curated
            filming locations are stored as a typed static dataset — each with coordinates, scene
            description, and a TMDB search title used to fetch live movie data at display time.
          </p>
          <p className={styles.bodyText}>
            When a pin is clicked, the SidePanel makes two parallel client-side fetch calls to the
            TMDB API: one to resolve the title to a TMDB ID, and one to fetch full details and
            images. Tailwind CSS v4 handles styling with no extra config.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Key decisions</h2>
        </section>

        <div className={styles.featureSection}>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Curated dataset over live scraping: </span>
            After experimenting with Wikidata SPARQL queries, I found the data quality too inconsistent for a good UX. A hand-verified dataset of 34 locations across 6 continents gave reliable, accurate results.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Client-side TMDB fetch: </span>
            TMDB's API supports browser CORS, so fetching poster/backdrop data directly from the client avoids a server round-trip and keeps the architecture simple.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>Scene descriptions in the data layer: </span>
            Rather than relying on an API to tell the user what scene was filmed where, I authored a specific scene description for every location so the content is always accurate and informative.
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureTitle}>LocalStorage for persistence: </span>
            Keeping saved pins client-side avoids auth complexity and keeps the app fully stateless — the right tradeoff for this scope.
          </div>
        </div>

        <section>
          <h2 className={styles.sectionHeading}>Tech stack</h2>
          <div className={styles.techStack}>
            <span className={styles.techTag}>Next.js</span>
            <span className={styles.techTag}>TypeScript</span>
            <span className={styles.techTag}>Mapbox GL</span>
            <span className={styles.techTag}>TMDB API</span>
            <span className={styles.techTag}>Tailwind CSS</span>
            <span className={styles.techTag}>React</span>
            <span className={styles.techTag}>Vercel</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}
