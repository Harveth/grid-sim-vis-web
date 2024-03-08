import React from 'react';

function JsonDisplay({ data }) {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const tableHeaderStyle = {
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  };

  const tableRowStyle = {
    '&:nthChild(even)': {
      backgroundColor: '#f9f9f9',
    },
  };

  const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const flatData = Object.entries(data).reduce((acc, [key, value]) => {
    if (typeof value !== 'object') {
      acc.push({ key, value });
    }
    return acc;
  }, []);

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Key</th>
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {flatData.map(({ key, value }) => (
            <tr key={key} style={tableRowStyle}>
              <td style={tableCellStyle}>{key}</td>
              <td style={tableCellStyle}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JsonDisplay;
