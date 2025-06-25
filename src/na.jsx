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



  const downloadImage = async (type = 'png') => {
  const svgElement = diagramRef.current?.querySelector('svg');
  if (!svgElement) return;

  const svgData = new XMLSerializer().serializeToString(svgElement); // ✅ Extract SVG from DOM
  const canvas = document.createElement('canvas');
  canvas.width = svgElement.clientWidth;
  canvas.height = svgElement.clientHeight;

  const ctx = canvas.getContext('2d');

  // ✅ SAFELY render SVG into canvas using Canvg
  const v = await Canvg.fromString(ctx, svgData);
  await v.render();

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

  const handleDownload = (type) => {
    setShowDownloadOptions(false);
    if (type === 'svg') downloadSVG();
    else downloadImage(type);
  };

   const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  const toggleFullscreen = () => {
    const elem = diagramRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const togglePanning = () => {
    if (!diagramRef.current) return;

    const container = diagramRef.current;
    setIsPanning((prev) => {
      const newState = !prev;
      container.style.cursor = newState ? 'grab' : 'default';

      if (newState) {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let scrollLeft = 0;
        let scrollTop = 0;

        const mouseDown = (e) => {
          isDragging = true;
          startX = e.pageX - container.offsetLeft;
          startY = e.pageY - container.offsetTop;
          scrollLeft = container.scrollLeft;
          scrollTop = container.scrollTop;
          container.style.cursor = 'grabbing';
        };

        const mouseMove = (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const y = e.pageY - container.offsetTop;
          const walkX = (x - startX) * 1;
          const walkY = (y - startY) * 1;
          container.scrollLeft = scrollLeft - walkX;
          container.scrollTop = scrollTop - walkY;
        };

        const mouseUp = () => {
          isDragging = false;
          container.style.cursor = 'grab';
        };

        container.addEventListener('mousedown', mouseDown);
        container.addEventListener('mousemove', mouseMove);
        container.addEventListener('mouseup', mouseUp);
        container.addEventListener('mouseleave', mouseUp);

        container._panHandlers = { mouseDown, mouseMove, mouseUp };
      } else {
        const { mouseDown, mouseMove, mouseUp } = container._panHandlers || {};
        container.removeEventListener('mousedown', mouseDown);
        container.removeEventListener('mousemove', mouseMove);
        container.removeEventListener('mouseup', mouseUp);
        container.removeEventListener('mouseleave', mouseUp);
        delete container._panHandlers;
        container.style.cursor = 'default';
      }

      return newState;
    });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <button onClick={toggleFullscreen}>🖥️ Fullscreen</button>
      <button onClick={togglePanning}>{isPanning ? '🛑 Stop Panning' : '✋ Enable Pan'}</button>
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
