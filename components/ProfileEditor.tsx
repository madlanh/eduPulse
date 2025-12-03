import React, { useState } from 'react';
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

  const handleProfileChange = (field: keyof StudentProfile, value: any) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCourseChange = (id: string, field: keyof Course, value: any) => {
    setLocalCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Course',
      grade: 0,
      credits: 3,
      category: 'Core'
    };
    setLocalCourses([...localCourses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setLocalCourses(localCourses.filter(c => c.id !== id));
  };

  const saveAll = () => {
    // Recalculate GPA roughly
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        <button 
          onClick={saveAll}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Save size={18} />
          <span>{t.save}</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{t.personalDetails}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.fullName}</label>
            <input 
              type="text" 
              value={localProfile.name} 
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.major}</label>
            <input 
              type="text" 
              value={localProfile.major} 
              onChange={(e) => handleProfileChange('major', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.semester}</label>
            <input 
              type="number" 
              value={localProfile.semester} 
              onChange={(e) => handleProfileChange('semester', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.learningStyle}</label>
            <select 
              value={localProfile.learningStyle} 
              onChange={(e) => handleProfileChange('learningStyle', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.values(LearningStyle).map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.interests}</label>
            <input 
              type="text" 
              value={localProfile.interests.join(', ')} 
              onChange={(e) => handleProfileChange('interests', e.target.value.split(',').map(s => s.trim()))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.weaknesses}</label>
            <input 
              type="text" 
              value={localProfile.weaknesses.join(', ')} 
              onChange={(e) => handleProfileChange('weaknesses', e.target.value.split(',').map(s => s.trim()))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">{t.courseGrades}</h3>
            <button 
                onClick={addCourse}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center transition-colors"
            >
                <Plus size={16} className="mr-1" /> {t.addCourse}
            </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.courseName}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.grade} (0-100)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.credits}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.category}</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {localCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="text" 
                      value={course.name} 
                      onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                      className="w-full p-1 border-b border-gray-300 focus:border-primary-500 outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="number" 
                      value={course.grade} 
                      onChange={(e) => handleCourseChange(course.id, 'grade', parseInt(e.target.value))}
                      className="w-20 p-1 border-b border-gray-300 focus:border-primary-500 outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="number" 
                      value={course.credits} 
                      onChange={(e) => handleCourseChange(course.id, 'credits', parseInt(e.target.value))}
                      className="w-16 p-1 border-b border-gray-300 focus:border-primary-500 outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <select 
                      value={course.category} 
                      onChange={(e) => handleCourseChange(course.id, 'category', e.target.value)}
                      className="w-full p-1 border-b border-gray-300 focus:border-primary-500 outline-none bg-transparent"
                    >
                        <option>Core</option>
                        <option>Elective</option>
                        <option>Lab</option>
                        <option>General</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                        onClick={() => removeCourse(course.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={18} />
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

export default ProfileEditor;