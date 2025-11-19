import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-academic-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-academic-900 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-academic-900 tracking-tight">ScholarFrame</h1>
            <p className="text-xs text-academic-500 font-medium uppercase tracking-wider hidden sm:block">
              Research Architect for Quantitative Marketing
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-academic-600">
          <span className="flex items-center">
            <BookOpen size={16} className="mr-1.5" />
            Documentation
          </span>
          <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-semibold border border-primary-100">
             v1.0
          </span>
        </div>
      </div>
    </header>
  );
};