import React from 'react';
import { Grid, Settings, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRandomColorPair } from '../utils/colors';

function Profile() {
  const posts = [...Array(9)].map((_, i) => ({
    id: i,
    colors: getRandomColorPair(),
    likes: Math.floor(Math.random() * 2000) + 100,
    comments: Math.floor(Math.random() * 100) + 10
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getRandomColorPair().join(' ')} flex items-center justify-center`}>
          <span className="text-white text-4xl font-bold">JD</span>
        </div>
        
        <div className="flex-1 ml-8">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-2xl font-semibold">johndoe</h1>
            <button className="btn-primary">Edit Profile</button>
            <Settings className="w-6 h-6 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400" />
          </div>
          
          <div className="flex space-x-8 mb-4">
            <div>
              <span className="font-semibold">542</span> posts
            </div>
            <div>
              <span className="font-semibold">1.4M</span> followers
            </div>
            <div>
              <span className="font-semibold">989</span> following
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-400">
              📸 Photography enthusiast
              <br />
              🌍 Travel lover
              <br />
              🎨 Digital creator
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: post.id * 0.1 }}
            className="aspect-square relative group overflow-hidden rounded-lg"
          >
            <div className={`w-full h-full bg-gradient-to-br ${post.colors[0]} ${post.colors[1]} flex items-center justify-center`}>
              <span className="text-white text-opacity-20 text-6xl font-bold select-none">
                {post.id + 1}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white space-x-4">
              <div className="flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                <span>{post.comments}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Profile;