import React from 'react';
import { StudentProfile, Course, Language, Theme } from '../types'; // Tambahkan Theme
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  profile: StudentProfile;
  courses: Course[];
  language: Language;
  theme: Theme; // Tambahkan prop Theme di sini
}

const Dashboard: React.FC<DashboardProps> = ({ profile, courses, language, theme }) => {
  const t = TRANSLATIONS[language].dashboard;

  // LOGIKA WARNA DINAMIS (Menggunakan prop theme, bukan classList)
  const isDarkMode = theme === 'dark';
  
  // Perbaikan Warna: Gunakan PUTIH (#FFFFFF) saat gelap agar terbaca jelas
  const axisTextColor = isDarkMode ? '#FFFFFF' : '#374151'; // White vs Gray-700
  const gridColor = isDarkMode ? '#4b5563' : '#e5e7eb'; // Gray-600 vs Gray-200
  const tooltipBgColor = isDarkMode ? '#1f2937' : '#ffffff';
  const tooltipTextColor = isDarkMode ? '#f3f4f6' : '#111827';

  const averageGrade = courses.length > 0 
    ? Math.round(courses.reduce((acc, curr) => acc + curr.grade, 0) / courses.length) 
    : 0;

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return '#22c55e';
    if (grade >= 75) return '#eab308';
    if (grade >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const chartMinWidth = courses.length > 4 ? `${courses.length * 120}px` : '100%';

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
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Skor Engagement</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">164</p>
        </div>

         <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg text-yellow-600 dark:text-yellow-400">
              <AlertCircle size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Kategori Performa</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">Medium</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t.coursePerf}</h3>
          
          <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div style={{ minWidth: chartMinWidth, height: '450px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courses} margin={{ bottom: 0, top: 10, right: 10, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  
                  {/* AXIS X: Teks Putih (saat dark mode) + Miring */}
                  <XAxis 
                    dataKey="name" 
                    tick={{fontSize: 12, fill: axisTextColor}} 
                    interval={0} 
                    height={100} 
                    angle={-40}
                    textAnchor="end"
                    dy={10}
                  />
                  
                  {/* AXIS Y: Teks Putih (saat dark mode) */}
                  <YAxis 
                     domain={[0, 100]} 
                     tick={{fontSize: 11, fill: axisTextColor}}
                  />
                  
                  <Tooltip 
                    contentStyle={{
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      backgroundColor: tooltipBgColor,
                      color: tooltipTextColor
                    }}
                    itemStyle={{ color: tooltipTextColor }}
                    cursor={{fill: isDarkMode ? '#374151' : '#f3f4f6', opacity: 0.4}}
                  />
                  <Bar dataKey="grade" radius={[4, 4, 0, 0]} barSize={50}>
                    {courses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getGradeColor(entry.grade)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Learning Profile Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t.learningProfile}</h3>
          <div className="space-y-6">
             <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2">{t.learningStyle}</span>
                <span className="text-sm font-medium px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full inline-block border border-red-100 dark:border-red-900/30">
                    {profile.learningStyle}
                </span>
             </div>
             
             <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Klaster ML (Segmentasi)</span>
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-md font-medium">
                        Cluster ID: 0
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-md font-medium">
                        Konsistensi: 0.38
                    </span>
                </div>
             </div>

             <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                    <p className="text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1">Tips Pro</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 leading-relaxed">
                        Perbarui aktivitas LMS Anda. Sistem mendeteksi korelasi tinggi antara frekuensi login dan nilai akhir pada Cluster 0.
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;