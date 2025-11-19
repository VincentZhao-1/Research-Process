import React from 'react';
import { Copy, Check, FileText, Layers, Target, BrainCircuit, Zap, Microscope } from 'lucide-react';
import { Button } from './ui/Button';

interface OutputSectionProps {
  result: string | null;
  isLoading: boolean;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ result, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Simple markdown-like parser to separate sections for better visualization
  // This assumes the AI follows the requested format (### 1. Title)
  const parseSections = (text: string) => {
    if (!text) return [];
    const sections = text.split(/###\s+/);
    // remove the first empty element if text starts with ###
    if (sections[0].trim() === '') sections.shift();
    return sections.map(sec => {
      const newlineIndex = sec.indexOf('\n');
      const title = newlineIndex > -1 ? sec.substring(0, newlineIndex).trim() : sec;
      const content = newlineIndex > -1 ? sec.substring(newlineIndex).trim() : '';
      return { title, content };
    });
  };

  const sections = result ? parseSections(result) : [];

  const getIconForSection = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('phenomenon')) return <Microscope className="w-5 h-5 text-blue-600" />;
    if (lower.includes('question')) return <Target className="w-5 h-5 text-red-600" />;
    if (lower.includes('model')) return <Layers className="w-5 h-5 text-purple-600" />;
    if (lower.includes('result')) return <Zap className="w-5 h-5 text-amber-600" />;
    if (lower.includes('contribution')) return <BrainCircuit className="w-5 h-5 text-emerald-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-academic-200 p-8">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-academic-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h3 className="text-lg font-semibold text-academic-800">Designing Framework</h3>
        <p className="text-academic-500 text-center mt-2 max-w-xs">
          Consulting game theory principles and literature to structure your paper...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-academic-50 rounded-2xl border-2 border-dashed border-academic-300 p-8 text-center">
        <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
          <FileText className="w-8 h-8 text-academic-400" />
        </div>
        <h3 className="text-lg font-medium text-academic-700">No Framework Generated Yet</h3>
        <p className="text-academic-500 mt-2 max-w-sm">
          Enter your research idea on the left and click "Generate" to construct your academic blueprint.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-academic-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-academic-100 flex items-center justify-between bg-academic-50/50">
        <h2 className="text-sm font-semibold text-academic-700 uppercase tracking-wider">
          Generated Framework
        </h2>
        <Button 
          variant="outline" 
          onClick={handleCopy} 
          className="text-xs py-1.5 h-8"
          icon={copied ? <Check size={14} /> : <Copy size={14} />}
        >
          {copied ? 'Copied' : 'Copy Markdown'}
        </Button>
      </div>

      <div className="overflow-y-auto p-6 space-y-8 h-[calc(100vh-16rem)]">
        {sections.length > 0 ? sections.map((section, idx) => (
          <div key={idx} className="group">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-academic-50 rounded-lg mr-3 group-hover:bg-academic-100 transition-colors">
                {getIconForSection(section.title)}
              </div>
              <h3 className="text-xl font-serif font-bold text-academic-900">
                {section.title}
              </h3>
            </div>
            <div className="pl-[3.25rem] prose prose-academic max-w-none text-academic-700 leading-relaxed font-serif">
               {/* Rendering content safely by preserving newlines */}
               {section.content.split('\n').map((line, i) => {
                 const trimmed = line.trim();
                 if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                   return (
                     <div key={i} className="flex items-start mb-2">
                       <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-academic-400 rounded-full flex-shrink-0"></span>
                       <span>{trimmed.substring(1).trim()}</span>
                     </div>
                   );
                 }
                 if (trimmed === '') return <br key={i} />;
                 return <p key={i} className="mb-2">{line}</p>;
               })}
            </div>
            {idx < sections.length - 1 && (
              <div className="mt-8 border-b border-academic-100 w-full ml-[3.25rem]" />
            )}
          </div>
        )) : (
           // Fallback if regex fails
           <pre className="whitespace-pre-wrap font-serif text-academic-800">{result}</pre>
        )}
      </div>
    </div>
  );
};