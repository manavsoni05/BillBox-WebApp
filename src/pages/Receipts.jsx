import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Upload, 
  Camera, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Trash2,
  Eye,
  Filter,
  Search,
  ArrowUpDown
} from 'lucide-react';
import useUserStore from '../store/userStore';
import { uploadReceiptImage, saveReceiptMetadata, getReceipts } from '../services/receiptService';

const Receipts = () => {
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState(null); // 'camera' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [receipts, setReceipts] = useState([]);
  const [loadingReceipts, setLoadingReceipts] = useState(true);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchReceipts();
  }, [user]);

  const fetchReceipts = async () => {
    if (user?.uid) {
      try {
        setLoadingReceipts(true);
        const data = await getReceipts(user.uid);
        setReceipts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingReceipts(false);
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setStatus('error');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPreviewUrl(dataUrl);
      
      // Convert dataUrl to File object
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
          setSelectedFile(file);
        });
        
      stopCamera();
      setUploadType('preview');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadType('preview');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    
    try {
      setUploading(true);
      const imageUrl = await uploadReceiptImage(selectedFile, user.uid);
      
      const receiptData = {
        userId: user.uid,
        imageUrl,
        vendor: "Extracted Vendor", // In real app, OCR would fill this
        amount: (Math.random() * 1000).toFixed(2),
        category: "General",
        date: new Date().toLocaleDateString(),
        vendorLogo: "https://logo.clearbit.com/stripe.com"
      };
      
      await saveReceiptMetadata(receiptData);
      setStatus('success');
      fetchReceipts();
      
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadType(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setStatus(null);
    stopCamera();
  };

  return (
    <div className="space-y-12 pb-12 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4 py-8 bg-surface-container/20 rounded-3xl border border-outline-variant/10 shadow-sm">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tighter leading-none">Receipt Repository</h1>
          <p className="text-on-surface-variant font-medium text-lg flex items-center gap-3">
             <FileText size={18} className="text-primary/60" /> Secure archival and AI-driven analysis of your <span className="text-primary font-bold">financial records</span>
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary h-14 px-8 font-bold flex items-center gap-3 active:scale-95 shadow-xl group"
        >
           <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Upload Receipt
        </button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-wrap items-center justify-between gap-6 px-4">
         <div className="flex items-center gap-4 bg-surface-container-low px-6 py-3 rounded-2xl border border-outline-variant/10 min-w-80 flex-1 lg:max-w-md shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <Search size={20} className="text-on-surface-variant/50" />
            <input type="text" placeholder="Search by vendor, category or date..." className="bg-transparent border-none focus:ring-0 text-on-surface font-medium w-full" />
         </div>
         <div className="flex items-center gap-3">
            <button className="h-12 px-6 bg-surface-container-highest/20 rounded-2xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
               <Filter size={18} /> Filters
            </button>
            <button className="h-12 px-6 bg-surface-container-highest/20 rounded-2xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
               <ArrowUpDown size={18} /> Sort
            </button>
         </div>
      </div>

      {/* Receipts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loadingReceipts ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
             <Loader2 size={48} className="animate-spin text-primary opacity-50" />
             <p className="text-lg font-bold tracking-tight uppercase opacity-50">Indexing your repository...</p>
          </div>
        ) : receipts.length > 0 ? (
          receipts.map((receipt) => (
            <div key={receipt.id} className="card group relative overflow-hidden border border-outline-variant/10 hover:shadow-2xl hover:scale-[1.02] duration-500 transform-gpu cursor-default">
               <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden bg-surface-container-low group-hover:shadow-lg transition-all duration-500 relative">
                  <img src={receipt.imageUrl} alt={receipt.vendor} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-on-surface opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                     <button className="p-3 bg-white text-primary rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-transform">
                        <Eye size={24} />
                     </button>
                  </div>
               </div>
               
               <div className="flex items-start justify-between mb-2">
                   <div>
                      <h3 className="text-2xl font-extrabold text-on-surface tracking-tight truncate leading-tight">{receipt.vendor}</h3>
                      <p className="text-on-surface-variant font-bold text-xs uppercase tracking-[0.15em] opacity-60">{receipt.category}</p>
                   </div>
                   <p className="text-3xl font-extrabold text-on-surface tracking-tighter">${receipt.amount}</p>
               </div>

               <div className="flex items-center justify-between mt-8 border-t border-outline-variant/10 pt-4">
                   <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs uppercase tracking-widest">
                       <FileText size={14} className="text-primary/60" /> {receipt.date}
                   </div>
                   <button className="p-2 text-on-surface-variant hover:text-error transition-colors transform hover:rotate-12">
                       <Trash2 size={18} />
                   </button>
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full h-96 flex flex-col items-center justify-center text-center space-y-6 p-12 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant/20 animate-pulse">
             <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center ring-4 ring-primary/5">
                <FileText size={48} className="text-primary/20" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-on-surface tracking-tight">Repository Empty</h3>
                <p className="text-on-surface-variant font-medium max-w-sm mx-auto">Upload images or capture receipts directly from your dashboard to begin archival.</p>
             </div>
             <button onClick={() => setIsModalOpen(true)} className="btn-primary py-3 px-12 text-lg font-bold shadow-xl">Get Started</button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 overflow-hidden animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-on-surface/30 backdrop-blur-3xl" onClick={closeModal} />
           
           <div className="relative w-full max-w-2xl bg-surface rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
              {/* Modal Header */}
              <div className="p-8 pb-4 flex items-center justify-between">
                 <h2 className="text-3xl font-extrabold text-on-surface tracking-tight leading-none">Add Digital Record</h2>
                 <button onClick={closeModal} className="p-2.5 bg-surface-container rounded-2xl text-on-surface-variant hover:text-on-surface transition-colors shadow-sm">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-8 pt-4 flex-1">
                 {!uploadType ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-96 mt-4">
                      <button 
                        onClick={() => { setUploadType('camera'); startCamera(); }}
                        className="flex flex-col items-center justify-center gap-6 bg-linear-to-br from-primary to-primary-container p-10 rounded-[32px] text-white hover:scale-[1.03] transition-all duration-500 group shadow-2xl shadow-primary/30"
                      >
                         <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center ring-4 ring-white/10 group-hover:scale-110 transition-transform">
                            <Camera size={48} />
                         </div>
                         <div className="text-center">
                            <p className="text-2xl font-extrabold tracking-tight">Camera Capture</p>
                            <p className="text-white/70 font-medium text-sm mt-2">Take a photo of physical proof</p>
                         </div>
                      </button>

                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-6 bg-surface-container-low p-10 rounded-[32px] text-on-surface hover:scale-[1.03] transition-all duration-500 group border-2 border-outline-variant/10 hover:border-primary/20 shadow-xl"
                      >
                         <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/5 group-hover:scale-110 transition-transform">
                            <Upload size={48} className="text-primary" />
                         </div>
                         <div className="text-center">
                            <p className="text-2xl font-extrabold tracking-tight">File Upload</p>
                            <p className="text-on-surface-variant font-medium text-sm mt-2">PDF, JPG, PNG from device</p>
                         </div>
                         <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*,.pdf" 
                            onChange={handleFileSelect}
                         />
                      </button>
                   </div>
                 ) : uploadType === 'camera' ? (
                   <div className="relative h-96 mt-4 bg-black rounded-[32px] overflow-hidden group shadow-2xl">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button 
                        onClick={capturePhoto} 
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full ring-8 ring-white/20 hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center justify-center"
                      >
                         <div className="w-16 h-16 border-4 border-primary rounded-full" />
                      </button>
                      <canvas ref={canvasRef} className="hidden" />
                      <button 
                        onClick={() => { setUploadType(null); stopCamera(); }}
                        className="absolute top-6 right-6 p-2 bg-on-surface/20 text-white rounded-full hover:bg-on-surface/40"
                      >
                        <X size={20} />
                      </button>
                   </div>
                 ) : (
                   /* Preview Section */
                   <div className="space-y-8 mt-4 animate-in slide-in-from-bottom-8 duration-500">
                      <div className="relative h-80 bg-surface-container-low rounded-[32px] overflow-hidden ring-4 ring-primary/5 shadow-inner">
                         <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                         {uploading && (
                           <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-4">
                              <Loader2 size={48} className="animate-spin" />
                              <p className="text-xl font-bold tracking-tight">Syncing record...</p>
                           </div>
                         )}
                         {status === 'success' && (
                           <div className="absolute inset-0 bg-secondary/80 backdrop-blur-xl flex flex-col items-center justify-center text-white space-y-4 animate-in fade-in duration-500">
                              <CheckCircle2 size={72} strokeWidth={3} className="animate-bounce" />
                              <p className="text-3xl font-extrabold tracking-tight">Sync Complete</p>
                           </div>
                         )}
                      </div>

                      <div className="flex items-center gap-4">
                         <button 
                            disabled={uploading || status}
                            onClick={() => { setUploadType(null); setSelectedFile(null); setPreviewUrl(null); }}
                            className="btn-secondary h-16 flex-1 text-lg font-bold disabled:opacity-30"
                         >
                            Discard
                         </button>
                         <button 
                            disabled={uploading || status}
                            onClick={handleUpload}
                            className="btn-primary h-16 flex-[2] text-lg font-bold disabled:opacity-30 flex items-center justify-center gap-3 overflow-hidden relative shadow-2xl shadow-primary/20"
                         >
                            <Upload size={24} /> Confirm & Upload
                         </button>
                      </div>
                   </div>
                 )}
              </div>
              
              <div className="px-8 pb-8 text-center">
                 <p className="text-on-surface-variant font-bold text-xs uppercase tracking-[0.2em] opacity-40">Ensuring highest level data encryption</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Receipts;
