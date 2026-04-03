import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithGoogle, loginWithEmail } from '../services/authService';
import { Layout, Eye, EyeOff } from 'lucide-react';
import LogoWhite from '../assets/Logo-White.png';

const Login = () => {
  const [email, setEmail] = useState('alex.jordan@gmail.com');
  const [password, setPassword] = useState('**********');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] bg-white font-sans text-slate-900 selection:bg-primary/20 overflow-hidden">
      {/* Left Section - Hero Image */}
      <div className="relative w-full lg:w-[35%] xl:w-[40%] hidden lg:block overflow-hidden m-3 rounded-3xl">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
          alt="Collaboration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Brand Logo */}
        <div className="absolute top-10 left-10">
          <img src={LogoWhite} alt="BillBox Logo" className="h-8 lg:h-10 object-contain" />
        </div>

        {/* Testimonial Quote */}
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

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-[420px] space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back to BillBox</h1>
            <p className="text-slate-500 font-medium text-sm">Build your design system effortlessly with our powerful component library.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg text-center border border-red-100 animate-in fade-in zoom-in-95">{error}</p>}
            
            <div className="space-y-5">
              {/* Email Field */}
              <div className="relative group">
                <div className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-primary transition-colors">Email</div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[64px] pt-5 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-700"
                  placeholder="alex.jordan@gmail.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-primary transition-colors">Password</div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[64px] pt-5 px-4 pr-12 bg-white border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-700"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pt-4 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button type="button" className="text-sm font-bold text-primary hover:underline">Forgot password?</button>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">Remember sign in details</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold text-slate-400 tracking-widest">OR</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-12 bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all rounded-xl group active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-700">Continue with Google</span>
          </button>

          <p className="text-center text-sm font-medium text-slate-500">
            Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
