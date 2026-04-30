import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  track: string;
  college: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  track?: string;
  college?: string;
}

export const Register = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    track: 'AI',
    college: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = '10-digit numeric check failed';
    }

    if (!form.college.trim()) newErrors.college = 'College/Station field cannot be empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Fix: Using spread operator to ensure other fields are preserved
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    try {
      // Fix: Proper async/await implementation with POST and headers
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Registration Successful. Welcome to Deviathon 2.0!');
        setForm({ name: '', email: '', phone: '', track: 'AI', college: '' });
      } else {
        throw new Error('Server returned an error. Please try again later.');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'A network failure occurred. Please check your connection.');
    }
  };

  return (
    <section id="register" className="py-64 px-6 relative z-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-iris/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter mb-4"
          >
            Join the <span className="text-aurora">Deviathon</span>
          </motion.h2>
          <p className="text-white/30 font-mono text-xs uppercase tracking-[0.5em]">Secure your transmission</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden backdrop-blur-xl border-white/10 bg-white/[0.05] group hover:border-iris/30 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Internal Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-iris/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-aurora/5 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-1000" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">Full Name</label>
                <div className="relative">
                  <input 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="LEX FRIDMAN"
                    className={`w-full bg-white/[0.03] border ${errors.name ? 'border-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10'} px-6 py-4 rounded-xl text-chrome placeholder:text-white/10 outline-none focus:border-iris focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all font-mono text-sm shadow-inner`}
                  />
                  {errors.name && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full hidden md:block"
                    >
                      <div className="bg-[#EF4444] text-[8px] font-black px-2 py-1 rounded-sm text-white whitespace-nowrap shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                        REQUIRED
                      </div>
                    </motion.div>
                  )}
                </div>
                {errors.name && <span className="text-[10px] text-[#EF4444] uppercase tracking-widest block mt-1 font-bold">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">Email Address</label>
                <div className="relative">
                  <input 
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="LEX@MIT.EDU"
                    className={`w-full bg-white/[0.03] border ${errors.email ? 'border-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10'} px-6 py-4 rounded-xl text-chrome placeholder:text-white/10 outline-none focus:border-iris focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all font-mono text-sm shadow-inner`}
                  />
                </div>
                {errors.email && <span className="text-[10px] text-[#EF4444] uppercase tracking-widest block mt-1 font-bold">{errors.email}</span>}
              </div>

              {/* Phone Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">Phone Connection</label>
                <div className="relative">
                  <input 
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full bg-white/[0.03] border ${errors.phone ? 'border-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10'} px-6 py-4 rounded-xl text-chrome placeholder:text-white/10 outline-none focus:border-iris focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all font-mono text-sm shadow-inner`}
                  />
                </div>
                {errors.phone && <span className="text-[10px] text-[#EF4444] uppercase tracking-widest block mt-1 font-bold">{errors.phone}</span>}
              </div>

              {/* Track Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">Sector / Track</label>
                <div className="relative">
                  <select 
                    name="track"
                    value={form.track}
                    onChange={handleChange}
                    className="w-full bg-midnight border border-white/10 px-6 py-4 rounded-xl text-chrome outline-none focus:border-iris focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all font-mono text-sm appearance-none shadow-inner"
                  >
                    <option value="AI">ARTIFICIAL INTELLIGENCE</option>
                    <option value="WEB3">WEB3 / BLOCKCHAIN</option>
                    <option value="XR">EXTENDED REALITY</option>
                    <option value="SECURITY">CYBER SECURITY</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <Send className="w-3 h-3 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            {/* College Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block">Origin / College</label>
              <div className="relative">
                <input 
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="WHERE DO YOU ENCODE?"
                  className={`w-full bg-white/[0.03] border ${errors.college ? 'border-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10'} px-6 py-4 rounded-xl text-chrome placeholder:text-white/10 outline-none focus:border-iris focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all font-mono text-sm shadow-inner`}
                />
              </div>
              {errors.college && <span className="text-[10px] text-[#EF4444] uppercase tracking-widest block mt-1 font-bold">{errors.college}</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full relative group overflow-hidden py-5 bg-chrome text-midnight font-black uppercase tracking-[0.4em] text-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-linear-to-r from-iris via-chrome to-aurora opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    INITIATE PROTOCOL
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </span>
            </button>

            {/* Status Feedback */}
            <AnimatePresence mode="wait">
              {(status === 'success' || status === 'error') && (
                <motion.div 
                  key={status}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`p-5 rounded-xl flex items-center gap-4 border ${
                    status === 'success' 
                      ? 'bg-aurora/10 border-aurora/30 text-aurora shadow-[0_0_20px_rgba(45,212,191,0.1)]' 
                      : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                    {message}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
