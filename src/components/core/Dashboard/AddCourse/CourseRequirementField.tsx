import React, { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface CourseRequirementFieldProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const CourseRequirementField: React.FC<CourseRequirementFieldProps> = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirements, setRequirements] = useState<string[]>([]); // List of added sentences
  const [inputValue, setInputValue] = useState<string>(''); // Current input value

  const handleAddRequirement = () => {
    if (inputValue.trim() !== '') {
      setRequirements((prev) => [...prev, inputValue.trim()]);
      setValue(name, [...requirements, inputValue.trim()]); // Update react-hook-form value
      setInputValue(''); // Clear the input
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    setValue(name, updatedRequirements); // Update react-hook-form value
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block font-semibold mb-2">
        {label}
      </label>
      <input
        type="text"
        id={name}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        className={`w-full border rounded p-2 ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <button
        type="button"
        onClick={handleAddRequirement}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        ADD
      </button>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">
          {(errors[name]?.message as string) || `${label} is required.`}
        </p>
      )}
      <ul className="mt-4 space-y-2">
        {requirements.map((req, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span>{req}</span>
            <button
              type="button"
              onClick={() => handleRemoveRequirement(index)}
              className="text-red-500 hover:underline"
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
