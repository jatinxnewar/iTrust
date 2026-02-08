export const healthMetrics = {
  steps: {
    current: 2403,
    goal: 10000,
    trend: '+12%',
    icon: null,
  },
  heartRate: {
    current: 72,
    unit: 'bpm',
    status: 'Normal',
    trend: 'stable',
    icon: null,
  },
  spo2: {
    current: 98,
    unit: '%',
    status: 'Normal',
    icon: null,
  },
  bodyTemp: {
    current: 98.6,
    unit: 'Â°F',
    status: 'Normal',
    icon: null,
  },
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    unit: 'mmHg',
    status: 'Normal',
    icon: null,
  },
  sleepCycle: {
    hours: 7.5,
    quality: 'Good',
    deepSleep: 2.5,
    remSleep: 1.8,
    icon: null,
  },
  caloriesBurned: {
    current: 1850,
    goal: 2200,
    percentage: 84,
    icon: null,
  },
};

export const ecgData = {
  reading: 'Normal Sinus Rhythm',
  bpm: 72,
  date: '2025-02-07',
  status: 'Normal',
  waveform: [0, 0.2, 0.8, 0.3, 0.1, -0.3, 0.2, 0.4, 0.6, 0.3],
};

export const nutritionStatus = {
  calories: { consumed: 1650, goal: 2000, unit: 'kcal' },
  protein: { consumed: 65, goal: 80, unit: 'g' },
  carbs: { consumed: 180, goal: 250, unit: 'g' },
  fats: { consumed: 45, goal: 60, unit: 'g' },
  water: { consumed: 6, goal: 8, unit: 'glasses' },
  fiber: { consumed: 22, goal: 30, unit: 'g' },
};

export const bloodReports = [
  {
    id: 1,
    date: '2025-02-01',
    month: 'Feb 2025',
    type: 'Complete Blood Count (CBC)',
    status: 'Normal',
    image: 'ðŸ©¸',
    details: {
      Hemoglobin: { value: 14.5, unit: 'g/dL', normal: '13.5-17.5' },
      WBC: { value: 7200, unit: '/Î¼L', normal: '4000-11000' },
      Platelets: { value: 250000, unit: '/Î¼L', normal: '150000-400000' },
      RBC: { value: 5.2, unit: 'million/Î¼L', normal: '4.5-5.5' },
    }
  },
  {
    id: 2,
    date: '2025-01-15',
    month: 'Jan 2025',
    type: 'Lipid Profile',
    status: 'Normal',
    image: 'ðŸ“Š',
    details: {
      'Total Cholesterol': { value: 180, unit: 'mg/dL', normal: '<200' },
      'LDL Cholesterol': { value: 100, unit: 'mg/dL', normal: '<100' },
      'HDL Cholesterol': { value: 55, unit: 'mg/dL', normal: '>40' },
      Triglycerides: { value: 120, unit: 'mg/dL', normal: '<150' },
    }
  },
  {
    id: 3,
    date: '2024-12-20',
    month: 'Dec 2024',
    type: 'Thyroid Function Test',
    status: 'Normal',
    image: 'ðŸ”¬',
    details: {
      'TSH': { value: 2.5, unit: 'mIU/L', normal: '0.5-5.0' },
      'T3': { value: 1.2, unit: 'ng/mL', normal: '0.8-2.0' },
      'T4': { value: 8.5, unit: 'Î¼g/dL', normal: '5.0-12.0' },
    }
  },
  {
    id: 4,
    date: '2024-12-01',
    month: 'Dec 2024',
    type: 'Kidney Function Test',
    status: 'Normal',
    image: 'ðŸ’§',
    details: {
      Creatinine: { value: 0.9, unit: 'mg/dL', normal: '0.7-1.3' },
      'Blood Urea': { value: 25, unit: 'mg/dL', normal: '7-20' },
      'Uric Acid': { value: 5.2, unit: 'mg/dL', normal: '3.5-7.2' },
    }
  },
  {
    id: 5,
    date: '2024-11-10',
    month: 'Nov 2024',
    type: 'Liver Function Test',
    status: 'Normal',
    image: 'ðŸ§¬',
    details: {
      'SGPT/ALT': { value: 32, unit: 'U/L', normal: '7-56' },
      'SGOT/AST': { value: 28, unit: 'U/L', normal: '5-40' },
      Bilirubin: { value: 0.8, unit: 'mg/dL', normal: '0.3-1.2' },
    }
  },
  {
    id: 6,
    date: '2024-10-25',
    month: 'Oct 2024',
    type: 'HbA1c (Diabetes)',
    status: 'Normal',
    image: 'ðŸ©º',
    details: {
      'HbA1c': { value: 5.4, unit: '%', normal: '<5.7' },
      'Fasting Glucose': { value: 92, unit: 'mg/dL', normal: '70-100' },
      'Random Glucose': { value: 125, unit: 'mg/dL', normal: '<140' },
    }
  },
];

export const doctorInfo = {
  name: 'Dr. Rajesh Kumar',
  specialty: 'Internal Medicine',
  license: 'MD, MBBS, MRCP',
  experience: '15 years',
  rating: 4.9,
  availability: 'Available',
  image: 'ðŸ‘¨â€âš•ï¸',
  nextAppointment: '2025-02-15, 10:00 AM',
  hospital: 'Apollo Hospitals, Mumbai',
};

export const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    credentials: 'MBBS, MD - General Medicine',
    specialty: 'General Physician',
    experience: '15 years',
    rating: 4.9,
    patients: '2500+',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    about: 'Specialized in preventive medicine and chronic disease management with extensive experience in treating complex medical conditions.',
    education: ['MBBS - AIIMS Delhi', 'MD Internal Medicine - PGI Chandigarh', 'Fellowship in Diabetes - USA'],
    languages: ['English', 'Hindi', 'Punjabi']
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    credentials: 'MBBS, DM - Cardiology',
    specialty: 'Cardiologist',
    experience: '18 years',
    rating: 4.9,
    patients: '3200+',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    about: 'Expert in interventional cardiology with focus on preventive cardiac care and advanced heart disease treatment.',
    education: ['MBBS - Maulana Azad Medical College', 'DM Cardiology - SGPGIMS', 'Training in Interventional Cardiology - UK'],
    languages: ['English', 'Hindi', 'Marathi']
  },
  {
    id: 3,
    name: 'Dr. Anita Patel',
    credentials: 'MBBS, MD - Pediatrics',
    specialty: 'Pediatrician',
    experience: '12 years',
    rating: 4.8,
    patients: '1800+',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    about: 'Compassionate pediatrician specializing in child development, immunization, and neonatal care.',
    education: ['MBBS - Grant Medical College', 'MD Pediatrics - KEM Hospital', 'Fellowship in Neonatology'],
    languages: ['English', 'Hindi', 'Gujarati']
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    credentials: 'MBBS, MD - Dermatology',
    specialty: 'Dermatologist',
    experience: '10 years',
    rating: 4.7,
    patients: '2100+',
    availability: 'Available Tomorrow',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    about: 'Skin specialist with expertise in cosmetic dermatology, laser treatments, and dermatological surgery.',
    education: ['MBBS - Armed Forces Medical College', 'MD Dermatology - AFMC Pune', 'Advanced Laser Training - Singapore'],
    languages: ['English', 'Hindi', 'Tamil']
  },
  {
    id: 5,
    name: 'Dr. Sunita Reddy',
    credentials: 'MBBS, MS - Orthopedics',
    specialty: 'Orthopedic Surgeon',
    experience: '14 years',
    rating: 4.9,
    patients: '2800+',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    about: 'Orthopedic surgeon specializing in joint replacement, sports injuries, and arthroscopic procedures.',
    education: ['MBBS - Osmania Medical College', 'MS Orthopedics - Nizam Institute', 'Fellowship in Joint Replacement - Australia'],
    languages: ['English', 'Hindi', 'Telugu']
  },
  {
    id: 6,
    name: 'Dr. Arjun Malhotra',
    credentials: 'MBBS, DM - Neurology',
    specialty: 'Neurologist',
    experience: '16 years',
    rating: 4.8,
    patients: '2400+',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    about: 'Neurologist with expertise in stroke management, epilepsy treatment, and movement disorders.',
    education: ['MBBS - CMC Vellore', 'DM Neurology - NIMHANS Bangalore', 'Stroke Fellowship - Mayo Clinic'],
    languages: ['English', 'Hindi', 'Bengali']
  },
];

export const aiInsights = [
  {
    type: 'warning',
    priority: 'medium',
    message: 'Your daily step count is below average this week. Consider increasing physical activity.',
    date: '2025-02-07',
  },
  {
    type: 'success',
    priority: 'low',
    message: 'Great sleep quality detected! Your sleep cycle shows consistent deep sleep patterns.',
    date: '2025-02-06',
  },
  {
    type: 'info',
    priority: 'high',
    message: 'Nutrition analysis suggests increasing protein intake by 15g daily for optimal health.',
    date: '2025-02-05',
  },
];

export const medicineDiary = [
  {
    id: 1,
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once daily',
    time: '9:00 AM',
    taken: true,
  },
  {
    id: 2,
    name: 'Omega-3',
    dosage: '1000 mg',
    frequency: 'Twice daily',
    time: '9:00 AM, 9:00 PM',
    taken: true,
  },
  {
    id: 3,
    name: 'Multivitamin',
    dosage: '1 tablet',
    frequency: 'Once daily',
    time: '8:00 AM',
    taken: false,
  },
];

export const platformFeatures = [
  {
    title: 'Smart Health Tracking',
    description: 'Seamlessly monitor vital parameters through smartwatch integration including heart rate, SPO2, sleep cycles, and daily activity.',
    icon: null,
  },
  {
    title: 'Nutrition Analysis',
    description: 'AI-powered food intake analysis tracking calories, macros, and micronutrients for optimal dietary planning.',
    icon: null,
  },
  {
    title: 'Blood Report Integration',
    description: 'Upload and analyze blood reports with AI insights to track trends and identify potential health concerns early.',
    icon: null,
  },
  {
    title: 'Predictive Health AI',
    description: 'Advanced machine learning models predict potential health risks, enabling preventive care and early intervention.',
    icon: null,
  },
  {
    title: 'Dedicated Doctor Access',
    description: 'Monthly consultation with licensed physicians for personalized medical guidance and professional support.',
    icon: null,
  },
  {
    title: 'Medicine Management',
    description: 'Track medications, set reminders, and maintain a comprehensive diary of your treatment regimen.',
    icon: null,
  },
];

export const healthTips = [
  {
    id: 1,
    category: 'Hydration',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to maintain optimal body functions',
    priority: 'high'
  },
  {
    id: 2,
    category: 'Exercise',
    title: 'Daily Movement',
    description: '30 minutes of moderate exercise can significantly improve cardiovascular health',
    priority: 'high'
  },
  {
    id: 3,
    category: 'Sleep',
    title: 'Quality Sleep',
    description: 'Maintain 7-8 hours of sleep for better immune function and mental clarity',
    priority: 'medium'
  },
  {
    id: 4,
    category: 'Nutrition',
    title: 'Balanced Diet',
    description: 'Include variety of fruits and vegetables for essential vitamins and minerals',
    priority: 'high'
  }
];

export const recentActivity = [
  {
    id: 1,
    type: 'checkup',
    title: 'General Checkup Completed',
    doctor: 'Dr. Priya Sharma',
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'completed'
  },
  {
    id: 2,
    type: 'report',
    title: 'Blood Test Results Uploaded',
    testName: 'Complete Blood Count',
    date: '2024-01-12',
    time: '2:15 PM',
    status: 'reviewed'
  },
  {
    id: 3,
    type: 'medicine',
    title: 'Medicine Refill Reminder',
    medicine: 'Metformin 500mg',
    date: '2024-01-10',
    time: '9:00 AM',
    status: 'pending'
  },
  {
    id: 4,
    type: 'appointment',
    title: 'Upcoming Cardiology Consultation',
    doctor: 'Dr. Vikram Singh',
    date: '2024-01-20',
    time: '11:00 AM',
    status: 'scheduled'
  },
  {
    id: 5,
    type: 'exercise',
    title: 'Weekly Exercise Goal Achieved',
    details: '150 minutes of moderate activity',
    date: '2024-01-14',
    time: '6:00 PM',
    status: 'completed'
  }
];

export const achievements = [
  {
    id: 1,
    title: '7-Day Streak',
    description: 'Logged health metrics for 7 consecutive days',
    icon: null,
    earnedDate: '2024-01-15',
    category: 'consistency'
  },
  {
    id: 2,
    title: 'Step Master',
    description: 'Achieved 10,000 steps for 5 days straight',
    icon: null,
    earnedDate: '2024-01-10',
    category: 'fitness'
  },
  {
    id: 3,
    title: 'Medicine Adherence',
    description: 'Perfect medication compliance for 30 days',
    icon: null,
    earnedDate: '2024-01-08',
    category: 'health'
  },
  {
    id: 4,
    title: 'Health Champion',
    description: 'Completed all recommended health checkups',
    icon: null,
    earnedDate: '2024-01-05',
    category: 'checkup'
  }
];

export const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Vikram Singh',
    specialty: 'Cardiology',
    date: '2024-01-20',
    time: '11:00 AM',
    type: 'Follow-up',
    location: 'Fortis Hospital, Sector 62'
  },
  {
    id: 2,
    doctor: 'Dr. Anita Patel',
    specialty: 'Endocrinology',
    date: '2024-01-25',
    time: '3:30 PM',
    type: 'Routine Checkup',
    location: 'Max Hospital, Noida'
  },
  {
    id: 3,
    doctor: 'Dr. Sunita Reddy',
    specialty: 'Orthopedics',
    date: '2024-02-01',
    time: '10:00 AM',
    type: 'Consultation',
    location: 'Apollo Hospital, Delhi'
  }
];

