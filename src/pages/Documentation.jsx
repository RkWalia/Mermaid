import React, { useState } from 'react';
import { Book, Search, ChevronRight, Copy, ExternalLink } from 'lucide-react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'installation', title: 'Installation' },
        { id: 'basic-usage', title: 'Basic Usage' }
      ]
    },
    {
      id: 'diagram-types',
      title: 'Diagram Types',
      items: [
        { id: 'flowcharts', title: 'Flowcharts' },
        { id: 'sequence', title: 'Sequence Diagrams' },
        { id: 'gantt', title: 'Gantt Charts' },
        { id: 'class', title: 'Class Diagrams' },
        { id: 'state', title: 'State Diagrams' },
        { id: 'er', title: 'Entity Relationship' }
      ]
    },
    {
      id: 'configuration',
      title: 'Configuration',
      items: [
        { id: 'themes', title: 'Themes' },
        { id: 'styling', title: 'Styling' },
        { id: 'security', title: 'Security' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      items: [
        { id: 'markdown', title: 'Markdown' },
        { id: 'react', title: 'React' },
        { id: 'vue', title: 'Vue.js' },
        { id: 'angular', title: 'Angular' }
      ]
    }
  ];

  const content = {
    'getting-started': {
      title: 'Getting Started with Mermaid',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h3>
            <p className="text-gray-700 mb-4">
              Mermaid is a JavaScript-based diagramming and charting tool that uses Markdown-inspired 
              text definitions and a renderer to create and modify complex diagrams. The main purpose 
              of Mermaid is to help documentation catch up with development.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800">
                <strong>Key Benefits:</strong> Easy to use, version controllable, and integrates seamlessly 
                with your existing workflow.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Installation</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Via CDN</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <code className="text-green-400 text-sm">
{`<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>`}
                  </code>
                  <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Via npm</h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <code className="text-green-400 text-sm">npm install mermaid</code>
                  <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Usage</h3>
            <p className="text-gray-700 mb-4">
              Create a simple flowchart with just a few lines of code:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <code className="text-green-400 text-sm">
{`<div class="mermaid">
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
</div>`}
              </code>
              <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )
    },
    'flowcharts': {
      title: 'Flowcharts',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flowchart Syntax</h3>
            <p className="text-gray-700 mb-4">
              Flowcharts are composed of nodes (geometric shapes) and edges (arrows or lines). 
              The Mermaid code defines how nodes and edges are made and accommodates different 
              arrow types, multi-directional arrows, and any linking to and from subgraphs.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Node Shapes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Rectangle</h5>
                <code className="text-sm text-gray-700">A[Rectangle]</code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Round Rectangle</h5>
                <code className="text-sm text-gray-700">B(Round Rectangle)</code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Diamond</h5>
                <code className="text-sm text-gray-700">C{Diamond}</code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Circle</h5>
                <code className="text-sm text-gray-700">D((Circle))</code>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Example</h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <code className="text-green-400 text-sm whitespace-pre">
{`graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[Deploy]
    E --> F[End]`}
              </code>
              <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )
    }
    // Add more content sections as needed
  };

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Book className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
          </div>
          <p className="text-gray-600">Complete guide to using Mermaid diagrams</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-4">
                  {filteredSections.map((section) => (
                    <div key={section.id}>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        {section.title}
                      </h3>
                      <ul className="mt-2 space-y-1">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => setActiveSection(item.id)}
                              className={`w-full text-left flex items-center px-2 py-1 text-sm rounded-md transition-colors ${
                                activeSection === item.id
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <ChevronRight className="h-3 w-3 mr-1" />
                              {item.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-8">
                {content[activeSection] ? (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      {content[activeSection].title}
                    </h2>
                    {content[activeSection].content}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Documentation Section
                    </h3>
                    <p className="text-gray-500">
                      Select a topic from the sidebar to view the documentation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://github.com/mermaid-js/mermaid"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">GitHub Repository</h3>
                    <p className="text-sm text-gray-600">View source code and contribute</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </a>
              
              <a
                href="#"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">API Reference</h3>
                    <p className="text-sm text-gray-600">Complete API documentation</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </a>
              
              <a
                href="#"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Community</h3>
                    <p className="text-sm text-gray-600">Join discussions and get help</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;