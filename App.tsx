import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  Settings, 
  Bell, 
  User, 
  CheckCircle2,
  Navigation,
  Mountain,
  LayoutDashboard,
  AlertCircle,
  RefreshCw,
  Globe,
  Radio,
  Zap,
  Smartphone
} from 'lucide-react';
import { SecurityService, Vehicle, PaymentPlan } from './types';
import { SERVICES, SIKKIM_LOCATIONS } from './constants';
import { getEMICalculation } from './services/geminiService';
import CarSelector from './components/CarSelector';
import CameraFeed from './components/CameraFeed';
import MobileDemoModal from './components/MobileDemoModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'book' | 'monitor' | 'payment'>('home');
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);
  const [selectedService, setSelectedService] = useState<SecurityService | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>(SIKKIM_LOCATIONS[0]);
  const [emiPlans, setEmiPlans] = useState<PaymentPlan[]>([]);
  const [isProcessingEmi, setIsProcessingEmi] = useState(false);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<PaymentPlan | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const fetchEMIs = useCallback(async (price: number) => {
    setIsProcessingEmi(true);
    try {
      const plans = await getEMICalculation(price);
      setEmiPlans(plans);
    } catch (e) {
      console.error("EMI Fetch failed", e);
    } finally {
      setIsProcessingEmi(false);
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetchEMIs(selectedService.price);
    }
  }, [selectedService, fetchEMIs]);

  const handleBookingStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('book');
  };
  
  const handleServiceSelect = (service: SecurityService) => {
    setSelectedService(service);
  };

  const proceedToPayment = () => {
    if (selectedCar && selectedService && selectedLocation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('payment');
    }
  };

  const finishPayment = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('monitor');
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 flex flex-col md:flex-row relative overflow-hidden bg-slate-950">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=2000" 
          alt="Himalayan Mountains" 
          className="w-full h-full object-cover opacity-15 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-950" />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 md:relative md:w-24 bg-slate-900/80 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/10 z-50 flex md:flex-col items-center justify-around md:justify-center gap-8 p-4 md:p-8">
        <button onClick={() => setActiveTab('home')} className={`p-3 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <LayoutDashboard className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('book')} className={`p-3 rounded-2xl transition-all duration-300 ${activeTab === 'book' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <Settings className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('monitor')} className={`p-3 rounded-2xl transition-all duration-300 ${activeTab === 'monitor' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <ShieldCheck className="w-6 h-6" />
        </button>
        <div className="hidden md:block mt-auto">
          <button onClick={() => setIsSyncModalOpen(true)} className="p-3 text-slate-500 hover:text-cyan-400 transition-colors">
            <Smartphone className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto max-h-screen relative z-10 scroll-smooth">
        <header className="p-6 md:p-10 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-xl z-40 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">Sikkim Shield</h1>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-cyan-400 font-black tracking-[0.3em] uppercase">Security for the Heights</span>
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSyncModalOpen(true)}
              className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Sync Mobile</span>
            </button>
            <div className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-slate-200">{selectedLocation}</span>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-16">
          {activeTab === 'home' && (
            <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="relative rounded-[3rem] overflow-hidden bg-slate-900/40 border border-white/10 group backdrop-blur-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200" 
                  alt="Sikkim Landscape" 
                  className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-[3s] opacity-60"
                />
                <div className="absolute inset-0 z-20 p-8 md:p-20 flex flex-col justify-center max-w-3xl gap-8">
                  <div className="inline-flex items-center gap-3 px-5 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 backdrop-blur-md">
                    <Mountain className="w-5 h-5 text-cyan-400" />
                    <span className="text-[11px] font-black text-cyan-400 uppercase tracking-widest">Premium Himalayan Defense</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black leading-[1.1] text-white">The Summit of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Security.</span></h2>
                  <p className="text-xl text-slate-300/80 leading-relaxed font-medium">Smart monitoring systems engineered for the rugged heights of Sikkim. Real-time AI-surveillance in the palm of your hand.</p>
                  <div className="flex flex-wrap gap-5 pt-4">
                    <button 
                      onClick={handleBookingStart}
                      className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl flex items-center gap-3 transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] active:scale-95 group"
                    >
                      Get Protected <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('monitor')}
                      className="px-10 py-5 glass hover:bg-white/10 font-black text-white rounded-2xl flex items-center gap-3 transition-all active:scale-95"
                    >
                      Live Command Center
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: ShieldCheck, title: "Anti-Theft AI", desc: "Real-time behavioral analysis prevents illegal entry before it happens.", color: "text-cyan-400" },
                  { icon: Navigation, title: "Dual-Relay GPS", desc: "Military-grade tracking that stays active even in mountain dead zones.", color: "text-blue-400" },
                  { icon: CreditCard, title: "Himalayan Flex", desc: "Tailored EMI plans for all Sikkim residents with instant approval.", color: "text-purple-400" }
                ].map((feature, i) => (
                  <div key={i} className="p-10 glass rounded-[2.5rem] space-y-5 hover:border-cyan-500/50 transition-all group hover:-translate-y-2 duration-500">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-black">{feature.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'book' && (
            <section className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl">1</div>
                  <h2 className="text-4xl font-black">Select Your Vehicle</h2>
                </div>
                <CarSelector 
                  selectedId={selectedCar?.id} 
                  onSelect={setSelectedCar} 
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl">2</div>
                  <h2 className="text-4xl font-black">Service Location</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {SIKKIM_LOCATIONS.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-8 py-4 rounded-2xl font-black border transition-all duration-300 text-sm tracking-wider uppercase ${
                        selectedLocation === loc 
                          ? 'border-cyan-500 bg-cyan-500 text-slate-950 shadow-2xl shadow-cyan-500/40' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-400'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl">3</div>
                  <h2 className="text-4xl font-black">Security Tier</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICES.map(service => (
                    <div 
                      key={service.id}
                      className={`p-10 rounded-[3rem] border transition-all duration-500 cursor-pointer flex flex-col backdrop-blur-xl relative overflow-hidden group ${
                        selectedService?.id === service.id 
                          ? 'border-cyan-500 bg-cyan-500/10 scale-105' 
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      {selectedService?.id === service.id && (
                        <div className="absolute top-0 right-0 p-6">
                          <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-8">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${
                          service.tier === 'PREMIUM' ? 'bg-amber-500/20 text-amber-500' : 'bg-cyan-500/20 text-cyan-500'
                        }`}>
                          {service.tier}
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-3">{service.name}</h3>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-black text-white">₹{service.price.toLocaleString()}</span>
                        <span className="text-slate-500 text-xs font-bold">/ ONE-TIME</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed font-medium">{service.description}</p>
                      <ul className="space-y-4 mb-10">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-4 text-[13px] font-bold text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button 
                        className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${
                          selectedService?.id === service.id ? 'bg-cyan-500 text-slate-950 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {selectedService?.id === service.id ? 'Selected' : 'Select Plan'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedService && (
                <div className="p-10 glass rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10 border-cyan-500/30 animate-in fade-in zoom-in-95 duration-500">
                  <div className="space-y-3">
                    <p className="text-cyan-400 text-[11px] font-black uppercase tracking-widest">Selected Configuration</p>
                    <h4 className="text-3xl font-black text-white">{selectedService.name}</h4>
                    <p className="text-slate-400 font-medium">Protecting {selectedCar?.brand || 'Vehicle'} {selectedCar?.model} in {selectedLocation}</p>
                  </div>
                  <button 
                    onClick={proceedToPayment}
                    className="px-16 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 text-slate-950 font-black rounded-[2rem] shadow-2xl shadow-cyan-500/40 transition-all active:scale-95 flex items-center gap-3 text-lg"
                  >
                    Proceed to Payment <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </section>
          )}

          {activeTab === 'payment' && (
            <section className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-right-8 duration-700">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-black">Finalize Protection.</h2>
                <p className="text-slate-400 text-lg font-medium">Flexible financing powered by our secure Himalayan banking partner.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="p-10 glass rounded-[2.5rem] space-y-8 border-white/10 shadow-xl">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <CreditCard className="w-7 h-7 text-cyan-500" />
                      Order Summary
                    </h3>
                    <div className="space-y-5">
                      <div className="flex justify-between text-slate-300 font-bold">
                        <span>Service: {selectedService?.name}</span>
                        <span className="text-white">₹{selectedService?.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 font-medium">
                        <span>Himalayan Express Setup</span>
                        <span className="text-green-400 uppercase text-xs font-black">Included Free</span>
                      </div>
                      <div className="flex justify-between text-slate-400 font-medium">
                        <span>Sikkim State GST</span>
                        <span className="text-white">Included</span>
                      </div>
                      <div className="h-px bg-white/10 my-4" />
                      <div className="flex justify-between text-3xl font-black">
                        <span>Total</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">₹{selectedService?.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 glass rounded-[2rem] space-y-4 border-amber-500/20 bg-amber-500/5">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                      <h3 className="font-black uppercase text-xs tracking-widest text-amber-500">Local Benefit Applied</h3>
                    </div>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">Exclusive Sikkim Resident Program: Receive a 15% discount on your first year of 24/7 AI-Monitoring renewal.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black italic">Flexible EMI Plans</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1 rounded-full">AI Calculated</span>
                  </div>
                  
                  {isProcessingEmi ? (
                    <div className="flex flex-col items-center justify-center p-20 glass rounded-[2.5rem] gap-6 border-white/5">
                      <div className="relative">
                        <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin" />
                        <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse" />
                      </div>
                      <p className="text-sm text-slate-400 font-black tracking-widest uppercase">Fetching Bank Rates...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {emiPlans.map((plan, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedEmiPlan(plan)}
                          className={`w-full p-8 rounded-[2rem] border transition-all duration-300 flex justify-between items-center group ${
                            selectedEmiPlan === plan 
                              ? 'border-cyan-500 bg-cyan-500/10 shadow-2xl shadow-cyan-500/20' 
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="text-left space-y-1">
                            <p className="font-black text-xl group-hover:text-cyan-400 transition-colors">{plan.months} Months</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                              {plan.interestRate === 0 ? 'No-Cost EMI' : `${plan.interestRate}% Annual Interest`}
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-2xl font-black text-cyan-400">₹{Math.round(plan.monthlyAmount).toLocaleString()}<span className="text-xs text-slate-500 font-medium">/mo</span></p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Total: ₹{Math.round(plan.totalPayable).toLocaleString()}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <button 
                    onClick={finishPayment}
                    className="w-full py-6 bg-white text-slate-950 font-black text-xl rounded-[2rem] shadow-2xl transition-all active:scale-[0.97] hover:bg-cyan-400 hover:shadow-cyan-500/30 flex items-center justify-center gap-3 group"
                  >
                    Confirm & Complete <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'monitor' && (
            <section className="space-y-10 animate-in zoom-in-95 duration-700">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                    <h2 className="text-4xl font-black italic">Command Center</h2>
                  </div>
                  <p className="text-slate-400 font-medium">Global satellite feed active for {selectedCar?.model || 'Vehicle'}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 glass rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-colors">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Live Tracking
                  </button>
                  <button className="px-6 py-3 bg-red-500/20 text-red-500 border border-red-500/20 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-red-500/30 transition-colors">
                    Emergency SOS
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <CameraFeed />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Engine", val: "OFF", color: "text-slate-500", icon: Radio },
                      { label: "Battery", val: "94%", color: "text-green-400", icon: Zap },
                      { label: "Altitude", val: "1,650m", color: "text-cyan-400", icon: Mountain },
                      { label: "Network", val: "5G+", color: "text-blue-400", icon: Globe }
                    ].map((stat, i) => (
                      <div key={i} className="p-8 glass rounded-[2rem] text-center space-y-3 hover:border-white/20 transition-all group">
                        <div className="flex justify-center">
                          <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-125 transition-transform`} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">{stat.label}</p>
                          <p className={`text-xl font-black ${stat.color}`}>{stat.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-10 glass rounded-[3rem] space-y-8 border-white/5 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Navigation className="w-32 h-32" />
                    </div>
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <Navigation className="w-6 h-6 text-cyan-400" />
                      Live Location
                    </h3>
                    <div className="aspect-square bg-slate-950 rounded-[2rem] border border-white/5 overflow-hidden relative group cursor-crosshair">
                      <div className="absolute inset-0 opacity-20">
                         <div className="absolute top-1/4 left-1/4 w-px h-full bg-cyan-500/20" />
                         <div className="absolute top-2/4 left-0 w-full h-px bg-cyan-500/20" />
                         <div className="absolute top-3/4 left-0 w-full h-px bg-cyan-500/20" />
                         <div className="absolute top-0 left-2/4 w-px h-full bg-cyan-500/20" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping opacity-75" />
                         <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,1)]" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Log</h4>
                      {[
                        { time: "10:02 AM", title: "Geo-fence Exit", msg: "Entered Gangtok North", type: "info" },
                        { time: "09:45 AM", title: "Ignition Off", msg: "Parking mode engaged", type: "success" }
                      ].map((item, i) => (
                        <div key={i} className="relative pl-6 border-l border-white/10 pb-6 last:pb-0">
                          <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
                            item.type === 'warning' ? 'bg-amber-500' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                          }`} />
                          <p className="text-[9px] text-slate-500 font-black mb-1 uppercase tracking-tighter">{item.time}</p>
                          <h4 className="font-black text-xs text-white uppercase">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{item.msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <footer className="p-12 border-t border-white/10 mt-20 bg-slate-950/80 backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 max-w-7xl mx-auto">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-500" />
                <h3 className="text-lg font-black italic tracking-tight text-white uppercase">Sikkim Shield</h3>
              </div>
              <p className="text-[11px] text-slate-500 font-bold max-w-sm uppercase tracking-widest leading-loose">
                Premium satellite monitoring and theft prevention for the Himalayan range.
              </p>
              <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">© 2024 SIKKIM SHIELD SECURITY SYSTEMS</p>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => setIsSyncModalOpen(true)} className="p-3 bg-white/5 rounded-xl border border-white/10 text-slate-400 hover:text-cyan-400">
                  <Smartphone className="w-6 h-6" />
               </button>
            </div>
          </div>
        </footer>
      </main>

      <MobileDemoModal 
        isOpen={isSyncModalOpen} 
        onClose={() => setIsSyncModalOpen(false)} 
      />
    </div>
  );
};

export default App;