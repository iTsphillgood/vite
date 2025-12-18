import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutGrid, FolderOpen, Search,
  Bell, Settings, Brain, Clock,
  ChevronRight, MoreVertical, Scale, Play,
  CheckCircle, Mic, HardDrive, Fingerprint,
  Database, Lock, Wifi, Zap, FileText, Upload, X, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- BankID Simulation Component ---
const BankIDLogin = ({ onComplete }: { onComplete: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success'>('idle');

  useEffect(() => {
    if (status === 'scanning') {
      setTimeout(() => setStatus('verifying'), 2000);
    }
    if (status === 'verifying') {
      setTimeout(() => setStatus('success'), 1500);
    }
    if (status === 'success') {
      setTimeout(onComplete, 1000);
    }
  }, [status, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-50 flex items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px] text-center relative overflow-hidden">

        {/* BankID Logo Header */}
        <div className="flex justify-center mb-8">
           <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/BankID_logo.svg" alt="BankID" className="h-12 w-auto" onError={(e) => {
             // Fallback if image fails
             e.currentTarget.style.display = 'none';
           }} />
           <h2 className="text-2xl font-bold text-[#1a2c4e] ml-2 self-center">BankID</h2>
        </div>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-slate-800">Identify yourself</h3>
              <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 relative group cursor-pointer" onClick={() => setStatus('scanning')}>
                 <div className="w-32 h-32 bg-slate-900 mx-auto rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-50 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LagbokAI-Auth')] mix-blend-overlay"></div>
                    <div className="z-10 bg-white p-1 rounded">
                       <Shield className="w-8 h-8 text-[#1a2c4e]" />
                    </div>
                 </div>
                 <p className="mt-4 text-sm text-slate-600 font-medium">Log in with QR Code</p>
                 <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition rounded-xl"></div>
              </div>

              <div className="text-sm text-slate-400">
                <p>Open the BankID app on your mobile device and scan the QR code.</p>
              </div>
            </motion.div>
          )}

          {status === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 mx-auto border-4 border-[#1a2c4e] border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-lg font-medium text-slate-800">Scanning...</h3>
            </motion.div>
          )}

          {status === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-[#1a2c4e] rounded-full flex items-center justify-center animate-pulse">
                 <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Johan Doe</h3>
                <p className="text-sm text-slate-500">19850101-1234</p>
                <p className="text-sm text-blue-600 mt-2 font-medium">Verifying signature...</p>
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">Approved</h3>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <span>Security by Finansiell ID-Teknik</span>
           <Lock className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

// --- Smart Upload Component ---
const SmartUpload = ({ onUpload }: { onUpload: (files: any[]) => void }) => {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragActive(false);
    setProcessing(true);
    // Simulating processing
    setTimeout(() => {
      setProcessing(false);
      onUpload([
        { name: 'FUP_Bilaga_A.pdf', type: 'PDF', size: '24 MB', tag: 'Investigation' },
        { name: 'Vittnesförhör_Lisa.docx', type: 'DOCX', size: '1.2 MB', tag: 'Witness' }
      ]);
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/30'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {processing ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-white">Analyzing Documents...</p>
            <p className="text-sm text-slate-400 mt-2">Running OCR and extracting entities...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Drop Evidence Files Here</h3>
            <p className="text-slate-400 mb-6">Support for PDF (FUP), Word, Audio, and Video.</p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition">
              Browse Files
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'research' | 'upload'>('dashboard');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  if (!isAuthenticated) {
    return <BankIDLogin onComplete={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#0F172A] text-slate-200 font-sans overflow-hidden relative">

      {/* Sidebar */}
      <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col z-20">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg text-white">LagbokAI</h1>
        </div>

        <div className="flex-1 px-3 space-y-1 mt-4">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition ${activeView === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
            <LayoutGrid className="w-5 h-5" />
            <span className="font-medium text-sm">Overview</span>
          </button>
          <button onClick={() => setActiveView('upload')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition ${activeView === 'upload' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Upload className="w-5 h-5" />
            <span className="font-medium text-sm">Evidence Ingestion</span>
          </button>
          <button onClick={() => setActiveView('research')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition ${activeView === 'research' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Scale className="w-5 h-5" />
            <span className="font-medium text-sm">Legal Research</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">JD</div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-medium text-white truncate">Johan Doe</p>
               <p className="text-xs text-slate-500 truncate">Advokatfirman Vinge</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0F172A]">

        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white capitalize">{activeView.replace('_', ' ')}</h2>
          <div className="flex items-center space-x-4">
             <div className="flex items-center text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
               <Wifi className="w-3 h-3 mr-1" /> Secure Connection
             </div>
             <Bell className="w-5 h-5 text-slate-400" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">

          {activeView === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => setActiveView('upload')}
                  className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 cursor-pointer transition group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">New Case Import</h3>
                  <p className="text-slate-400 text-sm mt-1">Upload FUP, digital evidence, or client notes.</p>
                </div>

                <div
                  onClick={() => setActiveView('research')}
                  className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 cursor-pointer transition group"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Search className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Precedent Search</h3>
                  <p className="text-slate-400 text-sm mt-1">Search NJA and RH citations with AI relevance.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                  <p className="text-slate-400 text-sm mt-1">3 documents analyzed in the last hour.</p>
                </div>
              </div>

              {/* Active Cases List */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-white">Active Cases</h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
                </div>
                <div className="divide-y divide-slate-700">
                  {[
                    { id: '2025-001', name: 'Mål B 1234-25 (Grov Stöld)', status: 'Investigation', updated: '2h ago' },
                    { id: '2025-002', name: 'Tvistemål AB vs CD', status: 'Drafting', updated: '5h ago' },
                    { id: '2025-003', name: 'Narkotikabrott Ring 1', status: 'Court Date Set', updated: '1d ago' },
                  ].map((c) => (
                    <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-700 rounded flex items-center justify-center text-slate-400">
                          <FolderOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{c.name}</p>
                          <p className="text-xs text-slate-500">Case ID: {c.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="px-2 py-1 bg-slate-900 rounded text-xs font-mono text-slate-300">{c.status}</span>
                        <span className="text-xs text-slate-500">{c.updated}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'upload' && (
            <div className="h-full flex flex-col justify-center items-center pb-20">
              <h2 className="text-3xl font-bold text-white mb-2">Evidence Ingestion</h2>
              <p className="text-slate-400 mb-10">Upload scanned Police Reports (FUP), BankID logs, or media files.</p>

              {!uploadedFiles.length ? (
                <SmartUpload onUpload={setUploadedFiles} />
              ) : (
                <div className="w-full max-w-3xl bg-slate-800 rounded-xl border border-slate-700 p-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                      Processing Complete
                    </h3>
                    <button
                      onClick={() => setUploadedFiles([])}
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      Upload New
                    </button>
                  </div>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <div className="flex items-center space-x-4">
                          <FileText className="w-8 h-8 text-blue-400" />
                          <div>
                            <p className="font-medium text-white">{file.name}</p>
                            <p className="text-xs text-slate-500">{file.size} • {file.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">{file.tag}</span>
                          <button className="text-slate-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center">
                      Analyze Files <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'research' && (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Svensk Lag & Rättspraxis</h2>
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search for concepts (e.g. 'Nödvärn i hemmet')..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-lg"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-white mb-4 flex items-center"><Database className="w-4 h-4 mr-2 text-blue-400" /> Recent Precedents</h3>
                  <ul className="space-y-4">
                    <li className="group cursor-pointer">
                      <p className="text-blue-400 text-sm font-mono mb-1 group-hover:underline">NJA 2024 s. 892</p>
                      <p className="text-slate-300 text-sm">Grov kvinnofridskränkning och bevisvärdering av målsägandens uppgifter.</p>
                    </li>
                    <li className="group cursor-pointer">
                      <p className="text-blue-400 text-sm font-mono mb-1 group-hover:underline">NJA 2024 s. 102</p>
                      <p className="text-slate-300 text-sm">Påföljdsbestämning vid flerfaldig brottslighet.</p>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-white mb-4 flex items-center"><Brain className="w-4 h-4 mr-2 text-purple-400" /> AI Insights</h3>
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                    <p className="text-xs text-purple-200 leading-relaxed">
                      "Recent trends in Hovrätten (Court of Appeal) show a 15% increase in acquittals for EncroChat-based evidence when primary chain of custody cannot be fully verified. Consider this for Case 2025-003."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
