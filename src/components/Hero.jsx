import { motion } from 'framer-motion';
import { ShoppingCart, Leaf, Clock, CreditCard } from 'lucide-react';

export default function Hero() {
  const features = [
    { icon: <ShoppingCart className="w-6 h-6" />, text: "Wide Selection" },
    { icon: <Leaf className="w-6 h-6" />, text: "Fresh Produce" },
    { icon: <Clock className="w-6 h-6" />, text: "24/7 Service" },
    { icon: <CreditCard className="w-6 h-6" />, text: "Easy Payment" },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Fresh Market
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
            Quality groceries delivered to your doorstep
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Shop Now
          </motion.button>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="flex flex-col items-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <div className="text-emerald-500 mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold">{feature.text}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(16,185,129,0.1)_0%,rgba(16,185,129,0)_100%)] dark:bg-[radial-gradient(45%_45%_at_50%_50%,rgba(16,185,129,0.05)_0%,rgba(16,185,129,0)_100%)]" />
    </div>
  );
}