import { getUserSession } from '@/lib/core/session';
import NewJobPostForm from './NewJobPostForm';
import { getRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async() => {
    const user = await getUserSession();
        // console.log("user session in post job page:", user);
    
        // const company = await getRecruiterCompany(user?.id);
        // console.log("company from post job page:", company);
    return (
        <div>
            <NewJobPostForm></NewJobPostForm>
        </div>
    );
};

export default PostJobPage;