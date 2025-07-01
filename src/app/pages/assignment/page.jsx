import Footer from '@/components/Footer';
import PageMetaData from '@/components/PageMetaData';
import ActionBox from './components/ActionBox';
import VideoList from './components/CourseList';
import Newsletter from './components/Newsletter';
import PageBanner from './components/PageBanner';
import TopNavigationBar from './components/TopNavigationBar';

const List = () => {
  console.log('List component rendered');
  return (
    <>
      <PageMetaData title="Course List" />
      <TopNavigationBar />
      <main>
        <PageBanner />
        <VideoList />
      </main>
      <Footer className="bg-light" />
    </>
  );
};

export default List;
