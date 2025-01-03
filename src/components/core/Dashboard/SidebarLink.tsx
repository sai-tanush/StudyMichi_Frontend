import * as Icons from 'react-icons/vsc';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

interface LinkProps {
  id?: number;
  name: string;
  path: string;
  type?: 'Instructor' | 'Student';
  icon: keyof typeof Icons;
}

interface SidebarLinkProps {
  link: LinkProps;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link }) => {
  const Icon = Icons[link.icon];
  const location = useLocation();

  if (!Icon) {
    console.error(`Icon "${link.icon}" not found in react-icons/vsc.`);
    return null;
  }

  const matchRoute = ({ route }: { route: string | undefined }) => {
    if (route) return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`mt-3 ${matchRoute({ route: link.path }) ? 'bg-yellow-800' : 'bg-opacity-0'} text-richblack-300`}
    >
      <NavLink
        to={link.path}
        className={`relative px-8 py-2 text-sm font-medium 
          ${matchRoute({ route: link.path }) ? 'bg-yellow-800' : 'bg-opacity-0'}
          flex`}
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
