"use client";
import { submitApplication } from "@/lib/actions/applications";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const JobApply = ({ applicant, job }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const submissionData = {
      jobId: job?._id,
      jobTitle: job?.title,
      companyName: job?.companyName,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      applicantId: applicant?.id,
      status: 'applied',
      ...data
    };
    console.log("Applying with:", submissionData);

    const res = await submitApplication(submissionData);

    if(res.insertedId){
       toast.success("Application submitted successfully!");
       router.refresh();
    }
   
  };

  return (
    <div className="bg-zinc-950 p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-8">
      <div className="mb-8 border-b border-zinc-700 pb-8">
        <h2 className="text-2xl font-bold text-white">
          Submit your application
        </h2>
        <p className="text-zinc-500 text-sm mt-2 mb-5">
          You are applying for{" "}
          <span className="font-semibold text-blue-600 underline">
            {job.title}
          </span>{" "}
          at {job.companyName}.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="url"
            variant="bordered"
            label="Portfolio URL"
            placeholder="https://yourportfolio.com"
            {...register("portfolio")}
          />

          <Input
            type="url"
            variant="bordered"
            label="Resume URL"
            placeholder="https://drive.google.com/your-resume-link"
            {...register("resume", { required: "Resume link is required" })}
          />
          {errors.resume && (
            <p className="text-xs text-red-500 -mt-4">{errors.resume.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Cover Letter
          </label>
          <div
            className={`w-full rounded-xl border p-3 transition-colors ${errors.coverLetter ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500" : "border-zinc-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"}`}
          >
            <textarea
              rows={5}
              placeholder="Tell us why you are a perfect fit for this role..."
              className="w-full bg-transparent outline-none text-sm text-zinc-90 placeholder:text-zinc-400 resize-none"
              {...register("coverLetter", {
                required: "Cover letter is required",
              })}
            />
          </div>
          {errors.coverLetter && (
            <p className="text-xs text-red-500">{errors.coverLetter.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            onSubmit={onSubmit}
            type="submit"
            color="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full md:w-auto px-10 font-bold bg-linear-to-tr from-blue-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isSubmitting ? "Sending..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;