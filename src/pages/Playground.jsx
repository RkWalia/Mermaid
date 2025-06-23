import React, { useState, useEffect, useRef } from 'react';
import { Play, Copy, Download, RotateCcw, Share } from 'lucide-react';
import mermaid from 'mermaid';

const Playground = () => {
  const [code, setCode] = useState(`graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`);
  
  const [isRendering, setIsRendering] = useState(false);
  const diagramRef = useRef(null);

  const examples = [
    {
      name: 'Flowchart',
      code: `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`
    },
    {
      name: 'Sequence Diagram',
      code: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`
    },
    {
      name: 'Gantt Chart',
      code: `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d`
    },
    {
      name: 'Class Diagram',
      code: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }`
    }
  ];

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
      diagramRef.current.innerHTML = `<div class="text-red-600 p-4 bg-red-50 rounded">
        <strong>Syntax Error:</strong><br/>
        ${error.message}
      </div>`;
    }
    setIsRendering(false);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const loadExample = (exampleCode) => {
    setCode(exampleCode);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

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

  const resetCode = () => {
    setCode(examples[0].code);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mermaid Playground</h1>
          <p className="text-gray-600">Create and test your diagrams in real-time</p>
        </div>

        {/* Examples */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Examples</h2>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => loadExample(example.code)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyCode}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={resetCode}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                  title="Reset to default"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={renderDiagram}
                  disabled={isRendering}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  <span>{isRendering ? 'Rendering...' : 'Render'}</span>
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Mermaid diagram code here..."
              />
            </div>
          </div>

          {/* Diagram Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadSVG}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                  title="Download SVG"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                  title="Share diagram"
                >
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div 
                ref={diagramRef}
                className="min-h-96 flex items-center justify-center bg-gray-50 rounded-md border-2 border-dashed border-gray-300"
              >
                {isRendering ? (
                  <div className="text-gray-500">Rendering diagram...</div>
                ) : (
                  <div className="text-gray-500">Click "Render" to generate diagram</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips</h3>
          <ul className="text-blue-800 space-y-2">
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