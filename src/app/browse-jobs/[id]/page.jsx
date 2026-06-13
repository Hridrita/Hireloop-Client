import Image from "next/image";
import { getJobById } from "@/lib/api/jobs";
import { Chip, Button } from "@heroui/react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Building2,
  CheckCircle2,
  ListChecks,
  Gift,
  Globe,
} from "lucide-react";
import Link from "next/link";

const PRIMARY = "#2563EB"; 
const SOFT_BG = "#F4F7FF";
const SOFT_BORDER = "#E0E7FF";

const page = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  console.log("job data:", JSON.stringify(job, null, 2));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#6B7280] text-lg">Job not found.</p>
      </div>
    );
  }

  const {
    title,
    category,
    jobType,
    salaryRange,
    location,
    date,
    responsibilities,
    requirements,
    benefits,
    isRemote,
    companyName,
    companyLogo,
    status,
  } = job;

  const postedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="min-h-screen bg-[#EEF2FF] pt-28 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        
        <div
          className="rounded-2xl shadow-md border p-6 sm:p-8 mb-8"
          style={{ backgroundColor: SOFT_BG, borderColor: SOFT_BORDER }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
           
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-white bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={companyName || "Company"}
                  width={96}
                  height={96}
                  className="object-contain w-full h-full p-2"
                />
              ) : (
                <Building2 size={32} className="text-gray-300" />
              )}
            </div>

           
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {category && (
                  <Chip
                    size="sm"
                    variant="flat"
                    style={{ backgroundColor: `${PRIMARY}1A`, color: PRIMARY }}
                    className="font-medium"
                  >
                    {category}
                  </Chip>
                )}
                {status === "active" && (
                  <Chip
                    size="sm"
                    variant="dot"
                    color="success"
                    className="font-medium"
                  >
                    Actively Hiring
                  </Chip>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "#111827" }}>
                {title || "Untitled Position"}
              </h1>

              <div className="flex items-center gap-2 mt-1" style={{ color: "#4B5563" }}>
                <Building2 size={18} />
                <span className="font-medium">{companyName || "—"}</span>
              </div>
            </div>

           
            <div className="hidden sm:block shrink-0">
              <Button
                radius="lg"
                size="lg"
                className="font-semibold px-8 text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                Apply Now
              </Button>
            </div>
          </div>

          <hr className="my-6" style={{ borderColor: SOFT_BORDER }} />

         
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InfoBlock
              icon={<Briefcase size={20} />}
              label="Job Type"
              value={jobType}
            />
            <InfoBlock
              icon={<MapPin size={20} />}
              label="Location"
              value={location}
            />
            <InfoBlock
              icon={<DollarSign size={20} />}
              label="Salary"
              value={salaryRange}
            />
            <InfoBlock
              icon={<Globe size={20} />}
              label="Work Mode"
              value={isRemote ? "Remote / Hybrid" : "On-site"}
            />
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <Section
              icon={<ListChecks size={20} />}
              title="Responsibilities"
              content={responsibilities}
            />
            <Section
              icon={<CheckCircle2 size={20} />}
              title="Requirements"
              content={requirements}
            />
            <Section
              icon={<Gift size={20} />}
              title="Benefits"
              content={benefits}
            />
          </div>

          
          <div className="space-y-6">
           
            <div
              className="rounded-2xl shadow-md border p-6"
              style={{ backgroundColor: SOFT_BG, borderColor: SOFT_BORDER }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#111827" }}>
                About the Company
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg border border-white bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  {companyLogo ? (
                    <Image
                      src={companyLogo}
                      alt={companyName || "Company"}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full p-1"
                    />
                  ) : (
                    <Building2 size={20} className="text-gray-300" />
                  )}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "#6B7280" }}>
                    {companyName || "—"}
                  </p>
                  <p className="text-sm" style={{ color: "#6B7280" }}>{location || "—"}</p>
                </div>
              </div>
              <hr className="my-4" style={{ borderColor: SOFT_BORDER }} />
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Calendar style={{ color: PRIMARY }} size={16} />
                <span style={{ color: "#6B7280" }}>Posted on {postedDate}</span>
              </div>
            </div>

           
            <div
              className="rounded-2xl shadow-md border p-6"
              style={{ backgroundColor: SOFT_BG, borderColor: SOFT_BORDER }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#111827" }}>
                Job Overview
              </h3>
              <ul className="space-y-3 text-sm">
                <OverviewRow label="Category" value={category} />
                <OverviewRow label="Job Type" value={jobType} />
                <OverviewRow label="Salary Range" value={salaryRange} />
                <OverviewRow label="Location" value={location} />
                <OverviewRow
                  label="Remote"
                  value={isRemote ? "Yes" : "No"}
                />
              </ul>
            </div>

           
            <div
              className="rounded-2xl border p-6 text-center shadow-md mb-10"
              style={{ backgroundColor: `${PRIMARY}0D`, borderColor: `${PRIMARY}33` }}
            >
              <p className="text-sm text-[#4B5563] mb-4">
                Interested in this role? Submit your application now.
              </p>
              <Link href={'/'}>
              <Button
                radius="lg"
                size="lg"
                className="font-semibold w-full text-white bg-linear-to-tr from-blue-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700"
                
              >
                Apply Now
              </Button>
              </Link>

              <Link
                href="/browse-jobs"
                className="w-full text-center text-zinc-400 hover:text-white text-xs transition"
              >
                ← Back to all jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 border-t p-4 z-50 shadow-lg"
        style={{ backgroundColor: SOFT_BG, borderColor: SOFT_BORDER }}
      >
        <Link href={'/'}>
        <Button
          radius="lg"
          size="lg"
          className="w-full font-semibold text-white bg-linear-to-tr from-blue-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700"
          
        >
          Apply Now
        </Button>
        </Link>
      </div>
    </div>
  );
};

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
    <div className="mt-0.5" style={{ color: PRIMARY }}>{icon}</div>
    <div>
      <p className="text-xs" style={{ color: "#9CA3AF" }}>{label}</p>
      <p className="font-semibold text-sm" style={{ color: "#111827" }}>{value || "—"}</p>
    </div>
  </div>
);

const Section = ({ icon, title, content }) => (
  <div
    className="rounded-2xl shadow-md border p-6 sm:p-8"
    style={{ backgroundColor: SOFT_BG, borderColor: SOFT_BORDER }}
  >
    <div className="flex items-center gap-2 mb-4">
      <div style={{ color: PRIMARY }}>{icon}</div>
      <h2 className="font-semibold text-lg" style={{ color: "#111827" }}>{title}</h2>
    </div>
    <p className="leading-relaxed whitespace-pre-line" style={{ color: "#4B5563" }}>
      {content || "Not specified."}
    </p>
  </div>
);

const OverviewRow = ({ label, value }) => (
  <li className="flex justify-between items-center bg-white rounded-lg px-3 py-2 shadow-sm">
    <span style={{ color: "#6B7280" }}>{label}</span>
    <span className="font-medium"  style={{ color: "#111827" }}>{value || "—"}</span>
  </li>
);

export default page;