import React, { useState, useEffect } from 'react';
import { StudentProfile, Course, LearningStyle, Language } from '../types';
import { Plus, Trash2, Save } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ProfileEditorProps {
  profile: StudentProfile;
  courses: Course[];
  onUpdateProfile: (p: StudentProfile) => void;
  onUpdateCourses: (c: Course[]) => void;
  language: Language;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, courses, onUpdateProfile, onUpdateCourses, language }) => {
  const [localProfile, setLocalProfile] = useState<StudentProfile>(profile);
  const [localCourses, setLocalCourses] = useState<Course[]>(courses);
  const t = TRANSLATIONS[language].profile;

  useEffect(() => {
    setLocalProfile(profile);
    setLocalCourses(courses);
  }, [profile, courses]);

  const handleProfileChange = (field: keyof StudentProfile, value: any) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCourseChange = (id: string, field: keyof Course, value: any) => {
    setLocalCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      code: 'IF-XX-NEW',
      name: 'Mata Kuliah Baru',
      grade: 0,
      credits: 3
    };
    setLocalCourses([...localCourses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setLocalCourses(localCourses.filter(c => c.id !== id));
  };

  const saveAll = () => {
    const totalCredits = localCourses.reduce((sum, c) => sum + c.credits, 0);
    const weightedPoints = localCourses.reduce((sum, c) => {
        let points = 0;
        if (c.grade >= 85) points = 4.0;
        else if (c.grade >= 75) points = 3.0;
        else if (c.grade >= 65) points = 2.0;
        else if (c.grade >= 50) points = 1.0;
        return sum + (points * c.credits);
    }, 0);
    
    const newGpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;

    onUpdateProfile({ ...localProfile, gpa: newGpa });
    onUpdateCourses(localCourses);
    alert(t.successMsg);
  };

  // UPDATE: Class ini sekarang Adaptif (Putih di Light Mode, Abu Gelap di Dark Mode)
  // Sama persis dengan style dropdown Gaya Belajar
  const formInputClass = "w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-colors";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t.title}</h2>
        <button 
          onClick={saveAll}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Save size={18} />
          <span>{t.save}</span>
        </button>
      </div>

      {/* Personal Details Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <h3 className="text-md font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
          {t.personalDetails}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t.fullName}</label>
            <input 
              type="text" 
              value={localProfile.name} 
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className={formInputClass} // Menggunakan class baru (Putih)
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t.major}</label>
            <input 
              type="text" 
              value={localProfile.major} 
              onChange={(e) => handleProfileChange('major', e.target.value)}
              className={formInputClass} // Menggunakan class baru (Putih)
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t.semester}</label>
            <input 
              type="number" 
              value={localProfile.semester} 
              onChange={(e) => handleProfileChange('semester', parseInt(e.target.value))}
              className={formInputClass} // Menggunakan class baru (Putih)
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t.learningStyle}</label>
            <select 
              value={localProfile.learningStyle} 
              onChange={(e) => handleProfileChange('learningStyle', e.target.value)}
              className={formInputClass} // Sudah Putih
            >
              {Object.values(LearningStyle).map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <h3 className="text-md font-bold text-gray-800 dark:text-white">{t.courseGrades}</h3>
            <button 
                onClick={addCourse}
                className="text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center transition-colors font-medium"
            >
                <Plus size={16} className="mr-1" /> {t.addCourse}
            </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <th className="pb-4 pl-2 font-semibold">KODE</th>
                <th className="pb-4 font-semibold">{t.courseName.toUpperCase()}</th>
                <th className="pb-4 font-semibold text-center">{t.grade.toUpperCase()}</th>
                <th className="pb-4 font-semibold text-center">{t.credits.toUpperCase()}</th>
                <th className="pb-4 pr-2 font-semibold text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {localCourses.map((course) => (
                <tr key={course.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 pl-2 align-middle">
                    <input 
                      type="text" 
                      value={course.code} 
                      onChange={(e) => handleCourseChange(course.id, 'code', e.target.value)}
                      className="bg-transparent border-none text-sm text-gray-500 dark:text-gray-400 font-medium focus:ring-0 w-full outline-none"
                    />
                  </td>
                  <td className="py-4 align-middle">
                    <input 
                      type="text" 
                      value={course.name} 
                      onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                      className="bg-transparent border-none text-sm font-bold text-gray-800 dark:text-white focus:ring-0 w-full outline-none"
                    />
                  </td>
                  <td className="py-4 align-middle text-center">
                    <input 
                      type="number" 
                      value={course.grade} 
                      onChange={(e) => handleCourseChange(course.id, 'grade', parseInt(e.target.value))}
                      className="bg-transparent border-none text-sm font-bold text-gray-800 dark:text-white text-center focus:ring-0 w-16 outline-none"
                    />
                  </td>
                  <td className="py-4 align-middle text-center">
                    <input 
                      type="number" 
                      value={course.credits} 
                      onChange={(e) => handleCourseChange(course.id, 'credits', parseInt(e.target.value))}
                      className="bg-transparent border-none text-sm text-gray-500 dark:text-gray-300 text-center focus:ring-0 w-12 outline-none"
                    />
                  </td>
                  <td className="py-4 pr-2 align-middle text-right">
                    <button 
                        onClick={() => removeCourse(course.id)}
                        className="p-2 text-red-100 bg-red-50 hover:bg-red-100 hover:text-red-500 dark:bg-red-900/20 dark:text-red-300 dark:hover:text-red-200 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {localCourses.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm italic">
                Belum ada data nilai. Klik "+ Tambah Matkul"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;