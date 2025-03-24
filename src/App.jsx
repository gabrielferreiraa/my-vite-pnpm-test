import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Star, Sparkles, BarChart, Users } from 'lucide-react';
import Navbar from './components/Navbar';

export default function App() {
  useEffect(() => {
    window.addEventListener('error', function ({ message, filename, lineno, colno, error }) {
      window.parent.postMessage({
        type: 'error',
        message: message,
        line: lineno,
        column: colno,
        stack: error ? error.stack : null
      }, '*');
    });
    return () => window.removeEventListener('error', () => {});
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50 via-violet-50 to-fuchsia-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyOSwgMTQwLCAyNDgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 dark:opacity-20"></div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent dark:from-purple-500/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                New Features Released
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Work Smarter with
              <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent"> SaaSFlow</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Experience the future of workflow automation. Boost your team's productivity with AI-powered tools and real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg dark:hover:shadow-purple-500/10 transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Powerful tools to transform your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI Automation",
                description: "Leverage artificial intelligence to automate complex workflows and tasks",
                gradient: "from-purple-500 to-fuchsia-500"
              },
              {
                icon: BarChart,
                title: "Smart Analytics",
                description: "Get real-time insights with beautiful dashboards and detailed reports",
                gradient: "from-fuchsia-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Team Sync",
                description: "Collaborate seamlessly with your team in real-time across all devices",
                gradient: "from-pink-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-purple-100/50 dark:bg-purple-950/30 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Join thousands of satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO at TechCorp",
                content: "SaaSFlow has revolutionized our workflow. The AI automation features have increased our productivity by 300%.",
                image: "https://randomuser.me/api/portraits/women/1.jpg"
              },
              {
                name: "Mark Williams",
                role: "Founder at StartupX",
                content: "The best investment we've made. The analytics dashboard alone has helped us make data-driven decisions that boosted our revenue.",
                image: "https://randomuser.me/api/portraits/men/1.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-purple-500/5 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center mb-6">
                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-purple-500" size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}