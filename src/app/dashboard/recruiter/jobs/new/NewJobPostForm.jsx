"use client";
import { z } from "zod";
import {
  Modal,
  Button,
  TextField,
  Label,
  Input,
  Surface,
  Switch,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJob } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { Briefcase } from "@gravity-ui/icons";
import { useState } from "react";

const jobSchema = z
  .object({
    title: z.string().min(3, "Job title must be at least 3 characters"),
    category: z.string().min(2, "Category is required"),
    jobType: z.string().min(2, "Job type is required"),
    salaryRange: z.string().min(1, "Salary range is required"),
    location: z.string().optional(),
    date: z.string().min(1, "Deadline is required"),
    responsibilities: z.string().min(20, "Please describe responsibilities"),
    requirements: z.string().min(20, "Please describe requirements"),
    benefits: z.string().optional(),
    isRemote: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.isRemote && !data.location) {
        return false;
      }
      return true;
    },
    {
      message: "Location is required for non-remote roles",
      path: ["location"],
    },
  );

export default function NewJobPostForm({ isOpen, onClose }) {
  const [mockCompany] = useState({
        name: "Acme Corp (Auto-filled)",
        id: "company_123",
        isApproved: true,
    });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { isRemote: false },
  });

  const isRemote = watch("isRemote");

  const onSubmit = async (formData) => {
    if (formData.isRemote) {
      formData.location = "Remote";
    }
    console.log("job post formdata:", formData);

    const payload = {
            ...formData,
            companyId: mockCompany.id,
            status: "active",
            isPubliclyVisible: true,
        };

    //api called here
    const res = await createJob(payload);

    if (res.insertedId) {
      toast.success("Job posted successfully!");
    }
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

               <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        <Briefcase size={14} className="text-zinc-500" />
                        Posting as: <span className="font-semibold text-zinc-300">{mockCompany.name}</span>
                        <span className="text-emerald-500 font-medium bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">Approved</span>
                    </div>
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
                      >
                        <option value="">Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
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
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-zinc-400 text-sm">
                          Location
                        </Label>
                        <Switch
                          aria-label="Enable notifications"
                          isSelected={isRemote}
                          onChange={(e) => setValue("isRemote", e)}
                          size="sm"
                        >
                          <Switch.Control>
                            <Switch.Thumb />
                          </Switch.Control>
                          <Switch.Content>
                            <Label className="text-xs text-zinc-400 font-medium">
                              Remote
                            </Label>
                          </Switch.Content>
                        </Switch>
                      </div>

                      <Input
                        {...register("location")}
                        disabled={isRemote}
                        className={`bg-[#1c1c1e] border-zinc-800 text-white ${isRemote ? "opacity-50" : ""}`}
                        placeholder={
                          isRemote ? "Remote" : "e.g. Dhaka, Bangladesh"
                        }
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
