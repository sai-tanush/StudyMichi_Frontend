import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import ReactPlayer from 'react-player';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
  Path,
  PathValue,
} from 'react-hook-form';

interface ThumbnailUploadProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  clearErrors: UseFormClearErrors<T>;
  video?: boolean;
  viewData?: string | null;
  editData?: string | null;
}

const ThumbnailUpload = <T extends FieldValues>({
  name,
  label,
  register,
  setValue,
  errors,
  clearErrors,
  video = false,
  viewData = null,
  editData = null,
}: ThumbnailUploadProps<T>) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string>(
    viewData ? viewData : editData ? editData : '',
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      clearErrors(name); // Type assertion ensures compatibility
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? { 'video/mp4': [] } : { 'image/jpeg': [], 'image/png': [] },
    onDrop,
    multiple: false,
  });

  const previewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewSource(url);
  };

  useEffect(() => {
    return () => {
      if (previewSource && typeof previewSource === 'string') {
        URL.revokeObjectURL(previewSource);
      }
    };
  }, [previewSource]);

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile as PathValue<T, Path<T>>);
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col gap-y-1 mb-6">
      <label
        htmlFor={name}
        className="lable-style text-sm text-richblack-200 mt-1"
      >
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? 'bg-richblack-600' : 'bg-richblack-700'
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        {...getRootProps()}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <ReactPlayer
                url={previewSource}
                controls
                width="100%"
                height="100%"
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource('');
                  setSelectedFile(null);
                  setValue(name, null as unknown as PathValue<T, Path<T>>);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? 'image' : 'video'}, or click to{' '}
              <span
                className="font-semibold text-yellow-50 cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                Browse
              </span>{' '}
              a file
            </p>
            <ul className="mt-10 ml-10 flex list-disc justify-between space-x-20 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="text-sm tracking-wide text-red-300">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default ThumbnailUpload;
