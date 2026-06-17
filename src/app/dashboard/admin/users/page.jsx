import { getUsersList } from '@/lib/api/users';
import AdminUsersTable from './AdminUsersTable';

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = (data?.users ?? []).map((u) => ({
        ...u,
        id: String(u._id ?? u.id ?? Math.random()),
    }));

    return (
        <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-6">Users Management</h1>
            <AdminUsersTable users={users} />
        </div>
    );
};

export default AdminUsersPage;