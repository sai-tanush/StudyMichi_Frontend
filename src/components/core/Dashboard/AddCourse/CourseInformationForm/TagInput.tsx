/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../utils/store/store';
import { CourseInformationFormProps } from './CourseInformationForm';

interface TagInputProps {
  label: string;
  name: keyof CourseInformationFormProps;
  placeholder: string;
  register: UseFormRegister<CourseInformationFormProps>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<CourseInformationFormProps>;
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
      setTags(course?.tag || []);
    }
    register(name, {
      required: true,
      validate: (value) => {
        if (typeof value === 'string' || Array.isArray(value)) {
          return value.length > 0; // Check length
        }
        return false;
      },
    });
  }, []);

  useEffect(() => {
    setValue(name, tags); // Update the form's value with the current tags array
  }, [tags]);

  function convertToTags(tagArray: string[]): string[] {
    return tagArray[0].split(',').map((tag) => tag.trim());
  }

  useEffect(() => {
    if (editCourse && course?.tag) {
      const convertedTags = convertToTags(course?.tag);
      setTags(convertedTags);
    }
  }, [editCourse, course?.tag]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const inputValue = e.currentTarget.value.trim();
      if (inputValue && !tags.includes(inputValue)) {
        const updatedTags = [...tags, inputValue];
        setTags(updatedTags);
        e.currentTarget.value = '';
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue(name, updatedTags); // Ensure form value is updated
  };

  useEffect(() => {
    if (editCourse && course?.tag) {
      const tagsArray = course?.tag[0].replace(/"/g, '').split(',');
      setTags(tagsArray);
    }
  }, []);

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
