'use client';

import React from "react";
import { Modal, Button, TextField, Label, Input, Surface } from "@heroui/react";

export default function NewJobPostForm({ isOpen, onClose }) {
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
                <form id="jobForm" className="flex flex-col gap-4">
                  {/* Job Title */}
                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">Job Title</Label>
                    <Input className="bg-[#1c1c1e] border-zinc-800 text-white" placeholder="e.g. Senior Frontend Engineer" />
                  </TextField>

                  {/* Category & Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Category</Label>
                      <Input className="bg-[#1c1c1e] border-zinc-800 text-white" placeholder="e.g. Technology" />
                    </TextField>
                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Job Type</Label>
                      <Input className="bg-[#1c1c1e] border-zinc-800 text-white" placeholder="Full-time" />
                    </TextField>
                  </div>

                  {/* Salary & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Salary Range</Label>
                      <Input className="bg-[#1c1c1e] border-zinc-800 text-white" placeholder="e.g. 50k - 80k" />
                    </TextField>
                    <TextField className="w-full" variant="secondary">
                      <Label className="text-zinc-400 text-sm">Location</Label>
                      <Input className="bg-[#1c1c1e] border-zinc-800 text-white" placeholder="e.g. Remote / Dhaka" />
                    </TextField>
                  </div>

                  <div className="">
  <TextField className="w-full" variant="secondary">
    <Label className="text-zinc-400 text-sm">Application Deadline</Label>
    <Input 
      type="date" 
      className="bg-[#1c1c1e] border-zinc-800 text-zinc-400" 
    />
  </TextField>
</div>

                  {/* Responsibilities */}
                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">Responsibilities</Label>
                    <textarea 
                      className="w-full h-24 px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                      placeholder="Outline the core everyday responsibilities for this role..."
                    />
                  </TextField>

                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">Requirements</Label>
                    <textarea 
                      className="w-full h-24 px-3 py-2 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-white focus:border-zinc-600 outline-none transition text-sm"
                      placeholder="List required experience, skills and certifications..."
                    />
                  </TextField>

                  <TextField className="w-full" variant="secondary">
                    <Label className="text-zinc-400 text-sm">Benefits(Optional)</Label>
                    <textarea 
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
                className="w-full sm:w-auto flex-1 text-base bg-white hover:bg-zinc-200 font-bold text-black rounded-xl"
                type="submit"
              >
                Post Job
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}