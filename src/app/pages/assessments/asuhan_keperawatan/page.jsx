import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AsuhanKeperawatanAssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('type', 'asuhan_keperawatan');
    navigate(`/pages/assessments/laporan?${params.toString()}`, { replace: true });
  }, [navigate, searchParams]);
  return null;
};

export default AsuhanKeperawatanAssessmentPage; 