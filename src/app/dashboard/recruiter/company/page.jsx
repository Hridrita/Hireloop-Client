import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async() => {
    const user = await getUserSession();
    // console.log("user session in companypage:", user);

    const company = await getRecruiterCompany(user?.id);
     console.log("company before create:", company);
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>
        </div>
    );
};

export default CompanyPage;