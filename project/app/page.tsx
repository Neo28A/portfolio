import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorkItem } from "@/components/work-item";
import { CollapsibleSection } from "@/components/collapsible-section";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, LineChart, BarChart3, Bot, Lightbulb, Github, Linkedin, Mail, Instagram, Code2, Wrench, Database, GraduationCap, Calendar } from "lucide-react";
import { PreviousRoles } from "@/components/previous-roles";

export default function Home() {
  return (
    <main className="min-h-screen w-full p-2 md:p-4">
      <div className="w-[95%] md:w-full max-w-xl mx-auto bg-background/60 backdrop-blur-xl rounded-xl p-3 md:p-6">
        <div className="theme-toggle animate-on-load">
          <ThemeToggle />
        </div>
        <div className="flex flex-row items-center gap-4 md:gap-6 animate-on-load delay-100">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                <div className="avatar-container shrink-0 cursor-pointer transition-transform hover:scale-105">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24 border border-border/30 bg-secondary">
                    <AvatarImage src="/face.jpg" alt="Chetan Kittali" />
                    <AvatarFallback className="text-base">CK</AvatarFallback>
                  </Avatar>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[85%] sm:max-w-[400px] p-0 bg-background/95 backdrop-blur-xl border-border/30 rounded-xl">
              <div className="flex flex-col items-center gap-4 p-4">
                {/* Profile Image */}
                <Avatar className="w-24 h-24 border-2 border-primary/20 bg-secondary">
                  <AvatarImage src="/face.jpg" alt="Chetan Kittali" />
                  <AvatarFallback className="text-xl">CK</AvatarFallback>
                </Avatar>
                
                {/* Name and Title */}
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold gradient-text">Chetan Kittali</h2>
                  <p className="text-sm text-muted-foreground">Data Scientist & Analyst</p>
                </div>
                
                {/* Bio */}
                <div className="w-full">
                  <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    Passionate about transforming data into actionable insights. Specializing in machine learning and statistical analysis.
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a href="https://github.com/Neo28A" target="_blank" rel="noopener noreferrer" 
                    className="p-1.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-primary transition-colors">
                    <Github size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/chetan-kittali-44b94928a/" target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-primary transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href="mailto:chetankittali7@gmail.com"
                    className="p-1.5 rounded-full bg-secondary/30 hover:bg-secondary/50 text-primary transition-colors">
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="min-w-0 flex flex-col justify-center">
            <h1 className="text-sm md:text-xl font-bold mb-1.5 md:mb-2 gradient-text">Hi, I am Chetan Kittali.</h1>
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs md:text-sm text-muted-foreground/90">
              <div className="flex items-center gap-1 md:gap-1.5 px-1.5 py-0.5 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Briefcase size={10} className="md:w-3.5 md:h-3.5 text-primary" />
                <span>Data Scientist & Analyst</span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3">
              <a 
                href="mailto:chetankittali7@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={14} className="md:w-4 md:h-4" />
              </a>
              <a 
                href="https://github.com/Neo28A" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} className="md:w-4 md:h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/chetan-kittali-44b94928a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className="md:w-4 md:h-4" />
              </a>
              <a 
                href="" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} className="md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <section className="section-container mt-8 animate-on-load delay-200">
          <h2 className="section-title">ABOUT</h2>
          <p className="block md:hidden about-text">
            <strong>Data scientist</strong> transforming data into <span className="about-highlight">insights</span>.
          </p>
          <p className="hidden md:block about-text">
            I'm a <strong>data scientist</strong> specializing in <strong>advanced data analysis</strong> and 
            <strong>machine learning</strong>. I transform complex datasets into 
            <span className="about-highlight">strategic decisions</span>.
          </p>
          
          <div className="grid grid-cols-4 gap-3 py-2">
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/20 border border-border/30">
              <LineChart size={20} className="mb-2 text-primary" />
              <span className="text-xs font-medium text-center">Data Analysis</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/20 border border-border/30">
              <BarChart3 size={20} className="mb-2 text-primary" />
              <span className="text-xs font-medium text-center">Visualization</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/20 border border-border/30">
              <Bot size={20} className="mb-2 text-primary" />
              <span className="text-xs font-medium text-center">ML Models</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/20 border border-border/30">
              <Lightbulb size={20} className="mb-2 text-primary" />
              <span className="text-xs font-medium text-center">Problem Solver</span>
            </div>
          </div>
        </section>
        
        <div className="custom-separator" />
        
        <section className="section-container animate-on-load delay-250">
          <h2 className="section-title">EXPERIENCE</h2>
          <div className="relative mt-4">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-primary/5"></div>
            
            {/* Experience item */}
            <div className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute left-[-3px] top-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background"></div>
              
              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-semibold text-base text-primary">Data Science Intern</h3>
                  <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-secondary/20">2024</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-secondary/30">
                      <span className="text-xs font-medium text-primary">H</span>
                    </div>
                    <h4 className="text-sm font-medium">Haegl Technologies</h4>
                  </div>
                  <span className="text-xs text-muted-foreground">Bangalore, India</span>
                </div>
                
                {/* <p className="hidden md:block text-xs text-muted-foreground leading-relaxed">
                Conducted advanced data analysis and built ML models, achieving significant improvements in data accuracy and processing efficiency.
                </p> */}
                {/* <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Machine Learning</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Data Analysis</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Python</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Previous Roles Component */}
          <PreviousRoles />
        </section>
        
        <div className="custom-separator" />
        
        <section className="section-container animate-on-load delay-300">
          <div className="block md:hidden">
            <CollapsibleSection title="SKILLS & EXPERTISE">
              <div className="relative space-y-4 mt-2">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-primary/5"></div>
                
                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Code2 size={14} className="text-primary" />
                      <h3 className="font-medium text-sm">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">Python</span>
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">SQL</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Wrench size={14} className="text-primary" />
                      <h3 className="font-medium text-sm">Tools</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">Tableau</span>
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">Excel</span>
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">NumPy, Pandas</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="pl-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Database size={14} className="text-primary" />
                      <h3 className="font-medium text-sm">Techniques</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">Statistical Modeling</span>
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">Data Cleaning</span>
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-secondary/20 rounded">ETL</span>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
          
          <div className="hidden md:block">
            <h2 className="section-title">SKILLS & EXPERTISE</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Code2 size={14} className="text-primary" />
                  <h3 className="font-medium text-sm">Languages</h3>
                </div>
                <div className="ml-5 space-y-1 text-xs text-muted-foreground">
                  <p>Python</p>
                  <p>SQL</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Wrench size={14} className="text-primary" />
                  <h3 className="font-medium text-sm">Tools</h3>
                </div>
                <div className="ml-5 space-y-1 text-xs text-muted-foreground">
                  <p>Tableau</p>
                  <p>Excel</p>
                  <p>NumPy, Pandas</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Database size={14} className="text-primary" />
                  <h3 className="font-medium text-sm">Techniques</h3>
                </div>
                <div className="ml-5 space-y-1 text-xs text-muted-foreground">
                  <p>Statistical Modeling</p>
                  <p>Data Cleaning</p>
                  <p>ETL</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="custom-separator" />
        
        <section className="section-container animate-on-load delay-400">
          <h2 className="section-title">RECENT WORK</h2>
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
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-primary">
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