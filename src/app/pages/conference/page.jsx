import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { FaPlus, FaVideo, FaCalendar, FaUser, FaLink, FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';
import PageMetaData from '@/components/PageMetaData';
import TopNavigationBar from '../event-detail/components/TopNavigationBar';

const ConferencePage = () => {
  const { userRole } = useAuth();
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingConference, setEditingConference] = useState(null);
  const [setupLoading, setSetupLoading] = useState(false);
  const [formData, setFormData] = useState({
    platform: 'Zoom',
    title: '',
    link: '',
    description: '',
    scheduled_time: ''
  });

  // Fetch conferences
  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/conferences');
      if (!response.ok) {
        throw new Error('Failed to fetch conferences');
      }
      const data = await response.json();
      setConferences(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching conferences:', err);
      setError('Failed to load conferences');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConference = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/conferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create conference');
      }

      await fetchConferences();
      setShowCreateModal(false);
      setFormData({
        platform: 'Zoom',
        title: '',
        link: '',
        description: '',
        scheduled_time: ''
      });
    } catch (err) {
      console.error('Error creating conference:', err);
      setError(err.message);
    }
  };

  const handleEditConference = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/conferences/${editingConference.conference_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update conference');
      }

      await fetchConferences();
      setShowEditModal(false);
      setEditingConference(null);
      setFormData({
        platform: 'Zoom',
        title: '',
        link: '',
        description: '',
        scheduled_time: ''
      });
    } catch (err) {
      console.error('Error updating conference:', err);
      setError(err.message);
    }
  };

  const handleDeleteConference = async (conferenceId) => {
    if (!window.confirm('Are you sure you want to delete this conference?')) {
      return;
    }

    try {
      const response = await fetch(`/api/conferences/${conferenceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete conference');
      }

      await fetchConferences();
    } catch (err) {
      console.error('Error deleting conference:', err);
      setError(err.message);
    }
  };

  const openEditModal = (conference) => {
    setEditingConference(conference);
    setFormData({
      platform: conference.platform,
      title: conference.title,
      link: conference.link,
      description: conference.description || '',
      scheduled_time: conference.scheduled_time.slice(0, 16) // Format for datetime-local input
    });
    setShowEditModal(true);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Zoom':
        return '🔵';
      case 'Google Meet':
        return '🟢';
      case 'WhatsApp':
        return '🟢';
      case 'Discord':
        return '🟣';
      default:
        return '📹';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Zoom':
        return 'primary';
      case 'Google Meet':
        return 'success';
      case 'WhatsApp':
        return 'success';
      case 'Discord':
        return 'secondary';
      default:
        return 'info';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (dateTime) => {
    return new Date(dateTime) > new Date();
  };

  const handleSetupTable = async () => {
    try {
      setSetupLoading(true);
      const response = await fetch('/api/setup/conference-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to setup conference table');
      }

      await fetchConferences();
      setError(null);
    } catch (err) {
      console.error('Error setting up conference table:', err);
      setError(err.message);
    } finally {
      setSetupLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageMetaData title="Conference" />
        <TopNavigationBar />
        <main className="py-5">
          <Container>
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading conferences...</p>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <PageMetaData title="Conference" />
      <TopNavigationBar />
      <main className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h1 className="mb-3">Conference</h1>
              <p className="text-muted">Join medical conferences and training sessions</p>
            </Col>
            {userRole !== 'mahasiswa' && (
              <Col xs="auto">
                <Button 
                  variant="primary" 
                  onClick={() => setShowCreateModal(true)}
                  className="d-flex align-items-center gap-2"
                >
                  <FaPlus />
                  Create Meeting
                </Button>
              </Col>
            )}
          </Row>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Row className="g-4">
            {conferences.length === 0 ? (
              <Col xs={12}>
                <div className="text-center py-5">
                  <h5>No conferences found</h5>
                  <p className="text-muted">No conferences are scheduled at the moment.</p>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleSetupTable}
                    disabled={setupLoading}
                    className="mt-3"
                  >
                    {setupLoading ? 'Setting up...' : 'Setup Conference Table'}
                  </Button>
                </div>
              </Col>
            ) : (
              conferences.map((conference) => (
                <Col key={conference.conference_id} sm={6} lg={4}>
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fs-4">{getPlatformIcon(conference.platform)}</span>
                        <Badge bg={getPlatformColor(conference.platform)}>
                          {conference.platform}
                        </Badge>
                      </div>
                      {userRole !== 'mahasiswa' && (
                        <div className="btn-group btn-group-sm">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => openEditModal(conference)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteConference(conference.conference_id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      )}
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="h6 mb-3">{conference.title}</Card.Title>
                      
                      <div className="mb-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaCalendar className="text-muted" />
                          <small className="text-muted">
                            {formatDateTime(conference.scheduled_time)}
                          </small>
                        </div>
                        {isUpcoming(conference.scheduled_time) && (
                          <div className="d-flex align-items-center gap-2">
                            <FaClock className="text-success" />
                            <small className="text-success fw-bold">Upcoming</small>
                          </div>
                        )}
                      </div>

                      {conference.description && (
                        <Card.Text className="small text-muted mb-3 flex-grow-1">
                          {conference.description}
                        </Card.Text>
                      )}

                      <div className="mt-auto">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-100"
                          href={conference.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLink className="me-2" />
                          Join Meeting
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </main>

      {/* Create Conference Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Conference</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateConference}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Platform</Form.Label>
                  <Form.Select
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    required
                  >
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Discord">Discord</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Scheduled Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.scheduled_time}
                    onChange={(e) => setFormData({...formData, scheduled_time: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter conference title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="Enter meeting link"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter conference description (optional)"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Conference
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Conference Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Conference</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditConference}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Platform</Form.Label>
                  <Form.Select
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    required
                  >
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Discord">Discord</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Scheduled Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.scheduled_time}
                    onChange={(e) => setFormData({...formData, scheduled_time: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter conference title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="Enter meeting link"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter conference description (optional)"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Conference
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ConferencePage; 