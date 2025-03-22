import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { scanContent } from '@/lib/scannerUtils';
import { AlertTriangle, Shield, RefreshCw, Copy, Trash, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import ResultCard from './ResultCard';

interface ContentScannerProps {
  className?: string;
}

type ScanResult = {
  id: string;
  timestamp: number;
  content: string;
  issues: {
    type: 'hate' | 'misinformation' | 'bullying' | 'explicit';
    severity: 'low' | 'medium' | 'high';
    confidence: number;
    explanation: string;
  }[];
  isSafe: boolean;
  safetyScore: number;
};

const ContentScanner: React.FC<ContentScannerProps> = ({ className }) => {
  const [content, setContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Example presets for quick testing
  const contentPresets = [
    { label: 'Hate Speech Example', value: 'I absolutely hate people from that specific country. They are all terrible and should go back where they came from.' },
    { label: 'Misinformation Example', value: 'COVID-19 was created in a lab as a bioweapon, and vaccines contain microchips to track the population.' },
    { label: 'Cyberbullying Example', value: 'You are such a loser, nobody likes you. Why don\'t you just disappear, everyone would be happier.' },
    { label: 'Safe Content Example', value: 'I enjoyed reading that article about renewable energy. The advances in solar technology are promising for our future sustainability goals.' }
  ];

  const handleScan = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content to scan');
      return;
    }

    setIsScanning(true);
    try {
      // Simulate API call with our utility function
      const result = await scanContent(content);
      console.log('Scan result:', result); // Debug log
      setScanResult(result);

      // Add to recent scans
      setRecentScans(prev => [result, ...prev].slice(0, 5));

      if (!result.isSafe) {
        toast(
          'Content flagged',
          {
            description: `Safety score: ${result.safetyScore}/100`,
            icon: <AlertTriangle className="h-5 w-5 text-truth-red-500" />,
          }
        );
      } else {
        toast(
          'Content is safe',
          {
            description: `Safety score: ${result.safetyScore}/100`,
            icon: <Check className="h-5 w-5 text-truth-green-500" />,
          }
        );
      }
    } catch (error) {
      console.error('Scan error:', error);
      toast.error('Error scanning content');
    } finally {
      setIsScanning(false);
    }
  };

  const handleClear = () => {
    setContent('');
    setScanResult(null);
    textareaRef.current?.focus();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard');
  };

  const handlePresetClick = (presetValue: string) => {
    setContent(presetValue);
    setScanResult(null);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Content Scanner</h2>
          <p className="text-muted-foreground">
            Analyze text for potential harmful content, misinformation, or explicit material
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <p className="text-sm text-muted-foreground w-full mb-1">Try an example:</p>
          {contentPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePresetClick(preset.value)}
              className="text-xs"
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <Card className="glass-card overflow-hidden">
          <div className="p-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Enter or paste content to scan..."
                className="min-h-[200px] resize-y border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  disabled={!content || isScanning}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!content || isScanning}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleScan}
                      disabled={!content.trim() || isScanning}
                      className={isScanning ? 'opacity-80' : ''}
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Scan Content
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Analyze text for harmful content</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>

        {scanResult && (
          <div className="animate-slide-up">
            <ResultCard result={scanResult} />
          </div>
        )}

        {recentScans.length > 0 && !scanResult && (
          <div className="mt-8 space-y-3">
            <h3 className="text-lg font-medium">Recent Scans</h3>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div 
                  key={scan.id}
                  className="p-4 glass-card cursor-pointer hover:shadow-elevation-2 transition-all"
                  onClick={() => {
                    setContent(scan.content);
                    setScanResult(scan);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="truncate flex-1 mr-4">
                      <p className="text-sm font-medium truncate">{scan.content.substring(0, 60)}{scan.content.length > 60 ? '...' : ''}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(scan.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          scan.isSafe ? "bg-truth-green-100 text-truth-green-600" : "bg-truth-red-100 text-truth-red-600"
                        )}
                      >
                        {scan.isSafe ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentScanner;
