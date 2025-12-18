import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Router
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProfileEditor from './components/ProfileEditor';
import AIRecommendations from './components/AIRecommendations';
import Login from './components/Login';
import AdminStudentList from './components/AdminStudentList';
import { MOCK_STUDENTS_DB } from './constants';
import { StudentProfile, Course, Language, UserRole, StudentData, Theme } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [language, setLanguage] = useState<Language>('id');
  const [theme, setTheme] = useState<Theme>('light');
  
  // Data State
  const [studentsDb, setStudentsDb] = useState<StudentData[]>(MOCK_STUDENTS_DB);
  const [currentStudentId, setCurrentStudentId] = useState<string>('s1');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (email: string) => {
    if (email.toLowerCase().includes('admin')) {
        setUserRole('admin');
        setSelectedStudentId(null);
    } else {
        setUserRole('student');
        setCurrentStudentId('s1');
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('student');
    setSelectedStudentId(null);
  };

  const getCurrentData = () => {
    if (userRole === 'student') {
        return studentsDb.find(s => s.profile.id === currentStudentId) || studentsDb[0];
    } else {
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
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  const { profile, courses } = getCurrentData();

  return (
    <HashRouter>
      <Layout 
        language={language} 
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
        userRole={userRole}
        showBackBtn={userRole === 'admin' && !!selectedStudentId}
        onBack={() => setSelectedStudentId(null)}
      >
        <Routes>
          {/* Routing Logic */}
          {userRole === 'admin' && !selectedStudentId ? (
             <Route path="*" element={
                <AdminStudentList 
                    students={studentsDb} 
                    language={language} 
                    onSelectStudent={(id) => setSelectedStudentId(id)}
                />
             } />
          ) : (
            <>
              <Route path="/" element={<Dashboard profile={profile} courses={courses} language={language} theme={theme}/>} />
              <Route path="/profile" element={
                <ProfileEditor 
                    profile={profile} 
                    courses={courses} 
                    onUpdateProfile={(p) => updateStudentData(p, undefined)}
                    onUpdateCourses={(c) => updateStudentData(undefined, c)}
                    language={language}
                    theme={theme}
                />
              } />
              <Route path="/recommendations" element={<AIRecommendations profile={profile} courses={courses} language={language} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;