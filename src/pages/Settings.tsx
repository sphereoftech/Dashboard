import React, { useState } from "react";
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { User, Bell, Moon, Sun, Mail, Lock, Globe, Shield, Key, Slack, FileText } from 'lucide-react';

const Settings = () => {
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState('alex.johnson@email.com');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [region, setRegion] = useState('United States');
  const [twoFA, setTwoFA] = useState(false);
  const [notionConnected, setNotionConnected] = useState(false);
  const [slackConnected, setSlackConnected] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar isDark={isDark} toggleTheme={toggleTheme} />
          <main className="flex-1 p-6 space-y-10 overflow-auto bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold font-tomorrow bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                Settings
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Manage your preferences and account settings here.
              </p>
            </div>

            {/* Responsive Grid for Settings Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
              {/* Profile Settings */}
              <section className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-indigo-100 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-7 h-7 text-indigo-600" />
                  <h2 className="text-xl font-bold text-indigo-700">Profile</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                      <Mail className="w-5 h-5 text-indigo-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-gray-800 text-base"
                      />
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300">
                    Update Email
                  </button>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                      <Lock className="w-5 h-5 text-indigo-400" />
                      <input
                        type="password"
                        value="********"
                        readOnly
                        className="flex-1 bg-transparent outline-none text-gray-800 text-base"
                      />
                    </div>
                    <button className="self-start mt-1 text-indigo-600 hover:underline text-sm font-medium">Change Password</button>
                  </div>
                </div>
              </section>

              {/* Theme Settings */}
              <section className="bg-gradient-to-br from-white via-yellow-50 to-indigo-50 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-yellow-100 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Moon className="w-7 h-7 text-yellow-500" />
                  <h2 className="text-xl font-bold text-yellow-700">Theme</h2>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold shadow transition-all duration-300 ${theme === 'light' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-600 border border-indigo-200'}`}
                    onClick={() => { setTheme('light'); setIsDark(false); document.documentElement.classList.remove('dark'); }}
                  >
                    <Sun className="w-5 h-5" /> Light
                  </button>
                  <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold shadow transition-all duration-300 ${theme === 'dark' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-600 border border-indigo-200'}`}
                    onClick={() => { setTheme('dark'); setIsDark(true); document.documentElement.classList.add('dark'); }}
                  >
                    <Moon className="w-5 h-5" /> Dark
                  </button>
                </div>
              </section>

              {/* Notification Settings */}
              <section className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-purple-100 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-7 h-7 text-purple-500" />
                  <h2 className="text-xl font-bold text-purple-700">Notifications</h2>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 transition-all duration-200"
                    />
                    <span className="text-base text-gray-700 font-medium">Enable Email Notifications</span>
                  </label>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${notifications ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>
                    {notifications ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </section>

              {/* Security Settings */}
              <section className="bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-green-100 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-7 h-7 text-green-600" />
                  <h2 className="text-xl font-bold text-green-700">Security</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={twoFA}
                      onChange={() => setTwoFA(!twoFA)}
                      className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300 transition-all duration-200"
                    />
                    <span className="text-base text-gray-700 font-medium">Enable Two-Factor Authentication</span>
                  </label>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-xs text-gray-500 font-medium">Recent Logins:</span>
                    <ul className="text-xs text-gray-600 list-disc list-inside">
                      <li>Chrome on MacOS - New York, USA (2 hours ago)</li>
                      <li>Safari on iPhone - San Francisco, USA (Yesterday)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Language & Region Settings */}
              <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-blue-100 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-7 h-7 text-blue-600" />
                  <h2 className="text-xl font-bold text-blue-700">Language & Region</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Language</label>
                    <select
                      value={language}
                      onChange={e => setLanguage(e.target.value)}
                      className="rounded-xl border border-gray-200 px-4 py-2 bg-white text-base text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-200"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Region</label>
                    <select
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                      className="rounded-xl border border-gray-200 px-4 py-2 bg-white text-base text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-200"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Integrations Settings */}
              <section className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-purple-100 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Key className="w-7 h-7 text-purple-600" />
                  <h2 className="text-xl font-bold text-purple-700">Integrations</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold shadow transition-all duration-300 ${notionConnected ? 'bg-green-100 text-green-700' : 'bg-white text-indigo-600 border border-indigo-200'}`}
                    onClick={() => setNotionConnected(!notionConnected)}
                  >
                    <FileText className="w-5 h-5" />
                    {notionConnected ? 'Notion Connected' : 'Connect Notion'}
                  </button>
                  <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold shadow transition-all duration-300 ${slackConnected ? 'bg-green-100 text-green-700' : 'bg-white text-indigo-600 border border-indigo-200'}`}
                    onClick={() => setSlackConnected(!slackConnected)}
                  >
                    <Slack className="w-5 h-5" />
                    {slackConnected ? 'Slack Connected' : 'Connect Slack'}
                  </button>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings; 