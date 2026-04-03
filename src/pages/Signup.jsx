import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithGoogle, registerWithEmail } from '../services/authService';
import { Eye, EyeOff } from 'lucide-react';
import LogoWhite from '../assets/Logo-White.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await registerWithEmail(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] bg-white font-sans text-slate-900 selection:bg-primary/20 overflow-hidden">
      {/* Left Section - Hero Image (Same as Login) */}
      <div className="relative w-full lg:w-[35%] xl:w-[40%] hidden lg:block overflow-hidden m-3 rounded-3xl">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
          alt="Collaboration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute top-10 left-10">
          <img src={LogoWhite} alt="BillBox Logo" className="h-8 lg:h-10 object-contain" />
        </div>

        <div className="absolute bottom-16 left-12 right-12 text-white space-y-6">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            “Simply all the tools that my team and I need.”
          </h2>
          <div>
            <p className="font-bold text-lg">Karen Yue</p>
            <p className="text-white/70 text-sm">Director of Digital Marketing Technology</p>
          </div>
        </div>
      </div>

      {/* Mobile Brand Logo (visible only on small screens) */}
      <div className="lg:hidden p-8 flex items-center border-b border-slate-100">
        <img src={LogoWhite} alt="BillBox Logo" className="h-8 invert hue-rotate-180 brightness-0" />
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-[420px] space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
            <p className="text-slate-500 font-medium text-sm">Join BillBox and start designing with ease.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg text-center border border-red-100 animate-in fade-in zoom-in-95">{error}</p>}
            
            <div className="space-y-3">
              {/* Name Field */}
              <div className="relative group">
                <div className="absolute left-4 top-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-primary transition-colors">Name</div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[56px] pt-4 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-700 sm:text-sm"
                  placeholder="Alex Jordan"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <div className="absolute left-4 top-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-primary transition-colors">Email</div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[56px] pt-4 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-700 sm:text-sm"
                  placeholder="alex.jordan@gmail.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute left-4 top-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-primary transition-colors">Password</div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[56px] pt-4 px-4 pr-12 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-700 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pt-3 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative group">
                <div className="absolute left-4 top-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-primary transition-colors">Confirm password</div>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-[56px] pt-4 px-4 pr-12 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-700 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pt-3 text-slate-400 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold text-slate-400 tracking-widest">OR</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button 
            type="button"
            onClick={handleGoogleSignup}
            className="w-full h-12 bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all rounded-xl group active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-700">Sign up with Google</span>
          </button>

          <p className="text-center text-sm font-medium text-slate-500">
            Have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
