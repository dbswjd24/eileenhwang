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
    contain: true,
    description:
      'A web app that lets users discover filming locations from their favorite movies and TV shows. Browse iconic scenes, explore locations on an interactive map, and plan visits to the real-world spots behind the screen.',
    tags: ['Web Development', 'Maps API', 'React', 'Full Stack'],
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
