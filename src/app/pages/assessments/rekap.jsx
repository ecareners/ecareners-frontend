import React, { useEffect, useState } from 'react';
import { Table, Alert, Badge, Card } from 'react-bootstrap';
import { FaGraduationCap, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ASSESSMENT_LABELS = [
  { type: 'pre_conference', label: 'Pre Conference Assessment' },
  { type: 'post_conference', label: 'Post Conference Assessment' },
  { type: 'sikap_mahasiswa', label: 'Sikap Mahasiswa Assessment' },
  { type: 'keterampilan_prosedural_klinik_dops', label: 'Keterampilan Prosedural Klinik DOPS' },
  { type: 'ujian_klinik', label: 'Ujian Klinik Assessment' },
  { type: 'laporan_pendahuluan', label: 'Laporan Pendahuluan' },
  { type: 'asuhan_keperawatan', label: 'Asuhan Keperawatan & Analisa Sintesa' },
  { type: 'telaah_artikel_jurnal', label: 'Telaah Artikel Jurnal' },
  { type: 'case_report', label: 'Case Report' },
];

const RekapAssessmentPage = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'mahasiswa') {
      setError('Halaman ini hanya untuk mahasiswa.');
      setLoading(false);
      return;
    }
    fetchAssessments();
  }, [user]);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/users/${user.user_id}/assessments`);
      if (response.ok) {
        const data = await response.json();
        setAssessments(data);
      } else {
        throw new Error('Gagal mengambil data assessment');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Map type to score
  const scoreMap = {};
  for (const a of assessments) {
    scoreMap[a.assessment_type] = a.score ?? '-';
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="d-flex align-items-center mb-4">
            <FaGraduationCap className="me-2 fs-3" />
            <h2 className="mb-0">Rekapitulasi Nilai Assessment</h2>
          </div>
          <Card className="mb-4">
            <Card.Body>
              <Alert variant="info" className="mb-4">
                <FaInfoCircle className="me-2" />
                Berikut adalah rekap nilai assessment Anda. Jika belum dinilai, akan muncul tanda strip (-).
              </Alert>
              {error && <Alert variant="danger">{error}</Alert>}
              {loading ? (
                <Alert variant="info">Memuat data...</Alert>
              ) : (
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Jenis Assessment</th>
                      <th>Nilai Akhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSESSMENT_LABELS.map(row => (
                      <tr key={row.type}>
                        <td>{row.label}</td>
                        <td>
                          {scoreMap[row.type] !== '-' ? (
                            <Badge bg="success" className="fs-6">{scoreMap[row.type]}</Badge>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RekapAssessmentPage; 