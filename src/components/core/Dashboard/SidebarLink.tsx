import * as Icons from 'react-icons/vsc';
//import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { ACCOUNT_TYPE_PROPS } from '../../../utils/constants';

interface LinkProps {
  id?: number;
  name: string;
  path: string;
  type?: ACCOUNT_TYPE_PROPS | string;
  icon: string;
}
interface SidebarLinkProps {
  link: LinkProps;
  iconName: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  //const dispatch = useDispatch();

  if (!Icon) {
    console.error(`Icon "${iconName}" not found in react-icons/vsc.`);
    return null; // Prevent rendering if the icon is invalid
  }

  const matchRoute = ({ route }: { route: string | undefined }) => {
    if (route) return matchPath({ path: route }, location.pathname);
  };
  return (
    <div>
      <NavLink
        to={link.path}
        className={`relative px-8 py-2 text-sm font-medium ${matchRoute({ route: link.path }) ? 'bg-yellow-800' : 'bg-opacity-0'}`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
                    ${matchRoute({ route: link.path }) ? 'opacity-100' : 'opacity-0'}`}
        ></span>
        <div
          className={`flex items-center gap-x-2 ${matchRoute({ route: link.path }) ? 'bg-yellow-800' : 'bg-opacity-0'}`}
        >
          <Icon className="text-lg" />
          <span>{link.name}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
