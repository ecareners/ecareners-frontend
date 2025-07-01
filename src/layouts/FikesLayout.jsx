import { Suspense } from 'react';
import Preloader from '@/components/Preloader';
import FikesHeader from '@/components/FikesLayoutComponents/FikesHeader';
import FikesFooter from '@/components/FikesLayoutComponents/FikesFooter';

const FikesLayout = ({ children }) => {
  return (
    <Suspense fallback={<Preloader />}>
      <div className="fikes-layout">
        <FikesHeader />
        <main className="fikes-main">
          {children}
        </main>
        <FikesFooter />
      </div>
    </Suspense>
  );
};

export default FikesLayout; 