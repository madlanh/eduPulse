import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProfileEditor from './components/ProfileEditor';
import AIRecommendations from './components/AIRecommendations';
import Login from './components/Login';
import AdminStudentList from './components/AdminStudentList';
import { MOCK_STUDENTS_DB } from './constants';
import { StudentProfile, Course, Language, UserRole, StudentData } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('id'); 
  
  // Data State
  const [studentsDb, setStudentsDb] = useState<StudentData[]>(MOCK_STUDENTS_DB);
  const [currentStudentId, setCurrentStudentId] = useState<string>('s1'); // Default to first student for 'student' role

  // For Admin Navigation
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    // Simple role detection logic
    if (email.toLowerCase().includes('admin')) {
        setUserRole('admin');
        setSelectedStudentId(null); // Admin starts at list view
    } else {
        setUserRole('student');
        setCurrentStudentId('s1'); // In a real app, this would fetch based on auth
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setUserRole('student');
    setSelectedStudentId(null);
  };

  // Helper to get currently active student data
  const getCurrentData = () => {
    if (userRole === 'student') {
        return studentsDb.find(s => s.profile.id === currentStudentId) || studentsDb[0];
    } else {
        // Admin mode: if selected, show that student, else return placeholder (shouldn't happen in renderContent logic)
        return studentsDb.find(s => s.profile.id === selectedStudentId) || studentsDb[0];
    }
  };

  const updateStudentData = (newProfile?: StudentProfile, newCourses?: Course[]) => {
    const targetId = userRole === 'student' ? currentStudentId : selectedStudentId;
    if (!targetId) return;

    setStudentsDb(prev => prev.map(s => {
        if (s.profile.id === targetId) {
            return {
                profile: newProfile || s.profile,
                courses: newCourses || s.courses
            };
        }
        return s;
    }));
  };

  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={handleLogin} 
        language={language} 
        setLanguage={setLanguage} 
      />
    );
  }

  // Determine what to render
  const renderContent = () => {
    // Case 1: Admin viewing list
    if (userRole === 'admin' && !selectedStudentId) {
        return (
            <AdminStudentList 
                students={studentsDb} 
                language={language} 
                onSelectStudent={(id) => {
                    setSelectedStudentId(id);
                    setActiveTab('dashboard'); // Reset tab when entering student view
                }}
            />
        );
    }

    // Case 2: Student View or Admin viewing a specific Student
    const { profile, courses } = getCurrentData();

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} courses={courses} language={language} />;
      case 'profile':
        return (
          <ProfileEditor 
            profile={profile} 
            courses={courses} 
            onUpdateProfile={(p) => updateStudentData(p, undefined)}
            onUpdateCourses={(c) => updateStudentData(undefined, c)}
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
      userRole={userRole}
      showBackBtn={userRole === 'admin' && !!selectedStudentId}
      onBack={() => setSelectedStudentId(null)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;