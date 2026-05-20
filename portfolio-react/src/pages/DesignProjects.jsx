import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import styles from './ProjectsPage.module.css';

const projects = [
  {
    title: 'Unetic',
    image: '/eileenhwang/pages/assets/img/unetic.png',
    link: '/projects/unetic',
    description:
      'A web platform built to improve how students discover, manage, and engage with university clubs. Unetic centralizes verified club information and reduces friction in navigating campus organizations. Served as the product manager and UI/UX designer, leading product direction, user research, and interface design.',
    tags: ['Product Management', 'UI/UX Design', 'Web Development', 'Figma'],
  },
  {
    title: 'Bus Check n\' Go',
    image: '/eileenhwang/pages/assets/img/bus6.png',
    link: '/projects/bus',
    description:
      'A web application that helps users check real-time bus schedules and discover nearby places while commuting. Designed to reduce uncertainty around transit timing and improve everyday travel decisions through a simple, location-based interface. Contributed as a UI/UX designer and software engineer.',
    tags: ['UI/UX Design', 'Web Development', 'Front-End Development', 'Product Design'],
  },
  {
    title: 'Memory Game',
    image: '/eileenhwang/pages/assets/img/memorygame.png',
    href: '/eileenhwang/MemoryGame/index.html',
    description:
      'An interactive memory matching game with a delightful story about friendly dogs. Features character designs and engaging gameplay mechanics.',
    tags: ['UI/UX Design', 'Game Design', 'Character Design', 'HTML/CSS'],
  },
];

export default function DesignProjects() {
  return (
    <Layout url="https://allaboutme.com/design-projects">
      <main className={`page-main ${styles.mainContent}`}>
        <ProjectList projects={projects} />
      </main>
    </Layout>
  );
}
