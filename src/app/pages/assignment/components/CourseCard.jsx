import { Card } from 'react-bootstrap';
import { FaFileAlt, FaEye, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CourseCard = ({ video }) => {
  const { user } = useAuth();
  const { title, description, assignment_type, due_date, semester, academic_year, assignment_id, isSubmitted } = video;
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!user || !isSubmitted) return;
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${user.user_id}/assessments`);
        if (response.ok) {
          const assessments = await response.json();
          

          const assignmentAssessment = assessments.find(a => 
            a.assignment_id == assignment_id
          );
          setAssessment(assignmentAssessment);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchAssessment();
  }, [user, isSubmitted, assignment_id]);

  // Format due date
  const formatDueDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if assignment is overdue
  const isOverdue = () => {
    if (!due_date) return false;
    return new Date(due_date) < new Date();
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  return (
    <Card
      className="assignment-cool-card border-0 shadow-sm h-100 d-flex flex-column align-items-center"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        maxWidth: 320,
        minWidth: 220,
        margin: '0 auto',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
    >
      <div
        className="position-relative w-100"
        style={{
          height: 0,
          paddingBottom: '56.25%',
          background: assessment 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
            : isSubmitted 
            ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
            : isOverdue()
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                padding: '0.7rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {assessment ? (
                <FaStar style={{ color: '#fff', fontSize: '2rem' }} />
              ) : (
                <FaFileAlt style={{ color: '#fff', fontSize: '2rem' }} />
              )}
            </span>
          </div>
        </div>
      </div>
      <Card.Body
        className="d-flex flex-column justify-content-between w-100"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 60%, #e3e8f0 100%)',
          borderBottomLeftRadius: '1.25rem',
          borderBottomRightRadius: '1.25rem',
          flex: 1,
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="mb-2 w-100">
          <Card.Title
            className="mb-0 fw-semibold text-truncate w-100"
            style={{
              fontSize: '1rem',
              color: '#222',
              lineHeight: 1.3,
              minHeight: '2.2em',
              textAlign: 'left',
            }}
            title={title}
          >
            {title}
          </Card.Title>
        </div>
        
        {description && (
          <p 
            className="text-muted mb-3"
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}
        
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1 mb-2">
            {semester && (
              <span className="badge bg-secondary rounded-pill">
                {semester}
              </span>
            )}
            {academic_year && (
              <span className="badge bg-info rounded-pill">
                {academic_year}
              </span>
            )}
          </div>
          
          {/* Assessment Score */}
          {assessment && (
            <div className="mb-2">
              <div className="d-flex align-items-center justify-content-between">
                <span className="badge bg-success rounded-pill d-flex align-items-center gap-1">
                  <FaStar />
                  Assessed
                </span>
                <span className={`badge bg-${getScoreColor(assessment.score)} rounded-pill fs-6 px-2 py-1`}>
                  {assessment.score}/100
                </span>
              </div>
            </div>
          )}
          
          {/* Submission Status */}
          {!assessment && (
            <div className="d-flex align-items-center mb-2">
              {isSubmitted ? (
                <span className="badge bg-info rounded-pill d-flex align-items-center gap-1">
                  <FaCheckCircle />
                  Submitted
                </span>
              ) : (
                <span className={`badge rounded-pill d-flex align-items-center gap-1 ${
                  isOverdue() ? 'bg-danger' : 'bg-warning'
                }`}>
                  <FaTimesCircle />
                  {isOverdue() ? 'Overdue' : 'Not Submitted'}
                </span>
              )}
            </div>
          )}
          
          <div className="d-flex align-items-center text-muted" style={{ fontSize: '0.875rem' }}>
            <FaCalendarAlt className="me-2" />
            <span>Due: {formatDueDate(due_date)}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-2 w-100 d-flex justify-content-center">
          <Link
            to={`/pages/assignment/assignment/${assignment_id}/submission`}
            className="btn btn-outline-primary rounded-pill px-4 d-flex align-items-center gap-2 w-100"
            style={{
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.01em',
              boxShadow: '0 2px 8px rgba(13,110,253,0.07)',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            <FaEye style={{ fontSize: '1.2em' }} />
            {assessment ? 'View Assessment' : isSubmitted ? 'View Submission' : 'Submit Assignment'}
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
