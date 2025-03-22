
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentScanner from '@/components/ContentScanner';
import SettingsPanel from '@/components/SettingsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Settings, History, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Scan and analyze content for harmful material
            </p>
          </div>
          
          <Tabs defaultValue="scanner" className="space-y-8">
            <TabsList className="glass-card w-full justify-start p-1">
              <TabsTrigger value="scanner" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                <Shield className="h-4 w-4 mr-2" />
                Scanner
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scanner" className="space-y-6">
              <ContentScanner />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsPanel />
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight">Scan History</h2>
                  <p className="text-muted-foreground">
                    View your recent content scans and analysis results
                  </p>
                  
                  <div className="py-12 text-center">
                    <History className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No scan history yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Use the scanner to analyze content, and your results will appear here
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
                  <p className="text-muted-foreground">
                    Insights from your content scanning activity
                  </p>
                  
                  <div className="py-12 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No analytics available</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Analytics will be generated as you use the content scanner
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
