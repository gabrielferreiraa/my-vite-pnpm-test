import React from 'react';
import { motion } from 'framer-motion';
import { getRandomColorPair } from '../utils/colors';

function Explore() {
  const posts = [...Array(12)].map((_, i) => ({
    id: i,
    colors: getRandomColorPair(),
    username: `user${i + 1}`
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: post.id * 0.1 }}
            className="aspect-square relative group overflow-hidden rounded-lg"
          >
            <div className={`w-full h-full bg-gradient-to-br ${post.colors[0]} ${post.colors[1]} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
              <span className="text-white text-opacity-20 text-6xl font-bold select-none">
                {post.id + 1}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="text-white">
                <p className="font-semibold">@{post.username}</p>
                <p className="text-sm opacity-80">View post</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Explore;