import React, { useState } from 'react';
import { AnalysisResult, RecommendationType, StudentProfile, Course, Language } from '../types';
import { generateRecommendations } from '../services/geminiService';
import { Sparkles, Book, Video, Users, ExternalLink, RefreshCw, Lightbulb } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface AIRecommendationsProps {
  profile: StudentProfile;
  courses: Course[];
  language: Language;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ profile, courses, language }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = TRANSLATIONS[language].recommendations;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateRecommendations(profile, courses, language);
      setResult(data);
    } catch (err: any) {
      setError(err.message || t.failed);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: RecommendationType) => {
    switch (type) {
      case RecommendationType.COURSE: return <Video className="text-blue-500" />;
      case RecommendationType.MATERIAL: return <Book className="text-green-500" />;
      case RecommendationType.GROUP: return <Users className="text-purple-500" />;
      case RecommendationType.STRATEGY: return <Lightbulb className="text-yellow-500" />;
      default: return <Sparkles className="text-gray-500" />;
    }
  };

  const getRelevanceColor = (score: number) => {
      if (score >= 90) return 'bg-red-100 text-red-700';
      if (score >= 70) return 'bg-orange-100 text-orange-700';
      return 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <Sparkles className="text-primary-600" />
             {t.title}
           </h1>
           <p className="text-gray-500 mt-1">
             {t.subtitle}
           </p>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            loading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary-600 to-red-600 hover:from-primary-700 hover:to-red-700 text-white'
          }`}
        >
          {loading ? (
             <RefreshCw className="animate-spin" size={20} />
          ) : (
             <Sparkles size={20} />
          )}
          <span className="font-semibold">{loading ? t.analyzingBtn : result ? t.regenerateBtn : t.analyzeBtn}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
           <div className="bg-primary-50 p-4 rounded-full mb-4">
             <BrainCircuitIcon className="w-12 h-12 text-primary-400" />
           </div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.readyTitle}</h3>
           <p className="text-gray-500 max-w-md mx-auto">
             {t.readyDesc}
           </p>
        </div>
      )}

      {/* Loading State Skeleton */}
      {loading && (
         <div className="space-y-4 animate-pulse">
            <div className="h-24 bg-gray-200 rounded-xl w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
            </div>
         </div>
      )}

      {/* Results View */}
      {result && !loading && (
        <div className="space-y-8 animate-fade-in">
          {/* Summary Section */}
          <div className="bg-gradient-to-br from-red-900 to-primary-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
                <Sparkles size={120} />
            </div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="text-yellow-300" />
                {t.summary}
            </h3>
            <p className="text-red-50 leading-relaxed text-lg">
                {result.summary}
            </p>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="p-5 flex-1">
                   <div className="flex justify-between items-start mb-3">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        {getTypeIcon(rec.type)}
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getRelevanceColor(rec.relevanceScore)}`}>
                        {rec.relevanceScore}% {t.match}
                      </span>
                   </div>
                   
                   <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                     {rec.title}
                   </h4>
                   
                   <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                     {rec.description}
                   </p>

                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                     <p className="text-xs text-gray-500 italic">
                       {t.reason}: <span className="font-medium text-gray-600">{rec.reasoning}</span>
                     </p>
                   </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-between items-center">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {rec.type}
                   </span>
                   {rec.platformOrLink && (
                      <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center gap-1">
                         {rec.platformOrLink} <ExternalLink size={14} />
                      </button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Simple icon for empty state
const BrainCircuitIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.97-3.465"/><path d="M20 14.535A4 4 0 0 1 18 18"/></svg>
)

export default AIRecommendations;