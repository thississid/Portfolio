'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'My Portfolio',
    siteDescription: 'Full-stack developer specializing in AI/ML',
    email: 'contact@portfolio.com',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    enableAnalytics: true,
    enableComments: false,
    maintenanceMode: false,
    theme: 'dark',
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Configure your portfolio settings</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg text-green-400">
          ✓ Settings saved successfully!
        </div>
      )}

      {/* General Settings */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>⚙️</span> General Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Site Description</label>
            <textarea
              rows={3}
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Contact Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🔗</span> Social Links
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">GitHub</label>
            <input
              type="url"
              value={settings.github}
              onChange={(e) => setSettings({ ...settings, github: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">LinkedIn</label>
            <input
              type="url"
              value={settings.linkedin}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Twitter</label>
            <input
              type="url"
              value={settings.twitter}
              onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🎛️</span> Features
        </h2>
        <div className="space-y-4">
          <ToggleSwitch
            label="Enable Analytics Tracking"
            description="Track page views and user interactions"
            checked={settings.enableAnalytics}
            onChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
          />

          <ToggleSwitch
            label="Enable Blog Comments"
            description="Allow visitors to leave comments on blog posts"
            checked={settings.enableComments}
            onChange={(checked) => setSettings({ ...settings, enableComments: checked })}
          />

          <ToggleSwitch
            label="Maintenance Mode"
            description="Display maintenance page to visitors"
            checked={settings.maintenanceMode}
            onChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            color="pink"
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-pink))] border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🎨</span> Appearance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-pink))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            >
              <option value="dark" className="bg-gray-800">Dark</option>
              <option value="light" className="bg-gray-800">Light</option>
              <option value="auto" className="bg-gray-800">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-pink))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            >
              <option value="en" className="bg-gray-800">English</option>
              <option value="es" className="bg-gray-800">Español</option>
              <option value="fr" className="bg-gray-800">Français</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-900 border border-red-500 border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>🔒</span> Security
        </h2>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-all">
            Change Admin Password
          </button>
          <div className="text-sm text-gray-400">
            Last login: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:shadow-[0_0_20px_rgba(var(--neon-cyan),0.4)] transition-all"
        >
          Save Changes
        </button>
        <button className="px-8 py-3 bg-transparent border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  color = 'green',
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: 'green' | 'pink';
}) {
  const colorClass = color === 'green' ? 'bg-[rgb(var(--neon-green))]' : 'bg-[rgb(var(--neon-pink))]';

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
      <div>
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          checked ? colorClass : 'bg-gray-700'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-7' : ''
          }`}
        />
      </button>
    </div>
  );
}
