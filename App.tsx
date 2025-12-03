import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProfileEditor from './components/ProfileEditor';
import AIRecommendations from './components/AIRecommendations';
import Login from './components/Login';
import { INITIAL_PROFILE, INITIAL_COURSES } from './constants';
import { StudentProfile, Course, Language } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('id'); // Default to ID as per request context implication
  
  // App State - In a real app, this might come from a context or redux
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard'); // Reset tab to default for next login
  };

  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={() => setIsLoggedIn(true)} 
        language={language} 
        setLanguage={setLanguage} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} courses={courses} language={language} />;
      case 'profile':
        return (
          <ProfileEditor 
            profile={profile} 
            courses={courses} 
            onUpdateProfile={setProfile}
            onUpdateCourses={setCourses}
            language={language}
          />
        );
      case 'recommendations':
        return <AIRecommendations profile={profile} courses={courses} language={language} />;
      default:
        return <Dashboard profile={profile} courses={courses} language={language} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      language={language} 
      setLanguage={setLanguage}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;