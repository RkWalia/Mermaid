import React, { useState } from 'react';

const Navbar = ({ diagramRef }) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const downloadSVG = () => {
    const svgElement = diagramRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'diagram.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadImage = (type = 'png') => {
    const svgElement = diagramRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const mimeType = type === 'jpg' ? 'image/jpeg' : 'image/png';

      canvas.toBlob((blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `diagram.${type}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
      }, mimeType);
    };

    img.onerror = (err) => {
      console.error('Image load error:', err);
    };

    img.src = url;
  };

  const handleDownload = (type) => {
    setShowDownloadOptions(false);
    if (type === 'svg') downloadSVG();
    else downloadImage(type);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowDownloadOptions(!showDownloadOptions)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#1f2937',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Download ▼
      </button>

      {showDownloadOptions && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 10,
            overflow: 'hidden'
          }}
        >
          <div
            onClick={() => handleDownload('svg')}
            style={dropdownItemStyle}
          >
            Download as SVG
          </div>
          <div
            onClick={() => handleDownload('png')}
            style={dropdownItemStyle}
          >
            Download as PNG
          </div>
          <div
            onClick={() => handleDownload('jpg')}
            style={dropdownItemStyle}
          >
            Download as JPG
          </div>
        </div>
      )}
    </div>
  );
};

const dropdownItemStyle = {
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fff',
  color: '#111',
  fontSize: '14px'
};

export default Navbar;
