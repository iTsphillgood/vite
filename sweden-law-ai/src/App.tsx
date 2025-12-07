import { useState } from 'react';
import { Shield, FileText, Brain, Upload, Clock, CheckCircle, AlertTriangle, Play, ChevronRight, Scale, BookOpen, Search as SearchIcon } from 'lucide-react';

interface TimelineEvent {
  time: string;
  location: string;
  activity: string;
  source: string;
  status: 'verified' | 'conflict';
}

interface LawSearchResult {
  id: string;
  source: string;
  title: string;
  excerpt: string;
  relevance: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analysis' | 'research'>('dashboard');
  const [analyzing, setAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LawSearchResult[] | null>(null);

  // Mock Data
  const [timeline] = useState<TimelineEvent[]>([
    { time: '14:00', location: 'ICA Maxi Stormarknad, Solna', activity: 'Purchase: Milk, Bread (BankID Verified)', source: 'Swedbank API', status: 'verified' },
    { time: '14:05', location: 'Storgatan 12 (Crime Scene)', activity: 'Alleged Robbery', source: 'Police Report (FUP)', status: 'conflict' },
    { time: '14:15', location: 'Bus Stop: Solna Centrum', activity: 'SL App Ticket Scan', source: 'SL Traffic Data', status: 'verified' },
  ]);

  const activeCases = [
    { name: 'Case #2024-892: Grov misshandel', status: 'Awaiting Forensics', statusColor: 'bg-yellow-100 text-yellow-800', date: '2 hours ago' },
    { name: 'Case #2024-112: Bedrägeri (Blocket)', status: 'Ready for Court', statusColor: 'bg-green-100 text-green-800', date: '1 day ago' },
    { name: 'Case #2024-055: Narkotikabrott', status: 'Analysis Ready', statusColor: 'bg-blue-100 text-blue-800', date: '3 days ago' },
  ];

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab('analysis');
    }, 2000);
  };

  const performSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated Search Results
    setSearchResults([
      {
        id: '1',
        source: 'Brottsbalken (1962:700) 3 kap',
        title: 'Om brott mot liv och hälsa',
        excerpt: '5 §  Den som tillfogar en annan person kroppsskada, sjukdom eller smärta eller försätter honom eller henne i vanmakt eller något annat sådant tillstånd, döms för misshandel till fängelse i högst två år.',
        relevance: 98
      },
      {
        id: '2',
        source: 'Rättegångsbalken (1942:740)',
        title: '35 kap. Om bevisning i allmänhet',
        excerpt: '1 §  Rätten skall efter samvetsgrann prövning av allt, som förekommit, avgöra, vad i målet är bevisat.',
        relevance: 85
      },
      {
        id: '3',
        source: 'NJA 2016 s. 3',
        title: 'Högsta domstolens dom',
        excerpt: 'Fråga om nödvärn vid misshandel. Högsta domstolen klargör gränserna för tillåtet våld vid självförsvar i hemmet.',
        relevance: 72
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-legal-blue text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <Shield className="h-8 w-8 text-legal-gold" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LagbokAI</h1>
              <p className="text-xs text-legal-gold uppercase tracking-wider">Swedish Legal Intelligence System</p>
            </div>
          </div>
          <nav className="flex space-x-6 text-sm font-medium">
            <button onClick={() => setActiveTab('dashboard')} className={`${activeTab === 'dashboard' ? 'text-legal-gold' : 'hover:text-legal-gold'} transition`}>Case Files</button>
            <button onClick={() => setActiveTab('research')} className={`${activeTab === 'research' ? 'text-legal-gold' : 'hover:text-legal-gold'} transition`}>Legal Research</button>
            <button onClick={() => setActiveTab('analysis')} className={`${activeTab === 'analysis' ? 'text-legal-gold' : 'hover:text-legal-gold'} transition`}>Innocence Project</button>
            <div className="flex items-center space-x-2 border-l border-blue-900 pl-6">
              <div className="h-8 w-8 rounded-full bg-slate-200 text-legal-blue flex items-center justify-center font-bold">JD</div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="text-center py-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Advance Justice with Intelligence</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Powered by Google Gemini & NotebookLM. Analyze Swedish legal precedents, visualize timelines with Veo, and uncover the truth in complex datasets.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Case Upload Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Upload className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">Ingest Evidence</h3>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition cursor-pointer group">
                  <FileText className="h-10 w-10 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition" />
                  <p className="text-slate-600 font-medium">Drop FUP (Förundersökningsprotokoll), Call Logs, or BankID History here</p>
                  <p className="text-xs text-slate-400 mt-2">Supported: PDF, JSON, TXT, CSV</p>
                </div>
                <div className="mt-6 flex justify-end">
                   <button
                    onClick={startAnalysis}
                    className="bg-legal-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition flex items-center shadow-lg shadow-blue-900/20"
                   >
                     {analyzing ? 'Processing...' : 'Analyze Evidence'}
                     {!analyzing && <ChevronRight className="ml-2 h-4 w-4" />}
                   </button>
                </div>
              </div>

              {/* Active Cases */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <div className="flex items-center space-x-3 mb-6">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-semibold">Active Investigations</h3>
                </div>
                <div className="space-y-4">
                  {activeCases.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition cursor-pointer">
                      <div>
                        <p className="font-medium text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.date}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${c.statusColor}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
             <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-slate-800 mb-2">Svensk Lag & Rättspraxis</h2>
               <p className="text-slate-500">Search across SFS, NJA, and EU Regulations instantly.</p>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8">
               <form onSubmit={performSearch} className="relative">
                 <input
                   type="text"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="e.g. 'nödvärn hemfridsbrott prejudikat'"
                   className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                 />
                 <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                 <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-legal-blue text-white px-6 py-2 rounded-md hover:bg-blue-900 transition">
                   Search
                 </button>
               </form>
             </div>

             {searchResults && (
               <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-700">Top Results</h3>
                    <span className="text-xs text-slate-500">Found {searchResults.length} matches in 0.4s</span>
                 </div>
                 {searchResults.map((result) => (
                   <div key={result.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                     <div className="flex justify-between items-start mb-2">
                       <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wide">{result.source}</span>
                       <span className="text-xs font-mono text-slate-400">{result.relevance}% relevance</span>
                     </div>
                     <h4 className="text-xl font-bold text-slate-800 mb-2 hover:text-blue-700 cursor-pointer">{result.title}</h4>
                     <p className="text-slate-600 leading-relaxed">{result.excerpt}</p>
                     <div className="mt-4 flex space-x-3">
                       <button className="text-sm font-medium text-legal-blue hover:underline flex items-center">
                         <BookOpen className="w-4 h-4 mr-1" /> Read Full Text
                       </button>
                       <button className="text-sm font-medium text-purple-600 hover:underline flex items-center">
                         <Brain className="w-4 h-4 mr-1" /> Summarize with NotebookLM
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="animate-in fade-in duration-500">
            <button onClick={() => setActiveTab('dashboard')} className="text-slate-500 hover:text-slate-800 mb-4 flex items-center text-sm font-medium">
              ← Back to Dashboard
            </button>

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Left Col: The Narrative */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">AI Legal Analysis</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Brain className="w-3 h-3 mr-1" /> Gemini 1.5 Pro
                    </span>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-4">
                      <strong>Executive Summary:</strong> Based on the cross-referenced data from BankID logs and SL traffic data, there is a <span className="text-green-600 font-bold">94% probability</span> that the suspect was not present at the crime scene.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <h4 className="font-bold text-blue-900 text-sm mb-2">Key Finding: Location Discrepancy</h4>
                      <p className="text-sm text-blue-800">
                        The prosecution claims the subject was at <em>Storgatan 12</em> at 14:05. However, a verified BankID signature for a purchase at <em>ICA Maxi Solna</em> was logged at 14:00. The travel time between these two points is minimum 15 minutes by car.
                      </p>
                    </div>
                    <p className="text-slate-600">
                      <strong>Legal Context (Svensk Lag):</strong> Under <em>Rättegångsbalken (RB)</em> Chapter 35, Section 1, the court evaluates evidence freely. This digital alibi constitutes "stark bevisning" (strong evidence) contradicting the plaintiff's timeline.
                    </p>
                  </div>
                </div>

                {/* Timeline Visualization */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-slate-500" /> Event Reconstruction
                  </h3>
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pl-8 py-2">
                    {timeline.map((event, idx) => (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                          event.status === 'conflict' ? 'bg-red-50 border-red-500 text-red-500' : 'bg-green-50 border-green-500 text-green-500'
                        }`}>
                          {event.status === 'conflict' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-3 rounded-lg">
                           <div>
                             <span className="font-mono text-sm font-bold text-slate-500">{event.time}</span>
                             <h4 className="font-bold text-slate-800">{event.location}</h4>
                             <p className="text-sm text-slate-600">{event.activity}</p>
                           </div>
                           <span className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-500 mt-2 sm:mt-0 self-start">
                             Source: {event.source}
                           </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Visual Evidence (Veo/Imagen) */}
              <div className="space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2 mb-4">
                     <Play className="w-5 h-5 text-legal-gold" />
                     <h3 className="font-bold">Veo Reconstruction</h3>
                  </div>
                  <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img
                      src="https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&q=80&w=800"
                      alt="Map reconstruction"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition duration-500"
                    />
                    <Play className="w-12 h-12 text-white opacity-80 z-10" />
                    <p className="absolute bottom-3 left-3 text-xs font-mono text-legal-gold">GENERATED BY GOOGLE VEO</p>
                  </div>
                  <p className="text-sm text-slate-300 mt-4">
                    AI-generated visualization of the travel route between ICA Maxi and Crime Scene, demonstrating the impossibility of the journey within 5 minutes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold mb-3 flex items-center">
                    <Scale className="w-5 h-5 mr-2 text-slate-500" />
                    Relevant Precedents (NJA)
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm p-3 bg-slate-50 rounded border border-slate-100 hover:border-blue-300 cursor-pointer transition group">
                      <div className="font-bold text-slate-700 group-hover:text-blue-700 transition">NJA 2015 s. 702</div>
                      <p className="text-slate-500 text-xs mt-1">Evidentiary value of digital timestamps in alibi cases.</p>
                    </li>
                    <li className="text-sm p-3 bg-slate-50 rounded border border-slate-100 hover:border-blue-300 cursor-pointer transition group">
                      <div className="font-bold text-slate-700 group-hover:text-blue-700 transition">NJA 1992 s. 532</div>
                      <p className="text-slate-500 text-xs mt-1">Prosecution's burden of proof regarding alternative timelines.</p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
