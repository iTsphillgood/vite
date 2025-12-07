import React, { useState } from 'react';
import {
  Shield, LayoutGrid, FolderOpen, Search, Command,
  Bell, Settings, User, Clock, Brain, FileText,
  ChevronRight, MoreVertical, Scale, Play, MapPin,
  AlertTriangle, CheckCircle, Mic, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface CaseFile {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'video' | 'audio' | 'image';
  size?: string;
  date: string;
}

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const GlassCard = ({ children, className = '' }: any) => (
  <div className={`glass-card rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'files' | 'analysis'>('dashboard');
  const [selectedFile, setSelectedFile] = useState<CaseFile | null>(null);

  // Mock Files for "File Explorer"
  const files: CaseFile[] = [
    { id: '1', name: 'Förundersökningsprotokoll (FUP)', type: 'folder', date: '2025-02-14' },
    { id: '2', name: 'Surveillance_ICA_Maxi.mp4', type: 'video', size: '2.4 GB', date: '2025-02-13' },
    { id: '3', name: 'BankID_Logs_Export.csv', type: 'pdf', size: '142 KB', date: '2025-02-13' },
    { id: '4', name: 'Witness_Statement_Andersson.mp3', type: 'audio', size: '14 MB', date: '2025-02-12' },
    { id: '5', name: 'Crime_Scene_Photos', type: 'folder', date: '2025-02-12' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0B0F19] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative">

      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />

      {/* Sidebar (Dock) */}
      <aside className="w-64 h-full glass-panel flex flex-col z-20 border-r border-white/5">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">LagbokAI</h1>
            <p className="text-[10px] text-blue-400 font-mono tracking-wider">v3.0.1 BETA</p>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-2 mt-4">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Workspace</p>
          <SidebarItem icon={LayoutGrid} label="Dashboard" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <SidebarItem icon={FolderOpen} label="Case Explorer" active={activeView === 'files'} onClick={() => setActiveView('files')} />
          <SidebarItem icon={Brain} label="Innocence Analysis" active={activeView === 'analysis'} onClick={() => setActiveView('analysis')} />
          <SidebarItem icon={Scale} label="Legal Research" active={false} onClick={() => {}} />
        </div>

        <div className="p-4 border-t border-white/5">
           <SidebarItem icon={Settings} label="System Settings" />
           <div className="mt-4 flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-xs">JD</div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-white truncate">Johan Doe</p>
               <p className="text-xs text-slate-500 truncate">Advokatfirman Vinge</p>
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition" />
              <input
                type="text"
                placeholder="Ask LagbokAI or search cases (Cmd+K)"
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                 <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/5 rounded border border-white/10">⌘K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <button className="p-2 text-slate-400 hover:text-white transition relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0B0F19]"></span>
             </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-auto p-8">
          <AnimatePresence mode="wait">

            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-12 gap-6"
              >
                {/* Welcome Widget */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="h-full flex flex-col justify-center space-y-2 mb-8">
                    <h2 className="text-3xl font-bold text-white">Good Morning, Johan</h2>
                    <p className="text-slate-400">You have <span className="text-blue-400 font-bold">3 active cases</span> requiring attention today. The "Innocence Project" module has finished analyzing the BankID logs.</p>
                  </div>

                  {/* Quick Stats Bento */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <GlassCard className="flex flex-col justify-between h-32">
                      <div className="p-2 bg-blue-500/10 w-fit rounded-lg"><Clock className="w-5 h-5 text-blue-400" /></div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">14h</h4>
                        <p className="text-xs text-slate-500">Saved this week</p>
                      </div>
                    </GlassCard>
                    <GlassCard className="flex flex-col justify-between h-32">
                      <div className="p-2 bg-green-500/10 w-fit rounded-lg"><CheckCircle className="w-5 h-5 text-green-400" /></div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">94%</h4>
                        <p className="text-xs text-slate-500">Accuracy Score</p>
                      </div>
                    </GlassCard>
                    <GlassCard className="flex flex-col justify-between h-32 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="p-2 bg-purple-500/10 w-fit rounded-lg relative z-10"><Brain className="w-5 h-5 text-purple-400" /></div>
                      <div className="relative z-10">
                        <h4 className="text-2xl font-bold text-white">New</h4>
                        <p className="text-xs text-slate-500">Gemini 1.5 Pro Model</p>
                      </div>
                    </GlassCard>
                  </div>
                </div>

                {/* AI Assistant Widget */}
                <div className="col-span-12 lg:col-span-4">
                  <GlassCard className="h-full flex flex-col bg-gradient-to-b from-blue-900/10 to-slate-900/40">
                    <div className="flex items-center space-x-2 mb-4">
                      <Mic className="w-4 h-4 text-blue-400 animate-pulse" />
                      <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                    </div>
                    <div className="flex-1 space-y-4 overflow-hidden">
                       <div className="bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5">
                         <p className="text-xs text-slate-300 leading-relaxed">Based on the uploaded FUP, there is a discrepancy in the witness statement regarding the timestamp. Should I generate a timeline visualization?</p>
                       </div>
                       <div className="bg-blue-600/20 p-3 rounded-lg rounded-tr-none border border-blue-500/20 ml-8">
                         <p className="text-xs text-blue-100 leading-relaxed">Yes, compare it with the BankID logs from 14:00.</p>
                       </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <input className="w-full bg-transparent text-sm focus:outline-none text-white placeholder-slate-600" placeholder="Type a message..." />
                    </div>
                  </GlassCard>
                </div>

                {/* Recent Cases Table */}
                <div className="col-span-12">
                   <h3 className="text-lg font-bold text-white mb-4">Active Investigations</h3>
                   <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/40">
                     <table className="w-full text-left text-sm">
                       <thead className="bg-white/5 text-slate-400 font-medium">
                         <tr>
                           <th className="px-6 py-3">Case Name</th>
                           <th className="px-6 py-3">Status</th>
                           <th className="px-6 py-3">Last Updated</th>
                           <th className="px-6 py-3">AI Analysis</th>
                           <th className="px-6 py-3"></th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-slate-300">
                         {[1, 2, 3].map((i) => (
                           <tr key={i} className="hover:bg-white/5 transition cursor-pointer group">
                             <td className="px-6 py-4 font-medium text-white flex items-center">
                               <FolderOpen className="w-4 h-4 mr-3 text-blue-500" />
                               Case #2025-00{i}: {['Grov stöld', 'Narkotikabrott', 'Bedrägeri'][i-1]}
                             </td>
                             <td className="px-6 py-4">
                               <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                                 i === 1 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                 i === 2 ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                 'bg-green-500/10 text-green-500 border-green-500/20'
                               }`}>
                                 {['IN PROGRESS', 'REVIEW', 'COMPLETED'][i-1]}
                               </span>
                             </td>
                             <td className="px-6 py-4 text-slate-500">Today, 10:23 AM</td>
                             <td className="px-6 py-4">
                               <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500" style={{ width: `${i * 30}%` }}></div>
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
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center space-x-2 text-sm text-slate-400">
                     <span className="hover:text-white cursor-pointer">Cases</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className="hover:text-white cursor-pointer">#2025-001</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className="text-white font-bold">Evidence</span>
                   </div>
                   <div className="flex space-x-2">
                     <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition shadow-lg shadow-blue-600/20 flex items-center">
                       <Upload className="w-3 h-3 mr-2" /> Upload
                     </button>
                   </div>
                 </div>

                 <div className="flex-1 grid grid-cols-12 gap-6">
                   {/* File Grid */}
                   <div className="col-span-8 grid grid-cols-3 gap-4 auto-rows-min">
                     {files.map((file) => (
                       <div
                         key={file.id}
                         onClick={() => setSelectedFile(file)}
                         className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                           selectedFile?.id === file.id
                             ? 'bg-blue-600/20 border-blue-500/50'
                             : 'bg-slate-800/40 border-white/5 hover:bg-slate-800/60 hover:border-white/20'
                         }`}
                       >
                         <div className="flex justify-between items-start mb-3">
                           {file.type === 'folder' ? (
                             <FolderOpen className="w-8 h-8 text-blue-400" />
                           ) : file.type === 'video' ? (
                             <Play className="w-8 h-8 text-purple-400" />
                           ) : file.type === 'pdf' ? (
                             <FileText className="w-8 h-8 text-red-400" />
                           ) : (
                             <HardDrive className="w-8 h-8 text-slate-400" />
                           )}
                           <MoreVertical className="w-4 h-4 text-slate-600 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                         </div>
                         <p className="font-medium text-sm text-slate-200 truncate">{file.name}</p>
                         <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                            <span>{file.date}</span>
                            <span>{file.size || '4 items'}</span>
                         </div>
                       </div>
                     ))}
                   </div>

                   {/* Preview Pane */}
                   <div className="col-span-4">
                      {selectedFile ? (
                        <GlassCard className="h-full flex flex-col animate-in slide-in-from-right-4 fade-in duration-300">
                          <div className="aspect-video bg-black/40 rounded-lg mb-4 flex items-center justify-center border border-white/5 relative overflow-hidden">
                             {/* Mock Preview Content */}
                             {selectedFile.type === 'video' ? (
                               <div className="text-center">
                                 <Play className="w-12 h-12 text-white/50 mx-auto mb-2" />
                                 <p className="text-xs text-slate-500">Preview Unavailable</p>
                               </div>
                             ) : (
                               <FileText className="w-16 h-16 text-slate-700" />
                             )}
                          </div>
                          <h3 className="font-bold text-lg text-white mb-1 break-all">{selectedFile.name}</h3>
                          <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider">{selectedFile.type.toUpperCase()} • {selectedFile.size || 'N/A'}</p>

                          <div className="space-y-4">
                            <div>
                              <label className="text-xs text-slate-500 block mb-1">AI Summary</label>
                              <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                                This file contains verified logs from Swedbank for the date 2025-02-13. No irregularities detected in the hash signature.
                              </p>
                            </div>
                            <div>
                               <label className="text-xs text-slate-500 block mb-1">Metadata</label>
                               <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                                 <div className="bg-white/5 p-2 rounded">Created: 10:42 AM</div>
                                 <div className="bg-white/5 p-2 rounded">Author: System</div>
                               </div>
                            </div>
                          </div>

                          <div className="mt-auto pt-4 flex space-x-2">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium transition">Open</button>
                            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm font-medium transition">Share</button>
                          </div>
                        </GlassCard>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-2xl">
                          <FolderOpen className="w-12 h-12 mb-2 opacity-20" />
                          <p className="text-sm">Select a file to preview</p>
                        </div>
                      )}
                   </div>
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
                 {/* Re-using logic from previous conceptual app but styled */}
                 <div className="grid grid-cols-12 gap-6 h-full">
                    <div className="col-span-8 space-y-6">
                      <GlassCard className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                           <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded border border-green-500/30">INNOCENCE VERIFIED</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Timeline Reconstruction</h2>
                        <p className="text-slate-400 text-sm mb-6">Visualizing movement data from 14:00 - 14:30 based on BankID and SL Traffic logs.</p>

                        {/* Mock Timeline Visual */}
                        <div className="h-64 bg-slate-900/50 rounded-xl border border-white/10 relative flex items-center px-10">
                           <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700"></div>

                           {[
                             { t: '14:00', l: 'ICA Maxi', valid: true },
                             { t: '14:05', l: 'Crime Scene', valid: false },
                             { t: '14:15', l: 'Bus Stop', valid: true }
                           ].map((pt, i) => (
                             <div key={i} className="relative z-10 flex flex-col items-center" style={{ marginLeft: i === 0 ? '0' : '30%' }}>
                               <div className={`w-4 h-4 rounded-full border-2 ${pt.valid ? 'bg-green-500 border-green-300' : 'bg-red-500 border-red-300'} mb-2`}></div>
                               <p className="text-xs font-mono text-slate-400">{pt.t}</p>
                               <p className={`text-xs font-bold ${pt.valid ? 'text-green-400' : 'text-red-400'}`}>{pt.l}</p>
                             </div>
                           ))}
                        </div>
                      </GlassCard>
                    </div>

                    <div className="col-span-4">
                      <GlassCard className="h-full bg-slate-900/80">
                         <h3 className="font-bold text-white mb-4">AI Reasoning (CoT)</h3>
                         <div className="space-y-4 font-mono text-xs">
                           <div className="p-3 border-l-2 border-blue-500 bg-blue-500/5">
                             <p className="text-slate-300">analyzing(source: 'BankID_Logs')</p>
                             <p className="text-green-400 mt-1">-> Verified Signature 0x829A...</p>
                           </div>
                           <div className="p-3 border-l-2 border-purple-500 bg-purple-500/5">
                             <p className="text-slate-300">calc_distance(p1: 'ICA Maxi', p2: 'Storgatan 12')</p>
                             <p className="text-purple-400 mt-1">-> 4.2 km (min 12 mins drive)</p>
                           </div>
                           <div className="p-3 border-l-2 border-red-500 bg-red-500/5">
                             <p className="text-slate-300">conclusion()</p>
                             <p className="text-red-400 mt-1">-> IMPOSSIBLE_TRAVEL_TIME</p>
                           </div>
                         </div>
                      </GlassCard>
                    </div>
                 </div>
               </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}

function Upload({ className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  )
}
