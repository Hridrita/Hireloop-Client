import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';

const CompanyPage = async() => {
    const user = await getUserSession();
    console.log("user session in companypage:", user);
    return (
        <div>
            <CompanyProfile recruiter={user}></CompanyProfile>
        </div>
    );
};

export default CompanyPage;