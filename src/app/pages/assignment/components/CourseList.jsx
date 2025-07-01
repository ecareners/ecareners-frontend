import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import Pagination from './Pagination';
import { getAllAssignments } from '@/helpers/data';
import VideoCard from './CourseCard';
import { useFetchData } from '@/hooks/useFetchData';
import { useState, useMemo, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const VideoList = () => {
  const { user } = useAuth();
  const allVideos = useFetchData(getAllAssignments);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Sort by');
  const [userSubmissions, setUserSubmissions] = useState([]);
  const videosPerPage = 8;
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      fetch(`${API_BASE_URL}/api/submissions?user_id=${user.user_id}`)
        .then(res => res.json())
        .then(setUserSubmissions);
    }
  }, [user]);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    if (!allVideos) return [];
    
    let filtered = allVideos;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(video => 
        video.category && video.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort videos
    if (sortBy === 'Title A-Z') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Title Z-A') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'Newest First') {
      filtered = filtered.sort((a, b) => b.videos_id - a.videos_id);
    } else if (sortBy === 'Oldest First') {
      filtered = filtered.sort((a, b) => a.videos_id - b.videos_id);
    }
    
    return filtered;
  }, [allVideos, searchTerm, selectedCategory, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle filter button
  const handleFilter = () => {
    // This could trigger additional filtering logic if needed
    setCurrentPage(1);
  };

  // Get unique categories from videos
  const uniqueCategories = useMemo(() => {
    if (!allVideos) return [];
    const categories = [...new Set(allVideos.map(video => video.category).filter(Boolean))];
    return categories.sort();
  }, [allVideos]);

  // Show loading state
  if (!allVideos) {
    return (
      <section className="pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center py-5">
              <h5 className="text-muted">Loading videos...</h5>
              <p className="text-muted">If this takes too long, check if the backend server is running.</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-5">
      <Container>
        <Row className="mb-4 align-items-center justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5} className="mx-auto">
            <div className="d-flex align-items-center gap-2">
              <form className="border rounded p-2 flex-grow-1 mb-0">
                <div className="input-group input-borderless">
                  <FormControl
                    className="me-1"
                    type="search"
                    placeholder="Search assignments"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Button variant="primary" type="button" className="mb-0 rounded">
                    <FaSearch />
                  </Button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
        
        {/* Results count */}
        <Row className="mb-3">
          <Col xs={12}>
            <p className="text-muted mb-0">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredVideos.length)} of {filteredVideos.length} videos
            </p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-start">
          {currentVideos.map((video, idx) => {
            const isSubmitted = userSubmissions.some(
              (sub) => sub.assignment_id === video.assignment_id
            );
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={video.assignment_id || idx}>
                <VideoCard video={{ ...video, isSubmitted }} />
              </Col>
            );
          })}
        </Row>

        {/* Show message when no videos found */}
        {currentVideos.length === 0 && (
          <Row className="justify-content-center">
            <Col xs={12} className="text-center py-5">
              <h5 className="text-muted">No videos found</h5>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </Col>
          </Row>
        )}

        <Col xs={12}>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Container>
    </section>
  );
};

export default VideoList;
