import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { IoAddOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiSolidDownArrow } from 'react-icons/bi';
import ConfirmationModal, {
  ModalDataProps,
} from '../../../../common/ConfirmationModal';
import SubSectionModal from './SubSectionModal';
import {
  deleteSection,
  deleteSubSection,
} from '../../../../../services/operations/courseDetailsAPI';
import {
  setCourse,
  SubSectionProps,
} from '../../../../../utils/slices/courseSlice';
import useCourse from '../../../../../hooks/useCourse';
import useAuth from '../../../../../hooks/useAuth';

interface NestedViewProps {
  handleChangeEditSectionName: (sectionId: string, sectionName: string) => void;
}

const NestedView: React.FC<NestedViewProps> = ({
  handleChangeEditSectionName,
}) => {
  const { course } = useCourse();
  const { token } = useAuth();
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState<SubSectionProps | null>(
    null,
  );
  const [editSubSection, setEditSubSection] = useState<SubSectionProps | null>(
    null,
  );
  const [viewSubSection, setViewSubSection] = useState<SubSectionProps | null>(
    null,
  );
  const [confirmationModal, setConfirmationModal] =
    useState<ModalDataProps | null>(null);

  const handleDeleteSection = async (sectionId: string) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course?._id,
      },
      token,
    );

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (
    subSectionId: string,
    sectionId: string,
  ) => {
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
      },
      token,
    );

    if (result) {
      const updatedCourseContent = course?.courseContent.map((section) =>
        section._id === sectionId ? result : section,
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 text-richblack-50 p-6 px-8">
        {course?.courseContent?.map((section) => {
          return (
            <details key={section._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b-2 border-richblack-400 p-2">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu size={30} />
                  <p>{section.sectionName}</p>
                </div>
                <div className="flex items-center gap-x-3 ">
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName,
                      )
                    }
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: 'Delete this Section',
                        text2:
                          'All the lectures in this section will be deleted',
                        btn1Text: 'Delete',
                        btn2Text: 'Cancel',
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                  <span>|</span>
                  <BiSolidDownArrow
                    size={14}
                    className={`text-xl text-richblack-300`}
                  />
                </div>
              </summary>

              <div className="px-6 pb-4">
                {section?.subSection?.length > 0 &&
                  section?.subSection?.map((data) => (
                    <div
                      key={data?._id}
                      onClick={() => setViewSubSection(data)}
                      className="flex items-center justify-between gap-x-3 border-b-2 border-richblack-400 p-2 mt-2"
                    >
                      <div className="flex items-center gap-x-3">
                        <RxDropdownMenu size={30} />
                        <p>{data.title}</p>
                      </div>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-x-3"
                      >
                        <button
                          onClick={() =>
                            setEditSubSection({
                              ...data,
                              sectionId: section._id,
                            })
                          }
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => {
                            setConfirmationModal({
                              text1: 'Delete this Sub-Section',
                              text2: 'Selected lecture will be deleted',
                              btn1Text: 'Delete',
                              btn2Text: 'Cancel',
                              btn1Handler: () =>
                                handleDeleteSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            });
                          }}
                        >
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  onClick={() =>
                    setAddSubSection({
                      _id: '',
                      sectionId: section._id,
                      title: '',
                      description: '',
                      videoUrl: '',
                      timeDuration: '',
                    })
                  }
                  className="mt-4 flex items-center gap-x-2 text-yellow-50"
                >
                  <IoAddOutline size={22} />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          );
        })}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedView;
