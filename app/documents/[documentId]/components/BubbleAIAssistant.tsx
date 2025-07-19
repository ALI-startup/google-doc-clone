import { useEditorStore } from '@/store/use-editor-store';
import { BubbleMenu } from '@tiptap/react';
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Languages, 
  CheckCircle,
  RotateCcw
} from 'lucide-react';

const BubbleAIAssistant = () => {
  const { editor } = useEditorStore();
  
  const aiActions = [
    { icon: Wand2, label: 'Improve', action: () => handleAIAction('improve') },
    { icon: CheckCircle, label: 'Fix', action: () => handleAIAction('grammar') },
    { icon: FileText, label: 'Summarize', action: () => handleAIAction('summarize') },
    { icon: Languages, label: 'Translate', action: () => handleAIAction('translate') },
    { icon: RotateCcw, label: 'Rewrite', action: () => handleAIAction('rewrite') }
  ];

  const handleAIAction = (action) => {
    const selectedText = editor?.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );
    console.log(`AI Action: ${action} on text:`, selectedText);
  };

  return (
    <BubbleMenu 
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'top' }}
    >
      <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl p-2 flex items-center gap-1">
        {/* AI Indicator */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-blue-50 rounded-lg mr-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-700 tracking-tight">AI</span>
        </div>
        
        {/* AI Actions */}
        {aiActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all duration-150 group min-w-[44px]"
              type="button"
            >
              <IconComponent className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
              <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-700 leading-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </BubbleMenu>
  );
};

export default BubbleAIAssistant;