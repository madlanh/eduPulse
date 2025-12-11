import React, { ReactNode } from 'react';
import { BookOpen, User, LayoutDashboard, BrainCircuit, Globe, LogOut, ArrowLeft, Users, Moon, Sun } from 'lucide-react';
import { Language, UserRole, Theme } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  onLogout: () => void;
  userRole: UserRole;
  showBackBtn?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  language, 
  setLanguage, 
  theme,
  toggleTheme,
  onLogout,
  userRole,
  showBackBtn = false,
  onBack
}) => {
  const t = TRANSLATIONS[language].nav;
  
  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'profile', label: t.profile, icon: User },
    { id: 'recommendations', label: t.recommendations, icon: BrainCircuit },
  ];

  const effectiveNavItems = (userRole === 'admin' && !showBackBtn) 
    ? [{ id: 'admin-list', label: TRANSLATIONS[language].admin.studentList, icon: Users }] 
    : navItems;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col transition-colors duration-200">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
             <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">EduPulse</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {showBackBtn && (
            <button
              onClick={onBack}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-primary-700 dark:text-primary-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 mb-4 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span>{t.backToList}</span>
            </button>
          )}

          {effectiveNavItems.map((item) => {
            const Icon = item.icon;
            // Highlight if active. If in admin list view, 'admin-list' is effectively active
            const isActive = activeTab === item.id || (userRole === 'admin' && !showBackBtn && item.id === 'admin-list');
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 dark:bg-red-900/20 text-primary-600 dark:text-primary-400 font-medium border-l-4 border-primary-600 dark:border-primary-500' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-4 border-t border-gray-100 dark:border-gray-700">
             {/* Language & Theme Switcher Row */}
            <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                        <Globe size={16} />
                        <span className="text-xs font-medium">Lang</span>
                    </div>
                    <div className="flex bg-white dark:bg-gray-600 rounded-md shadow-sm overflow-hidden">
                        <button 
                            onClick={() => setLanguage('id')}
                            className={`px-2 py-1 text-[10px] font-bold transition-colors ${language === 'id' ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'}`}
                        >
                            ID
                        </button>
                        <button 
                            onClick={() => setLanguage('en')}
                            className={`px-2 py-1 text-[10px] font-bold transition-colors ${language === 'en' ? 'bg-red-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                <button 
                  onClick={toggleTheme}
                  className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
            </div>

            <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
                <LogOut size={20} />
                <span className="font-medium">{t.logout}</span>
            </button>

            {userRole === 'student' && (
                <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg p-4 text-white text-sm shadow-md">
                    <p className="font-semibold mb-1">{t.protip}</p>
                    <p className="opacity-90 text-xs">{t.protipDesc}</p>
                </div>
            )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between transition-colors">
           <div className="flex items-center space-x-2">
             {showBackBtn ? (
                 <button onClick={onBack} className="p-1 -ml-1 text-gray-600 dark:text-gray-300">
                     <ArrowLeft size={24} />
                 </button>
             ) : (
                <BookOpen className="text-primary-600 w-6 h-6" />
             )}
             <span className="font-bold text-gray-800 dark:text-white">EduPulse</span>
           </div>
           
           <div className="flex items-center space-x-3">
             <button 
                  onClick={toggleTheme}
                  className="text-gray-500 dark:text-gray-300 hover:text-primary-600"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             <button 
                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                className="font-bold text-primary-600 dark:text-primary-400 text-sm border border-primary-200 dark:border-primary-800 px-2 py-1 rounded-md"
             >
                {language.toUpperCase()}
             </button>
             <button 
                onClick={onLogout}
                className="text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                aria-label="Logout"
             >
                <LogOut size={20} />
             </button>
           </div>
        </header>

         {/* Mobile Nav Bar (Bottom) - Only show if standard view (Student or Admin View Student) */}
         {(!showBackBtn && userRole === 'admin') ? null : (
             <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-2 flex justify-around">
                {navItems.map((item) => (
                    <button 
                    key={item.id} 
                    onClick={() => onTabChange(item.id)}
                    className={`flex flex-col items-center p-2 ${activeTab === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`}
                    >
                    <item.icon size={20} />
                    <span className="text-[10px] mt-1">{item.label}</span>
                    </button>
                ))}
             </div>
         )}

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
