import { getUserSession, getUserToken } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';
import RecruiterDashboardClient from './RecruiterDashboardClient';

const RecruiterDashboardPage = async () => {
    const user = await getUserSession();
    const token = await getUserToken();
    const company = await getRecruiterCompany(user?.id,token);

     console.log("company:", company); 

    return <RecruiterDashboardClient company={company} />;
};

export default RecruiterDashboardPage;