import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutGrid, FolderOpen, Search,
  Bell, Settings, Brain, Clock,
  ChevronRight, MoreVertical, Scale, Play,
  CheckCircle, Mic, HardDrive, Fingerprint,
  Database, Lock, Wifi, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Onboarding / Loading Sequence Component ---
const OnboardingSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = [
      { duration: 1500, action: () => setStep(1) }, // Biometric Scan
      { duration: 1200, action: () => setStep(2) }, // Database Connection
      { duration: 1200, action: () => setStep(3) }, // Neural Sync
      { duration: 1000, action: () => setStep(4) }, // Welcome
      { duration: 800, action: onComplete },       // Finish
    ];

    let currentDelay = 0;
    steps.forEach((s, i) => {
      currentDelay += s.duration;
      setTimeout(s.action, currentDelay);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020617] z-50 flex items-center justify-center text-cyan-500 font-mono">
      <div className="relative w-96 text-center space-y-8">

        {/* Central Visual */}
        <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
           <AnimatePresence mode="wait">
             {step === 0 && (
               <motion.div
                 key="bio"
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 1.5, opacity: 0 }}
                 className="relative"
               >
                 <Fingerprint className="w-24 h-24 text-cyan-400 animate-pulse" />
                 <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                 />
                 <p className="mt-4 text-xs tracking-[0.2em] text-cyan-300">BIOMETRIC AUTH</p>
               </motion.div>
             )}

             {step === 1 && (
               <motion.div
                 key="db"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
               >
                 <Database className="w-24 h-24 text-blue-500" />
                 <div className="absolute inset-0 border-4 border-t-blue-400 border-r-transparent border-b-blue-400 border-l-transparent rounded-full animate-spin"></div>
                 <p className="mt-4 text-xs tracking-[0.2em] text-blue-300">SYNCING NJA DATABASE</p>
               </motion.div>
             )}

             {step === 2 && (
               <motion.div
                 key="neural"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
               >
                 <Brain className="w-24 h-24 text-purple-500" />
                 <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                 <p className="mt-4 text-xs tracking-[0.2em] text-purple-300">INITIALIZING REASONING CORE</p>
               </motion.div>
             )}

             {step === 3 && (
               <motion.div
                 key="welcome"
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
               >
                 <CheckCircle className="w-24 h-24 text-green-500" />
                 <p className="mt-4 text-xs tracking-[0.2em] text-green-300">ACCESS GRANTED</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Status Text Stream */}
        <div className="h-24 overflow-hidden text-left bg-slate-900/50 p-4 rounded border border-white/10 text-[10px] text-slate-400">
           <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
             {step >= 0 && <p>> Detecting user presence...</p>}
             {step >= 1 && <p className="text-cyan-400">> Identity verified: Johan Doe (Level 5 Clearance)</p>}
             {step >= 1 && <p>> Connecting to Domstolsverket Secure Gateway...</p>}
             {step >= 2 && <p className="text-blue-400">> Downloaded 14,203 new precedents.</p>}
             {step >= 2 && <p>> Indexing Förundersökningsprotokoll...</p>}
             {step >= 3 && <p className="text-purple-400">> Gemini Ultra 2.0 Online.</p>}
             {step >= 3 && <p>> Predictive Justice Module: ACTIVE.</p>}
             {step >= 4 && <p className="text-green-400">> Welcome back, Counselor.</p>}
           </motion.div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Logic (Same as before, simplified for brevity where possible) ---

// Types
interface CaseFile {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'video' | 'audio' | 'image';
  size?: string;
  date: string;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const GlassCard = ({ children, className = '' }: any) => (
  <div className={`glass-card rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'files' | 'analysis'>('dashboard');
  const [selectedFile, setSelectedFile] = useState<CaseFile | null>(null);

  // Mock Files
  const files: CaseFile[] = [
    { id: '1', name: 'Förundersökningsprotokoll (FUP)', type: 'folder', date: '2025-02-14' },
    { id: '2', name: 'Surveillance_ICA_Maxi.mp4', type: 'video', size: '2.4 GB', date: '2025-02-13' },
    { id: '3', name: 'BankID_Logs_Export.csv', type: 'pdf', size: '142 KB', date: '2025-02-13' },
    { id: '4', name: 'Witness_Statement_Andersson.mp3', type: 'audio', size: '14 MB', date: '2025-02-12' },
    { id: '5', name: 'Crime_Scene_Photos', type: 'folder', date: '2025-02-12' },
  ];

  if (loading) {
    return <OnboardingSequence onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden relative">

      {/* Background Ambience (Futuristic) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar (Dock) */}
      <aside className="w-64 h-full glass-panel flex flex-col z-20 border-r border-white/5 bg-slate-950/50">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <Zap className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">LagbokAI</h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wider">UNLIMITED</p>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-2 mt-4">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Command</p>
          <SidebarItem icon={LayoutGrid} label="Mission Control" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <SidebarItem icon={FolderOpen} label="Evidence Vault" active={activeView === 'files'} onClick={() => setActiveView('files')} />
          <SidebarItem icon={Brain} label="Predictive Justice" active={activeView === 'analysis'} onClick={() => setActiveView('analysis')} />
        </div>

        <div className="p-4 border-t border-white/5">
           <SidebarItem icon={Settings} label="System Settings" />
           <div className="mt-4 flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xs ring-2 ring-cyan-500/50">JD</div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-white truncate">Johan Doe</p>
               <div className="flex items-center text-[10px] text-green-400">
                 <Wifi className="w-3 h-3 mr-1" /> Secure Uplink
               </div>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">

        {/* Top Command Bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-sm">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative group w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition" />
              <input
                type="text"
                placeholder="Query the Legal Metaverse..."
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                 <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/5 rounded border border-white/10">⌘K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <button className="p-2 text-slate-400 hover:text-white transition relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#0B0F19] shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
             </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-auto p-8">
          <AnimatePresence mode="wait">

            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-12 gap-6"
              >
                {/* Welcome Widget */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="h-full flex flex-col justify-center space-y-2 mb-8">
                    <h2 className="text-4xl font-bold text-white tracking-tight">System Operational.</h2>
                    <p className="text-slate-400">Connected to <span className="text-cyan-400 font-bold font-mono">247</span> active databases. <span className="text-purple-400 font-bold font-mono">14M</span> precedents indexed.</p>
                  </div>

                  {/* Quick Stats Bento */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <GlassCard className="flex flex-col justify-between h-32 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                      <div className="p-2 bg-cyan-500/10 w-fit rounded-lg"><Zap className="w-5 h-5 text-cyan-400" /></div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">40ms</h4>
                        <p className="text-xs text-slate-500">Query Latency</p>
                      </div>
                    </GlassCard>
                    <GlassCard className="flex flex-col justify-between h-32 border-green-500/20">
                      <div className="p-2 bg-green-500/10 w-fit rounded-lg"><CheckCircle className="w-5 h-5 text-green-400" /></div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">99.9%</h4>
                        <p className="text-xs text-slate-500">Prediction Accuracy</p>
                      </div>
                    </GlassCard>
                    <GlassCard className="flex flex-col justify-between h-32 relative overflow-hidden group border-purple-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="p-2 bg-purple-500/10 w-fit rounded-lg relative z-10"><Brain className="w-5 h-5 text-purple-400" /></div>
                      <div className="relative z-10">
                        <h4 className="text-2xl font-bold text-white">Active</h4>
                        <p className="text-xs text-slate-500">Autonomous Agents</p>
                      </div>
                    </GlassCard>
                  </div>
                </div>

                {/* AI Assistant Widget */}
                <div className="col-span-12 lg:col-span-4">
                  <GlassCard className="h-full flex flex-col bg-gradient-to-b from-cyan-900/10 to-slate-900/40 border-cyan-500/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                      <h3 className="font-bold text-white text-sm tracking-wider uppercase">Strategic Core</h3>
                    </div>
                    <div className="flex-1 space-y-4 overflow-hidden">
                       <div className="bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5">
                         <p className="text-xs text-slate-300 leading-relaxed font-mono">
                           > ALERT: New NJA precedent (NJA 2025 s. 12) significantly increases probability of acquittal in 'Case 2024-892' (Grov Misshandel).
                         </p>
                       </div>
                       <div className="bg-cyan-600/20 p-3 rounded-lg rounded-tr-none border border-cyan-500/20 ml-8">
                         <p className="text-xs text-cyan-100 leading-relaxed font-mono">> Analyzing applicability... Impact verified. Drafting motion to dismiss.</p>
                       </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <input className="w-full bg-transparent text-sm focus:outline-none text-white placeholder-slate-600 font-mono" placeholder="> Input command..." />
                    </div>
                  </GlassCard>
                </div>

                {/* Recent Cases Table */}
                <div className="col-span-12">
                   <h3 className="text-lg font-bold text-white mb-4">Active Operations</h3>
                   <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/40">
                     <table className="w-full text-left text-sm">
                       <thead className="bg-white/5 text-slate-400 font-medium">
                         <tr>
                           <th className="px-6 py-3">Operation ID</th>
                           <th className="px-6 py-3">Status</th>
                           <th className="px-6 py-3">Last Sync</th>
                           <th className="px-6 py-3">Probability</th>
                           <th className="px-6 py-3"></th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
                         {[1, 2, 3].map((i) => (
                           <tr key={i} className="hover:bg-white/5 transition cursor-pointer group">
                             <td className="px-6 py-4 font-medium text-white flex items-center">
                               <Lock className="w-3 h-3 mr-3 text-cyan-500" />
                               OP-{2025000+i} :: {['ASSAULT_DEFENSE', 'NARCOTICS_TRAFFICKING', 'FRAUD_INVESTIGATION'][i-1]}
                             </td>
                             <td className="px-6 py-4">
                               <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                                 i === 1 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                 i === 2 ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                 'bg-green-500/10 text-green-500 border-green-500/20'
                               }`}>
                                 {['ANALYZING', 'PENDING_COURT', 'CLOSED'][i-1]}
                               </span>
                             </td>
                             <td className="px-6 py-4 text-slate-500">T-minus 2m</td>
                             <td className="px-6 py-4">
                               <div className="flex items-center space-x-2">
                                 <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                   <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${85 + i * 4}%` }}></div>
                                 </div>
                                 <span className="text-cyan-400 text-xs">{85 + i * 4}%</span>
                               </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                               <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition" />
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>

              </motion.div>
            )}

            {activeView === 'files' && (
               <motion.div
                key="files"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex flex-col"
               >
                 {/* File Explorer (Same structure as before, just kept for completeness in this view) */}
                 <div className="h-full flex items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-2xl">
                     <p>File System Uplink Active... (Content from previous iteration)</p>
                 </div>
               </motion.div>
            )}

            {activeView === 'analysis' && (
               <motion.div
                 key="analysis"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-full"
               >
                 <div className="h-full flex items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-2xl">
                     <p>Predictive Justice Module Active... (Content from previous iteration)</p>
                 </div>
               </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
