import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Code, Users, Zap, GitBranch, PieChart, Network, CheckCircle } from 'lucide-react';
import mermaid from 'mermaid';

const Home = () => {
  const flowchartRef = useRef(null);
  const sequenceRef = useRef(null);
  const ganttRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    });

    if (flowchartRef.current) {
      const flowchartCode = `graph TD
        A[Start] --> B{Is it working?}
        B -->|Yes| C[Great!]
        B -->|No| D[Debug]
        D --> B
        C --> E[Deploy]`;
      
      mermaid.render('flowchart', flowchartCode).then(result => {
        flowchartRef.current.innerHTML = result.svg;
      });
    }

    if (sequenceRef.current) {
      const sequenceCode = `sequenceDiagram
        participant A as Alice
        participant B as Bob
        A->>+B: Hello Bob, how are you?
        B-->>-A: Great!`;
      
      mermaid.render('sequence', sequenceCode).then(result => {
        sequenceRef.current.innerHTML = result.svg;
      });
    }

    if (ganttRef.current) {
      const ganttCode = `gantt
        title Project Timeline
        dateFormat YYYY-MM-DD
        section Planning
        Define requirements :a1, 2024-01-01, 30d
        section Development
        Backend API :a2, after a1, 45d
        Frontend UI :a3, after a1, 60d`;
      
      mermaid.render('gantt', ganttCode).then(result => {
        ganttRef.current.innerHTML = result.svg;
      });
    }
  }, []);

  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "Simple Syntax",
      description: "Write diagrams using an intuitive, markdown-inspired syntax that's easy to learn and remember."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Live Rendering",
      description: "See your diagrams update in real-time as you type, with instant visual feedback."
    },
    {
      icon: <Network className="h-8 w-8 text-green-600" />,
      title: "Multiple Types",
      description: "Support for flowcharts, sequence diagrams, Gantt charts, class diagrams, and more."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Team Collaboration",
      description: "Perfect for documentation, presentations, and collaborative planning sessions."
    }
  ];

  const diagramTypes = [
    { name: "Flowcharts", icon: <GitBranch className="h-6 w-6" /> },
    { name: "Sequence Diagrams", icon: <ArrowRight className="h-6 w-6" /> },
    { name: "Gantt Charts", icon: <PieChart className="h-6 w-6" /> },
    { name: "Class Diagrams", icon: <Network className="h-6 w-6" /> },
    { name: "State Diagrams", icon: <CheckCircle className="h-6 w-6" /> },
    { name: "ER Diagrams", icon: <Network className="h-6 w-6" /> }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Generate diagrams from{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                text
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create flowcharts, sequence diagrams, Gantt charts and more using a simple, 
              markdown-inspired syntax. Perfect for documentation, presentations, and planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/playground"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Play className="h-5 w-5 mr-2" />
                Try it now
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View Documentation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See it in action</h2>
            <p className="text-xl text-gray-600">Watch diagrams render as you type</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Flowchart</h3>
              <div ref={flowchartRef} className="flex justify-center"></div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Sequence Diagram</h3>
              <div ref={sequenceRef} className="flex justify-center"></div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Gantt Chart</h3>
              <div ref={ganttRef} className="flex justify-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose Mermaid?</h2>
            <p className="text-xl text-gray-600">Powerful features for modern documentation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagram Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Diagram Types</h2>
            <p className="text-xl text-gray-600">From simple flowcharts to complex system diagrams</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {diagramTypes.map((type, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                <div className="flex justify-center mb-3 text-blue-600">
                  {type.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900">{type.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start creating diagrams?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who use Mermaid for their documentation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/playground"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Start Creating
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <a
              href="https://github.com/mermaid-js/mermaid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;