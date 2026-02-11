import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setClothImage,
  setModelImage,
  clearImages,
  generateLook,
  fetchRecentTryOns,
} from '../store/slices/generateSlice';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusBadge from '../components/common/StatusBadge';
import { Upload, Sparkles, X, Download, RefreshCw } from 'lucide-react';

const ImageUploadBox = ({ label, image, onUpload, onClear }) => {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => onUpload(event.target.result);
        reader.readAsDataURL(file);
      }
    },
    [onUpload]
  );

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onUpload(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1">
      <p className="text-sm font-semibold text-text-primary mb-3">{label}</p>
      {image ? (
        <div className="relative group rounded-xl overflow-hidden border-2 border-border h-64 sm:h-72">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 bg-danger text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center h-64 sm:h-72 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <Upload className="w-10 h-10 text-text-muted mb-3" />
          <p className="text-sm font-medium text-text-secondary">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-text-muted mt-1">PNG, JPG up to 10MB</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

const GeneratePage = () => {
  const dispatch = useDispatch();
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
    <div>
      <Header title="Generate" subtitle="Create AI-powered virtual try-ons" />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <h2 className="text-lg font-bold text-text-primary mb-6">Virtual Try-On</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageUploadBox
              label="Upload Cloth Image"
              image={clothImage}
              onUpload={(img) => dispatch(setClothImage(img))}
              onClear={() => dispatch(setClothImage(null))}
            />

            <ImageUploadBox
              label="Upload Model Image"
              image={modelImage}
              onUpload={(img) => dispatch(setModelImage(img))}
              onClear={() => dispatch(setModelImage(null))}
            />

            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary mb-3">Generated Look</p>
              <div className="h-64 sm:h-72 border-2 border-border rounded-xl flex items-center justify-center bg-bg-input overflow-hidden">
                {generating ? (
                  <div className="flex flex-col items-center gap-3">
                    <LoadingSpinner size="lg" />
                    <p className="text-sm text-text-secondary">Generating your look...</p>
                  </div>
                ) : result ? (
                  <div className="relative group w-full h-full">
                    <img
                      src={result.resultImage}
                      alt="Generated Look"
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-2 right-2 bg-white text-text-primary p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Sparkles className="w-10 h-10 text-text-muted mx-auto mb-2" />
                    <p className="text-sm text-text-muted">
                      Upload images and click Generate
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button
              onClick={handleGenerate}
              disabled={!clothImage || !modelImage || generating}
              className="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {generating ? 'Generating...' : 'Generate Look'}
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-text-secondary font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Recent Try-Ons</h2>

          {loading ? (
            <LoadingSpinner className="py-10" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTryOns.map((tryOn) => (
                <div
                  key={tryOn.id}
                  className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-3 h-32">
                    <img
                      src={tryOn.clothImage}
                      alt="Cloth"
                      className="w-full h-full object-cover border-r border-border"
                    />
                    <img
                      src={tryOn.modelImage}
                      alt="Model"
                      className="w-full h-full object-cover border-r border-border"
                    />
                    {tryOn.resultImage ? (
                      <img
                        src={tryOn.resultImage}
                        alt="Result"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <X className="w-5 h-5 text-danger" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-xs text-text-muted">{tryOn.createdAt}</span>
                    <StatusBadge status={tryOn.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
