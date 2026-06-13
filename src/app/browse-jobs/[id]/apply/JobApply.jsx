"use client";
import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const JobApply = ({ job }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Applying with:", data);
    toast.success("Application submitted successfully!");
  };

  return (
    <div className="p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-8">
      <div className="mb-8 border-b border-zinc-100 pb-8">
        <h2 className="text-2xl font-bold text-zinc-900">Submit your application</h2>
        <p className="text-zinc-500 text-sm mt-2 mb-5">
          You are applying for <span className="font-semibold text-blue-600 underline">{job.title}</span> at {job.companyName}.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            variant="bordered"
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName", { required: "Name is required" })}
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName?.message}
          />
          <Input
            variant="bordered"
            label="Email Address"
            placeholder="your@email.com"
            {...register("email", { required: "Email is required" })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>

        <Input
          variant="bordered"
          label="Portfolio / LinkedIn URL"
          placeholder="https://linkedin.com/in/yourprofile"
          {...register("portfolio")}
        />

        {/* Custom Textarea Wrapper */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">Cover Letter</label>
          <div className={`w-full rounded-xl border p-3 transition-colors ${errors.coverLetter ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500" : "border-zinc-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"}`}>
            <textarea
              {...register("coverLetter", { required: "Cover letter is required" })}
              rows={5}
              placeholder="Tell us why you are a perfect fit for this role..."
              className="w-full bg-transparent outline-none text-sm text-zinc-900 placeholder:text-zinc-400 resize-none"
            />
          </div>
          {errors.coverLetter && (
            <p className="text-xs text-red-500">{errors.coverLetter.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            type="submit" 
            color="primary" 
            size="lg" 
            isLoading={isSubmitting} 
            className="w-full md:w-auto px-10 font-bold"
          >
            {isSubmitting ? "Sending..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;