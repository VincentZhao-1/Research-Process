import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from './ui/Button';

interface InputSectionProps {
  idea: string;
  setIdea: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ idea, setIdea, onGenerate, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      onGenerate();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-academic-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-academic-100 bg-gradient-to-r from-white to-academic-50">
        <h2 className="text-lg font-semibold text-academic-900 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-primary-600" />
          Research Concept
        </h2>
        <p className="text-sm text-academic-500 mt-1">
          Describe your preliminary idea, mechanism, or the phenomenon you wish to study.
        </p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="relative flex-grow">
          <textarea
            className="w-full h-full min-h-[200px] p-4 text-academic-800 placeholder-academic-400 bg-academic-50 border border-academic-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all text-base leading-relaxed"
            placeholder="E.g., I'm interested in how firms use dynamic pricing when facing consumer reviews. Specifically, how does the quality of UGC influence pricing strategy over time?"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-academic-400 pointer-events-none bg-white/80 px-2 py-1 rounded">
            {idea.length} chars
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-academic-400">
            Pro tip: Be specific about the trade-off you envision.
          </span>
          <Button 
            onClick={onGenerate} 
            isLoading={isLoading} 
            disabled={!idea.trim()}
            icon={<Sparkles size={18} />}
            className="w-full sm:w-auto"
          >
            Generate Framework
          </Button>
        </div>
      </div>
    </div>
  );
};