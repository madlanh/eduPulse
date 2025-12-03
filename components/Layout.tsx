import React, { ReactNode } from 'react';
import { BookOpen, User, LayoutDashboard, BrainCircuit, Globe, LogOut } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, language, setLanguage, onLogout }) => {
  const t = TRANSLATIONS[language].nav;
  
  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'profile', label: t.profile, icon: User },
    { id: 'recommendations', label: t.recommendations, icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
             <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">EduPulse</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium border-l-4 border-primary-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-4 border-t border-gray-100">
             {/* Language Switcher */}
            <div className="bg-gray-50 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600">
                    <Globe size={16} />
                    <span className="text-sm font-medium">Language</span>
                </div>
                <div className="flex bg-white rounded-md shadow-sm overflow-hidden">
                    <button 
                        onClick={() => setLanguage('id')}
                        className={`px-2 py-1 text-xs font-bold transition-colors ${language === 'id' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        ID
                    </button>
                    <button 
                         onClick={() => setLanguage('en')}
                         className={`px-2 py-1 text-xs font-bold transition-colors ${language === 'en' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        EN
                    </button>
                </div>
            </div>

            <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
                <LogOut size={20} />
                <span className="font-medium">{t.logout}</span>
            </button>

            <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg p-4 text-white text-sm">
                <p className="font-semibold mb-1">{t.protip}</p>
                <p className="opacity-90">{t.protipDesc}</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
           <div className="flex items-center space-x-2">
             <BookOpen className="text-primary-600 w-6 h-6" />
             <span className="font-bold text-gray-800">EduPulse</span>
           </div>
           
           <div className="flex items-center space-x-4">
             <button 
                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                className="font-bold text-primary-600 text-sm border border-primary-200 px-2 py-1 rounded-md"
             >
                {language.toUpperCase()}
             </button>
             <button 
                onClick={onLogout}
                className="text-gray-500 hover:text-red-600"
                aria-label="Logout"
             >
                <LogOut size={20} />
             </button>
           </div>
        </header>

         {/* Mobile Nav Bar (Bottom) - Optional additional nav for better UX could go here, but keeping header nav for simplicity as per previous code */}
         <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2 flex justify-around">
            {navItems.map((item) => (
                <button 
                key={item.id} 
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center p-2 ${activeTab === item.id ? 'text-primary-600' : 'text-gray-400'}`}
                >
                <item.icon size={20} />
                <span className="text-[10px] mt-1">{item.label}</span>
                </button>
            ))}
         </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;