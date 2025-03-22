
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Flag, 
  RefreshCw, 
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

type IssueType = 'hate' | 'misinformation' | 'bullying' | 'explicit';
type SeverityLevel = 'low' | 'medium' | 'high';

type ScanResult = {
  id: string;
  timestamp: number;
  content: string;
  issues: {
    type: IssueType;
    severity: SeverityLevel;
    confidence: number;
    explanation: string;
  }[];
  isSafe: boolean;
  safetyScore: number;
};

interface ResultCardProps {
  result: ScanResult;
  className?: string;
}

const issueColors: Record<IssueType, string> = {
  hate: 'text-truth-red-500 bg-truth-red-50',
  misinformation: 'text-amber-500 bg-amber-50',
  bullying: 'text-orange-500 bg-orange-50',
  explicit: 'text-purple-500 bg-purple-50'
};

const issueLabels: Record<IssueType, string> = {
  hate: 'Hate Speech',
  misinformation: 'Misinformation',
  bullying: 'Cyberbullying',
  explicit: 'Explicit Content'
};

const severityColors: Record<SeverityLevel, string> = {
  low: 'bg-truth-neutral-100',
  medium: 'bg-amber-100',
  high: 'bg-truth-red-100'
};

const ResultCard: React.FC<ResultCardProps> = ({ result, className }) => {
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState('');
  
  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReporting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsReporting(false);
      toast.success('Content reported successfully');
    }, 1500);
  };

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'text-truth-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-truth-red-500';
  };
  
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {result.isSafe ? (
              <div className="h-8 w-8 rounded-full bg-truth-green-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-truth-green-500" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-truth-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-truth-red-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {result.isSafe ? 'Content is safe' : 'Potentially harmful content detected'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Analyzed {new Date(result.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className={cn("text-2xl font-semibold mr-1", getSafetyColor(result.safetyScore))}>
              {result.safetyScore}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        
        {result.issues.length > 0 && (
          <div className="mb-6 space-y-4">
            <h4 className="text-sm font-medium">Detected Issues</h4>
            <div className="space-y-3">
              {result.issues.map((issue, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-white/50 dark:bg-black/20 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", issueColors[issue.type])}>
                        {issueLabels[issue.type]}
                      </span>
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", severityColors[issue.severity])}>
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Severity
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {Math.round(issue.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Rescan
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Analyze the content again</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-truth-red-500 hover:text-truth-red-600">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md glass-card">
                <DialogHeader>
                  <DialogTitle>Report Content</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReport}>
                  <div className="py-4">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Why are you reporting this content?</label>
                      <select 
                        className="w-full p-2 rounded-md border border-input bg-background text-sm"
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        required
                      >
                        <option value="">Select a reason</option>
                        <option value="hate_speech">Hate Speech</option>
                        <option value="misinformation">Misinformation</option>
                        <option value="bullying">Cyberbullying</option>
                        <option value="explicit">Explicit Content</option>
                        <option value="spam">Spam</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Additional details (optional)</label>
                      <textarea 
                        className="w-full p-2 rounded-md border border-input bg-background text-sm min-h-[100px]"
                        placeholder="Provide more information about why this content is problematic..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={!reportReason || isReporting}>
                      {isReporting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Reporting...
                        </>
                      ) : (
                        <>
                          <Flag className="h-4 w-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    More Info
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Learn more about our content scanning technology and how we detect harmful content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-truth-red-500 hover:text-truth-red-600 hover:bg-truth-red-50">
              <XCircle className="h-4 w-4 mr-2" />
              Disagree
            </Button>
            <Button variant="ghost" size="sm" className="text-truth-green-500 hover:text-truth-green-600 hover:bg-truth-green-50">
              <CheckCircle className="h-4 w-4 mr-2" />
              Accurate
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;
