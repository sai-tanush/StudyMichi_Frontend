import React, { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface TagInputProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const inputValue = getValues(name).trim();
      if (inputValue && !tags.includes(inputValue)) {
        const updatedTags = [...tags, inputValue];
        setTags(updatedTags);
        setValue(name, ''); // Clear input field
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <div className="mb-4">
      {/* Display tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-yellow-100 text-yellow-900 px-2 py-1 rounded-full"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="text-xl text-richblack-700 hover:text-richblack-800"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <label htmlFor={name} className="block font-semibold mb-2">
        {label} <sup className="text-red-500">*</sup>
      </label>

      {/* Input field */}
      <input
        id={name}
        placeholder={placeholder}
        {...register(name, { required: true })}
        onKeyDown={handleAddTag}
        className={`w-full border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } p-2 rounded`}
      />

      {/* Error message */}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {typeof errors[name]?.message === 'string'
            ? errors[name]?.message
            : `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default TagInput;
