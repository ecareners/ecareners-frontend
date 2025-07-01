import { Card, Badge } from 'react-bootstrap';
import { BsLink45Deg, BsBookmark } from 'react-icons/bs';
import { FaClipboardCheck } from 'react-icons/fa';

const SOPCard = ({ sop }) => {
  if (!sop) {
    return null;
  }

  const handleCardClick = () => {
    if (sop.url) {
      window.open(sop.url, '_blank');
    }
  };

  return (
    <Card 
      className="h-100 shadow-sm border-0 cursor-pointer transition-all duration-300 hover-transform-up medical-protocol-card"
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
      }}
      onClick={handleCardClick}
    >
      <div className="position-relative">
        <div className="p-4 text-center medical-protocol-header" style={{ backgroundColor: '#E3F2FD' }}>
          <FaClipboardCheck size={48} style={{ color: '#0066CC' }} />
        </div>
      </div>
      
      <Card.Body className="p-4">
        <Card.Title className="h6 mb-3 text-truncate medical-protocol-title" title={sop.title}>
          {sop.title || 'No Title'}
        </Card.Title>
        
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <small className="text-muted d-block medical-protocol-id">
              Protocol ID: {sop.sop_id || 'N/A'}
            </small>
            {sop.category && (
              <small className="text-info d-block medical-protocol-category">
                <BsBookmark className="me-1" />
                {sop.category}
              </small>
            )}
          </div>
          <BsLink45Deg className="text-primary medical-link-icon" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default SOPCard; 