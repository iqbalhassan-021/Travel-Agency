import React from 'react';

const stats = [
  {
    icon: 'fas fa-globe-asia',
    number: 25,
    label: 'Countries Served',
  },
  {
    icon: 'fas fa-percentage',
    number: 98,
    label: 'Success Rate',
    suffix: '%',
  },
  {
    icon: 'fas fa-check-circle',
    number: 1200,
    label: 'Approved Visas',
  },
  {
    icon: 'fas fa-smile',
    number: 3000,
    label: 'Happy Clients',
  },
];

const StatsCounter = () => {
  return (
    <section className="stats-section">
        
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-box" key={index}>
            <i className={`stat-icon ${stat.icon}`}></i>
            <h3 className="stat-number">
              {stat.number}
              {stat.suffix || ''}
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Inline basic styles - You can move these to a CSS/SCSS file */}
      <style jsx>{`
        .stats-section {
          padding: 4rem 1rem;
          text-align: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: auto;
        }
        .stat-box {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
            width:100%;
        }
        .stat-icon {
          font-size: 2rem;
          color: maroon;
          margin-bottom: 0.5rem;
        }
        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          margin: 0;
        }
        .stat-label {
          font-size: 1rem;
          color: #555;
        }
      `}</style>
    </section>
  );
};

export default StatsCounter;
