import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, Alert, Badge, 
  ProgressBar 
} from 'react-bootstrap';
import { 
  FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaSave, FaDownload, FaEye, 
  FaStar, FaUserTie, FaUserGraduate, FaInfoCircle, FaFile,
  FaClipboardList, FaChartLine, FaBook, FaCalculator, FaLock
} from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AssessmentFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [student, setStudent] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [assessmentForm, setAssessmentForm] = useState({});
  const [finalScore, setFinalScore] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [detailedData, setDetailedData] = useState(null); // New state for detailed data

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');
  const assessmentType = searchParams.get('assessmentType');
  const assignmentId = searchParams.get('assignmentId');

  // Check if user has permission to access assessments
  useEffect(() => {
    if (user && (user.role === 'mahasiswa' || user.role === 'student')) {
      setError('Akses ditolak. Hanya instruktur dan proktor yang dapat mengakses penilaian.');
      setLoading(false);
      return;
    }
  }, [user]);

  useEffect(() => {
    if (studentId && assessmentType) {
      initializeAssessmentForm();
      fetchStudentData();
      fetchAssignmentData();
      fetchSubmissionData();
      fetchExistingAssessment();
    }
  }, [studentId, assessmentType, assignmentId]);

  const initializeAssessmentForm = () => {
    const formData = {
      assessment_type: assessmentType,
      student_id: studentId,
      assessed_user_id: studentId,
      assessor_user_id: user?.user_id,
      comments: ''
    };

    // Initialize aspects based on assessment type
    switch (assessmentType) {
      case 'pre_conference':
        for (let i = 1; i <= 5; i++) {
          formData[`aspect_precon_${i}`] = '';
        }
        break;
      case 'post_conference':
        for (let i = 1; i <= 5; i++) {
          formData[`aspect_postcon_${i}`] = '';
        }
        break;
      case 'laporan_pendahuluan':
        for (let i = 1; i <= 4; i++) {
          formData[`aspect_lappen_${i}`] = '';
        }
        break;
      case 'asuhan_keperawatan':
        for (let i = 1; i <= 10; i++) {
          formData[`aspect_laporan_${i}`] = '';
        }
        break;
      case 'sikap_mahasiswa':
        for (let i = 1; i <= 20; i++) {
          formData[`aspek_sikap_${i}`] = '';
        }
        break;
      case 'keterampilan_prosedural_klinik_dops':
        for (let i = 1; i <= 16; i++) {
          formData[`aspect_dops_${i}`] = '';
        }
        break;
      case 'ujian_klinik':
        for (let i = 1; i <= 18; i++) {
          if (i === 5) {
            formData[`aspek_klinik_5a`] = '';
            formData[`aspek_klinik_5b`] = '';
          } else {
            formData[`aspek_klinik_${i}`] = '';
          }
        }
        break;
      case 'telaah_artikel_jurnal':
        for (let i = 1; i <= 5; i++) {
          formData[`aspect_jurnal_${i}`] = '';
        }
        break;
      case 'case_report':
        for (let i = 1; i <= 4; i++) {
          formData[`aspek_casport_${i}`] = '';
        }
        break;
    }

    setAssessmentForm(formData);
  };

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        throw new Error('Gagal mengambil data siswa');
      }
    } catch (err) {
      setError('Gagal mengambil data siswa: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignmentData = async () => {
    // Auto-fill assignment IDs for assignment-based assessments
    const assignmentIdMap = getAssignmentIdMap();
    
    // Use the mapped assignment ID if available, otherwise use the provided assignmentId
    const targetAssignmentId = assignmentIdMap[assessmentType] || assignmentId;
    
    if (!targetAssignmentId) {
      console.log('Tidak ada ID tugas tersedia untuk jenis penilaian:', assessmentType);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments/${targetAssignmentId}`);
      if (response.ok) {
        const data = await response.json();
        setAssignment(data);
        console.log(`✅ Mengambil data tugas dengan ID ${targetAssignmentId}:`, data);
      } else {
        console.error(`❌ Gagal mengambil tugas dengan ID ${targetAssignmentId}`);
      }
    } catch (err) {
      console.error('Error mengambil data tugas:', err);
    }
  };

  const fetchSubmissionData = async () => {
    if (!studentId) return;
    
    // Auto-fill assignment IDs for assignment-based assessments
    const assignmentIdMap = getAssignmentIdMap();
    
    // Use the mapped assignment ID if available, otherwise use the provided assignmentId
    const targetAssignmentId = assignmentIdMap[assessmentType] || assignmentId;
    
    if (!targetAssignmentId) {
      console.log('Tidak ada ID tugas tersedia untuk pengambilan submission:', assessmentType);
      return;
    }
    
    try {
      // Try to fetch submission by assignment ID
      const response = await fetch(`${API_BASE_URL}/api/submissions/${studentId}/${targetAssignmentId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setSubmission(data[0]);
          console.log(`✅ Mengambil data submission dengan ID tugas ${targetAssignmentId}:`, data[0]);
        } else {
          console.log(`📝 Tidak ada submission ditemukan untuk ID tugas ${targetAssignmentId}`);
        }
      } else {
        console.error(`❌ Gagal mengambil submission untuk ID tugas ${targetAssignmentId}`);
      }
    } catch (err) {
      console.error('Error mengambil data submission:', err);
    }
  };

  // Add logic to fetch assessment and detailed data for all supported assessment types
  const fetchExistingAssessment = async () => {
    if (!studentId || !assessmentType) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/${assessmentType}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setAssessment(data[0]);
          // Fetch detailed data
          const detailedResponse = await fetch(`${API_BASE_URL}/api/assessments/${data[0].assessment_id}/detailed`);
          if (detailedResponse.ok) {
            const detailedData = await detailedResponse.json();
            setDetailedData(detailedData.detailed_data);
            // Set form fields from detailedData for each type
            let formData = { comments: data[0].comments || '' };
            switch (assessmentType) {
              case 'pre_conference':
                for (let i = 1; i <= 5; i++) {
                  formData[`aspect_precon_${i}`] = detailedData.detailed_data?.[`aspect_precon_${i}`] || '';
                }
                break;
              case 'post_conference':
                for (let i = 1; i <= 5; i++) {
                  formData[`aspect_postcon_${i}`] = detailedData.detailed_data?.[`aspect_postcon_${i}`] || '';
                }
                break;
              case 'laporan_pendahuluan':
                for (let i = 1; i <= 4; i++) {
                  formData[`aspect_lappen_${i}`] = detailedData.detailed_data?.[`aspect_lappen_${i}`] || '';
                }
                break;
              case 'asuhan_keperawatan':
              case 'analisa_sintesa':
                for (let i = 1; i <= 10; i++) {
                  formData[`aspect_laporan_${i}`] = detailedData.detailed_data?.[`aspect_laporan_${i}`] || '';
                }
                break;
              case 'sikap_mahasiswa':
                for (let i = 1; i <= 20; i++) {
                  formData[`aspek_sikap_${i}`] = detailedData.detailed_data?.[`aspek_sikap_${i}`] || '';
                }
                break;
              case 'keterampilan_prosedural_klinik_dops':
                for (let i = 1; i <= 16; i++) {
                  formData[`aspect_dops_${i}`] = detailedData.detailed_data?.[`aspect_dops_${i}`] || '';
                }
                break;
              case 'ujian_klinik':
                for (let i = 1; i <= 18; i++) {
                  if (i === 5) {
                    formData[`aspek_klinik_5a`] = detailedData.detailed_data?.[`aspek_klinik_5a`] || '';
                    formData[`aspek_klinik_5b`] = detailedData.detailed_data?.[`aspek_klinik_5b`] || '';
                  } else {
                    formData[`aspek_klinik_${i}`] = detailedData.detailed_data?.[`aspek_klinik_${i}`] || '';
                  }
                }
                break;
              case 'telaah_artikel_jurnal':
                for (let i = 1; i <= 5; i++) {
                  formData[`aspect_jurnal_${i}`] = detailedData.detailed_data?.[`aspect_jurnal_${i}`] || '';
                }
                break;
              case 'case_report':
                for (let i = 1; i <= 4; i++) {
                  formData[`aspek_casport_${i}`] = detailedData.detailed_data?.[`aspek_casport_${i}`] || '';
                }
                break;
              default:
                break;
            }
            setAssessmentForm(formData);
          }
        }
      }
    } catch (err) {
      console.error('Error mengambil penilaian yang ada:', err);
    }
  };

  const calculateFinalScore = (formData) => {
    let score = 0;
    
    switch (assessmentType) {
      case 'pre_conference':
        const preconTotal = [1, 2, 3, 4, 5].reduce((sum, i) => {
          const value = parseInt(formData[`aspect_precon_${i}`]) || 0;
          return sum + value;
        }, 0);
        score = preconTotal * 4; // total aspek x 4
        break;
        
      case 'post_conference':
        const postconTotal = [1, 2, 3, 4, 5].reduce((sum, i) => {
          const value = parseInt(formData[`aspect_postcon_${i}`]) || 0;
          return sum + value;
        }, 0);
        score = postconTotal * 4; // total aspek x 4
        break;
        
      case 'laporan_pendahuluan':
        const aspect1 = parseInt(formData.aspect_lappen_1) || 0;
        const aspect2 = parseInt(formData.aspect_lappen_2) || 0;
        const aspect3 = parseInt(formData.aspect_lappen_3) || 0;
        const aspect4 = parseInt(formData.aspect_lappen_4) || 0;
        score = (aspect1 * 0.30) + (aspect2 * 0.30) + (aspect3 * 0.20) + (aspect4 * 0.20);
        break;
        
      case 'asuhan_keperawatan':
        const laporanTotal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((sum, i) => {
          const value = parseInt(formData[`aspect_laporan_${i}`]) || 0;
          return sum + value;
        }, 0);
        score = (laporanTotal / 40) * 100; // total aspek/40 x 100
        break;
        
      case 'sikap_mahasiswa':
        const sikapTotal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].reduce((sum, i) => {
          const value = parseInt(formData[`aspek_sikap_${i}`]) || 0;
          return sum + value;
        }, 0);
        score = (sikapTotal / 80) * 100; // total aspek/80 x 100
        break;
        
      case 'keterampilan_prosedural_klinik_dops':
        const dopsTotal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].reduce((sum, i) => {
          const value = parseInt(formData[`aspect_dops_${i}`]) || 0;
          return sum + value;
        }, 0);
        score = (dopsTotal / 16) * 100; // total aspek/16 x 100
        break;
        
      case 'ujian_klinik':
        const klinikTotal = [1, 2, 3, 4, '5a', '5b', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].reduce((sum, i) => {
          const value = parseInt(formData[`aspek_klinik_${i}`]) || 0;
          return sum + value;
        }, 0);
        score = (klinikTotal / 90) * 100; // total aspek/90 x 100
        break;
        
      case 'telaah_artikel_jurnal':
        const jurnal1 = parseInt(formData.aspect_jurnal_1) || 0;
        const jurnal2 = parseInt(formData.aspect_jurnal_2) || 0;
        const jurnal3 = parseInt(formData.aspect_jurnal_3) || 0;
        const jurnal4 = parseInt(formData.aspect_jurnal_4) || 0;
        const jurnal5 = parseInt(formData.aspect_jurnal_5) || 0;
        score = (jurnal1 * 0.20) + (jurnal2 * 0.20) + (jurnal3 * 0.20) + (jurnal4 * 0.20) + (jurnal5 * 0.20);
        break;
        
      case 'case_report':
        const casport1 = parseInt(formData.aspek_casport_1) || 0;
        const casport2 = parseInt(formData.aspek_casport_2) || 0;
        const casport3 = parseInt(formData.aspek_casport_3) || 0;
        const casport4 = parseInt(formData.aspek_casport_4) || 0;
        score = (casport1 * 0.50) + (casport2 * 0.10) + (casport3 * 0.10) + (casport4 * 0.30);
        break;
    }
    
    setFinalScore(parseFloat(score.toFixed(2)));
  };

  const handleFormChange = (field, value) => {
    const updatedForm = { ...assessmentForm, [field]: value };
    setAssessmentForm(updatedForm);
    calculateFinalScore(updatedForm);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let response;
      
      // Auto-fill assignment IDs for assignment-based assessments
      const assignmentIdMap = getAssignmentIdMap();
      
      // Always use the detailed endpoint for all assessment types
      const requestData = {
        assessed_user_id: studentId,
        assessor_user_id: user?.user_id,
        assessment_type: assessmentType,
        comments: assessmentForm.comments || '',
        academic_year: new Date().getFullYear(),
        semester: 'Ganjil',
        assessment_data: {}
      };

      // Add assignment_id for assignment-based assessments
      if (assignmentIdMap[assessmentType]) {
        requestData.assignment_id = assignmentIdMap[assessmentType];
      }

      // Extract assessment_data from form fields
      const assessmentTypeInfo = getAssessmentTypeInfo(assessmentType);
      assessmentTypeInfo.aspects.forEach(aspect => {
        requestData.assessment_data[aspect.name] = parseInt(assessmentForm[aspect.name]) || 0;
      });

      // Add submission_id if available
      if (submission) {
        requestData.submission_id = submission.submission_id;
      }

      console.log('📤 Mengirim data penilaian yang detail:', requestData);
      console.log('📋 Jenis Penilaian:', assessmentType);
      console.log('📋 ID Tugas:', requestData.assignment_id || 'Tidak ada (penilaian langsung)');
      console.log('📋 ID Submission:', requestData.submission_id || 'Tidak ada');

      response = await fetch(`${API_BASE_URL}/api/assessments/detailed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Refresh assessment data
        await fetchExistingAssessment();
        setIsEditing(false); // Reset edit mode after successful submission
        setSaving(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Gagal mengirim penilaian');
        setSaving(false);
      }
    } catch (err) {
      setError('Gagal mengirim penilaian: ' + err.message);
      setSaving(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  const getAssessmentTypeInfo = (type) => {
    const types = {
      'pre_conference': {
        label: 'Penilaian Pre Conference',
        icon: FaUserTie,
        description: 'Menilai persiapan dan pemahaman siswa sebelum konferensi',
        color: 'primary',
        aspects: [
          { name: 'aspect_precon_1', label: 'Aspek Pre Conference 1', max: 5 },
          { name: 'aspect_precon_2', label: 'Aspek Pre Conference 2', max: 5 },
          { name: 'aspect_precon_3', label: 'Aspek Pre Conference 3', max: 5 },
          { name: 'aspect_precon_4', label: 'Aspek Pre Conference 4', max: 5 },
          { name: 'aspect_precon_5', label: 'Aspek Pre Conference 5', max: 5 }
        ]
      },
      'post_conference': {
        label: 'Penilaian Post Conference',
        icon: FaUserTie,
        description: 'Menilai refleksi dan pembelajaran siswa setelah konferensi',
        color: 'info',
        aspects: [
          { name: 'aspect_postcon_1', label: 'Aspek Post Conference 1', max: 5 },
          { name: 'aspect_postcon_2', label: 'Aspek Post Conference 2', max: 5 },
          { name: 'aspect_postcon_3', label: 'Aspek Post Conference 3', max: 5 },
          { name: 'aspect_postcon_4', label: 'Aspek Post Conference 4', max: 5 },
          { name: 'aspect_postcon_5', label: 'Aspek Post Conference 5', max: 5 }
        ]
      },
      'laporan_pendahuluan': {
        label: 'Penilaian Laporan Pendahuluan',
        icon: FaFile,
        description: 'Menilai pengumpulan laporan siswa',
        color: 'primary',
        aspects: [
          { name: 'aspect_lappen_1', label: 'Aspek Laporan Pendahuluan 1', max: 100, weight: 30 },
          { name: 'aspect_lappen_2', label: 'Aspek Laporan Pendahuluan 2', max: 100, weight: 30 },
          { name: 'aspect_lappen_3', label: 'Aspek Laporan Pendahuluan 3', max: 100, weight: 20 },
          { name: 'aspect_lappen_4', label: 'Aspek Laporan Pendahuluan 4', max: 100, weight: 20 }
        ]
      },
      'asuhan_keperawatan': {
        label: 'Penilaian Asuhan Keperawatan & Analisa Sintesa',
        icon: FaFile,
        description: 'Menilai keterampilan siswa dalam perencanaan asuhan keperawatan dan analisis/sintesis',
        color: 'info',
        aspects: [
          { name: 'aspect_laporan_1', label: 'Aspek Laporan 1', max: 4 },
          { name: 'aspect_laporan_2', label: 'Aspek Laporan 2', max: 4 },
          { name: 'aspect_laporan_3', label: 'Aspek Laporan 3', max: 4 },
          { name: 'aspect_laporan_4', label: 'Aspek Laporan 4', max: 4 },
          { name: 'aspect_laporan_5', label: 'Aspek Laporan 5', max: 4 },
          { name: 'aspect_laporan_6', label: 'Aspek Laporan 6', max: 4 },
          { name: 'aspect_laporan_7', label: 'Aspek Laporan 7', max: 4 },
          { name: 'aspect_laporan_8', label: 'Aspek Laporan 8', max: 4 },
          { name: 'aspect_laporan_9', label: 'Aspek Laporan 9', max: 4 },
          { name: 'aspect_laporan_10', label: 'Aspek Laporan 10', max: 4 }
        ]
      },
      'sikap_mahasiswa': {
        label: 'Penilaian Sikap Mahasiswa',
        icon: FaUserGraduate,
        description: 'Menilai sikap dan perilaku profesional siswa',
        color: 'success',
        aspects: Array.from({ length: 20 }, (_, i) => ({
          name: `aspek_sikap_${i + 1}`,
          label: `Aspek Sikap ${i + 1}`,
          max: 4
        }))
      },
      'keterampilan_prosedural_klinik_dops': {
        label: 'Penilaian Keterampilan Prosedural Klinik DOPS',
        icon: FaClipboardList,
        description: 'Menilai keterampilan prosedural siswa menggunakan framework DOPS',
        color: 'warning',
        aspects: Array.from({ length: 16 }, (_, i) => ({
          name: `aspect_dops_${i + 1}`,
          label: `Aspek DOPS ${i + 1}`,
          max: 100
        }))
      },
      'ujian_klinik': {
        label: 'Penilaian Ujian Klinik',
        icon: FaChartLine,
        description: 'Menilai kinerja siswa dalam ujian klinik',
        color: 'danger',
        aspects: [
          { name: 'aspek_klinik_1', label: 'Aspek Klinik 1', max: 5 },
          { name: 'aspek_klinik_2', label: 'Aspek Klinik 2', max: 5 },
          { name: 'aspek_klinik_3', label: 'Aspek Klinik 3', max: 5 },
          { name: 'aspek_klinik_4', label: 'Aspek Klinik 4', max: 5 },
          { name: 'aspek_klinik_5a', label: 'Aspek Klinik 5a', max: 5 },
          { name: 'aspek_klinik_5b', label: 'Aspek Klinik 5b', max: 5 },
          { name: 'aspek_klinik_6', label: 'Aspek Klinik 6', max: 5 },
          { name: 'aspek_klinik_7', label: 'Aspek Klinik 7', max: 5 },
          { name: 'aspek_klinik_8', label: 'Aspek Klinik 8', max: 5 },
          { name: 'aspek_klinik_9', label: 'Aspek Klinik 9', max: 5 },
          { name: 'aspek_klinik_10', label: 'Aspek Klinik 10', max: 5 },
          { name: 'aspek_klinik_11', label: 'Aspek Klinik 11', max: 5 },
          { name: 'aspek_klinik_12', label: 'Aspek Klinik 12', max: 5 },
          { name: 'aspek_klinik_13', label: 'Aspek Klinik 13', max: 5 },
          { name: 'aspek_klinik_14', label: 'Aspek Klinik 14', max: 5 },
          { name: 'aspek_klinik_15', label: 'Aspek Klinik 15', max: 5 },
          { name: 'aspek_klinik_16', label: 'Aspek Klinik 16', max: 5 },
          { name: 'aspek_klinik_17', label: 'Aspek Klinik 17', max: 5 },
          { name: 'aspek_klinik_18', label: 'Aspek Klinik 18', max: 5 }
        ]
      },
      'telaah_artikel_jurnal': {
        label: 'Penilaian Telaah Artikel Jurnal',
        icon: FaBook,
        description: 'Menilai ulasan siswa terhadap artikel jurnal',
        color: 'warning',
        aspects: [
          { name: 'aspect_jurnal_1', label: 'Aspek Jurnal 1', max: 100, weight: 20 },
          { name: 'aspect_jurnal_2', label: 'Aspek Jurnal 2', max: 100, weight: 20 },
          { name: 'aspect_jurnal_3', label: 'Aspek Jurnal 3', max: 100, weight: 20 },
          { name: 'aspect_jurnal_4', label: 'Aspek Jurnal 4', max: 100, weight: 20 },
          { name: 'aspect_jurnal_5', label: 'Aspek Jurnal 5', max: 100, weight: 20 }
        ]
      },
      'case_report': {
        label: 'Penilaian Laporan Kasus',
        icon: FaFile,
        description: 'Menilai pengumpulan laporan kasus siswa',
        color: 'danger',
        aspects: [
          { name: 'aspek_casport_1', label: 'Aspek Laporan Kasus 1', max: 100, weight: 50 },
          { name: 'aspek_casport_2', label: 'Aspek Laporan Kasus 2', max: 100, weight: 10 },
          { name: 'aspek_casport_3', label: 'Aspek Laporan Kasus 3', max: 100, weight: 10 },
          { name: 'aspek_casport_4', label: 'Aspek Laporan Kasus 4', max: 100, weight: 30 }
        ]
      }
    };
    return types[type] || { label: type, icon: FaStar, description: 'Penilaian', color: 'secondary', aspects: [] };
  };

  const isDirectAssessment = (type) => {
    const directTypes = ['pre_conference', 'post_conference', 'sikap_mahasiswa', 'keterampilan_prosedural_klinik_dops', 'ujian_klinik'];
    return directTypes.includes(type);
  };

  const getAssignmentIdMap = () => {
    return {
      'laporan_pendahuluan': 1,
      'asuhan_keperawatan': 2,
      'telaah_artikel_jurnal': 5,
      'case_report': 3
    };
  };

  const isAssignmentBasedAssessment = (type) => {
    const assignmentTypes = ['laporan_pendahuluan', 'asuhan_keperawatan', 'telaah_artikel_jurnal', 'case_report'];
    return assignmentTypes.includes(type);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <Alert variant="info">Memuat data penilaian...</Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  const assessmentInfo = getAssessmentTypeInfo(assessmentType);
  const AssessmentIcon = assessmentInfo.icon;
  
  // Determine if form should be locked (assessment exists and not in edit mode)
  const isFormLocked = assessment && !isEditing;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <AssessmentIcon className="me-2" />
                {assessmentInfo.label}
              </h2>
              <p className="text-muted mb-0">{assessmentInfo.description}</p>
            </div>
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Kembali ke Penilaian
            </Button>
          </div>

          {/* Student Information */}
          {student && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaUserGraduate className="me-2" />
                  Informasi Siswa
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Nama:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Program:</strong> {student.prodi}</p>
                    <p><strong>ID Siswa:</strong> {student.user_id}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Assignment Information - For assignment-based assessments */}
          {isAssignmentBasedAssessment(assessmentType) && assignment && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaFileAlt className="me-2" />
                  Tugas yang Diperlukan
                  <Badge bg="info" className="ms-2">
                    Auto-filled
                  </Badge>
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-8">
                    <p><strong>Judul:</strong> {assignment.title}</p>
                    <p><strong>Deskripsi:</strong> {assignment.description}</p>
                    <p><strong>Tipe Tugas:</strong> 
                      <Badge bg="info" className="ms-2">
                        {assignment.assignment_type}
                      </Badge>
                    </p>
                    <p><strong>ID Tugas:</strong> 
                      <Badge bg="success" className="ms-2">
                        {assignment.assignment_id}
                      </Badge>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Tanggal Deadline:</strong></p>
                    <p className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" />
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </p>
                    <p><strong>Status:</strong></p>
                    <Badge bg={submission ? 'success' : 'warning'}>
                      {submission ? 'Terkirim' : 'Belum Terkirim'}
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Submission Information - Only for assignment-based assessments */}
          {isAssignmentBasedAssessment(assessmentType) && (
            submission ? (
              <Card className="mb-4 border-success">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">
                    <FaCheckCircle className="me-2" />
                    Submission Ditemukan
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-8">
                      <p><strong>Terkirim:</strong> {new Date(submission.submitted_at).toLocaleString()}</p>
                      <p><strong>Teks:</strong> {submission.text}</p>
                    </div>
                    <div className="col-md-4">
                      <Button
                        variant="outline-info"
                        onClick={() => window.open(`https://drive.google.com/file/d/${submission.google_drive_file_id}/view`, '_blank')}
                        className="w-100"
                      >
                        <FaEye className="me-2" />
                        Lihat File
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="mb-4 border-warning">
                <Card.Header className="bg-warning text-dark">
                  <h5 className="mb-0">
                    <FaTimesCircle className="me-2" />
                    Submission Tidak Ditemukan
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Alert variant="warning">
                    <FaInfoCircle className="me-2" />
                    <strong>Tidak Ada Submission:</strong> Siswa belum mengumpulkan file untuk tugas ini. 
                    Anda masih dapat memberikan penilaian berdasarkan kriteria lain atau observasi.
                  </Alert>
                </Card.Body>
              </Card>
            )
          )}

          {/* Assessment Form */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {isFormLocked ? (
                  <FaLock className="me-2 text-warning" />
                ) : (
                  <FaStar className="me-2" />
                )}
                Formulir Penilaian
                {isFormLocked && (
                  <Badge bg="warning" className="ms-2">
                    Terkunci
                  </Badge>
                )}
              </h5>
              {assessment && (
                isEditing ? (
                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      disabled={saving}
                    >
                      <FaTimesCircle className="me-1" />
                      Batal
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      disabled={saving}
                    >
                      <FaSave className="me-1" />
                      Perbarui Penilaian
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleEditToggle}
                    disabled={saving}
                  >
                    <FaEdit className="me-1" />
                    Ubah Penilaian
                  </Button>
                )
              )}
            </Card.Header>
            <Card.Body>
              {isFormLocked && (
                <Alert variant="info" className="mb-3">
                  <FaInfoCircle className="me-2" />
                  <strong>Penilaian Terkunci:</strong> Penilaian ini sudah disimpan. 
                  Klik "Ubah Penilaian" untuk mengubah skor dan komentar.
                </Alert>
              )}
              <Form onSubmit={handleAssessmentSubmit}>
                {/* Assessment Aspects */}
                <div className="row">
                  {assessmentInfo.aspects.map((aspect, index) => (
                    <div key={aspect.name} className="col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label>
                          {aspect.label}
                          {aspect.weight && (
                            <Badge bg="info" className="ms-2">
                              {aspect.weight}%
                            </Badge>
                          )}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max={aspect.max}
                          value={assessmentForm[aspect.name] || ''}
                          onChange={(e) => handleFormChange(aspect.name, e.target.value)}
                          placeholder={detailedData?.[`${aspect.name}`] ? `Sebelumnya: ${detailedData[`${aspect.name}`]}` : `Masukkan skor (1-${aspect.max})`}
                          required
                          disabled={isFormLocked}
                        />
                        <Form.Text className="text-muted">
                          Rentang skor: 1 - {aspect.max}
                          {isFormLocked && (
                            <span className="text-warning ms-2">
                              <FaLock className="me-1" />
                              Terkunci
                            </span>
                          )}
                        </Form.Text>
                      </Form.Group>
                    </div>
                  ))}
                </div>

                {/* Final Score Display */}
                <Card className="mt-4 mb-4 border-primary">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">
                      <FaCalculator className="me-2" />
                      Perhitungan Skor Akhir
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h4 className="mb-2">Skor Akhir: <Badge bg={getScoreColor(finalScore)} className="fs-4">{finalScore}</Badge></h4>
                        <p className="text-muted mb-0">
                          {assessmentType === 'pre_conference' && 'Perhitungan: Total aspek × 4'}
                          {assessmentType === 'post_conference' && 'Perhitungan: Total aspek × 4'}
                          {assessmentType === 'laporan_pendahuluan' && 'Perhitungan: Rata-rata tertimbang (30% + 30% + 20% + 20%)'}
                          {assessmentType === 'asuhan_keperawatan' && 'Perhitungan: (Total aspek ÷ 40) × 100'}
                          {assessmentType === 'sikap_mahasiswa' && 'Perhitungan: (Total aspek ÷ 80) × 100'}
                          {assessmentType === 'keterampilan_prosedural_klinik_dops' && 'Perhitungan: (Total aspek ÷ 16) × 100'}
                          {assessmentType === 'ujian_klinik' && 'Perhitungan: (Total aspek ÷ 90) × 100'}
                          {assessmentType === 'telaah_artikel_jurnal' && 'Perhitungan: Rata-rata tertimbang sama (20% masing-masing)'}
                          {assessmentType === 'case_report' && 'Perhitungan: Rata-rata tertimbang (50% + 10% + 10% + 30%)'}
                        </p>
                      </div>
                      <div className="col-md-4 text-end">
                        <div className="d-flex align-items-center justify-content-end">
                          <div className="me-3">
                            <small className="text-muted">Rentang Skor:</small>
                            <div>
                              <Badge bg="danger">0-69</Badge>
                              <Badge bg="warning" className="ms-1">70-79</Badge>
                              <Badge bg="info" className="ms-1">80-89</Badge>
                              <Badge bg="success" className="ms-1">90-100</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Comments */}
                <Form.Group className="mb-3">
                  <Form.Label>Komentar & Masukan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={assessmentForm.comments || ''}
                    onChange={(e) => handleFormChange('comments', e.target.value)}
                    placeholder="Berikan masukan detail tentang kinerja siswa..."
                    disabled={isFormLocked}
                  />
                  <Form.Text className="text-muted">
                    Berikan observasi spesifik, kelebihan, area peningkatan, dan rekomendasi
                    {isFormLocked && (
                      <span className="text-warning ms-2">
                        <FaLock className="me-1" />
                        Terkunci
                      </span>
                    )}
                  </Form.Text>
                </Form.Group>

                <Alert variant="info">
                  <FaInfoCircle className="me-2" />
                  <strong>{assessmentInfo.label}:</strong> {assessmentInfo.description}
                </Alert>

                <div className="d-flex justify-content-end gap-2">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={saving || isFormLocked}
                  >
                    <FaSave className="me-1" />
                    {saving ? 'Menyimpan...' : (assessment ? 'Perbarui Penilaian' : 'Simpan Penilaian')}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Already Assessed Message */}
          {assessment && assessment.assessment_id && (
            <Alert variant="success" className="mb-4">
              <FaCheckCircle className="me-2" />
              <strong>Siswa ini sudah dinilai.</strong>
              {" "}
              {assessment.final_score || assessment.nilai_akhir_precon || assessment.nilai_akhir_postcon || assessment.nilai_akhir_lappen || assessment.nilai_akhir_laporan || assessment.nilai_akhir_sikap || assessment.nilai_akhir_dops || assessment.nilai_akhir_klinik || assessment.nilai_akhir_jurnal || assessment.nilai_akhir_casport ? (
                <span>
                  Skor: <Badge bg={getScoreColor(assessment.final_score || assessment.nilai_akhir_precon || assessment.nilai_akhir_postcon || assessment.nilai_akhir_lappen || assessment.nilai_akhir_laporan || assessment.nilai_akhir_sikap || assessment.nilai_akhir_dops || assessment.nilai_akhir_klinik || assessment.nilai_akhir_jurnal || assessment.nilai_akhir_casport)}>
                    {assessment.final_score || assessment.nilai_akhir_precon || assessment.nilai_akhir_postcon || assessment.nilai_akhir_lappen || assessment.nilai_akhir_laporan || assessment.nilai_akhir_sikap || assessment.nilai_akhir_dops || assessment.nilai_akhir_klinik || assessment.nilai_akhir_jurnal || assessment.nilai_akhir_casport}/100
                  </Badge>
                </span>
              ) : null}
            </Alert>
          )}
          {/* Existing Assessment Display */}
          {assessment && (
            <Card className={isEditing ? "border-warning" : "border-success"}>
              <Card.Header className={isEditing ? "bg-warning text-dark" : "bg-success text-white"}>
                <h5 className="mb-0">
                  {isEditing ? (
                    <FaEdit className="me-2" />
                  ) : (
                    <FaCheckCircle className="me-2" />
                  )}
                  {isEditing ? 'Sedang Mengubah Penilaian' : 'Penilaian Saat Ini'}
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Skor Akhir:</strong>
                      <div className="mt-2">
                        <Badge 
                          bg={getScoreColor(assessment.final_score || assessment.nilai_akhir_precon || assessment.nilai_akhir_postcon || assessment.nilai_akhir_lappen || assessment.nilai_akhir_laporan || assessment.nilai_akhir_sikap || assessment.nilai_akhir_dops || assessment.nilai_akhir_klinik || assessment.nilai_akhir_jurnal || assessment.nilai_akhir_casport)} 
                          className="fs-5 px-3 py-2"
                        >
                          {assessment.final_score || assessment.nilai_akhir_precon || assessment.nilai_akhir_postcon || assessment.nilai_akhir_lappen || assessment.nilai_akhir_laporan || assessment.nilai_akhir_sikap || assessment.nilai_akhir_dops || assessment.nilai_akhir_klinik || assessment.nilai_akhir_jurnal || assessment.nilai_akhir_casport}/100
                        </Badge>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Tanggal Penilaian:</strong>
                      <p className="mb-1">{new Date(assessment.assessment_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Dinilai Oleh:</strong>
                      <p className="mb-1">{assessment.assessor_name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Komentar:</strong>
                      <p className="mb-1">{assessment.comments || 'Tidak ada komentar'}</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFormPage;