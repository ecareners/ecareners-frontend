// Mock data for SOPs (temporary until backend is ready)
export const mockSOPsData = [
  {
    sop_id: 1,
    title: 'Standard Operating Procedure for User Registration',
    url: 'https://example.com/sop/user-registration'
  },
  {
    sop_id: 2,
    title: 'SOP for Password Reset Process',
    url: 'https://example.com/sop/password-reset'
  },
  {
    sop_id: 3,
    title: 'Standard Operating Procedure for Data Backup',
    url: 'https://example.com/sop/data-backup'
  },
  {
    sop_id: 4,
    title: 'SOP for System Maintenance',
    url: 'https://example.com/sop/system-maintenance'
  },
  {
    sop_id: 5,
    title: 'Standard Operating Procedure for User Authentication',
    url: 'https://example.com/sop/user-authentication'
  },
  {
    sop_id: 6,
    title: 'SOP for Database Management',
    url: 'https://example.com/sop/database-management'
  },
  {
    sop_id: 7,
    title: 'Standard Operating Procedure for API Integration',
    url: 'https://example.com/sop/api-integration'
  },
  {
    sop_id: 8,
    title: 'SOP for Security Protocols',
    url: 'https://example.com/sop/security-protocols'
  },
  {
    sop_id: 9,
    title: 'Standard Operating Procedure for Testing Procedures',
    url: 'https://example.com/sop/testing-procedures'
  },
  {
    sop_id: 10,
    title: 'SOP for Deployment Process',
    url: 'https://example.com/sop/deployment-process'
  },
  {
    sop_id: 11,
    title: 'Standard Operating Procedure for Code Review',
    url: 'https://example.com/sop/code-review'
  },
  {
    sop_id: 12,
    title: 'SOP for Incident Response',
    url: 'https://example.com/sop/incident-response'
  }
];

// Mock function to simulate database fetch
export const fetchMockSOPs = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockSOPsData;
}; 