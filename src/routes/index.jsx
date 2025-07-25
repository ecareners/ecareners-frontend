import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Demos Pages
const DemosDefault = lazy(() => import('@/app/demos/default/home/page'));
const Eduction = lazy(() => import('@/app/demos/education/home/page'));
const Academy = lazy(() => import('@/app/demos/academy/home/page'));
const Course = lazy(() => import('@/app/demos/course/home/page'));
const University = lazy(() => import('@/app/demos/university/home/page'));
const Kindergarten = lazy(() => import('@/app/demos/kindergarten/home/page'));
const Landing = lazy(() => import('@/app/demos/landing/home/page'));
const Tutor = lazy(() => import('@/app/demos/tutor/home/page'));
const School = lazy(() => import('@/app/demos/school/home/page'));
const Abroad = lazy(() => import('@/app/demos/abroad/home/page'));
const Workshop = lazy(() => import('@/app/demos/workshop/home/page'));
const Fikes = lazy(() => import('@/app/demos/fikes/home/page'));

// pages
const Categories = lazy(() => import('@/app/pages/course/categories/page'));
const Grid = lazy(() => import('@/app/pages/course/grid/page'));
const Grid2 = lazy(() => import('@/app/pages/protocols/page'));
const List = lazy(() => import('@/app/pages/assignment/page'));
const VideoListPage = lazy(() => import('@/app/pages/videos/page'));
const Detail = lazy(() => import('@/app/pages/course/detail/page'));
const DetailMinimal = lazy(() => import('@/app/pages/course/detail-min/page'));
const DetailAdvance = lazy(() => import('@/app/pages/course/detail-adv/page'));
const DetailModule = lazy(() => import('@/app/pages/course/detail-module/page'));
const VideoPlayer = lazy(() => import('@/app/pages/course/video-player/page'));
const InstructorList = lazy(() => import('@/app/pages/instructors/page'));
const InstructorSingle = lazy(() => import('@/app/pages/instructors/[instructorId]/page'));
const InstructorBecome = lazy(() => import('@/app/pages/become-instructor/page'));
const AbroadSingle = lazy(() => import('@/app/pages/abroad-single/page'));
const WorkshopDetail = lazy(() => import('@/app/pages/workshop-detail/page'));
const EventDetail = lazy(() => import('@/app/pages/event-detail/page'));
const RequestDemo = lazy(() => import('@/app/pages/form/request-demo/page'));
const BookClass = lazy(() => import('@/app/pages/form/book-class/page'));
const RequestAccess = lazy(() => import('@/app/pages/form/request-access/page'));
const AdmissionForm = lazy(() => import('@/app/pages/form/admission-form/page'));
const AssignmentSubmission = lazy(() => import('@/app/pages/assignment/assignment/[assignmentId]/submission/page'));
const AssessmentPage = lazy(() => import('@/app/pages/assessments/page'));
const AssessmentFormPage = lazy(() => import('@/app/pages/assessments/form/page'));
const PreConferenceAssessmentPage = lazy(() => import('@/app/pages/assessments/pre_conference/page'));
const PostConferenceAssessmentPage = lazy(() => import('@/app/pages/assessments/post_conference/page'));
const SikapMahasiswaAssessmentPage = lazy(() => import('@/app/pages/assessments/sikap_mahasiswa/page'));
const KeterampilanProseduralKlinikDOPSAssessmentPage = lazy(() => import('@/app/pages/assessments/keterampilan_prosedural_klinik_dops/page'));
const UjianKlinikAssessmentPage = lazy(() => import('@/app/pages/assessments/ujian_klinik/page'));
const LaporanPendahuluanAssessmentPage = lazy(() => import('@/app/pages/assessments/laporan_pendahuluan/page'));
const AsuhanKeperawatanAssessmentPage = lazy(() => import('@/app/pages/assessments/asuhan_keperawatan/page'));
const AnalisaSintesaAssessmentPage = lazy(() => import('@/app/pages/assessments/analisa_sintesa/page'));
const ArtikelJurnalAssessmentPage = lazy(() => import('@/app/pages/assessments/artikel_jurnal/page'));
const CaseReportAssessmentPage = lazy(() => import('@/app/pages/assessments/case_report/page'));
const ConferencePage = lazy(() => import('@/app/pages/conference/page'));
const LaporanPage = lazy(() => import('@/app/pages/assessments/laporan/page'));
const RekapAssessmentPage = lazy(() => import('@/app/pages/assessments/rekap.jsx'));

// about pages
const AboutUs = lazy(() => import('@/app/pages/about/about-us/page'));
const ContactUs = lazy(() => import('@/app/pages/about/contact-us/page'));
const BlogGrid = lazy(() => import('@/app/pages/about/blog-grid/page'));
const BlogMasonry = lazy(() => import('@/app/pages/about/blog-masonry/page'));
const Pricing = lazy(() => import('@/app/pages/about/pricing/page'));
const BlogDetail = lazy(() => import('@/app/pages/about/blog-grid/[blogId]/page'));

//shop
const Shop = lazy(() => import('@/app/shop/page'));
const ProductDetail = lazy(() => import('@/app/shop/product-detail/[productId]/page'));
const Cart = lazy(() => import('@/app/shop/cart/page'));
const Checkout = lazy(() => import('@/app/shop/checkout/page'));
const EmptyCart = lazy(() => import('@/app/shop/empty-cart/page'));
const Wishlist = lazy(() => import('@/app/shop/wishlist/page'));

// help
const HelpCenter = lazy(() => import('@/app/help/center/page'));
const HelpCenterDetails = lazy(() => import('@/app/help/center-detail/page'));

//other
const Faq = lazy(() => import('@/app/faq/page'));
const Error404 = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'));
const ComingSoon = lazy(() => import('@/app/coming-soon/page'));

//Auth
const SignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'));
const ForgotPassword = lazy(() => import('@/app/(other)/auth/forgot-password/page'));

//Instructor
const InstructorDashboard = lazy(() => import('@/app/instructor/dashboard/page'));
const InstructorCourses = lazy(() => import('@/app/instructor/manage-course/page'));
const InstructorCreateCourse = lazy(() => import('@/app/(other)/instructor/create-course/page'));
const InstructorCourseAdd = lazy(() => import('@/app/(other)/instructor/course-added/page'));
const Quiz = lazy(() => import('@/app/instructor/quiz/page'));
const Earnings = lazy(() => import('@/app/instructor/earning/page'));
const StudentsList = lazy(() => import('@/app/instructor/student-list/page'));
const Orders = lazy(() => import('@/app/instructor/order/page'));
const InstructorReviews = lazy(() => import('@/app/instructor/review/page'));
const Payout = lazy(() => import('@/app/instructor/payout/page'));
const EditProfile = lazy(() => import('@/app/instructor/edit-profile/page'));
const Settings = lazy(() => import('@/app/instructor/setting/page'));
const DeleteAccount = lazy(() => import('@/app/instructor/delete-account/page'));

//Student
const StudentDashboard = lazy(() => import('@/app/student/dashboard/page'));
const Subscription = lazy(() => import('@/app/student/subscription/page'));
const StudentCourseList = lazy(() => import('@/app/student/course-list/page'));
const CourseResume = lazy(() => import('@/app/student/course-resume/page'));
const StudentQuiz = lazy(() => import('@/app/student/quiz/page'));
const PaymentInfo = lazy(() => import('@/app/student/payment-info/page'));
const StudentWishlist = lazy(() => import('@/app/student/bookmark/page'));
const StudentEditProfile = lazy(() => import('@/app/student/edit-profile/page'));
const StudentSetting = lazy(() => import('@/app/student/setting/page'));
const StudentDeleteAccount = lazy(() => import('@/app/student/delete-account/page'));

//Admin
const AdminDashboard = lazy(() => import('@/app/admin/dashboard/page'));
const AllCourses = lazy(() => import('@/app/admin/all-courses/page'));
const CourseCategory = lazy(() => import('@/app/admin/course-category/page'));
const CourseDetail = lazy(() => import('@/app/admin/course-detail/page'));
const AdminStudents = lazy(() => import('@/app/admin/students/page'));
const AdminInstructors = lazy(() => import('@/app/admin/instructors/page'));
const AdminInstructorsDetails = lazy(() => import('@/app/admin/instructor-detail/page'));
const AdminInstructorRequests = lazy(() => import('@/app/admin/instructor-requests/page'));
const AdminReviews = lazy(() => import('@/app/admin/reviews/page'));
const AdminEarnings = lazy(() => import('@/app/admin/earnings/page'));
const AdminSettings = lazy(() => import('@/app/admin/admin-settings/page'));
const NotFound = lazy(() => import('@/app/admin/error-404/page'));
const initialRoutes = [{
  path: '/',
  name: 'root',
  element: <Navigate to="/demos/default/home" />
}];
export const demosRoutes = [{
  path: '/demos/default/home',
  name: 'Demos',
  element: <DemosDefault />
}, {
  path: '/demos/education/home',
  name: 'Home Eduction',
  element: <Eduction />
}, {
  path: '/demos/academy/home',
  name: 'Home Academy',
  element: <Academy />
}, {
  path: '/demos/course/home',
  name: 'Home Course',
  element: <Course />
}, {
  path: '/demos/university/home',
  name: 'Home University',
  element: <University />
}, {
  path: '/demos/kindergarten/home',
  name: 'Home Kindergarten',
  element: <Kindergarten />
}, {
  path: '/demos/landing/home',
  name: 'Home Landing',
  element: <Landing />
}, {
  path: '/demos/tutor/home',
  name: 'Home Tutor',
  element: <Tutor />
}, {
  path: '/demos/school/home',
  name: 'Home School',
  element: <School />
}, {
  path: '/demos/abroad/home',
  name: 'Home Abroad',
  element: <Abroad />
}, {
  path: '/demos/workshop/home',
  name: 'Home Workshop',
  element: <Workshop />
}, {
  path: '/demos/fikes/home',
  name: 'Home FIKES',
  element: <Fikes />
}];
const pagesRoutes = [{
  path: '/pages/course/categories',
  name: 'Course Categories',
  element: <Categories />
}, {
  path: '/pages/course/grid',
  name: 'Course Grid Classic',
  element: <Grid />
}, {
  path: '/pages/protocols',
  name: 'Protocols',
  element: <Grid2 />
}, {
  path: '/pages/assignment',
  name: 'Assignment',
  element: <List />
}, {
  path: '/pages/course/detail',
  name: 'Course Detail Classic',
  element: <Detail />
}, {
  path: '/pages/course/detail-min',
  name: 'Course  Detail Minimal',
  element: <DetailMinimal />
}, {
  path: '/pages/course/detail-adv',
  name: 'Course Detail Advance',
  element: <DetailAdvance />
}, {
  path: '/pages/course/detail-module',
  name: 'Course Detail Module',
  element: <DetailModule />
}, {
  path: '/pages/course/video-player',
  name: 'Course Full Screen Video',
  element: <VideoPlayer />
}, {
  path: '/pages/about/about-us',
  name: 'About Us',
  element: <AboutUs />
}, {
  path: '/pages/about/contact-us',
  name: 'Contact Us',
  element: <ContactUs />
}, {
  path: '/pages/about/blog-grid',
  name: 'Blog Grid',
  element: <BlogGrid />
}, {
  path: '/pages/about/blog-masonry',
  name: 'Blog Masonry',
  element: <BlogMasonry />
}, {
  path: '/pages/about/blog-grid/:blogId',
  name: 'Blog Detail',
  element: <BlogDetail />
}, {
  path: '/pages/about/pricing',
  name: 'Pricing',
  element: <Pricing />
}, {
  path: '/pages/instructors',
  name: 'Instructor List',
  element: <InstructorList />
}, {
  path: '/pages/instructors/:instructorId',
  name: 'Instructor Single',
  element: <InstructorSingle />
}, {
  path: '/pages/become-instructor',
  name: 'Become an Instructor',
  element: <InstructorBecome />
}, {
  path: '/pages/abroad-single',
  name: 'Abroad Single',
  element: <AbroadSingle />
}, {
  path: '/pages/workshop-detail',
  name: 'Workshop Detail',
  element: <WorkshopDetail />
}, {
  path: '/pages/event-detail',
  name: 'Event Detail',
  element: <EventDetail />
}, {
  path: '/pages/form/request-demo',
  name: 'Request a demo',
  element: <RequestDemo />
}, {
  path: '/pages/form/book-class',
  name: 'Book a Class',
  element: <BookClass />
}, {
  path: '/pages/form/request-access',
  name: 'Free Access',
  element: <RequestAccess />
}, {
  path: '/pages/form/admission-form',
  name: 'Admission Form',
  element: <AdmissionForm />
}, {
  path: '/pages/assignment/assignment/:assignmentId/submission',
  name: 'Assignment Submission',
  element: <AssignmentSubmission />
}, {
  path: '/pages/assessments',
  name: 'Assessment Page',
  element: <AssessmentPage />
}, {
  path: '/pages/assessments/form',
  name: 'Assessment Form',
  element: <AssessmentFormPage />
}, {
  path: '/pages/assessments/pre_conference',
  name: 'Pre Conference Assessment',
  element: <PreConferenceAssessmentPage />
}, {
  path: '/pages/assessments/post_conference',
  name: 'Post Conference Assessment',
  element: <PostConferenceAssessmentPage />
}, {
  path: '/pages/assessments/sikap_mahasiswa',
  name: 'Sikap Mahasiswa Assessment',
  element: <SikapMahasiswaAssessmentPage />
}, {
  path: '/pages/assessments/keterampilan_prosedural_klinik_dops',
  name: 'Keterampilan Prosedural Klinik DOPS Assessment',
  element: <KeterampilanProseduralKlinikDOPSAssessmentPage />
}, {
  path: '/pages/assessments/ujian_klinik',
  name: 'Ujian Klinik Assessment',
  element: <UjianKlinikAssessmentPage />
}, {
  path: '/pages/assessments/laporan_pendahuluan',
  name: 'Laporan Pendahuluan Assessment',
  element: <LaporanPendahuluanAssessmentPage />
}, {
  path: '/pages/assessments/asuhan_keperawatan',
  name: 'Asuhan Keperawatan Assessment',
  element: <AsuhanKeperawatanAssessmentPage />
}, {
  path: '/pages/assessments/analisa_sintesa',
  name: 'Analisa Sintesa Assessment',
  element: <AnalisaSintesaAssessmentPage />
}, {
  path: '/pages/assessments/artikel_jurnal',
  name: 'Artikel Jurnal Assessment',
  element: <ArtikelJurnalAssessmentPage />
}, {
  path: '/pages/assessments/case_report',
  name: 'Case Report Assessment',
  element: <CaseReportAssessmentPage />
}, {
  path: '/pages/conference',
  name: 'Conference Page',
  element: <ConferencePage />
}, {
  path: '/pages/videos',
  name: 'Videos',
  element: <VideoListPage />
}, {
  path: '/pages/assessments/laporan',
  name: 'Laporan Assessment',
  element: <LaporanPage />
}, {
  path: '/pages/assessments/telaah_artikel_jurnal',
  name: 'Telaah Artikel Jurnal Assessment (alias)',
  element: <ArtikelJurnalAssessmentPage />
}, {
  path: '/pages/assessments/rekap',
  name: 'Rekap Assessment Mahasiswa',
  element: <RekapAssessmentPage />
}];
export const shopRoutes = [{
  path: '/shop',
  name: 'Shop grid',
  element: <Shop />
}, {
  path: '/shop/product-detail/:eventId',
  name: 'Product detail',
  element: <ProductDetail />
}, {
  path: '/shop/cart',
  name: 'Product detail',
  element: <Cart />
}, {
  path: '/shop/checkout',
  name: 'Checkout',
  element: <Checkout />
}, {
  path: '/shop/empty-cart',
  name: 'Empty Cart',
  element: <EmptyCart />
}, {
  path: '/shop/wishlist',
  name: 'Wishlist',
  element: <Wishlist />
}];
const helpRoutes = [{
  path: '/help/center',
  name: 'Help Center',
  element: <HelpCenter />
}, {
  path: '/help/center-detail',
  name: 'Help Center Single',
  element: <HelpCenterDetails />
}];
const otherRoutes = [{
  path: '/faq',
  name: 'FAQs',
  element: <Faq />
}, {
  path: '/error-404',
  name: 'Error 404',
  element: <Error404 />
}, {
  path: '/coming-soon',
  name: 'Coming Soon',
  element: <ComingSoon />
}, {
  path: '/instructor/create-course',
  name: 'Create Course',
  element: <InstructorCreateCourse />
}];
export const authRoutes = [{
  path: '/auth/sign-in',
  name: 'Sign In',
  element: <SignIn />
}, {
  path: '/auth/forgot-password',
  name: 'Forgot Password',
  element: <ForgotPassword />
}];
export const InstructorRoutes = [{
  path: '/instructor/dashboard',
  name: 'Dashboard',
  element: <InstructorDashboard />
}, {
  path: '/instructor/manage-course',
  name: 'Courses',
  element: <InstructorCourses />
}, {
  path: '/instructor/course-added',
  name: 'Course Added',
  element: <InstructorCourseAdd />
}, {
  path: '/instructor/quiz',
  name: 'Quiz',
  element: <Quiz />
}, {
  path: '/instructor/earning',
  name: 'Earnings',
  element: <Earnings />
}, {
  path: '/instructor/student-list',
  name: 'Students',
  element: <StudentsList />
}, {
  path: '/instructor/order',
  name: 'Orders',
  element: <Orders />
}, {
  path: '/instructor/review',
  name: 'Reviews',
  element: <InstructorReviews />
}, {
  path: '/instructor/payout',
  name: 'Payout',
  element: <Payout />
}, {
  path: '/instructor/edit-profile',
  name: 'Edit Profile',
  element: <EditProfile />
}, {
  path: '/instructor/setting',
  name: 'Settings',
  element: <Settings />
}, {
  path: '/instructor/delete-account',
  name: 'Admin',
  element: <DeleteAccount />
}];
export const studentRoutes = [{
  path: '/student/dashboard',
  name: 'Dashboard',
  element: <StudentDashboard />
}, {
  path: '/student/subscription',
  name: 'Subscription',
  element: <Subscription />
}, {
  path: '/student/course-list',
  name: 'Courses',
  element: <StudentCourseList />
}, {
  path: '/student/course-resume',
  name: 'Course Resume',
  element: <CourseResume />
}, {
  path: '/student/quiz',
  name: 'Quiz',
  element: <StudentQuiz />
}, {
  path: '/student/payment-info',
  name: 'Payment Info',
  element: <PaymentInfo />
}, {
  path: '/student/bookmark',
  name: 'Wishlist',
  element: <StudentWishlist />
}, {
  path: '/student/edit-profile',
  name: 'Edit Profile',
  element: <StudentEditProfile />
}, {
  path: '/student/setting',
  name: 'Setting',
  element: <StudentSetting />
}, {
  path: '/student/delete-account',
  name: 'Delete Account',
  element: <StudentDeleteAccount />
}];
export const adminRoutes = [{
  path: '/admin/dashboard',
  name: 'Admin',
  element: <AdminDashboard />
}, {
  path: '/admin/all-courses',
  name: 'All Courses',
  element: <AllCourses />
}, {
  path: '/admin/course-category',
  name: 'Course Category',
  element: <CourseCategory />
}, {
  path: '/admin/course-detail',
  name: 'Course Detail',
  element: <CourseDetail />
}, {
  path: '/admin/students',
  name: 'Students',
  element: <AdminStudents />
}, {
  path: '/admin/instructors',
  name: 'Instructors',
  element: <AdminInstructors />
}, {
  path: '/admin/instructor-detail',
  name: 'Instructor Detail',
  element: <AdminInstructorsDetails />
}, {
  path: '/admin/instructor-requests',
  name: 'Instructor Requests',
  element: <AdminInstructorRequests />
}, {
  path: '/admin/reviews',
  name: 'Reviews',
  element: <AdminReviews />
}, {
  path: '/admin/earnings',
  name: 'Earnings',
  element: <AdminEarnings />
}, {
  path: '/admin/admin-settings',
  name: 'Admin Settings',
  element: <AdminSettings />
}, {
  path: '/admin/not-found',
  name: 'Not Found',
  element: <NotFound />
}];
export const appRoutes = [...initialRoutes, ...demosRoutes, ...otherRoutes, ...pagesRoutes, ...helpRoutes];

// Komponen redirect
function MahasiswaAssessmentRedirect() {
  const { user } = require('@/context/useAuthContext').useAuth();
  if (user && user.role === 'mahasiswa') {
    return <Navigate to="/pages/assessments/rekap" replace />;
  }
  // fallback: tetap render halaman assessment biasa jika bukan mahasiswa
  const AssessmentPage = require('@/app/pages/assessments/page').default;
  return <AssessmentPage />;
}
