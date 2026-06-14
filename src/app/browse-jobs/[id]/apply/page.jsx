import { getJobById } from "@/lib/api/jobs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const sessionResponse = await auth.api.getSession({
    headers: await headers(),
  });

  const user =
    sessionResponse?.data?.session?.user || sessionResponse?.user || null;

  if (!user) {
    redirect(`/sign-in?redirect=/browse-jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-screen bg-zinc-900 flex flex-col justify-center items-center text-white p-6">
        <h3 className="text-xl font-bold text-zinc-100 mb-2">
          Access Restricted
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Only job seekers can apply for positions. Please sign in with a seeker
          account to proceed.
        </p>
      </div>
    );
  }

  const applications = await getApplicationByApplicant(user.id);

  const plan = await getPlanById(user?.plan || 'seeker_free');
  console.log(plan);

  

  const job = await getJobById(id);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="max-w-4xl mx-auto pt-28 px-4">
        <h2 className="text-zinc-400 text-sm mb-6 flex items-center gap-3 bg-zinc-900/50 w-fit px-4 py-2 rounded-full border border-zinc-800 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>

          <span>You have applied:</span>

          <span className="font-bold text-white bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700">
            {applications.length}
          </span>

          <span className="text-zinc-500">/</span>

          <span className="font-bold text-zinc-300">
            {plan.maxApplicationsPerMonth}
          </span>
        </h2>

        <div className="mb-6">
          <span className="text-blue-600 font-semibold text-sm">
            Application Portal
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Apply for {job.title}
          </h2>
        </div>

        {applications.length < plan.maxApplicationsPerMonth ? (
          <JobApply applicant={user} job={job} />
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center mt-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Monthly limit reached
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              You&apos;ve used all {plan.maxApplicationsPerMonth} applications
              on the {plan.name} plan. Upgrade to apply for more positions.
            </p>
            <Link
              href="/plans"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              View Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
