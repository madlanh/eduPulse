import React, { useState } from 'react';
import { StudentData, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Users, BookOpen, AlertCircle, Search, ChevronRight } from 'lucide-react';

interface AdminStudentListProps {
  students: StudentData[];
  onSelectStudent: (id: string) => void;
  language: Language;
}

const AdminStudentList: React.FC<AdminStudentListProps> = ({ students, onSelectStudent, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = TRANSLATIONS[language].admin;

  const filteredStudents = students.filter(s => 
    s.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.profile.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgGpa = students.length > 0 
    ? (students.reduce((acc, curr) => acc + curr.profile.gpa, 0) / students.length).toFixed(2) 
    : '0.00';

  const atRiskCount = students.filter(s => s.profile.gpa < 2.75).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.studentList}</h1>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4 transition-colors">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.totalStudents}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{students.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4 transition-colors">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.avgGpa}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{avgGpa}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4 transition-colors">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-red-600 dark:text-red-400">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.atRisk}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{atRiskCount}</p>
          </div>
        </div>
      </div>

      {/* Search and List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex items-center">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-gray-700 dark:text-white placeholder-gray-400"
            />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.name}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.major}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.sem}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.gpa}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((s) => (
                <tr key={s.profile.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold mr-3">
                            {s.profile.name.charAt(0)}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{s.profile.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{s.profile.email}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {s.profile.major}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {s.profile.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {s.profile.gpa.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        s.profile.gpa >= 3.0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        s.profile.gpa >= 2.5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {s.profile.gpa >= 3.0 ? 'Good' : s.profile.gpa >= 2.5 ? 'Average' : 'At Risk'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                        onClick={() => onSelectStudent(s.profile.id)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 flex items-center justify-end w-full"
                    >
                        {t.viewDetail} <ChevronRight size={16} className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentList;
