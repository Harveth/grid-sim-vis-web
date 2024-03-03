import React from 'react';

function JsonDisplayRow({ data }) {

  const tableStyle = {
    width: 'auto',
    borderCollapse: 'collapse',
    margin: '10px auto',
  };

  const tableHeaderStyle = {
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  };

  const tableRowStyle = {
    '&:nth-child(even)': {
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
      <table style={tableStyle}>
        <thead>
          <tr>
            {flatData.map(({ key }) => (
              <th key={key} style={tableHeaderStyle}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={tableRowStyle}>
            {flatData.map(({ value }) => (
              <td key={value} style={tableCellStyle}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
            ))}
          </tr>
        </tbody>
      </table>
  );
}

export default JsonDisplayRow;
