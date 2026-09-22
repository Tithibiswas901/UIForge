import React, { useRef, useState } from 'react';
import { ArrowRight, Code2, Layers, MonitorSmartphone, Zap, ShieldCheck } from 'lucide-react';
import { BackgroundGraph } from '../components/BackgroundGraph';

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50 selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden relative">
      
      {/* Background Gradients & Animated Grid */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <BackgroundGraph />
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }}
        />
        {/* Glowing Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-md">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">UIForge</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#developers" className="text-slate-300 hover:text-white transition-colors">For Developers</a>
          <a 
            href="/playground" 
            className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/10 backdrop-blur-sm"
          >
            Playground <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-sm text-primary hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
          The Ultimate Developer Sandbox
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Stop guessing. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500 hover:from-purple-500 hover:to-primary transition-all duration-1000 bg-300% animate-gradient">
            Start Forging.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed hover:text-slate-200 transition-colors duration-300">
          UIForge is the god-tier component playground engineered for 10x developers. 
          Import your React components, absolutely wreck them with edge-case props, validate every WCAG guideline dynamically, and export battle-tested, production-ready code in seconds. Zero backend. Zero configuration. Total supremacy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/playground" 
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] flex items-center justify-center gap-2 group"
          >
            Launch Playground <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Code2 className="w-5 h-5" /> View Source
          </a>
        </div>
      </main>

      {/* Features Bento Grid */}
      <section id="features" className="container mx-auto px-6 py-24 relative z-10">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Weaponize Your Workflow</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Feature 1 */}
          <TiltCard className="col-span-1 md:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.08] transition-colors group shadow-2xl">
            <div className="h-12 w-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Instant Feedback Loop</h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Why waste time recompiling? Mutate props in real-time, toggle booleans, inject raw strings, and obliterate edge cases instantly. UIForge renders changes faster than you can blink.</p>
          </TiltCard>

          {/* Feature 2 */}
          <TiltCard className="col-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.08] transition-colors group shadow-2xl">
            <div className="h-12 w-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Flawless Accessibility</h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Built-in WCAG 2.1 AAA contrast validators, dynamic target-size math, and live color-blindness simulators. Never ship an inaccessible component again.</p>
          </TiltCard>

          {/* Feature 3 */}
          <TiltCard className="col-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.08] transition-colors group shadow-2xl">
            <div className="h-12 w-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <MonitorSmartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">Omni-Responsive</h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Test fluidity and constraints seamlessly. UIForge wraps your UI in a flexible, interactive canvas.</p>
          </TiltCard>

          {/* Feature 4 */}
          <TiltCard className="col-span-1 md:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.08] transition-colors group relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
              <Code2 className="w-64 h-64 -mr-16 -mt-16 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="h-12 w-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">Copy, Paste, Ship.</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Done experimenting? UIForge generates pristine, zero-dependency TSX code reflecting your exact state. No proprietary wrappers. Just raw, beautiful React code ready to be injected into your monorepo.</p>
            </div>
          </TiltCard>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-white/10 bg-white/[0.02] relative z-10">
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your workflow?</h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto">100% React. Tailored with Tailwind CSS. Zero backend required. Host it anywhere.</p>
          <a 
            href="/playground" 
            className="inline-flex px-8 py-4 bg-white text-slate-950 rounded-full font-bold transition-transform transform hover:scale-105 shadow-xl items-center gap-2"
          >
            Launch Playground <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
