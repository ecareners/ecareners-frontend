import { Navigate, Route, Routes } from 'react-router-dom';
import { adminRoutes, appRoutes, authRoutes, InstructorRoutes, shopRoutes, studentRoutes, demosRoutes } from '@/routes/index';
import AdminLayout from '@/layouts/AdminLayout';
import ShopLayout from '@/layouts/ShopLayout';
import InstructorLayout from '@/layouts/InstructorLayout';
import StudentLayout from '@/layouts/StudentLayout';
import OtherLayout from '@/layouts/OtherLayout';
import FikesLayout from '@/layouts/FikesLayout';
import { useAuth } from '@/context/useAuthContext';

const AppRouter = props => {
  const {
    isAuthenticated,
    loading
  } = useAuth();
  
  if (loading) return <div className="container py-5"><div className="alert alert-info">Loading...</div></div>;
  
  return <Routes>
      {/* Demo Routes */}
      {(demosRoutes || []).map((route, idx) => {
        // Use OtherLayout for all demos to keep original header elements
        const Layout = OtherLayout;
        return (
          <Route 
            key={idx + route.name} 
            path={route.path} 
            element={<Layout {...props}>{route.element}</Layout>} 
          />
        );
      })}
      
      {(authRoutes || []).filter(route => !route.path.includes('sign-up')).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />)}
      {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <OtherLayout {...props}>{route.element}</OtherLayout> : <Navigate to={{
      pathname: '/auth/sign-in',
      search: 'redirectTo=' + route.path
    }} />} />)}
      {(shopRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <ShopLayout {...props}>{route.element}</ShopLayout> : <Navigate to={{
      pathname: '/auth/sign-in',
      search: 'redirectTo=' + route.path
    }} />} />)}
      {(InstructorRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <InstructorLayout {...props}>{route.element}</InstructorLayout> : <Navigate to={{
      pathname: '/auth/sign-in',
      search: 'redirectTo=' + route.path
    }} />} />)}
      {(studentRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <StudentLayout {...props}>{route.element}</StudentLayout> : <Navigate to={{
      pathname: '/auth/sign-in',
      search: 'redirectTo=' + route.path
    }} />} />)}

      {(adminRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={isAuthenticated ? <AdminLayout {...props}>{route.element}</AdminLayout> : <Navigate to={{
      pathname: '/auth/sign-in',
      search: 'redirectTo=' + route.path
    }} />} />)}
    </Routes>;
};

export default AppRouter;
