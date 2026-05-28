import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import styles from './ProjectsPage.module.css';

const projects = [
  {
    title: 'AudioLens',
    image: '/eileenhwang/pages/assets/img/audiolens.png',
    link: '/projects/audiolens',
    description:
      'A Chrome extension concept that explores generating Spotify playlists from images by extracting track and artist information and mapping it to Spotify\'s catalog. Focused on problem definition, technical feasibility, and API-driven workflows rather than interface design.',
    tags: ['Product Management', 'Programming', 'Spotify API', 'Chrome Extension'],
  },
  {
    title: 'Filmed Here',
    image: '/eileenhwang/pages/assets/img/memorygame.png',
    link: '/projects/filmedhere',
    description:
      'A web app that lets users discover filming locations from their favorite movies and TV shows. Browse iconic scenes, explore locations on an interactive map, and plan visits to the real-world spots behind the screen.',
    tags: ['Web Development', 'Maps API', 'React', 'Full Stack'],
  },
  {
    title: 'SmartTodo',
    image: '/eileenhwang/pages/assets/img/SmartTodo.png',
    link: '/projects/smarttodo',
    description:
      'A cross-platform to-do list app built with Electron that prioritizes tasks based on deadlines, urgency, and category. Features include dark mode, category management, progress tracking, and deadline-based filtering. Contributed as the sole developer and designer.',
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
