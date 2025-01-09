import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import HamburgerMenu from '../components/HamburgerMenu';
import Chatbot from '../components/ChatBot';

const HomePage = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleCheckProgress = () => {
    navigate('/check-progress');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
      <Navbar />
      <HamburgerMenu />

      {/* Hero Section */}
      <section className="hero bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <ReactTyped
            strings={[
              "Revolutionizing Train Journey Assistance with AI",
              "Revolutionizing Train Journey Assistance with AI", 
              "Revolutionizing Train Journey Assistance with AI",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
            className="text-5xl font-bold mb-16 text-white" // Increased margin-bottom from mb-4 to mb-16
          />

          <p className="text-2xl mb-12">Experience faster, smarter, and more accurate complaint resolution</p>
          <div className="space-x-5">
            <Link to="/complaint-form" className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600">
              Report a Complaint
            </Link>
            <button
              onClick={handleCheckProgress}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600"
            >
              Complaint Progress
            </button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-inner">
                <div className="feature-front bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Automated Categorization</h3>
                </div>
                <div className="feature-back bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <p>Efficiently organizes complaints by type, such as safety, cleanliness, or staff behavior, using AI to classify issues based on predefined categories. This ensures faster and more accurate resolution paths.</p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-inner">
                <div className="feature-front bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Prioritization of Complaints</h3>
                </div>
                <div className="feature-back bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <p>Assigns urgency levels to complaints based on severity, allowing critical issues to be addressed promptly. High-priority complaints receive immediate attention to improve passenger safety and satisfaction.</p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-inner">
                <div className="feature-front bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Enhanced Data Extraction</h3>
                </div>
                <div className="feature-back bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <p>Leverages AI and OCR to extract relevant information from text inputs within complaints. This aids in collecting actionable data for deeper insights into complaint trends.</p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-inner">
                <div className="feature-front bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Automated Response and Smart Routing</h3>
                </div>
                <div className="feature-back bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <p>Responds to complaints with predefined messages and routes them to appropriate departments for handling. This reduces manual intervention and accelerates the resolution process.</p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-inner">
                <div className="feature-front bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Predictive Maintenance</h3>
                </div>
                <div className="feature-back bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <p>Analyzes complaint data to predict potential issues with railway infrastructure or trains, allowing proactive maintenance and minimizing breakdowns and delays.</p>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-inner">
                <div className="feature-front bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Feedback and Continuous Improvement</h3>
                </div>
                <div className="feature-back bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md">
                  <p>Collects user feedback on the complaint resolution experience and uses it to enhance system performance. Continuous improvements ensure better accuracy and efficiency over time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .feature-card {
            perspective: 1000px;
            height: 250px;
          }
          
          .feature-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
          }
          
          .feature-card:hover .feature-inner {
            transform: rotateY(180deg);
          }
          
          .feature-front, .feature-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          
          .feature-back {
            transform: rotateY(180deg);
          }

          .feature-front h3, .feature-back p {
            margin: 0;
            padding: 1rem;
          }
        `}</style>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your complaints matter to us. Here's our streamlined process to ensure quick resolution.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center">
                <span className="text-4xl mb-4">📝</span>
                <h3 className="text-xl font-bold mb-2">Register</h3>
                <p className="text-gray-500 text-center">Submit your complaint with relevant details</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center">
                <span className="text-4xl mb-4">🤖</span>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-gray-500 text-center">Our AI system analyzes and categorizes your complaint</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center">
                <span className="text-4xl mb-4">👥</span>
                <h3 className="text-xl font-bold mb-2">Processing</h3>
                <p className="text-gray-500 text-center">Assigned to relevant department for quick action</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center">
                <span className="text-4xl mb-4">✅</span>
                <h3 className="text-xl font-bold mb-2">Resolution</h3>
                <p className="text-gray-500 text-center">Get updates and resolution confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories and Testimonials */}
      <SuccessStories />

      {/* Support and Resources */}
      <section className="support-resources py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Support and Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="faqs bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <span className="text-3xl text-blue-500 mr-4">📚</span>
                <h3 className="text-2xl font-bold text-gray-800">FAQs</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">Find answers to common questions related to using our new AI features and complaint resolution process.</p>
              <a href="#" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Read FAQs
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="training-support bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <span className="text-3xl text-blue-500 mr-4">🎓</span>
                <h3 className="text-2xl font-bold text-gray-800">Training and Support</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">Access comprehensive training resources to help you navigate and maximize the new system features.</p>
              <a href="#" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Chatbot user={user} />

      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold mb-4">About Rail Madad</h4>
              <p className="text-gray-300">Dedicated to providing efficient complaint resolution and support for Indian Railways passengers.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <a href="https://railmadad.indianrailways.gov.in/madad/final/privacy_policy.jsp" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="https://railmadad.indianrailways.gov.in/madad/final/terms_and_conditions.jsp" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                <a href="https://railmadad.indianrailways.gov.in" className="text-gray-300 hover:text-white transition-colors">Rail Madad Official</a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="https://www.facebook.com/RailMadadOfficial" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/RailMadad" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="https://www.instagram.com/railmadad.official" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 Rail Madad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SuccessStories = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      text: "I registered a complaint about a dirty coach, and with the new AI system, it was resolved in half the usual time! Impressive efficiency!"
    },
    {
      name: "Maria Garcia", 
      text: "The AI system quickly addressed my complaint about broken equipment. I received a prompt response and resolution. Great improvement!"
    },
    {
      name: "David Lee",
      text: "I was amazed at how fast my complaint about staff behavior was resolved with the new system. The turnaround time is much quicker now!"
    },
    {
      name: "Emily Wang",
      text: "The new AI-driven complaint system resolved my issue in record time. The process is much smoother and more responsive!"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="success-stories py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black-500">Success Stories and Testimonials</h2>
        <div className="relative overflow-hidden">
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="testimonial-slider relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`testimonial-card absolute w-full transition-all duration-500 ${
                    index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{testimonial.name}</h3>
                    <p className="text-lg italic mb-4">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => showSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-blue-500/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 p-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 p-2 rounded-full"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .testimonial-slider {
          height: 200px;
        }
      `}</style>
    </section>
  );
};

export default HomePage;
