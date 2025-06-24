import React, { useState, useEffect, useRef } from 'react';
import { Play, Copy, Download, RotateCcw, Share } from 'lucide-react';
import mermaid from 'mermaid';
import './Playground.css'; // Import CSS

const Playground = () => {
  const [code, setCode] = useState(`graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`);
  const [isRendering, setIsRendering] = useState(false);
  const diagramRef = useRef(null);

  const examples = [/* same as before */];

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    });
    renderDiagram();
  }, []);

  const renderDiagram = async () => {
    if (!diagramRef.current || !code.trim()) return;

    setIsRendering(true);
    try {
      const result = await mermaid.render('diagram', code);
      diagramRef.current.innerHTML = result.svg;
    } catch (error) {
      diagramRef.current.innerHTML = `<div style="color:#b91c1c; background:#fef2f2; padding:1rem; border-radius:6px">
        <strong>Syntax Error:</strong><br/>
        ${error.message}
      </div>`;
    }
    setIsRendering(false);
  };

  const copyCode = () => navigator.clipboard.writeText(code);
  const downloadSVG = () => {
    const svgElement = diagramRef.current.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'diagram.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="header">
          <h1 className="heading">Mermaid Playground</h1>
          <p className="subtext">Create and test your diagrams in real-time</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Examples</h2>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setCode(example.code)}
              className="button"
            >
              {example.name}
            </button>
          ))}
        </div>

        <div className="grid">
          {/* Code Editor */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Code Editor</span>
              <div>
                <button onClick={copyCode} className="icon-btn" title="Copy"><Copy size={18} /></button>
                <button onClick={() => setCode(examples[0].code)} className="icon-btn" title="Reset"><RotateCcw size={18} /></button>
                <button
                  onClick={renderDiagram}
                  disabled={isRendering}
                  className="button render-button"
                >
                  <Play size={16} style={{ marginRight: '0.5rem' }} />
                  {isRendering ? 'Rendering...' : 'Render'}
                </button>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="textarea"
                placeholder="Enter your Mermaid diagram code here..."
              />
            </div>
          </div>

          {/* Diagram Preview */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Preview</span>
              <div>
                <button onClick={downloadSVG} className="icon-btn" title="Download"><Download size={18} /></button>
                <button className="icon-btn" title="Share"><Share size={18} /></button>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <div ref={diagramRef} className="diagram-box">
                {isRendering ? 'Rendering diagram...' : 'Click "Render" to generate diagram'}
              </div>
            </div>
          </div>
        </div>

        <div className="tips">
          <h3 className="card-title" style={{ color: '#1e3a8a' }}>💡 Tips</h3>
          <ul style={{ marginTop: '0.75rem' }}>
            <li>• Use the examples above to get started quickly</li>
            <li>• The diagram will auto-update when you click "Render"</li>
            <li>• You can download the generated diagram as SVG</li>
            <li>• Check the documentation for complete syntax reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Playground;
