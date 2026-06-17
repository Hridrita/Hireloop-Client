import { getCompanies } from "@/lib/api/companies";
import CompanyRow from "./CompanyRow";
import { getUserToken } from "@/lib/core/session";


const AdminCompaniesPage = async () => {
  const token = await getUserToken();
  const companies = await getCompanies(token);

  return (
    <div className="bg-[#111] text-white p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        Companies for review ({companies.length})
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="text-left py-3 px-4">Company Name</th>
            <th className="text-left py-3 px-4">Industry</th>
            <th className="text-left py-3 px-4">Jobs</th>
            <th className="text-left py-3 px-4">Location</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Date Submitted</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <CompanyRow key={company._id?.$oid || company._id} company={company} token={token}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCompaniesPage;