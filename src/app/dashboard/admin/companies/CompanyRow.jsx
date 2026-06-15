"use client";

import { updateCompany } from "@/lib/actions/companies";
import Image from "next/image";
import toast from "react-hot-toast";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-500",
  approved: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500",
};

const CompanyRow = ({ company }) => {
  const status = company.status?.toLowerCase();
  const companyId = company._id?.$oid || company._id;

  const handleApprove = async(id) => {
    // implement
    const result = await updateCompany(id, {status: "Approved"});
    if(result.modifiedCount){
        toast.success(`${company.name} has been approved`)
    }
    // console.log('company Id', id, result);
  };

  const handleReject = async(id) => {
    // implement
    const result = await updateCompany(id, {status: "Rejected"});
    if(result.modifiedCount){
        toast.error(`${company.name} has been rejected`)
    }
    // console.log('company Id', id, result);
  };

  return (
    <tr className="border-b border-gray-800">
      <td className="py-3 px-4 flex items-center gap-3">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            width={32}
            height={32}
            className="rounded-full object-cover bg-white"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
            {company.name?.slice(0, 2).toUpperCase()}
          </div>
        )}
        {company.name}
      </td>
      <td className="py-3 px-4 text-gray-400 capitalize">{company.industry}</td>
      <td className="py-3 px-4 text-gray-400 capitalize">{company.jobsCount}</td>
      <td className="py-3 px-4 text-gray-400">{company.location}</td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs capitalize ${statusStyles[status] || "bg-gray-500/10 text-gray-400"}`}
        >
          {company.status}
        </span>
      </td>
      <td className="py-3 px-4 text-gray-400">
        {new Date(company.createdAt?.$date || company.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className="py-3 px-4 text-right space-x-2">
        {status === "pending" && (
          <>
            <button onClick={()=> handleApprove(companyId)} className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-xs">
              Approve
            </button>
            <button onClick={()=> handleReject(companyId)} className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-xs">
              Reject
            </button>
          </>
        )}
        {status === "approved" && (
          <button onClick={()=>handleReject(companyId)} className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-xs">
            Reject
          </button>
        )}
        {status === "rejected" && (
          <button onClick={()=>handleApprove(companyId)} className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-xs">
            Approve
          </button>
        )}
      </td>
    </tr>
  );
};

export default CompanyRow;