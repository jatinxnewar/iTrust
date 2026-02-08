import React, { useState } from 'react';
import { doctors } from '../data/mockData';

const Consultations = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = ['all', 'General Physician', 'Cardiologist', 'Pediatrician', 'Dermatologist', 'Orthopedic'];

  const filteredDoctors = selectedSpecialty === 'all'
    ? doctors
    : doctors.filter(d => d.specialty === selectedSpecialty);

  const upcomingConsultations = [
    {
      doctor: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      date: '2025-02-15',
      time: '10:00 AM',
      type: 'Video Call',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
    },
    {
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      date: '2025-02-18',
      time: '2:30 PM',
      type: 'In-Person',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="consultations-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Consultations</h1>
          <p className="page-subtitle">Connect with healthcare professionals</p>
        </div>
      </div>

      {/* Upcoming Consultations */}
      <div className="section-container">
        <h2 className="section-title">Upcoming Appointments</h2>
        <div className="consultations-list">
          {upcomingConsultations.map((consult, idx) => (
            <div key={idx} className="consultation-card upcoming">
              <div className="consult-image">
                <img src={consult.image} alt={consult.doctor} />
              </div>
              <div className="consult-info">
                <h3 className="consult-doctor">{consult.doctor}</h3>
                <p className="consult-specialty">{consult.specialty}</p>
                <div className="consult-details">
                  <span className="consult-date">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="4" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 6h10M6 2v2M10 2v2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {consult.date}
                  </span>
                  <span className="consult-time">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {consult.time}
                  </span>
                  <span className="consult-type">{consult.type}</span>
                </div>
              </div>
              <div className="consult-actions">
                <button className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button className="btn-primary small">Join Call</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="section-container">
        <h2 className="section-title">Book New Consultation</h2>
        <div className="specialty-filters">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`specialty-chip ${selectedSpecialty === spec ? 'active' : ''}`}
            >
              {spec === 'all' ? 'All Specialties' : spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {filteredDoctors.map((doctor, idx) => (
          <div key={idx} className="doctor-card">
            <div className="doctor-image-container">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <div className="doctor-status online"></div>
            </div>
            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-credentials">{doctor.credentials}</p>
              <p className="doctor-specialty">{doctor.specialty}</p>
              
              <div className="doctor-stats">
                <div className="stat">
                  <span className="stat-value">{doctor.experience}</span>
                  <span className="stat-label">Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{doctor.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{doctor.patients}</span>
                  <span className="stat-label">Patients</span>
                </div>
              </div>

              <div className="doctor-availability">
                <span className="availability-badge available">
                  Available {doctor.availability}
                </span>
              </div>

              <div className="doctor-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  View Profile
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setShowBooking(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && !showBooking && (
        <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Doctor Profile</h3>
              <button className="modal-close" onClick={() => setSelectedDoctor(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="doctor-profile">
                <div className="profile-header">
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} className="profile-image" />
                  <div className="profile-info">
                    <h2>{selectedDoctor.name}</h2>
                    <p className="profile-credentials">{selectedDoctor.credentials}</p>
                    <p className="profile-specialty">{selectedDoctor.specialty}</p>
                    <div className="profile-rating">
                      <span className="rating-stars">★★★★★</span>
                      <span>{selectedDoctor.rating} ({selectedDoctor.patients} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="detail-section">
                    <h4>About</h4>
                    <p>{selectedDoctor.about}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Education</h4>
                    <ul className="education-list">
                      {selectedDoctor.education.map((edu, i) => (
                        <li key={i}>{edu}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>Languages</h4>
                    <div className="language-tags">
                      {selectedDoctor.languages.map((lang, i) => (
                        <span key={i} className="language-tag">{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-primary large" onClick={() => setShowBooking(true)}>
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && selectedDoctor && (
        <div className="modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Book Appointment with {selectedDoctor.name}</h3>
              <button className="modal-close" onClick={() => setShowBooking(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="booking-form">
                <div className="form-group">
                  <label>Consultation Type</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="type" value="video" defaultChecked />
                      <span>Video Consultation</span>
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="type" value="inperson" />
                      <span>In-Person Visit</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Date</label>
                  <input type="date" className="form-input" min="2025-02-08" />
                </div>

                <div className="form-group">
                  <label>Select Time</label>
                  <div className="time-slots">
                    <button type="button" className="time-slot">09:00 AM</button>
                    <button type="button" className="time-slot">10:00 AM</button>
                    <button type="button" className="time-slot active">11:00 AM</button>
                    <button type="button" className="time-slot">02:00 PM</button>
                    <button type="button" className="time-slot">03:00 PM</button>
                    <button type="button" className="time-slot">04:00 PM</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Visit</label>
                  <textarea className="form-input" rows="3" placeholder="Describe your symptoms or reason for consultation..."></textarea>
                </div>

                <div className="booking-summary">
                  <div className="summary-item">
                    <span>Consultation Fee</span>
                    <span className="fee">₹500</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total</span>
                    <span className="fee">₹500</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary large">Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultations;
