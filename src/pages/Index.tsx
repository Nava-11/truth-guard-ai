
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  MessageSquare, 
  Zap, 
  Globe, 
  Shield, 
  Check, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';

const Index = () => {
  const featuresSectionRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-truth-blue-50 text-truth-blue-500">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  Intelligent Content Protection
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Guard your online experience from harmful content
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Advanced AI-powered scanning to detect and filter out hate speech, misinformation, cyberbullying, and explicit content in real-time.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/dashboard">
                    <Button size="lg" className="rounded-full px-6">
                      Try It Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={scrollToFeatures}
                    className="rounded-full px-6"
                  >
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-truth-blue-500 to-purple-600 opacity-30 blur-xl" />
                <div className="relative glass-card shadow-glass rounded-3xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-truth-blue-100 flex items-center justify-center">
                          <ShieldCheck className="h-6 w-6 text-truth-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">Content Scanner</h3>
                          <p className="text-sm text-muted-foreground">Real-time analysis</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="h-5 bg-truth-neutral-100 rounded-full w-full animate-pulse" />
                      <div className="h-5 bg-truth-neutral-100 rounded-full w-4/5 animate-pulse" />
                      <div className="h-5 bg-truth-neutral-100 rounded-full w-3/4 animate-pulse" />
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="h-16 w-16 rounded-lg bg-truth-neutral-100 animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-truth-neutral-100 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-truth-neutral-100 rounded-full w-3/4 animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-truth-red-50 border border-truth-red-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-truth-red-500" />
                        <span className="font-medium text-truth-red-600">Potential misinformation detected</span>
                      </div>
                      <p className="text-sm text-truth-red-500">
                        This content contains claims that contradict verified sources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresSectionRef}
        className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-truth-blue-50 text-truth-blue-500">
              Key Features
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Advanced protection for your digital life
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered tools work together to create a safer online experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="h-12 w-12 rounded-xl bg-truth-blue-50 flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-truth-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Scanning</h3>
              <p className="text-muted-foreground">
                Automatically scans web content as you browse to identify potentially harmful material before you encounter it.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center mb-6">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
              <p className="text-muted-foreground">
                Receive intelligent warnings with detailed explanations about why content was flagged as potentially harmful.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="h-12 w-12 rounded-xl bg-truth-green-50 flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-truth-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-Posting Analysis</h3>
              <p className="text-muted-foreground">
                Analyzes your content before you post it online, helping you avoid sharing harmful or misleading information.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
              <p className="text-muted-foreground">
                Utilizes advanced artificial intelligence to identify hate speech, misinformation, cyberbullying, and explicit content.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fact Checking</h3>
              <p className="text-muted-foreground">
                Verifies information against trusted sources to help you identify false or misleading claims online.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="h-12 w-12 rounded-xl bg-truth-red-50 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-truth-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Reporting</h3>
              <p className="text-muted-foreground">
                Easily report harmful content that our AI might have missed to help improve detection and protect others.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-truth-blue-500 to-purple-600 opacity-20 blur-xl" />
            <div className="relative glass-card shadow-glass rounded-2xl overflow-hidden">
              <div className="p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                      Experience a safer online world today
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      Join thousands of users who trust TruthGuard to protect them from harmful content online.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Real-time content analysis',
                        'Protection against misinformation',
                        'Cyberbullying detection',
                        'Explicit content filtering',
                        'Simple, intuitive interface'
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 mr-2 text-truth-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Link to="/dashboard">
                        <Button size="lg" className="rounded-full px-6">
                          Try It Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-truth-blue-400 to-purple-500 opacity-30 blur" />
                    <div className="relative glass-card shadow-subtle rounded-xl p-6">
                      <div className="space-y-4 mb-6">
                        <div className="h-6 bg-truth-neutral-100 rounded-full w-full animate-pulse" />
                        <div className="h-6 bg-truth-neutral-100 rounded-full w-3/4 animate-pulse" />
                        <div className="h-6 bg-truth-neutral-100 rounded-full w-1/2 animate-pulse" />
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <div className="h-10 w-10 rounded-full bg-truth-blue-100 flex items-center justify-center">
                          <ShieldCheck className="h-6 w-6 text-truth-blue-500" />
                        </div>
                        <div className="ml-4">
                          <div className="h-4 bg-truth-neutral-100 rounded-full w-24 animate-pulse" />
                          <div className="h-3 bg-truth-neutral-100 rounded-full w-32 mt-1 animate-pulse" />
                        </div>
                        <div className="ml-auto">
                          <div className="h-8 w-8 rounded-full bg-truth-green-100 flex items-center justify-center">
                            <Check className="h-5 w-5 text-truth-green-500" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-truth-green-50 border border-truth-green-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Check className="h-5 w-5 text-truth-green-500" />
                          <span className="font-medium text-truth-green-600">Content verified as safe</span>
                        </div>
                        <p className="text-sm text-truth-green-500">
                          No harmful content detected in this article.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
