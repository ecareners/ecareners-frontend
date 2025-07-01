import { Card, Button } from 'react-bootstrap';
import { FaYoutube, FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import useToggle from '@/hooks/useToggle';

const VideoCard = ({ video }) => {
  const { title, url } = video;
  const { isTrue, toggle } = useToggle(true);

  // Extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = getYouTubeVideoId(url);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <Card
      className="video-cool-card border-0 shadow-sm h-100 d-flex flex-column align-items-center"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        maxWidth: 320,
        minWidth: 220,
        margin: '0 auto',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.13)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.09)';
      }}
    >
      <div
        className="position-relative w-100"
        style={{
          height: 0,
          paddingBottom: '56.25%',
          background: '#222',
        }}
      >
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
              alt={title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: '1.25rem',
                borderTopRightRadius: '1.25rem',
                filter: 'brightness(0.92)',
                transition: 'filter 0.2s',
              }}
              className="video-thumb"
            />
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  borderRadius: '50%',
                  padding: '0.7rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaPlay style={{ color: '#fff', fontSize: '2rem' }} />
              </span>
            </div>
          </>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <FaYoutube className="text-danger" style={{ fontSize: '3rem' }} />
          </div>
        )}
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
        <div className="d-flex justify-content-between align-items-start mb-2 w-100">
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
          <span role="button" onClick={toggle} className="ms-2">
            {isTrue ? <FaRegHeart /> : <FaHeart className="text-danger" />}
          </span>
        </div>
        <div className="mt-auto pt-2 w-100 d-flex justify-content-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-danger rounded-pill px-4 d-flex align-items-center gap-2 w-100"
            style={{
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.01em',
              boxShadow: '0 2px 8px rgba(220,38,38,0.07)',
              justifyContent: 'center',
            }}
          >
            <FaYoutube style={{ fontSize: '1.2em' }} />
            Watch on YouTube
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
