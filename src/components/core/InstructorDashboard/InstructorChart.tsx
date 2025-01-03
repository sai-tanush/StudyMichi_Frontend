import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

interface InstructorCourses {
  courseDescription: string;
  courseName: string;
  totalAmountGenerated: number;
  totalStudentsEnrolled: number;
  _id: string;
}

interface InstructorChartProps {
  courses: InstructorCourses[];
}

const InstructorChart: React.FC<InstructorChartProps> = ({ courses }) => {
  const [currChart, setCurrChart] = useState<'students' | 'income'>('students');

  //function to generate random colors in rgb values
  const getRandomColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  //create data for chart displaying student info
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  //create data for chart displaying income info
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  //create options
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart('students')}
          className={`rounded-lg p-1 px-3 transition-all duration-200 ${
            currChart === 'students'
              ? 'bg-richblack-700 text-yellow-50'
              : 'text-richblack-200'
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart('income')}
          className={`rounded-lg p-1 px-3 transition-all duration-200 ${
            currChart === 'income'
              ? 'bg-richblack-700 text-yellow-50'
              : 'text-richblack-200'
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-[80%] w-[80%]">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={
            currChart === 'students' ? chartDataForStudents : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
