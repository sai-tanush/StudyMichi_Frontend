import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    setValue(name, tags); // Update the form's value with the current tags array
  }, [tags, name, setValue]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const inputValue = getValues(name).trim();
      if (inputValue && !tags.includes(inputValue)) {
        const updatedTags = [...tags, inputValue];
        setTags(updatedTags);
        setValue(name, updatedTags); // Ensure form value is updated
        console.log('Updated Tags = ', updatedTags);
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue(name, updatedTags); // Ensure form value is updated
  };

  return (
    <div className="mb-6">
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

      <label
        htmlFor={name}
        className="lable-style text-sm text-richblack-200 mt-1"
      >
        {label} <sup className="text-red-300 text-md ml-0.5">*</sup>
      </label>

      {/* Input field */}
      <input
        id={name}
        placeholder={placeholder}
        {...register(name, { required: true })}
        onKeyDown={handleAddTag}
        className={`w-full border ${
          errors[name] ? 'border-red-500' : 'border-richblack-700'
        } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
      />
      {errors[name] && typeof errors[name].message === 'string' && (
        <p className="text-red-300 text-sm mt-0.5">
          {(errors[name]?.message as string) || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default TagInput;