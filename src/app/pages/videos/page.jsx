import Footer from '@/components/Footer';
import PageMetaData from '@/components/PageMetaData';
import ActionBox from './components/ActionBox';
import CourseList from './components/CourseList';
import PageBanner from './components/PageBanner';
import TopNavigationBar from './components/TopNavigationBar';

const VideosListPage = () => {
  console.log('VideosListPage loaded');
  return (
    <>
      <PageMetaData title="Videos List" />
      <TopNavigationBar />
      <main>
        <PageBanner />
        <CourseList />
      </main>
      <Footer className="bg-light" />
    </>
  );
};

export default VideosListPage;
