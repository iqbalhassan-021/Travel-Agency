import React from 'react';

const visas = [
  { flag: '🇦🇺', country: 'Australia', price: 'PKR 60,000' },
  { flag: '🇨🇦', country: 'Canada', price: 'PKR 60,000' },
  { flag: '🇬🇷', country: 'Greece', price: 'PKR 49,500' },
  { flag: '🇲🇾', country: 'Malaysia', price: 'PKR 16,000' },
  { flag: '🇹🇭', country: 'Thailand', price: 'PKR 19,900' },
  { flag: '🇬🇧', country: 'United Kingdom', price: 'PKR 85,000' },
  { flag: '🇦🇿', country: 'Azerbaijan', price: 'PKR 13,000' },
  { flag: '🇪🇬', country: 'Egypt', price: 'PKR 18,000' },
  { flag: '🇭🇰', country: 'Hong Kong', price: 'PKR 49,500' },
  { flag: '🇸🇬', country: 'Singapore', price: 'PKR 21,000' },
  { flag: '🇦🇪', country: 'UAE 30 Days', price: 'PKR 30,400' },
  { flag: '🇺🇸', country: 'USA', price: 'PKR 50,000' },
];

const TrendingVisas = () => {
  const firstColumn = visas.slice(0, 6);
  const secondColumn = visas.slice(6);

  return (
    <section className="visa-section">
      <h2 className="section-title">Trending Visas</h2>
      <div className="visa-grid">
        {[firstColumn, secondColumn].map((column, i) => (
          <div className="visa-column" key={i}>
            {column.map((visa, index) => (
              <div className="visa-item" key={index}>
                <span className="flag">{visa.flag}</span>
                <div className="visa-info">
                  <span className="country">{visa.country}</span>
                  <span className="price">{visa.price}</span>
                </div>
                <span className="arrow">›</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <br></br>
      <h2 className="section-title">View All Visas</h2>
      <style jsx>{`
        .visa-section {
          padding: 2rem 1rem;
          text-align: center;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 2rem;
          color: maroon;
        }

        .visa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .visa-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .visa-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #ddd;
        }

        .flag {
          font-size: 1.5rem;
          margin-right: 0.8rem;
        }

        .visa-info {
          flex-grow: 1;
          text-align: left;
        }

        .country {
          display: block;
          font-weight: 600;
          color: #000;
        }

        .price {
          font-size: 0.9rem;
          color: maroon;
        }

        .arrow {
          font-size: 1.2rem;
          color: #555;
        }
      `}</style>
    </section>
  );
};

export default TrendingVisas;
