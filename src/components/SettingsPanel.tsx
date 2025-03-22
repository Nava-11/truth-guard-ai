
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  RefreshCw, 
  Save,
  BellRing,
  Eye,
  EyeOff,
  AlarmClock,
  Sliders,
  Database,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsPanelProps {
  className?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ className }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    enableScanning: true,
    showWarnings: true,
    blurContent: true,
    sensitivityLevel: 70,
    scanFrequency: 'automatic',
    enableNotifications: true,
    storeScannedContent: false,
    detectHateSpeech: true,
    detectMisinformation: true,
    detectCyberbullying: true,
    detectExplicitContent: true
  });

  const handleSwitchChange = (name: string) => {
    setSettings(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      sensitivityLevel: value[0]
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 1000);
  };

  const handleClearHistory = () => {
    toast.success('Scan history cleared');
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Customize your content scanning preferences
          </p>
        </div>

        <Card className="glass-card overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">General</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableScanning">Enable content scanning</Label>
                  <p className="text-sm text-muted-foreground">Automatically scan page content for harmful material</p>
                </div>
                <Switch
                  id="enableScanning"
                  checked={settings.enableScanning}
                  onCheckedChange={() => handleSwitchChange('enableScanning')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showWarnings">Show warnings</Label>
                  <p className="text-sm text-muted-foreground">Display warning messages for detected harmful content</p>
                </div>
                <Switch
                  id="showWarnings"
                  checked={settings.showWarnings}
                  onCheckedChange={() => handleSwitchChange('showWarnings')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="blurContent">Blur harmful content</Label>
                  <p className="text-sm text-muted-foreground">Automatically blur content identified as harmful</p>
                </div>
                <Switch
                  id="blurContent"
                  checked={settings.blurContent}
                  onCheckedChange={() => handleSwitchChange('blurContent')}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sensitivityLevel">Detection sensitivity</Label>
                  <span className="text-sm font-medium">{settings.sensitivityLevel}%</span>
                </div>
                <Slider
                  id="sensitivityLevel"
                  min={0}
                  max={100}
                  step={5}
                  value={[settings.sensitivityLevel]}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Less sensitive</span>
                  <span>More sensitive</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="scanFrequency">Scan frequency</Label>
                <select
                  id="scanFrequency"
                  name="scanFrequency"
                  value={settings.scanFrequency}
                  onChange={handleSelectChange}
                  className="w-full p-2 rounded-md border border-input bg-background text-sm"
                >
                  <option value="automatic">Automatic (recommended)</option>
                  <option value="onLoad">On page load only</option>
                  <option value="manual">Manual only</option>
                  <option value="interval">Every 30 seconds</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Enable notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when harmful content is detected</p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={() => handleSwitchChange('enableNotifications')}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Content Types</h3>
              <p className="text-sm text-muted-foreground">Select which types of content to detect</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="detectHateSpeech"
                    checked={settings.detectHateSpeech}
                    onCheckedChange={() => handleSwitchChange('detectHateSpeech')}
                  />
                  <Label htmlFor="detectHateSpeech">Hate speech</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="detectMisinformation"
                    checked={settings.detectMisinformation}
                    onCheckedChange={() => handleSwitchChange('detectMisinformation')}
                  />
                  <Label htmlFor="detectMisinformation">Misinformation</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="detectCyberbullying"
                    checked={settings.detectCyberbullying}
                    onCheckedChange={() => handleSwitchChange('detectCyberbullying')}
                  />
                  <Label htmlFor="detectCyberbullying">Cyberbullying</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="detectExplicitContent"
                    checked={settings.detectExplicitContent}
                    onCheckedChange={() => handleSwitchChange('detectExplicitContent')}
                  />
                  <Label htmlFor="detectExplicitContent">Explicit content</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data & Privacy</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="storeScannedContent">Store scanned content</Label>
                  <p className="text-sm text-muted-foreground">Save content history for better detection</p>
                </div>
                <Switch
                  id="storeScannedContent"
                  checked={settings.storeScannedContent}
                  onCheckedChange={() => handleSwitchChange('storeScannedContent')}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearHistory}
                className="text-truth-red-500 hover:text-truth-red-600 hover:bg-truth-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear scan history
              </Button>
            </div>
          </div>
          
          <div className="p-6 border-t border-border">
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPanel;
