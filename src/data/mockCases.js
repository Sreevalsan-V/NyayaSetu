// Mock case data
export const MOCK_CASES = [
  {
    id: 1,
    caseNumber: 'CRL/2024/001',
    title: 'State vs. Kumar',
    type: 'Criminal',
    status: 'Active',
    nextHearing: '2026-02-15',
    client: 'Rajesh Kumar',
    court: 'Delhi District Court',
    sections: [
      { id: 1, name: 'FIR Copy', files: [] },
      { id: 2, name: 'Charge Sheet', files: [] },
      { id: 3, name: 'Evidence Documents', files: [] },
      { id: 4, name: 'Witness Statements', files: [] }
    ]
  },
  {
    id: 2,
    caseNumber: 'CIV/2024/045',
    title: 'Sharma vs. Builder Corp',
    type: 'Civil',
    status: 'Active',
    nextHearing: '2026-02-20',
    client: 'Priya Sharma',
    court: 'Mumbai High Court',
    sections: [
      { id: 1, name: 'Plaint', files: [] },
      { id: 2, name: 'Sale Agreement', files: [] },
      { id: 3, name: 'Property Documents', files: [] },
      { id: 4, name: 'Correspondence', files: [] }
    ]
  },
  {
    id: 3,
    caseNumber: 'FAM/2024/012',
    title: 'Divorce Petition - Reddy',
    type: 'Family',
    status: 'Pending',
    nextHearing: '2026-03-01',
    client: 'Meera Reddy',
    court: 'Bangalore Family Court',
    sections: [
      { id: 1, name: 'Petition', files: [] },
      { id: 2, name: 'Marriage Certificate', files: [] },
      { id: 3, name: 'Financial Documents', files: [] },
      { id: 4, name: 'Settlement Proposal', files: [] }
    ]
  }
];
