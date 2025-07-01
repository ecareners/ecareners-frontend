import Footer from '@/components/Footer';
import PageMetaData from '@/components/PageMetaData';
import Courses from './components/Courses';
import PageBanner from './components/PageBanner';
import TopNavigationBar from './components/TopNavigationBar';
const ProtocolsPage = () => {
  console.log('ProtocolsPage loaded');
  return <>
      <PageMetaData title="Protocols" />
      <TopNavigationBar />
      <main>
        <PageBanner />
        <Courses />
      </main>
      <Footer className="bg-light" />
    </>;
};
export default ProtocolsPage;
