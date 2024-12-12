import React, { useEffect, useState } from 'react';
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
  const [requirementList, setRequirementList] = useState<string[]>([]); // List of added sentences
  const [requirement, setRequirement] = useState<string>(''); // Current input value

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (requirement.trim() !== '') {
      setRequirementList((prev) => [...prev, requirement.trim()]);
      setValue(name, [...requirementList, requirement.trim()]); // Update react-hook-form value
      setRequirement(''); // Clear the input
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
      <label htmlFor={name} className="block font-semibold mb-2">
        {label}
      </label>

      <input
        type="text"
        id={name}
        value={requirement}
        placeholder={placeholder}
        onChange={(e) => setRequirement(e.target.value)}
        className={`w-full border rounded p-2 ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      <button
        onClick={handleAddRequirement}
        className="mt-2 font-bold text-yellow-100 px-4 py-2 rounded cursor-pointer"
      >
        ADD
      </button>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">
          {(errors[name]?.message as string) || `${label} is required.`}
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {requirementList.map((req, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span>{req}</span>
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
