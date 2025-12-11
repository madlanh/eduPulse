import React from 'react';
import { StudentProfile, Course, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  profile: StudentProfile;
  courses: Course[];
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, courses, language }) => {
  const t = TRANSLATIONS[language].dashboard;

  const averageGrade = courses.length > 0 
    ? Math.round(courses.reduce((acc, curr) => acc + curr.grade, 0) / courses.length) 
    : 0;

  const strugglingCount = courses.filter(c => c.grade < 75).length;

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return '#22c55e'; // Green
    if (grade >= 75) return '#3b82f6'; // Blue
    if (grade >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.welcome}, {profile.name} 👋</h1>
        <p className="text-gray-500 dark:text-gray-400">{t.overview}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.gpa}</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{profile.gpa.toFixed(2)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
              <Award size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.avgScore}</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{averageGrade}%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
              <Clock size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.semesters}</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{profile.semester}</p>
        </div>

         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400">
              <AlertCircle size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.needFocus}</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{strugglingCount} {t.courses}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t.coursePerf}</h3>
          {/* Increased height to h-80 to accommodate rotated labels */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courses} margin={{ bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--tw-prose-invert-hr, #e5e7eb)" className="dark:opacity-20" />
                <XAxis 
                  dataKey="name" 
                  tick={{fontSize: 11, fill: 'currentColor'}} 
                  interval={0} 
                  height={80} 
                  angle={-45}
                  textAnchor="end"
                  className="text-gray-500 dark:text-gray-400"
                />
                <YAxis domain={[0, 100]} className="text-gray-500 dark:text-gray-400" tick={{fill: 'currentColor'}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'var(--tw-bg-opacity, #fff)',
                  }}
                  cursor={{fill: 'currentColor', opacity: 0.1}}
                  itemStyle={{color: '#374151'}}
                />
                <Bar dataKey="grade" radius={[4, 4, 0, 0]}>
                  {courses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getGradeColor(entry.grade)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t.learningProfile}</h3>
          <div className="space-y-4">
             <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">{t.learningStyle}</span>
                <span className="text-md font-medium px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full inline-block">
                    {profile.learningStyle}
                </span>
             </div>
             <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">{t.majorInterest}</span>
                <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                            {interest}
                        </span>
                    ))}
                </div>
             </div>
             <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">{t.struggles}</span>
                 <div className="flex flex-wrap gap-2">
                    {profile.weaknesses.map((w, i) => (
                        <span key={i} className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-md">
                            {w}
                        </span>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
