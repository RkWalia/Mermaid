import React from 'react';
import { Users, Star, GitBranch, Award, Heart, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Star className="h-8 w-8 text-yellow-500" />, value: '62,000+', label: 'GitHub Stars' },
    { icon: <Users className="h-8 w-8 text-blue-500" />, value: '500+', label: 'Contributors' },
    { icon: <GitBranch className="h-8 w-8 text-green-500" />, value: '10M+', label: 'Monthly Downloads' },
    { icon: <Award className="h-8 w-8 text-purple-500" />, value: '8+', label: 'Years Active' }
  ];

  const team = [
    {
      name: 'Knut Sveidqvist',
      role: 'Creator & Maintainer',
      bio: 'Original creator of Mermaid, passionate about making documentation better.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Sidharth Vinod',
      role: 'Core Maintainer',
      bio: 'TypeScript expert and active contributor to the Mermaid ecosystem.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Ashish Jain',
      role: 'Core Contributor',
      bio: 'Frontend specialist focusing on user experience and accessibility.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Nikolay Rozhkov',
      role: 'Documentation Lead',
      bio: 'Technical writer ensuring Mermaid is accessible to everyone.',
      avatar: 'https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const milestones = [
    { year: '2014', title: 'Project Started', description: 'Knut Sveidqvist creates the first version of Mermaid' },
    { year: '2016', title: 'Community Growth', description: 'First major contributors join the project' },
    { year: '2018', title: '10k Stars', description: 'Mermaid reaches 10,000 GitHub stars' },
    { year: '2020', title: 'TypeScript Rewrite', description: 'Major refactor to TypeScript for better maintainability' },
    { year: '2022', title: '50k Stars', description: 'Crosses 50,000 GitHub stars milestone' },
    { year: '2024', title: 'Major Integrations', description: 'Adopted by major platforms like GitHub, GitLab, and Notion' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Zap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Mermaid.js
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from the need to make documentation catch up with development, 
            Mermaid has evolved into the go-to solution for creating diagrams from text.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                Documentation is crucial for software projects, yet it often lags behind development. 
                Our mission is to change that by making diagram creation as simple as writing text.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that visual documentation should be version-controlled, easy to maintain, 
                and accessible to everyone - from developers to business stakeholders.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Made with love by the open source community</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <blockquote className="text-lg italic mb-4">
                "The main purpose of Mermaid is to help documentation catch up with development."
              </blockquote>
              <cite className="text-blue-100">— Knut Sveidqvist, Creator</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
            <p className="text-xl text-gray-600">The impact of our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Team</h2>
            <p className="text-xl text-gray-600">Meet the people behind Mermaid</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in Mermaid's evolution</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Mermaid is more than just a tool - it's a community of developers, designers, 
            and documentation enthusiasts working together to make visual communication easier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/mermaid-js/mermaid"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contribute on GitHub
            </a>
            <a
              href="#"
              className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Join Discord Community
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;