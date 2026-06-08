import { DashboardSidebar } from '@/components/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardSidebar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;