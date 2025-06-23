import React, { useEffect, useRef } from 'react';
import { Copy, ExternalLink, Code } from 'lucide-react';
import mermaid from 'mermaid';

const Examples = () => {
  const exampleRefs = useRef({});

  const examples = [
    {
      id: 'workflow',
      title: 'Development Workflow',
      description: 'A typical software development workflow with decision points',
      code: `graph TD
    A[Start Development] --> B[Write Code]
    B --> C{Tests Pass?}
    C -->|Yes| D[Code Review]
    C -->|No| E[Fix Issues]
    E --> B
    D --> F{Approved?}
    F -->|Yes| G[Deploy to Staging]
    F -->|No| H[Address Feedback]
    H --> B
    G --> I[Deploy to Production]
    I --> J[Monitor]
    J --> K[End]`,
      category: 'Workflow'
    },
    {
      id: 'user-auth',
      title: 'User Authentication Flow',
      description: 'Sequence diagram showing user authentication process',
      code: `sequenceDiagram
    participant U as User
    participant C as Client
    participant S as Server
    participant D as Database
    
    U->>C: Enter credentials
    C->>S: POST /login
    S->>D: Validate user
    D-->>S: User data
    S-->>C: JWT token
    C-->>U: Login success
    
    Note over U,D: User is now authenticated
    
    U->>C: Request protected resource
    C->>S: GET /profile (with token)
    S->>S: Verify JWT
    S-->>C: Profile data
    C-->>U: Display profile`,
      category: 'Sequence'
    },
    {
      id: 'project-timeline',
      title: 'Project Timeline',
      description: 'Gantt chart showing project phases and milestones',
      code: `gantt
    title Web Application Development
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements Analysis    :done, req, 2024-01-01, 2024-01-15
    System Design          :done, design, after req, 10d
    section Development
    Backend API            :active, backend, 2024-01-25, 30d
    Frontend UI            :frontend, after backend, 25d
    Integration Testing    :testing, after frontend, 10d
    section Deployment
    Production Setup       :prod, after testing, 5d
    Go Live               :milestone, golive, after prod, 0d`,
      category: 'Gantt'
    },
    {
      id: 'class-diagram',
      title: 'E-commerce System',
      description: 'Class diagram for an e-commerce application',
      code: `classDiagram
    class User {
        +String name
        +String email
        +String password
        +login()
        +logout()
        +updateProfile()
    }
    
    class Product {
        +String name
        +Float price
        +String description
        +Integer stock
        +updateStock()
        +getPrice()
    }
    
    class Order {
        +String orderId
        +Date orderDate
        +Float totalAmount
        +String status
        +calculateTotal()
        +updateStatus()
    }
    
    class Payment {
        +String paymentId
        +Float amount
        +String method
        +String status
        +processPayment()
        +refund()
    }
    
    User ||--o{ Order : places
    Order ||--o{ Product : contains
    Order ||--|| Payment : has`,
      category: 'Class'
    },
    {
      id: 'state-machine',
      title: 'Order State Machine',
      description: 'State diagram showing order lifecycle',
      code: `stateDiagram-v2
    [*] --> Pending
    Pending --> Processing : payment_received
    Pending --> Cancelled : cancel_order
    Processing --> Shipped : items_packed
    Processing --> Cancelled : out_of_stock
    Shipped --> Delivered : delivery_confirmed
    Shipped --> Returned : return_requested
    Delivered --> [*]
    Cancelled --> [*]
    Returned --> Refunded
    Refunded --> [*]
    
    note right of Processing
        Order is being prepared
        for shipment
    end note`,
      category: 'State'
    },
    {
      id: 'database-er',
      title: 'Database Schema',
      description: 'Entity relationship diagram for a blog system',
      code: `erDiagram
    USER ||--o{ POST : creates
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST ||--o{ TAG : tagged_with
    
    USER {
        int user_id PK
        string username UK
        string email UK
        string password_hash
        datetime created_at
        datetime updated_at
    }
    
    POST {
        int post_id PK
        int user_id FK
        string title
        text content
        string slug UK
        boolean published
        datetime created_at
        datetime updated_at
    }
    
    COMMENT {
        int comment_id PK
        int post_id FK
        int user_id FK
        text content
        datetime created_at
    }
    
    TAG {
        int tag_id PK
        string name UK
        string color
    }`,
      category: 'ER'
    }
  ];

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    });

    examples.forEach(async (example) => {
      if (exampleRefs.current[example.id]) {
        try {
          const result = await mermaid.render(`diagram-${example.id}`, example.code);
          exampleRefs.current[example.id].innerHTML = result.svg;
        } catch (error) {
          console.error(`Error rendering ${example.id}:`, error);
          exampleRefs.current[example.id].innerHTML = `<div class="text-red-600 p-4">Error rendering diagram</div>`;
        }
      }
    });
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  const categories = [...new Set(examples.map(example => example.category))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Examples</h1>
          <p className="text-gray-600">Real-world diagram examples to inspire your projects</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              All Categories
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className="space-y-12">
          {examples.map((example) => (
            <div key={example.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                    <p className="text-gray-600 mt-1">{example.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {example.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Diagram */}
                <div className="p-6 bg-gray-50 border-r border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Diagram</h4>
                  </div>
                  <div 
                    ref={el => exampleRefs.current[example.id] = el}
                    className="flex justify-center items-center min-h-64 bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="text-gray-500">Loading diagram...</div>
                  </div>
                </div>

                {/* Code */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Code</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyCode(example.code)}
                        className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                        <ExternalLink className="h-4 w-4" />
                        <span>Open in Playground</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm whitespace-pre-wrap">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <Code className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ready to create your own diagrams?</h2>
          <p className="text-blue-100 mb-6">
            Use our interactive playground to experiment with Mermaid syntax
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Try the Playground
          </button>
        </div>
      </div>
    </div>
  );
};

export default Examples;