import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { MdDelete, MdEdit } from 'react-icons/md';
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal, {
  ModalDataProps,
} from '../../../common/ConfirmationModal';
import {
  deleteCourse,
  fetchInstructorCourses,
} from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { CourseProps } from '../../../../utils/slices/courseSlice';
import useAuth from '../../../../hooks/useAuth';
import { convertToDate } from '../../../../utils/helperFunctions/convertToDate';

interface CourseTableProps {
  courses: CourseProps[];
  setCourses: React.Dispatch<React.SetStateAction<never[]>>;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] =
    useState<ModalDataProps | null>(null);

  const handleCourseDelete = async (courseId: string) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className=" text-richblack-5 p-8 ">
      <Table className="flex flex-col justify-center items-center pr-[30%]">
        <Thead className="">
          <Tr className="flex gap-x-[30%] text-center mb-10 border-richblack-800 ">
            <Th>Course</Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td>No Courses Found</Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-4 mb-10 border-richblack-800"
              >
                <Td className="flex gap-x-4">
                  <img
                    src={course?.thumbnail}
                    className="h-[150px] w-[220px] rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-richblack-5 text-xl font-semibold">
                      {course.courseName}
                    </p>
                    <p className="text-richblack-5 text-md">
                      {course.courseDescription}
                    </p>
                    <p className="text-blue-100">
                      Created:{' '}
                      {course.createdAt
                        ? convertToDate(course.createdAt)
                        : 'Date not Available'}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="text-pink-100">Drafted</p>
                    ) : (
                      <p className="text-yellow-100">Published</p>
                    )}
                  </div>
                </Td>
                <Td>2hr 30min</Td>
                <Td>${course.price}</Td>
                <Td className="">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    className="mr-3"
                  >
                    <MdEdit className="text-richblack-200" size={22} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: 'Do you want to delete this course',
                        text2:
                          'All the data related to this course will be deleted!',
                        btn1Text: 'Delete',
                        btn2Text: 'Cancel',
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    <MdDelete className="text-richblack-200" size={22} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
