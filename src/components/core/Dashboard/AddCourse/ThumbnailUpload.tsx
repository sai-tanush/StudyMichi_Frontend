import React, { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface ThumbnailUploadProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  name,
  label,
  register,
  errors,
  setValue,
}) => {
  const [preview, setPreview] = useState<string | null>(null); // For preview
  const [error, setError] = useState<string | null>(null); // For validation errors

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file size and type
      const isVideo = file.type.startsWith('video');
      const maxSize = isVideo ? 12 * 1024 * 1024 : 6 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`File size exceeds the ${isVideo ? '12MB' : '6MB'} limit.`);
        return;
      }

      // Set preview and clear errors
      setError(null);
      setValue(name, file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block font-semibold mb-2">
        {label}
      </label>
      <div
        className={`border-dashed border-2 rounded p-4 text-center ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {preview ? (
          <div className="relative">
            {preview.endsWith('.mp4') || preview.endsWith('.webm') ? (
              <video className="w-full h-auto" controls src={preview}></video>
            ) : (
              <img
                className="w-full h-auto object-cover"
                src={preview}
                alt="Preview"
              />
            )}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                setPreview(null);
                setValue(name, null); // Clear form value
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500">
              Drag and drop an image, or{' '}
              <label
                htmlFor={`file-input-${name}`}
                className="text-blue-500 cursor-pointer underline"
              >
                Browse
              </label>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Max 6MB for images, 12MB for videos. Aspect ratio 16:9.
            </p>
            <input
              id={`file-input-${name}`}
              type="file"
              accept="image/*,video/*"
              {...register(name, { required: true })}
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">
          {(errors[name]?.message as string) || `${label} is required.`}
        </p>
      )}
    </div>
  );
};

export default ThumbnailUpload;
