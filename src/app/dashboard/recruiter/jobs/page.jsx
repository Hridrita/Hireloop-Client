import { getUserSession, getUserToken } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';
import RecruiterJobs from './RecruiterJobs'; 
const RecruiterJobsPage = async () => {
    const user = await getUserSession();
    const token = await getUserToken();
    const company = await getRecruiterCompany(user?.id,token);

    return <RecruiterJobs companyId={company?._id} />;
};

export default RecruiterJobsPage;