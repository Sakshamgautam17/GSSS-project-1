import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/experiments"); // Replace with the correct path for your Experiments tab
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-6 fixed w-full z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 text-blue-600">
              {/* Simple Flask Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 01-4.02-3.5l-.9-2.7a2 2 0 00-1.922-1.376H4.614a2 2 0 00-1.902 2.59l.697 2.191a6 6 0 001.148 2.072l.218.291a6 6 0 002.6 1.777l3.086 1.027a6 6 0 004.592-.758l2.863-1.784a2 2 0 00.726-2.435z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VLab
              </h1>
              <p className="text-xs text-gray-600">by MindCraft</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <button className="text-gray-600 hover:text-blue-600 transition">
              Features
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition">
              About
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition">
              Contact
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6 text-center bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Remote Laboratory Simulations
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Bridging the gap in practical education by providing interactive,
            accessible digital lab experiences for students worldwide
          </p>
        </div>
      </header>

      {/* Problem Statement */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-blue-900 mb-6">
              The Educational Challenge
            </h2>
            <p className="text-gray-700 mb-4">
              Many educational institutions struggle with:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center transform hover:translate-x-2 transition-transform">
                <svg
                  className="h-6 w-6 mr-3 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h0A2.5 2.5 0 0013 5.5V5c0-1.662 1.257-3.017 2.434-3.842C15.687 1.095 16 1.555 16 2.13V4a2 2 0 002 2h1.793c.207 0 .398.168.338.37a18.788 18.788 0 01-3.42 6.6 18.787 18.787 0 01-6.6 3.42c-.202.06-.37-.13-.37-.338V16a2 2 0 00-2-2h-1.5c-1.247 0-2.434-.9-2.54-2.14A16.961 16.961 0 013 11z"
                  />
                </svg>
                Limited access to physical lab resources
              </li>
              <li className="flex items-center transform hover:translate-x-2 transition-transform">
                <svg
                  className="h-6 w-6 mr-3 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Geographic and economic barriers
              </li>
              <li className="flex items-center transform hover:translate-x-2 transition-transform">
                <svg
                  className="h-6 w-6 mr-3 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Lack of scalable practical learning solutions
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="h-12 w-12 mx-auto text-blue-600 mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 01-4.02-3.5l-.9-2.7a2 2 0 00-1.922-1.376H4.614a2 2 0 00-1.902 2.59l.697 2.191a6 6 0 001.148 2.072l.218.291a6 6 0 002.6 1.777l3.086 1.027a6 6 0 004.592-.758l2.863-1.784a2 2 0 00.726-2.435z" />
              </svg>
            </div>
            <p className="text-gray-700 text-center">
              Our solution provides a comprehensive virtual laboratory platform
              that brings hands-on experiments to students anywhere in the
              world.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-900 text-center mb-12">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Interactive Simulations",
                description: "Realistic, engaging digital lab environments",
              },
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                ),
                title: "Multi-Disciplinary",
                description:
                  "Adaptable across physics, chemistry, biology, and engineering",
              },
              {
                icon: (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                title: "Comprehensive Learning",
                description:
                  "Detailed guides, real-time feedback, and progress tracking",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-blue-600 mb-4 mx-auto w-max">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-50"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Transform Learning, Anywhere
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our mission to democratize practical education through
            innovative digital laboratory simulations
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClick}
              className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition transform hover:scale-105 hover:shadow-lg"
            >
              Explore Simulations
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-blue-900 text-white text-center">
        <p>&copy; 2024 VLab by MindCraft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
