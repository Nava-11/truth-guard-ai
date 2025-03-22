
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Users, 
  Brain, 
  Lock, 
  Globe, 
  Mail, 
  Github, 
  Twitter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-truth-blue-50 text-truth-blue-500">
                About Us
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
                Our mission is to make the internet safer for everyone
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                We're building advanced AI tools to detect and filter harmful online content, 
                creating a more positive digital experience for users around the world.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-truth-blue-50 text-truth-blue-500">
                Our Values
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                What drives us forward
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                These core principles guide our product development and company culture
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-6 w-6 text-truth-blue-500" />,
                  title: "User-Centered Design",
                  description: "We build technology that adapts to human needs, not the other way around. Every feature is designed with real users in mind."
                },
                {
                  icon: <Brain className="h-6 w-6 text-purple-500" />,
                  title: "Ethical AI",
                  description: "We develop AI systems that are transparent, fair, and designed to promote well-being while respecting privacy and autonomy."
                },
                {
                  icon: <Lock className="h-6 w-6 text-truth-green-500" />,
                  title: "Privacy First",
                  description: "We believe your data belongs to you. Our tools work effectively while minimizing data collection and maximizing security."
                },
                {
                  icon: <Globe className="h-6 w-6 text-amber-500" />,
                  title: "Digital Citizenship",
                  description: "We promote responsible online behavior and build tools that encourage healthier digital communities."
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-truth-red-500" />,
                  title: "Protection for All",
                  description: "We design our products to be accessible to everyone, regardless of technical ability, age, or background."
                },
                {
                  icon: <Mail className="h-6 w-6 text-orange-500" />,
                  title: "Open Communication",
                  description: "We believe in transparent communication with our users and partners about how our technology works."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="h-12 w-12 rounded-xl bg-white dark:bg-black flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-truth-blue-50 text-truth-blue-500">
                Our Team
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Meet the people behind TruthGuard
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                A diverse team of experts passionate about creating a safer internet
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Chen",
                  role: "CEO & Co-Founder",
                  bio: "Former AI researcher with a passion for ethical technology and digital safety.",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                },
                {
                  name: "Mia Johnson",
                  role: "CTO & Co-Founder",
                  bio: "ML expert specialized in content analysis and natural language processing.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                },
                {
                  name: "David Park",
                  role: "Lead Engineer",
                  bio: "Browser extension specialist with experience at major tech companies.",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                },
                {
                  name: "Sarah Mitchell",
                  role: "UI/UX Designer",
                  bio: "Human-centered designer focused on creating intuitive, accessible interfaces.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                },
                {
                  name: "James Wilson",
                  role: "Data Scientist",
                  bio: "Specializes in building and fine-tuning content moderation algorithms.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                },
                {
                  name: "Elena Rodriguez",
                  role: "Policy Advisor",
                  bio: "Former tech policy expert helping align our products with global standards.",
                  image: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-truth-blue-500 mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-truth-blue-50 text-truth-blue-500">
              Get In Touch
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Have questions or feedback?
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              We'd love to hear from you. Reach out to our team for support, 
              partnerships, or just to say hello.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-6">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
