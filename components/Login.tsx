import React, { useState } from 'react';
import { BookOpen, Globe, Moon, Sun } from 'lucide-react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginProps {
  onLogin: (email: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, language, setLanguage, theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = TRANSLATIONS[language].login;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
           {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <div className="flex bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <button 
                onClick={() => setLanguage('id')}
                className={`px-3 py-1.5 text-sm font-bold transition-colors ${language === 'id' ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
                ID
            </button>
            <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-bold transition-colors ${language === 'en' ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
                EN
            </button>
        </div>
      </div>

      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
        <div className="bg-red-600 p-8 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <BookOpen className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EduPulse</h1>
          <p className="text-red-100">{t.subtitle}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.email}</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-all"
                placeholder="username@student.university.ac.id"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.password}</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl shadow-lg transform transition-transform active:scale-95"
            >
              {t.btn}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;