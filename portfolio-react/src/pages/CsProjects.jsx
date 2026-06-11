import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import styles from './ProjectsPage.module.css';

const projects = [
  {
    title: 'AudioLens',
    image: '/eileenhwang/pages/assets/img/audiolens.png',
    link: '/projects/audiolens',
    description:
      'A Chrome extension that detects timestamped tracklists from YouTube video descriptions and converts them into Spotify playlists in one click. Falls back to screenshot OCR for tracklists found in comments or images.',
    tags: ['Chrome Extension', 'Spotify API', 'OCR', 'JavaScript'],
  },
  {
    title: 'Filmed Here',
    image: '/eileenhwang/pages/assets/img/filmedhere.png',
    link: '/projects/filmedhere',
    description:
      'A web app that lets you discover the real filming locations behind your favorite movies and TV shows. Click any pin to see the movie poster, cast, rating, and the exact scene shot there.',
    tags: ['Next.js', 'Mapbox GL', 'TMDB API', 'TypeScript'],
  },
  {
    title: 'SmartTodo',
    image: '/eileenhwang/pages/assets/img/SmartTodo.png',
    link: '/projects/smarttodo',
    description:
      'A cross-platform to-do list app built with Electron that prioritizes tasks based on deadlines, urgency, and category. Features include dark mode, category management, progress tracking, and deadline-based filtering.',
    tags: ['UI/UX Design', 'Desktop App Development', 'Electron', 'Product Design'],
  },
];

export default function CsProjects() {
  return (
    <Layout url="https://allaboutme.com/cs-projects">
      <main className={`page-main ${styles.mainContent}`}>
        <ProjectList projects={projects} />
      </main>
    </Layout>
  );
}
