/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import {
  createSubSection,
  updateSubSection,
} from '../../../../../services/operations/courseDetailsAPI';
import {
  setCourse,
  SubSectionProps,
} from '../../../../../utils/slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import ThumbnailUpload from '../CourseInformationForm/ThumbnailUpload';
import Spinner from '../../../../common/Spinner';
import useCourse from '../../../../../hooks/useCourse';
import useAuth from '../../../../../hooks/useAuth';

interface SubSectionModalDataProps {
  sectionId: string;
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
}

interface SubSectionModalProps {
  modalData: SubSectionModalDataProps | null;
  setModalData: React.Dispatch<React.SetStateAction<SubSectionProps | null>>;
  add?: boolean;
  view?: boolean;
  edit?: boolean;
}

interface SubSectionOnFormSubmitProps {
  lectureTitle: string;
  lectureDesc: string;
  lectureVideo: string;
}

const SubSectionModal: React.FC<SubSectionModalProps> = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm<SubSectionOnFormSubmitProps>();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { course } = useCourse();
  const { token } = useAuth();

  useEffect(() => {
    if (modalData && (view || edit)) {
      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      modalData &&
      (currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.videoUrl)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    if (modalData) {
      formData.append('sectionId', modalData.sectionId);
      formData.append('subSectionId', modalData._id);

      if (currentValues.lectureTitle !== modalData.title) {
        formData.append('title', currentValues.lectureTitle);
      }
      if (currentValues.lectureDesc !== modalData.description) {
        formData.append('description', currentValues.lectureDesc);
      }
      if (currentValues.lectureVideo !== modalData.videoUrl) {
        formData.append('video', currentValues.lectureVideo);
      }
    }

    setLoading(true);

    //API Call
    const result = await updateSubSection(formData, token);
    if (modalData && result) {
      const updatedCourseContent = course?.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onFormSubmit = async (data: SubSectionOnFormSubmitProps) => {
    if (view) {
      return;
    }

    if (edit) {
      if (!isFormUpdated) {
        toast.error('No changes made to form');
        return;
      } else {
        handleEditSubSection();
      }
      return;
    }

    //Add SubSection
    const formData = new FormData();
    if (modalData) {
      formData.append('sectionId', modalData.sectionId);
    }
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);
    formData.append('video', data.lectureVideo);
    setLoading(true);

    //API CALL
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course?.courseContent.map((section) =>
        section._id === modalData?.sectionId ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="border-2 border-richblack-600 p-4 mt-5 rounded-lg">
      <div>
        <div className="flex justify-between my-3">
          <p className="text-2xl font-semibold text-richblack-5">
            {view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture
          </p>
          <button onClick={() => !loading && setModalData(null)}>
            <RxCross1 size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ThumbnailUpload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            clearErrors={clearErrors}
            video={true}
            viewData={view && modalData ? modalData.videoUrl : null}
            editData={edit && modalData ? modalData.videoUrl : null}
          />
          <div>
            <label className="lable-style text-sm text-richblack-200 mt-1">
              Lecture Title<sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register('lectureTitle', { required: true })}
              className={`w-full border mb-3 ${
                errors.lectureTitle ? 'border-red-500' : 'border-richblack-700'
              } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
            />
            {errors.lectureTitle &&
              typeof errors.lectureTitle.message === 'string' && (
                <p className="text-red-300 text-sm">
                  {(errors.lectureTitle?.message as string) ||
                    `Lecture description is required`}
                </p>
              )}
          </div>
          <div>
            <label className="lable-style text-sm text-richblack-200 mt-1">
              Lecture Description
              <sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register('lectureDesc', { required: true })}
              className={`w-full border lg: min-h-[140px] ${
                errors.lectureDesc ? 'border-red-500' : 'border-richblack-700'
              } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
            />
            {errors.lectureDesc &&
              typeof errors.lectureDesc.message === 'string' && (
                <p className="text-red-300 text-sm">
                  {(errors.lectureDesc?.message as string) ||
                    `Lecture description is required`}
                </p>
              )}
          </div>

          {!view && (
            <div className="mt-2">
              <IconBtn
                text={loading ? <Spinner /> : edit ? 'Save Changes' : 'Save'}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
