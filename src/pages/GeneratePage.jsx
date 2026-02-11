import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setClothImage,
  setModelImage,
  clearImages,
  generateLook,
  fetchRecentTryOns,
} from '../store/slices/generateSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusBadge from '../components/common/StatusBadge';
import { Upload, Sparkles, X, Download, RefreshCw, Shirt, User, ArrowRight } from 'lucide-react';

const CardTitle = ({ children }) => (
  <h3 className="text-white text-base font-bold text-center mb-6">{children}</h3>
);

const UploadBox = ({ label, icon: Icon, image, onUpload, onClear, helperText }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onUpload(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#18181b] rounded-[24px] p-8 flex flex-col items-center min-h-[450px] shadow-xl border border-white/5">
      <CardTitle>{label}</CardTitle>

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {image ? (
          <div className="relative w-full h-full min-h-[280px] rounded-2xl overflow-hidden group">
            <img src={image} alt={label} className="w-full h-full object-cover" />
            <button
              onClick={onClear}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full min-h-[300px] flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/5 group-hover:bg-white/10 transition-all">
              <Icon className="w-8 h-8 text-white/70" />
            </div>
            <p className="text-white font-medium mb-2">Upload {label.replace('Choose ', '')} Image</p>
            {helperText && (
              <p className="text-gray-500 text-[11px] text-center max-w-[200px] leading-relaxed px-4 mt-2">
                {helperText}
              </p>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const GeneratePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { clothImage, modelImage, result, generating, recentTryOns, loading } =
    useSelector((state) => state.generate);

  useEffect(() => {
    dispatch(fetchRecentTryOns());
  }, [dispatch]);

  const handleGenerate = () => {
    if (clothImage && modelImage) {
      dispatch(generateLook({ clothImage, modelImage }));
    }
  };

  const handleReset = () => {
    dispatch(clearImages());
  };

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen animate-fade-in">
      {/* Premium Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">Generate Look</h1>
          <p className="text-gray-500 font-medium">Select a garment and upload your photo to see how it looks on you</p>
        </div>
        <div className="absolute right-10 top-10">
          <div className="w-10 h-10 rounded-full border border-gray-100 bg-gray-200 overflow-hidden shadow-sm">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-[10px] font-black uppercase">
                {user?.name ? user.name.substring(0, 2) : 'JD'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generation Workflow Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <UploadBox
          label="Choose Cloth"
          icon={Shirt}
          image={clothImage}
          onUpload={(img) => dispatch(setClothImage(img))}
          onClear={() => dispatch(setClothImage(null))}
        />

        <UploadBox
          label="Choose Model"
          icon={User}
          image={modelImage}
          onUpload={(img) => dispatch(setModelImage(img))}
          onClear={() => dispatch(setModelImage(null))}
          helperText="Kindly upload a high-resolution photograph (*.jpg or *.png) that presents your entire body in a well-defined pose."
        />

        <div className="bg-[#18181b] rounded-[24px] p-8 flex flex-col items-center min-h-[450px] shadow-xl border border-white/5 relative">
          <div className="flex w-full items-center justify-between mb-6">
            <div className="w-10" /> {/* Spacer */}
            <h3 className="text-white text-base font-bold text-center">Final Look</h3>
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-white text-[13px] font-medium transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex-1 w-full flex flex-col items-center justify-center">
            <div className="w-full h-full min-h-[250px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden relative group">
              {generating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                  <LoadingSpinner className="text-white mb-3" />
                  <p className="text-white text-xs font-medium">AI Magic in progress...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative">
                  <img src={result.resultImage} alt="Final Look" className="w-full h-full object-cover" />
                  <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                  <Sparkles className="w-16 h-16 text-white mb-4" />
                </div>
              )}
            </div>

            <div className="w-full mt-8">
              <button
                onClick={handleGenerate}
                disabled={!clothImage || !modelImage || generating}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#d946ef] to-[#ba3edf] text-white font-bold text-sm tracking-wide shadow-[0_8px_25px_rgba(217,70,239,0.3)] hover:shadow-[0_8px_30px_rgba(217,70,239,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none uppercase"
              >
                {generating ? 'Generating...' : 'Generate Look'}
                {!generating && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Try-Ons Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-[#111827]">Recent Try-Ons</h2>
          <div className="h-[1px] flex-1 mx-6 bg-gray-200" />
        </div>

        {loading && recentTryOns.length === 0 ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {recentTryOns.map((tryOn) => (
              <div
                key={tryOn.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 p-2"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3">
                  <img
                    src={tryOn.resultImage || tryOn.clothImage}
                    alt="Recent Try-On"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <StatusBadge status={tryOn.status} />
                  </div>
                </div>
                <div className="px-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{tryOn.createdAt}</span>
                  <div className="flex -space-x-2">
                    <img src={tryOn.clothImage} alt="Input" className="w-5 h-5 rounded-full border border-white" />
                    <img src={tryOn.modelImage} alt="Model" className="w-5 h-5 rounded-full border border-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePage;

