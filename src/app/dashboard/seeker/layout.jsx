import { requireRole } from '@/lib/core/session';


const Seekerlayout = async({children}) => {
    await requireRole('seeker');
    return children
};

export default Seekerlayout;