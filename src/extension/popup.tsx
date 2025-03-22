
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Shield, Settings, BarChart3, AlertTriangle, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { scanContent } from '../lib/scannerUtils';

interface PopupProps {}

interface Stats {
  totalScanned: number;
  blockedContent: number;
  hateSpeech: number;
  misinformation: number;
  cyberbullying: number;
  explicitContent: number;
}

const Popup: React.FC<PopupProps> = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<Stats>({
    totalScanned: 0,
    blockedContent: 0,
    hateSpeech: 0,
    misinformation: 0,
    cyberbullying: 0,
    explicitContent: 0
  });
  const [blockedSites, setBlockedSites] = useState<string[]>([]);
  const [manualText, setManualText] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Get stats from background script
    chrome.runtime.sendMessage({ action: "getStats" }, (response) => {
      if (response) {
        setStats(response);
      }
    });

    // Get blocked sites
    chrome.runtime.sendMessage({ action: "getBlockedSites" }, (response) => {
      if (response) {
        setBlockedSites(response);
      }
    });
  }, []);

  const handleManualScan = async () => {
    if (!manualText.trim()) return;
    
    setIsScanning(true);
    try {
      const result = await scanContent(manualText);
      setScanResult(result);
      
      // Send to background for stats
      chrome.runtime.sendMessage({
        action: "contentDetected",
        result
      });
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleRemoveBlockedSite = (domain: string) => {
    chrome.runtime.sendMessage({ 
      action: "removeBlockedSite", 
      domain 
    }, (response) => {
      if (response && response.success) {
        setBlockedSites(prev => prev.filter(site => site !== domain));
      }
    });
  };

  return (
    <div className="w-[350px] max-h-[500px] p-4 flex flex-col">
      <header className="flex items-center justify-center mb-4">
        <Shield className="h-6 w-6 mr-2 text-truth-green-500" />
        <h1 className="text-xl font-bold">Content Safety Scanner</h1>
      </header>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
          <TabsTrigger value="scan" className="flex-1">Scan</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto">
          <TabsContent value="dashboard" className="h-full">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Detection Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total scanned:</span>
                    <span className="font-medium">{stats.totalScanned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Harmful content blocked:</span>
                    <span className="font-medium">{stats.blockedContent}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Content types detected:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>Hate speech:</span>
                      <span>{stats.hateSpeech}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Misinformation:</span>
                      <span>{stats.misinformation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cyberbullying:</span>
                      <span>{stats.cyberbullying}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Explicit content:</span>
                      <span>{stats.explicitContent}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Blocked Sites ({blockedSites.length})</h3>
                {blockedSites.length > 0 ? (
                  <div className="max-h-[160px] overflow-y-auto border rounded-lg divide-y">
                    {blockedSites.map((site, index) => (
                      <div key={index} className="p-2 flex justify-between items-center">
                        <span className="text-sm truncate max-w-[200px]">{site}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveBlockedSite(site)}
                          className="h-6 px-2"
                        >
                          Unblock
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-muted-foreground border rounded-lg">
                    No blocked sites
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="h-full">
            <div className="space-y-4">
              <div>
                <Textarea 
                  placeholder="Enter text to scan for harmful content..." 
                  className="min-h-[120px] resize-none"
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleManualScan} 
                className="w-full"
                disabled={isScanning || !manualText.trim()}
              >
                {isScanning ? (
                  <>Scanning...</>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Scan Text
                  </>
                )}
              </Button>

              {scanResult && (
                <div className={`p-3 border rounded-lg ${scanResult.isSafe ? 'bg-truth-green-50' : 'bg-truth-red-50'}`}>
                  <div className="flex items-center mb-2">
                    {scanResult.isSafe ? (
                      <Check className="h-5 w-5 text-truth-green-500 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-truth-red-500 mr-2" />
                    )}
                    <h3 className="font-medium">
                      {scanResult.isSafe ? 'Content is safe' : 'Harmful content detected'}
                    </h3>
                  </div>
                  
                  <div className="text-sm mb-2">Safety score: {scanResult.safetyScore}/100</div>
                  
                  {scanResult.issues.length > 0 && (
                    <div className="space-y-2 mt-2">
                      <div className="text-sm font-medium">Issues detected:</div>
                      {scanResult.issues.map((issue, index) => (
                        <div key={index} className="text-xs p-2 bg-white/50 rounded border">
                          <div className="font-medium">
                            {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
                            <span className="text-muted-foreground ml-1">
                              ({issue.severity}, {Math.round(issue.confidence * 100)}% confidence)
                            </span>
                          </div>
                          <div className="mt-1">{issue.explanation}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="h-full">
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-muted-foreground">
                  Content Safety Scanner helps protect you from harmful content while browsing the web. The extension automatically detects and blocks potentially harmful content.
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Version 1.0.0
                </p>
              </div>
              
              <div className="pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    // Clear stats
                    chrome.runtime.sendMessage({ 
                      action: "resetStats"
                    });
                    // Reset stats state
                    setStats({
                      totalScanned: 0,
                      blockedContent: 0,
                      hateSpeech: 0,
                      misinformation: 0,
                      cyberbullying: 0,
                      explicitContent: 0
                    });
                  }}
                >
                  Reset Statistics
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// Render the popup
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
