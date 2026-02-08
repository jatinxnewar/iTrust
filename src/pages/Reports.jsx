import React, { useState } from 'react';
import { bloodReports } from '../data/mockData';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const filteredReports = filterType === 'all' 
    ? bloodReports 
    : bloodReports.filter(r => r.type.toLowerCase().includes(filterType));

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Medical Reports</h1>
          <p className="page-subtitle">View and manage all your lab tests and medical reports</p>
        </div>
        <button className="btn-primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Upload New Report
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          onClick={() => setFilterType('all')}
          className={`tab-btn ${filterType === 'all' ? 'active' : ''}`}
        >
          All Reports
        </button>
        <button 
          onClick={() => setFilterType('blood')}
          className={`tab-btn ${filterType === 'blood' ? 'active' : ''}`}
        >
          Blood Tests
        </button>
        <button 
          onClick={() => setFilterType('imaging')}
          className={`tab-btn ${filterType === 'imaging' ? 'active' : ''}`}
        >
          Imaging
        </button>
        <button 
          onClick={() => setFilterType('other')}
          className={`tab-btn ${filterType === 'other' ? 'active' : ''}`}
        >
          Other
        </button>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        {filteredReports.map((report, idx) => (
          <div 
            key={idx} 
            className="report-card"
            onClick={() => setSelectedReport(report)}
          >
            <div className="report-header">
              <div className="report-icon">
                <img 
                  src={`https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop`} 
                  alt={report.type}
                />
              </div>
              <div className="report-badge">{report.status}</div>
            </div>
            <div className="report-body">
              <h3 className="report-title">{report.type}</h3>
              <p className="report-date">{report.date}</p>
              <div className="report-metrics">
                {report.details && Object.entries(report.details).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="report-metric">
                    <span className="detail-label">{key}</span>
                    <span className="detail-value">{value.value} {value.unit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="report-footer">
              <button className="report-action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                View Details
              </button>
              <button className="report-action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M2 8l6 6 6-6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedReport.type} - Detailed Report</h3>
              <button className="modal-close" onClick={() => setSelectedReport(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="report-detail-grid">
                <div className="detail-section">
                  <h4>Test Information</h4>
                  <div className="detail-item">
                    <span className="detail-label">Test Date:</span>
                    <span className="detail-value">{selectedReport.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-badge ${selectedReport.status.toLowerCase()}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Lab:</span>
                    <span className="detail-value">Apollo Diagnostics</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Test Results</h4>
                  {selectedReport.details && Object.entries(selectedReport.details).map(([key, value]) => (
                    <div key={key} className="detail-item">
                      <span className="detail-label">{key}:</span>
                      <span className="detail-value strong">{value.value} {value.unit}</span>
                    </div>
                  ))}
                </div>

                <div className="detail-section full-width">
                  <h4>Doctor's Notes</h4>
                  <p className="detail-notes">
                    Results are within normal range. Continue with current medication. 
                    Follow-up recommended in 3 months. Maintain healthy diet and regular exercise.
                  </p>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-secondary">Share Report</button>
                <button className="btn-primary">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
