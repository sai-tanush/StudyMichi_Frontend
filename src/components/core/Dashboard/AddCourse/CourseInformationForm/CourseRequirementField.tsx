/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../utils/store/store';

interface CourseRequirementFieldProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const CourseRequirementField: React.FC<CourseRequirementFieldProps> = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
  clearErrors,
}) => {
  const { course, editCourse } = useSelector(
    (state: RootState) => state.course,
  );
  const [requirementList, setRequirementList] = useState<string[]>([]); // List of added sentences
  const [requirement, setRequirement] = useState<string>(''); // Current input value

  useEffect(() => {
    if (editCourse && typeof course?.instructions === 'string') {
      setRequirementList(JSON.parse(course?.instructions));
    }
  }, []);

  const handleAddRequirement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (requirement.trim() !== '') {
      setRequirementList((prev) => [...prev, requirement.trim()]);
      setValue(name, [...requirementList, requirement.trim()]); // Update react-hook-form value
      setRequirement(''); // Clear the input
      clearErrors(name);
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = requirementList.filter((_, i) => i !== index);
    setRequirementList(updatedRequirements);
    setValue(name, updatedRequirements); // Update react-hook-form value
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="lable-style text-sm text-richblack-200 mt-1"
      >
        {label}
        <sup className="text-red-300 text-md ml-0.5">*</sup>
      </label>

      <input
        type="text"
        id={name}
        value={requirement}
        placeholder={placeholder}
        onChange={(e) => setRequirement(e.target.value)}
        className={`w-full border ${
          errors[name] ? 'border-red-500' : 'border-richblack-700'
        } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5`}
      />
      {errors[name] && typeof errors[name].message === 'string' && (
        <p className="text-red-300 text-sm mt-0.5">
          {(errors[name]?.message as string) || `${label} is required`}
        </p>
      )}

      <button
        onClick={handleAddRequirement}
        className="mt-2 font-bold text-yellow-100 px-4 py-2 rounded cursor-pointer"
      >
        ADD
      </button>

      <ul className="mt-4 ml-2 space-y-2">
        {requirementList.map((req, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded w-2/3 "
          >
            <span className="text-richblack-100">{req}</span>
            <button
              type="button"
              onClick={() => handleRemoveRequirement(index)}
              className="text-xs text-pure-greys-300 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRequirementField;
