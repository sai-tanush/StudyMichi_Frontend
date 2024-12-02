import { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { RootState } from '../../utils/store/store';
import { apiConnector } from '../../services/apisconnector';
import { categories } from '../../services/apis';
import { NavbarLinks } from '../../data/navbar-links';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import ProfileDropdown from '../core/Auth/ProfileDropDown';

interface CategoryProps {
  _id: string;
  name: string;
  description: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.profile);
  const { totalItems } = useSelector((state: RootState) => state.cart);

  const [ssubLinks, setSsubLinks] = useState<CategoryProps[]>([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector({
        method: 'GET',
        url: categories.CATEGORIES_API,
      });
      console.log('Printing SubLinks result = ', result.data.allCategories);
      setSsubLinks(result.data.allCategories);
    } catch (err) {
      console.log('Could not fetch the category list', err);
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = ({ route }: { route: string | undefined }) => {
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
                  {navElement.title === 'Catalog' ? (
                    <div className="relative flex justify-center items-center cursor-pointer group">
                      <div>{navElement.title}</div>
                      <BiChevronDown size={25} />
                      <div
                        className="invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5
                    translate-x-[-50%] translate-y-[60%] 
                    p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                    w-[300px]"
                      >
                        <div
                          className="absolute left-[50%] top-[100px] h-6 w-6 rotate-45 rounded-md bg-richblack-5
                      translate-y-[-450%] translate-x-[65%]"
                        ></div>
                        {ssubLinks && ssubLinks.length ? (
                          ssubLinks.map((subLink, index) => (
                            <Link to={`${subLink.name}`} key={index}>
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={navElement?.path || '/'}>
                      <p
                        className={`${matchRoute({ route: navElement?.path }) ? 'text-yellow-300' : 'text-richblack-25'}`}
                      >
                        {navElement.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className="flex gap-x-3 text-richblack-25">
          {user && user?.accountType != 'Instructor' && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {!token && (
            <Link to="/login">
              <button
                className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                 text-richblack-100 rounded-md hover:scale-105 hover:text-richblack-5"
              >
                Log in
              </button>
            </Link>
          )}
          {!token && (
            <Link to="/signup">
              <button
                className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                 text-richblack-100 rounded-md hover:scale-105 hover:text-richblack-5"
              >
                Sign up
              </button>
            </Link>
          )}
          {token && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
