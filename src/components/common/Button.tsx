import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  active: boolean;
  linkto: string;
}

const Button: React.FC<ButtonProps> = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[16px] px-6 py-3 rounded-md font-bold 
            ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800 text-white'}
            hover:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
