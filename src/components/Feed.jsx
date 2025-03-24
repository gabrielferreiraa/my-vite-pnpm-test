import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRandomColorPair } from '../utils/colors';

const posts = [
  {
    id: 1,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    colors: getRandomColorPair(),
    likes: 1234,
    caption: 'Beautiful sunset at the beach 🌅',
    comments: 89,
    timestamp: '2h ago'
  },
  {
    id: 2,
    user: {
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    colors: getRandomColorPair(),
    likes: 856,
    caption: 'City lights never looked better ✨',
    comments: 45,
    timestamp: '4h ago'
  }
];

function Feed() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      {posts.map((post) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden"
        >
          <div className="p-4 flex items-center space-x-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{post.user.name}</span>
          </div>
          
          <div className={`w-full aspect-square bg-gradient-to-br ${post.colors[0]} ${post.colors[1]} flex items-center justify-center`}>
            <span className="text-white text-opacity-20 text-9xl font-bold select-none">
              {post.user.name[0]}
            </span>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="hover:text-red-500 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="hover:text-green-500 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
              <button className="hover:text-yellow-500 transition-colors">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>
            
            <div>
              <p className="font-semibold">{post.likes.toLocaleString()} likes</p>
              <p>
                <span className="font-semibold">{post.user.name}</span>{' '}
                {post.caption}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View all {post.comments} comments
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {post.timestamp}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default Feed;