import React, { useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../utils/store/store';

interface TagInputProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const { editCourse, course } = useSelector(
    (state: RootState) => state.course,
  );

  useEffect(() => {
    if (editCourse) {
      setTags(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, tags); // Update the form's value with the current tags array
  }, [tags]);

  function convertToTags(tagArray: string[]): string[] {
    // Split the single string in the array by commas and return as an array of strings
    return tagArray[0].split(',').map((tag) => tag.trim());
  }
  const convertedTags = convertToTags(course?.tag);
  console.log('convertedTags = ', convertedTags);

  useEffect(() => {
    setTags(convertedTags);
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const inputValue = e.currentTarget.value.trim();
      if (inputValue && !tags.includes(inputValue)) {
        const updatedTags = [...tags, inputValue];
        setTags(updatedTags);
        e.currentTarget.value = '';
        console.log('Updated Tags = ', updatedTags);
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue(name, updatedTags); // Ensure form value is updated
  };

  console.log('Tags = ', course?.tag);

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
