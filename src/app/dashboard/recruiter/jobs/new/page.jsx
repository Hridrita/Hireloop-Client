"use client";
import { z } from "zod";
import { Modal, Button, TextField, Label, Input, Surface } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  jobType: z.string().min(2, "Job type is required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  location: z.string().min(2, "Location is required"),
  date: z.string().min(1, "Deadline is required"),
  responsibilities: z.string().min(20, "Please describe responsibilities"),
  requirements: z.string().min(20, "Please describe requirements"),
  benefits: z.string().optional(),
});

export default function NewJobPostForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(jobSchema) });

  const onSubmit = async (formData) => {
    console.log("job post formdata:", formData);
    // API call here
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container className="px-4 w-full">
          <Modal.Dialog className="w-full sm:max-w-2xl rounded-3xl overflow-hidden shadow-2xl bg-[#121214] p-2 border border-zinc-900">
            <Modal.CloseTrigger />

            <Modal.Header className="px-6 pt-6 pb-2">
              <Modal.Heading className="text-2xl font-extrabold text-white">
                Post a New Job
              </Modal.Heading>
              <p className="text-zinc-400 mt-2 text-sm">
                Fill out the details below to publish your open position.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 py-4">
              <Surface variant="default" className="bg-transparent shadow-none">
                <form
                  id="jobForm"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  {/* Title */}
                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">Job Title</Label>
                    <Input
                      {...register("title")}
                      className="bg-[#1c1c1e] border-zinc-800 text-white"
                      placeholder="e.g. Senior Frontend Engineer"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </TextField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Category</Label>
                      <select
                        {...register("category")}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="">Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Operations">Operations</option>
                        <option value="Legal">Legal</option>
                      </select>
                      {errors.category && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Job Type</Label>
                      <select
                        {...register("jobType")}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="">Select type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                      {errors.jobType && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.jobType.message}
                        </p>
                      )}
                    </TextField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">
                        Salary Range
                      </Label>
                      <Input
                        {...register("salaryRange")}
                        className="bg-[#1c1c1e] border-zinc-800 text-white"
                        placeholder="e.g. 50k - 80k"
                      />
                      {errors.salaryRange && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.salaryRange.message}
                        </p>
                      )}
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Location</Label>
                      <Input
                        {...register("location")}
                        className="bg-[#1c1c1e] border-zinc-800 text-white"
                        placeholder="e.g. Remote / Dhaka"
                      />
                      {errors.location && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </TextField>
                  </div>

                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">
                      Application Deadline
                    </Label>
                    <Input
                      {...register("date")}
                      type="date"
                      className="bg-[#1c1c1e] border-zinc-800 text-zinc-400"
                    />
                    {errors.date && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </TextField>

                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">
                      Responsibilities
                    </Label>
                    <textarea
                      {...register("responsibilities")}
                      className="w-full h-24 px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                      placeholder="Outline the core everyday responsibilities..."
                    />
                    {errors.responsibilities && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.responsibilities.message}
                      </p>
                    )}
                  </TextField>

                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">
                      Requirements
                    </Label>
                    <textarea
                      {...register("requirements")}
                      className="w-full h-24 px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                      placeholder="List required experience, skills and certifications..."
                    />
                    {errors.requirements && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.requirements.message}
                      </p>
                    )}
                  </TextField>

                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">
                      Benefits (Optional)
                    </Label>
                    <textarea
                      {...register("benefits")}
                      className="w-full h-24 px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                      placeholder="Perks, healthcare, equity, remote stipends..."
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onClose}
                className="w-full sm:w-auto flex-1 text-base bg-zinc-800 hover:bg-zinc-700 font-bold text-white rounded-xl"
              >
                Cancel
              </Button>
              <Button
                form="jobForm"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex-1 text-base bg-white hover:bg-zinc-200 font-bold text-black rounded-xl disabled:opacity-60"
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
