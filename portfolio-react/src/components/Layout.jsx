import MacHeader from './MacHeader';
import NavHeader from './NavHeader';

export default function Layout({ children, url }) {
  return (
    <>
      <MacHeader url={url} />
      <NavHeader />
      {children}
    </>
  );
}
