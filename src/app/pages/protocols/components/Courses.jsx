import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import SOPCard from './SOPCard';
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { fetchAllSOPs } from '@/api/sop';

const Courses = () => {
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Show 12 protocols per page (3 rows of 4 cards)

  // Fetch Protocols from database
  useEffect(() => {
    const loadProtocols = async () => {
      try {
        console.log('Loading Protocols from database...');
        setLoading(true);
        const data = await fetchAllSOPs();
        console.log('Protocols loaded from database:', data);
        setSops(data);
        setError(null);
      } catch (err) {
        console.error('Error loading Protocols:', err);
        setError(`Failed to load Protocols: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadProtocols();
  }, []);

  // Filter Protocols based on search term
  const filteredProtocols = sops.filter(sop =>
    sop.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProtocols = filteredProtocols.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProtocols.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <section className="pt-0">
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading Protocols from database...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-0">
        <Container>
          <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
              <h5>Error Loading Protocols</h5>
              <p>{error}</p>
              <p className="mb-0">Please check your database connection and try again.</p>
              <p className="mb-0 small">Make sure MySQL server is running and database 'ecareners' exists.</p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-0">
      <Container>
        <form className="bg-light border p-4 rounded-3 my-4 z-index-9 position-relative">
          <Row className="g-3">
            <Col xl={11}>
              <FormControl 
                className="me-1" 
                type="search" 
                placeholder="Search Protocols..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xl={1}>
              <Button variant="primary" type="button" className="mb-0 rounded z-index-1 w-100">
                <FaSearch />
              </Button>
            </Col>
          </Row>
        </form>
        
        {/* Results summary */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-muted mb-0">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProtocols.length)} of {filteredProtocols.length} Protocols
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          {totalPages > 1 && (
            <p className="text-muted mb-0">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
        
        <Row className="mt-3">
          <Col xs={12}>
            {filteredProtocols.length === 0 ? (
              <div className="text-center py-5">
                <h5>No Protocols found</h5>
                <p className="text-muted">
                  {searchTerm ? `No Protocols match "${searchTerm}"` : 'No Protocols available'}
                </p>
                <p className="text-muted small">Total Protocols in database: {sops.length}</p>
              </div>
            ) : (
              <>
                <Row className="g-4">
                  {currentProtocols.map((sop, idx) => (
                    <Col sm={6} lg={4} xl={3} key={sop.sop_id}>
                      <SOPCard sop={sop} />
                    </Col>
                  ))}
                </Row>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
