import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';

const Navbar: React.FC = () => {
  const location = useLocation();
  const matchRoute = ({ route }: { route: string }) => {
    if (route) return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="w-full h-14 flex justify-center items-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            alt="StudyMichi Logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        {/* NavLinks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((navElement, index) => {
              return (
                <li key={index}>
                  {navElement.path ? (
                    <Link to={navElement?.path}>
                      <p
                        className={`${matchRoute({ route: navElement?.path || '' }) ? 'text-yellow-100' : 'text-richblack-25'}`}
                      >
                        {navElement.title}
                      </p>
                    </Link>
                  ) : (
                    <p className="cursor-default">{navElement.title}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
      </div>
    </div>
  );
};

export default Navbar;
