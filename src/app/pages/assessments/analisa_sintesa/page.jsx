import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AnalisaSintesaAssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('type', 'analisa_sintesa');
    navigate(`/pages/assessments/laporan?${params.toString()}`, { replace: true });
  }, [navigate, searchParams]);
  return null;
};

export default AnalisaSintesaAssessmentPage; 