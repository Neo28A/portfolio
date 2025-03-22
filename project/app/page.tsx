import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { ThemeToggle } from "@/components/theme-toggle";
import { WorkItem } from "@/components/work-item";
import { CollapsibleSection } from "@/components/collapsible-section";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, LineChart, BarChart3, Bot, Lightbulb, Github, Linkedin, Mail, Instagram, Code2, Wrench, Database, GraduationCap, Calendar } from "lucide-react";
import { PreviousRoles } from "@/components/previous-roles";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 py-16 bg-[#fdfff4] min-h-screen">
      <div className="w-full max-w-[568px]">
        <nav className="flex items-center justify-center mb-12 animate-on-load">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-200 animate-pulse"></span>
                {/* <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-orange-400 to-orange-200 animate-pulse animate-pulse"></span> */}
              </span>
              <a href="#meet-neo" className="text-sm font-medium text-muted-foreground/90 hover:text-primary transition-colors">
                Meet Neo
              </a>
            </div>
            <a href="#essays" className="text-sm font-medium text-muted-foreground/90 hover:text-primary transition-colors">
              Essays
            </a>
        </div>
        </nav>

        <section className="flex flex-col gap-3 pt-4 animate-on-load delay-100">
          <h1 className="text-[40px] font-semibold tracking-[-1.8px] leading-[60px] mb-4">
            <span className="inline-block transform hover:scale-[1.02] transition-all duration-300 relative">
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Chetan Kittali
              </span>
            </span>
          </h1>
          
          <div className="flex items-center gap-2 text-[14.9px] tracking-[-0.4px] font-semibold">
            <span className="text-foreground">data scientist</span>
            <div className="w-1 h-1 rounded-full bg-foreground/70"></div>
            <span className="text-foreground">analyst</span>
            <div className="w-1 h-1 rounded-full bg-foreground/70"></div>
            <span className="text-foreground">researcher</span>
          </div>
          
          <p className="text-[12.8px] leading-6 text-muted-foreground max-w-[600px] tracking-[-0.2px] font-medium">
            Hi, I'm Chetan, a data enthusiast. I'm fascinated by <span className="text-foreground font-semibold">machine learning</span> and <span className="text-foreground font-semibold">data analytics</span>. I also have a keen interest in <span className="text-foreground font-semibold">statistical modeling</span>. Always looking for new challenges to solve and datasets to explore.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <a href="https://github.com/Neo28A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <Github size={16} />
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                github
              </span>
            </a>
            <a href="https://www.linkedin.com/in/chetan-kittali-44b94928a/" 
                target="_blank" 
                rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <Linkedin size={16} />
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                linkedin
              </span>
            </a>
            <a href="https://twitter.com/chetankittali" 
                target="_blank" 
                rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                x
              </span>
            </a>
            <a href="mailto:chetankittali7@gmail.com"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-primary"
            >
              <span className="text-muted-foreground/80 group-hover:text-primary/90 transition-colors duration-200">
                <Mail size={16} />
              </span>
              <span className="font-semibold text-muted-foreground/90 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-primary/90 transition-colors duration-200">
                email
              </span>
            </a>
          </div>
        </section>
        
        {/* <section className="section-container mt-6 animate-on-load delay-200">
          <div className="grid grid-cols-4 gap-2 py-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <LineChart size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">Data Scientist</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <BarChart3 size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">Visualization</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <Bot size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">ML Models</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/20 border border-border/30">
              <Lightbulb size={16} className="mb-1.5 text-primary" />
              <span className="text-[10px] font-medium text-center">Engineer</span>
            </div>
          </div>
        </section> */}
        
        <div className="custom-separator my-3" />
        
        <section className="section-container animate-on-load delay-250">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 mb-3">Experience</h2>
          <div className="relative mt-3">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-primary/5"></div>
            
            <div className="relative pl-6">
              <div className="absolute left-[-3px] top-2 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-background"></div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-semibold text-sm text-primary">Data Science Intern</h3>
                  <span className="text-[10px] font-medium text-muted-foreground/90 px-2 py-0.5 rounded-full bg-secondary/20">2024</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-5 h-5 rounded-md bg-secondary/30">
                      <span className="text-[10px] font-semibold text-primary">H</span>
                    </div>
                    <h4 className="text-xs font-semibold text-foreground/90">Haegl Technologies</h4>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground/90">Bangalore, India</span>
            </div>
            </div>
            </div>
          </div>

          <PreviousRoles />
        </section>
        
        <div className="custom-separator my-3" />
        
        <section className="section-container animate-on-load delay-300">
          <CollapsibleSection title="Skills & Expertise">
            <div className="block md:hidden">
              <div className="relative space-y-4 mt-2">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-primary/5"></div>
                
                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Code2 size={14} className="text-primary" />
                      <h3 className="font-semibold text-sm text-foreground/90">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Python</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">SQL</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Wrench size={14} className="text-primary" />
                      <h3 className="font-semibold text-sm text-foreground/90">Tools</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Tableau</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Excel</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">NumPy, Pandas</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Database size={14} className="text-primary" />
                      <h3 className="font-semibold text-sm text-foreground/90">Techniques</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Statistical Modeling</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">Data Cleaning</span>
                      <span className="text-xs font-medium text-muted-foreground/90 px-1.5 py-0.5 bg-secondary/20 rounded">ETL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Code2 size={14} className="text-primary" />
                    <h3 className="font-semibold text-sm text-foreground/90">Languages</h3>
                  </div>
                  <div className="ml-5 space-y-1 text-xs font-medium text-muted-foreground/90">
                    <p>Python</p>
                    <p>SQL</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Wrench size={14} className="text-primary" />
                    <h3 className="font-semibold text-sm text-foreground/90">Tools</h3>
                  </div>
                  <div className="ml-5 space-y-1 text-xs font-medium text-muted-foreground/90">
                    <p>Tableau</p>
                    <p>Excel</p>
                    <p>NumPy, Pandas</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Database size={14} className="text-primary" />
                    <h3 className="font-semibold text-sm text-foreground/90">Techniques</h3>
                  </div>
                  <div className="ml-5 space-y-1 text-xs font-medium text-muted-foreground/90">
                    <p>Statistical Modeling</p>
                    <p>Data Cleaning</p>
                    <p>ETL</p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </section>
        
        <div className="custom-separator my-3" />
        
        <section className="section-container animate-on-load delay-400">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 mb-3">Recent Work</h2>
          <div className="space-y-0">
            <WorkItem 
              title="E-Commerce Product Categorization" 
              href="#ecommerce-categorization" 
              description="ML model with 98% accuracy for product classification"
            />
            <WorkItem 
              title="Superstore Sales Performance" 
              href="#superstore-analysis" 
              description="Regional sales analysis with Tableau dashboards"
            />
            <WorkItem 
              title="Healthcare Analytics" 
              href="#healthcare-analytics" 
              description="Patient health metrics analysis and visualization"
            />
            <a 
              href="#works" 
              className="group flex items-center justify-center p-2 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/90 group-hover:text-primary">
                Enter Project Gallery
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}