import { motion } from 'framer-motion';
import { useState } from 'react';
import { Book, Globe, Volume2 } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    translation: 'KJV',
    fontSize: 'medium',
    autoPlay: false
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30 p-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
          Settings
        </h2>

        <div className="space-y-8">
          <SettingSection
            icon={<Book />}
            title="Bible Translation"
            description="Choose your preferred Bible translation"
          >
            <select
              value={settings.translation}
              onChange={(e) => setSettings({ ...settings, translation: e.target.value })}
              className="mt-2 block w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-200"
            >
              <option value="KJV">King James Version</option>
              <option value="NIV">New International Version</option>
              <option value="ESV">English Standard Version</option>
              <option value="NLT">New Living Translation</option>
            </select>
          </SettingSection>

          <SettingSection
            icon={<Globe />}
            title="Font Size"
            description="Adjust the text size for comfortable reading"
          >
            <div className="mt-2 flex space-x-4">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSettings({ ...settings, fontSize: size })}
                  className={`px-4 py-2 rounded-lg ${
                    settings.fontSize === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </SettingSection>

          <SettingSection
            icon={<Volume2 />}
            title="Auto-Play Audio"
            description="Automatically play audio when opening chapters"
          >
            <label className="mt-2 inline-flex items-center">
              <input
                type="checkbox"
                checked={settings.autoPlay}
                onChange={(e) => setSettings({ ...settings, autoPlay: e.target.checked })}
                className="form-checkbox h-5 w-5 text-blue-500 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <span className="ml-2 text-slate-600 dark:text-slate-300">Enable auto-play</span>
            </label>
          </SettingSection>
        </div>
      </div>
    </motion.div>
  );
}

function SettingSection({ icon, title, description, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-500">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}