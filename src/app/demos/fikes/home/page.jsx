import Footer from '@/components/Footer';
import PageMetaData from '@/components/PageMetaData';
import ActionBox from '../../default/home/components/ActionBox';
import Counter from '../../default/home/components/Counter';
import Hero from '../../default/home/components/Hero';
import PopularCourse from '../../default/home/components/PopularCourse';
import Reviews from '../../default/home/components/Reviews';
import TopNavbar1 from '../../default/home/components/TopNavbar1';
import TrendingCourses from '../../default/home/components/TrendingCourses';

const FikesHomePage = () => {
  return (
    <>
      <PageMetaData title="FIKES Unsoed - Fakultas Ilmu-Ilmu Kesehatan" />
      <main className="fikes-main">
        <Hero />
        <Counter />
        <PopularCourse />
        <TrendingCourses />
        <Reviews />
        <ActionBox />
      </main>
      <Footer />
    </>
  );
};

export default FikesHomePage; 