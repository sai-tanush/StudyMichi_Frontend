import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store/store';
import Spinner from '../common/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../core/Dashboard/Sidebar';

const Dashboard: React.FC = () => {
  const { loading: authLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  const { loading: profileLoading } = useSelector(
    (state: RootState) => state.profile,
  );

  if (authLoading || profileLoading) {
    return (
      <div className="w-screen h-screen z-30">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] overflow-auto overflow-x-hidden ml-5 mr-24">
        <div className="mx-auto h-full w-screen py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
