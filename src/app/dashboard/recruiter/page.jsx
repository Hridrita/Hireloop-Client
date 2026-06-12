import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';
import RecruiterDashboardClient from './RecruiterDashboardClient';

const RecruiterDashboardPage = async () => {
    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);

     console.log("company:", company); 

    return <RecruiterDashboardClient company={company} />;
};

export default RecruiterDashboardPage;