import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import styles from './ProjectsPage.module.css';

const projects = [
  {
    title: 'GoodNotes Classroom: ClearCollab',
    image: '/eileenhwang/pages/assets/img/goodnotes.png',
    link: '/projects/goodnotes',
    description:
      'A designathon project exploring how classroom collaboration could be improved by lowering participation anxiety for students and reducing tool complexity for teachers. The concept proposes anonymous questioning and lightweight teacher support within GoodNotes to encourage more inclusive and manageable in-class engagement.',
    tags: ['UI/UX Design', 'Product Strategy', 'User Research', 'Education Technology'],
  },
  {
    title: 'Womp',
    image: '/eileenhwang/pages/assets/img/womp.png',
    link: '/projects/womp',
    description:
      'A designathon project exploring how 3D design tools can better support users across different skill levels. Womp proposes a gamified 3D creation experience with guided and pro modes, allowing beginners to build confidence through step-by-step support while giving advanced users control and flexibility without unnecessary friction.',
    tags: ['UI/UX Design', 'Product Strategy', 'User Research', '3D Design'],
  },
  {
    title: 'Food For Thought',
    image: '/eileenhwang/pages/assets/img/food.png',
    link: '/projects/food',
    description:
      'A designathon project with DoorDash exploring how college students might become more conscious of their health and eating habits without disrupting existing ordering behavior. The concept focuses on reflective features such as mood tracking, food group summaries, and order recaps to help users recognize patterns in emotional and impulsive eating over time.',
    tags: ['UI/UX Design', 'Product Strategy', 'User Research', 'Health & Wellness'],
  },
];

export default function Designathons() {
  return (
    <Layout url="https://allaboutme.com/designathons">
      <main className={`page-main ${styles.mainContent}`}>
        <ProjectList projects={projects} />
      </main>
    </Layout>
  );
}
