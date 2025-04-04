// This is a mock API service for demonstration purposes
// In a real application, this would make actual HTTP requests to your backend

// Mock data
const mockTenders = [
  {
    id: 'TEN-2023-001',
    title: 'Office Renovation Project',
    description: 'Complete renovation of the main office building including electrical, plumbing, and interior design work.',
    status: 'active',
    category: 'Construction',
    value: 250000,
    publishDate: '2023-01-15',
    deadline: '2023-12-30',
    daysRemaining: 45,
    createdAt: '2023-01-10',
    createdBy: 'John Smith',
    requirements: [
      'Minimum 5 years of experience in commercial renovation',
      'Valid business license and insurance',
      'Ability to complete the project within 3 months',
      'Compliance with local building codes and regulations'
    ],
    documents: [
      { id: 'doc-1', name: 'Tender Specifications.pdf', size: '2.4 MB', uploadedAt: '2023-01-10' },
      { id: 'doc-2', name: 'Floor Plans.pdf', size: '5.1 MB', uploadedAt: '2023-01-10' },
      { id: 'doc-3', name: 'Legal Requirements.docx', size: '1.2 MB', uploadedAt: '2023-01-10' }
    ],
    bids: [
      { 
        id: 'bid-1', 
        bidder: 'ABC Construction', 
        company: 'ABC Construction Ltd.',
        amount: 245000, 
        submittedAt: '2023-01-20', 
        status: 'pending' 
      },
      { 
        id: 'bid-2', 
        bidder: 'BuildRight Inc', 
        company: 'BuildRight Incorporated',
        amount: 230000, 
        submittedAt: '2023-01-22', 
        status: 'pending' 
      }
    ],
    timeline: [
      { type: 'published', date: '2023-01-15', description: 'Tender published' },
      { type: 'updated', date: '2023-01-18', description: 'Updated specifications' },
      { type: 'deadline', date: '2023-12-30', description: 'Submission deadline' }
    ],
    contact: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Facilities Management'
    }
  },
  {
    id: 'TEN-2023-002',
    title: 'IT Infrastructure Upgrade',
    description: 'Comprehensive upgrade of company IT infrastructure including servers, networking equipment, and workstations.',
    status: 'active',
    category: 'IT Services',
    value: 180000,
    publishDate: '2023-02-10',
    deadline: '2023-12-15',
    daysRemaining: 30,
    createdAt: '2023-02-05',
    createdBy: 'Emily Chen',
    requirements: [
      'Certified IT professionals with relevant qualifications',
      'Experience with enterprise-level infrastructure deployment',
      'Ability to provide ongoing support and maintenance',
      '24/7 emergency support capability'
    ],
    documents: [
      { id: 'doc-4', name: 'Technical Requirements.pdf', size: '3.2 MB', uploadedAt: '2023-02-05' },
      { id: 'doc-5', name: 'Current Infrastructure.xlsx', size: '1.8 MB', uploadedAt: '2023-02-05' }
    ],
    bids: [
      { 
        id: 'bid-3', 
        bidder: 'TechSolutions', 
        company: 'TechSolutions Inc.',
        amount: 175000, 
        submittedAt: '2023-02-15', 
        status: 'pending' 
      }
    ],
    timeline: [
      { type: 'published', date: '2023-02-10', description: 'Tender published' },
      { type: 'deadline', date: '2023-12-15', description: 'Submission deadline' }
    ],
    contact: {
      name: 'Michael Wong',
      email: 'michael.wong@company.com',
      phone: '+1 (555) 987-6543',
      department: 'Information Technology'
    }
  },
  {
    id: 'TEN-2023-003',
    title: 'Medical Equipment Supply',
    description: 'Supply of various medical equipment for the new hospital wing including diagnostic equipment, patient monitoring systems, and surgical tools.',
    status: 'closed',
    category: 'Medical Supplies',
    value: 500000,
    publishDate: '2023-03-01',
    deadline: '2023-04-15',
    daysRemaining: 0,
    createdAt: '2023-02-25',
    createdBy: 'Dr. Robert Miller',
    requirements: [
      'FDA approved medical equipment',
      'Minimum 2-year warranty on all equipment',
      'Installation and staff training included',
      'Compliance with hospital safety standards'
    ],
    documents: [
      { id: 'doc-6', name: 'Equipment Specifications.pdf', size: '4.5 MB', uploadedAt: '2023-02-25' },
      { id: 'doc-7', name: 'Compliance Requirements.pdf', size: '2.1 MB', uploadedAt: '2023-02-25' }
    ],
    bids: [
      { 
        id: 'bid-4', 
        bidder: 'MedSupply Co', 
        company: 'Medical Supply Company',
        amount: 495000, 
        submittedAt: '2023-03-10', 
        status: 'accepted' 
      },
      { 
        id: 'bid-5', 
        bidder: 'HealthTech', 
        company: 'HealthTech Solutions',
        amount: 510000, 
        submittedAt: '2023-03-12', 
        status: 'rejected' 
      }
    ],
    timeline: [
      { type: 'published', date: '2023-03-01', description: 'Tender published' },
      { type: 'deadline', date: '2023-04-15', description: 'Submission deadline' },
      { type: 'completed', date: '2023-04-30', description: 'Tender awarded to MedSupply Co' }
    ],
    contact: {
      name: 'Dr. Lisa Park',
      email: 'lisa.park@hospital.org',
      phone: '+1 (555) 456-7890',
      department: 'Medical Procurement'
    }
  }
];

const mockBids = [
  { 
    id: 'bid-1', 
    tenderTitle: 'Office Renovation Project',
    tenderId: 'TEN-2023-001',
    amount: 245000, 
    submittedAt: '2023-01-20', 
    status: 'pending' 
  },
  { 
    id: 'bid-3', 
    tenderTitle: 'IT Infrastructure Upgrade',
    tenderId: 'TEN-2023-002',
    amount: 175000, 
    submittedAt: '2023-02-15', 
    status: 'pending' 
  },
  { 
    id: 'bid-4', 
    tenderTitle: 'Medical Equipment Supply',
    tenderId: 'TEN-2023-003',
    amount: 495000, 
    submittedAt: '2023-03-10', 
    status: 'accepted' 
  },
  { 
    id: 'bid-5', 
    tenderTitle: 'Medical Equipment Supply',
    tenderId: 'TEN-2023-003',
    amount: 510000, 
    submittedAt: '2023-03-12', 
    status: 'rejected' 
  }
];

// API functions
export const getTenderStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeTenders: 2,
        pendingBids: 3,
        totalValue: 930000,
        closingSoon: 1
      });
    }, 500);
  });
};

export const getRecentTenders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTenders);
    }, 500);
  });
};

export const getRecentBids = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBids);
    }, 500);
  });
};

export const getAllTenders = (page, searchTerm, status, category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTenders = [...mockTenders];
      
      // Apply filters
      if (searchTerm) {
        filteredTenders = filteredTenders.filter(tender => 
          tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tender.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tender.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (status && status !== 'all') {
        filteredTenders = filteredTenders.filter(tender => tender.status === status);
      }
      
      if (category && category !== 'all') {
        filteredTenders = filteredTenders.filter(tender => 
          tender.category.toLowerCase() === category.replace('-', ' ')
        );
      }
      
      resolve({
        tenders: filteredTenders,
        totalPages: 1
      });
    }, 500);
  });
};

export const getTenderById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tender = mockTenders.find(t => t.id === id);
      if (tender) {
        resolve(tender);
      } else {
        reject(new Error('Tender not found'));
      }
    }, 500);
  });
};

export const createTender = (tenderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTender = {
        id: `TEN-2023-${mockTenders.length + 1}`.padStart(10, '0'),
        ...tenderData,
        createdAt: new Date().toISOString().split('T')[0],
        bids: [],
        timeline: [
          { type: 'published', date: new Date().toISOString().split('T')[0], description: 'Tender published' },
          { type: 'deadline', date: tenderData.deadline, description: 'Submission deadline' }
        ]
      };
      
      mockTenders.push(newTender);
      resolve(newTender);
    }, 500);
  });
};

export const updateTender = (id, tenderData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTenders.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTenders[index] = {
          ...mockTenders[index],
          ...tenderData,
          timeline: [
            ...mockTenders[index].timeline,
            { type: 'updated', date: new Date().toISOString().split('T')[0], description: 'Tender updated' }
          ]
        };
        resolve(mockTenders[index]);
      } else {
        reject(new Error('Tender not found'));
      }
    }, 500);
  });
};

export const deleteTender = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTenders.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTenders.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error('Tender not found'));
      }
    }, 500);
  });
};

export const submitBid = (tenderId, bidData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tender = mockTenders.find(t => t.id === tenderId);
        if (tender) {
          const newBid = {
            id: `bid-${mockBids.length + 1}`,
            tenderId,
            tenderTitle: tender.title,
            ...bidData,
            submittedAt: new Date().toISOString().split('T')[0],
            status: 'pending'
          };
          
          tender.bids.push(newBid);
          mockBids.push(newBid);
          resolve(newBid);
        } else {
          reject(new Error('Tender not found'));
        }
      }, 500);
    });
  };