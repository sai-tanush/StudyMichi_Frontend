type IconType = 'VscEdit' | 'VscAccount' | 'VscActivateBreakpoints' | 'VscAdd';

import { ACCOUNT_TYPE } from '../utils/constants';
export const sidebarLinks = [
  {
    id: 1,
    name: 'My Profile',
    path: '/dashboard/my-profile',
    icon: 'VscAccount' as IconType,
  },
  {
    id: 2,
    name: 'Dashboard',
    path: '/dashboard/instructor-dashboard',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: 'VscDashboard' as IconType,
  },
  {
    id: 3,
    name: 'My Courses',
    path: '/dashboard/my-courses',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: 'VscVm' as IconType,
  },
  {
    id: 4,
    name: 'Add Course',
    path: '/dashboard/add-course',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: 'VscAdd' as IconType,
  },
  {
    id: 5,
    name: 'Enrolled Courses',
    path: '/dashboard/enrolled-courses',
    type: ACCOUNT_TYPE.STUDENT,
    icon: 'VscMortarBoard' as IconType,
  },
  {
    id: 6,
    name: 'Cart',
    path: '/dashboard/cart',
    type: ACCOUNT_TYPE.STUDENT,
    icon: 'VscMortarBoard' as IconType,
  },
];

export const sidebarSettingData = {
  name: 'Settings',
  path: 'dashboard/settings',
  icon: 'VscSettingsGear' as IconType,
};
