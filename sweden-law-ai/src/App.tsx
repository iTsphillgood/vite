import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutGrid, FolderOpen, Search,
  Bell, Settings, Brain, Clock,
  ChevronRight, MoreVertical, Scale, Play,
  CheckCircle, Mic, HardDrive, Fingerprint,
  Database, Lock, Wifi, Zap, FileText, Upload, X, ArrowRight,
  MapPin, CreditCard, MessageCircle, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

const BankIDLogin = ({ onComplete }: { onComplete: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success'>('idle');

  useEffect(() => {
    if (status === 'scanning') setTimeout(() => setStatus('verifying'), 2000);
    if (status === 'verifying') setTimeout(() => setStatus('success'), 1500);
    if (status === 'success') setTimeout(onComplete, 1000);
  }, [status, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-50 flex items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px] text-center relative overflow-hidden">
        <div className="flex justify-center mb-8">
           <div className="flex items-center space-x-2">
             <Shield className="w-8 h-8 text-[#1a2c4e]" />
             <h2 className="text-2xl font-bold text-[#1a2c4e]">LagbokAI</h2>
           </div>
        </div>
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800">Identify yourself</h3>
              <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 relative group cursor-pointer" onClick={() => setStatus('scanning')}>
                 <div className="w-32 h-32 bg-slate-900 mx-auto rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-50 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LagbokAI-Auth')] mix-blend-overlay"></div>
                    <div className="z-10 bg-white p-1 rounded"><Shield className="w-8 h-8 text-[#1a2c4e]" /></div>
                 </div>
                 <p className="mt-4 text-sm text-slate-600 font-medium">Log in with Mobile BankID</p>
              </div>
            </motion.div>
          )}
          {status === 'scanning' && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="w-20 h-20 mx-auto border-4 border-[#1a2c4e] border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-lg font-medium text-slate-800">Check your phone...</h3>
            </motion.div>
          )}
          {status === 'verifying' && (
            <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-[#1a2c4e] rounded-full flex items-center justify-center animate-pulse"><Shield className="w-10 h-10 text-white" /></div>
              <h3 className="text-lg font-bold text-slate-800">Verifying...</h3>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">Confirmed</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Alibi Builder Component ---
const AlibiBuilder = () => {
  const [step, setStep] = useState(1);
  const [narrative, setNarrative] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [facts, setFacts] = useState<any[]>([]);

  const analyzeNarrative = () => {
    setAnalyzing(true);
    // Simulate AI extraction
    setTimeout(() => {
      setFacts([
        { id: 1, type: 'location', claim: 'At Ica Maxi Solna', time: '14:00', verified: false, source: 'Google Maps' },
        { id: 2, type: 'payment', claim: 'Bought milk', time: '14:05', verified: false, source: 'Swish/BankID' },
        { id: 3, type: 'transport', claim: 'Took bus home', time: '14:15', verified: false, source: 'SL App' },
      ]);
      setAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  const toggleVerification = (id: number) => {
    setFacts(facts.map(f => f.id === id ? { ...f, verified: !f.verified } : f));
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-blue-400' : 'text-slate-500'}`}>
              {s === 1 ? 'Your Story' : s === 2 ? 'Connect Proof' : 'Innocence Card'}
            </span>
          </div>
        ))}
        {/* Lines */}
        <div className="absolute top-[148px] left-[50%] -translate-x-1/2 w-[60%] h-0.5 bg-slate-700 -z-0"></div>
        <div className="absolute top-[148px] left-[50%] -translate-x-1/2 w-[60%] h-0.5 bg-blue-600 -z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '30%' : '60%' }}></div>
      </div>

      <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-8 h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Tell us what happened</h2>
              <p className="text-slate-400 mb-6">Write simply. "I was at..." "I met...". We will find the proof.</p>

              <textarea
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-slate-200 text-lg focus:outline-none focus:border-blue-500 resize-none mb-6"
                placeholder="Example: I was at ICA Maxi in Solna around 14:00. I bought milk and paid with Swish. Then I took the bus home..."
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  onClick={analyzeNarrative}
                  disabled={!narrative}
                  className={`px-8 py-3 rounded-xl font-bold text-white flex items-center transition ${!narrative ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20'}`}
                >
                  {analyzing ? 'Analyzing...' : 'Analyze Story'}
                  {!analyzing && <ArrowRight className="w-5 h-5 ml-2" />}
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-8 h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Let's prove it</h2>
              <p className="text-slate-400 mb-6">We found {facts.length} verifiable claims. Connect your accounts to verify.</p>

              <div className="flex-1 space-y-4">
                {facts.map((fact) => (
                  <div key={fact.id} className={`p-4 rounded-xl border transition-all duration-300 ${fact.verified ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-900 border-slate-700'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${fact.verified ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                          {fact.type === 'location' && <MapPin className="w-5 h-5" />}
                          {fact.type === 'payment' && <CreditCard className="w-5 h-5" />}
                          {fact.type === 'transport' && <Smartphone className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className={`font-bold ${fact.verified ? 'text-green-400' : 'text-white'}`}>{fact.claim}</h4>
                          <p className="text-xs text-slate-500">{fact.time} • Source: {fact.source}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleVerification(fact.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${fact.verified ? 'bg-transparent text-green-400 border border-green-500/30' : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'}`}
                      >
                        {fact.verified ? 'Verified' : `Connect ${fact.source}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white px-4">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={facts.filter(f => f.verified).length === 0}
                  className={`px-8 py-3 rounded-xl font-bold text-white flex items-center transition ${facts.filter(f => f.verified).length === 0 ? 'bg-slate-700' : 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-600/20'}`}
                >
                  Generate Innocence Card <CheckCircle className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="p-8 h-full flex flex-col items-center justify-center text-center"
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-600 shadow-2xl max-w-md w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>

                <div className="flex justify-between items-start mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">Digital Alibi</h3>
                    <p className="text-sm text-slate-400">Generated by LagbokAI</p>
                  </div>
                  <Shield className="w-10 h-10 text-green-500" />
                </div>

                <div className="space-y-4 text-left">
                  {facts.filter(f => f.verified).map((fact) => (
                    <div key={fact.id} className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-medium">{fact.claim}</p>
                        <p className="text-xs text-slate-500">{fact.time} • Verified via {fact.source}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Confidence Score</p>
                      <p className="text-3xl font-bold text-green-400">98%</p>
                    </div>
                    <div className="h-12 w-12 bg-white p-1 rounded-lg">
                       <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                         <div className="text-[8px] text-slate-500 text-center leading-none">SECURE<br/>HASH</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-x-4">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg">Download PDF</button>
                <button onClick={() => setStep(1)} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium">Start Over</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'alibi' | 'dashboard'>('alibi');

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
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Citizen Mode</p>
          <button onClick={() => setActiveView('alibi')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition ${activeView === 'alibi' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}>
            <Fingerprint className="w-5 h-5" />
            <span className="font-medium text-sm">My Alibi</span>
          </button>
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition ${activeView === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
            <LayoutGrid className="w-5 h-5" />
            <span className="font-medium text-sm">Case Status</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-slate-900">JD</div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-medium text-white truncate">Johan Doe</p>
               <p className="text-xs text-slate-500 truncate">Private Account</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0F172A]">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white capitalize">{activeView === 'alibi' ? 'Alibi Builder' : 'Dashboard'}</h2>
          <div className="flex items-center space-x-4">
             <Bell className="w-5 h-5 text-slate-400" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {activeView === 'alibi' ? (
            <AlibiBuilder />
          ) : (
            <div className="max-w-4xl mx-auto text-center pt-20">
              <h2 className="text-3xl font-bold text-white mb-4">Case #2025-001</h2>
              <p className="text-slate-400">Current Status: <span className="text-yellow-400 font-bold">Investigation Ongoing</span></p>
              <div className="mt-12 p-8 border border-dashed border-slate-700 rounded-xl">
                <p className="text-slate-500">Your lawyer has not shared any new documents yet.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
