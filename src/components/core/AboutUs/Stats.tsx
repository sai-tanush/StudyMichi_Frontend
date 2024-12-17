const STATS_DATA = [
  { count: '20K+', label: 'Active Students' },
  { count: '10+', label: 'Members' },
  { count: '200+', label: 'Courses' },
  { count: '50+', label: 'Awards' },
];

const Stats: React.FC = () => {
  return (
    <section className="w-full h-[150px] bg-richblack-800 flex items-center">
      {STATS_DATA.map((ele, index) => (
        <div key={index} className="w-full flex justify-around mt-5">
          <div className="flex flex-col items-center gap-y-5">
            <h1 className="text-3xl font-bold text-richblack-5">{ele.count}</h1>
            <p className="text-richblack-400 text-sm font-semibold">
              {ele.label}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Stats;
