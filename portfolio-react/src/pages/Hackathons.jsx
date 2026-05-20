import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import styles from './ProjectsPage.module.css';

const projects = [
  {
    title: 'PathPilot: Redefining Road Trip Planning',
    image: '/eileenhwang/pages/assets/img/pathpilot.png',
    link: '/projects/pathpilot',
    description: 'Driving and Traveling at the same time, Customized travel itinerary planner',
    tags: ['UI/UX Design', 'Product Management', 'Graph Algorithms', 'React', 'Django'],
  },
];

export default function Hackathons() {
  return (
    <Layout url="https://allaboutme.com/hackathons">
      <main className={`page-main ${styles.mainContent}`}>
        <ProjectList projects={projects} />
      </main>
    </Layout>
  );
}
