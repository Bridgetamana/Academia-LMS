"use client";

import { AdminDashboardLayout } from "@/app/_layouts";
import { FaUpload } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Assignments = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = {
        name: file.name,
        url: URL.createObjectURL(file),
        date: new Date().toLocaleString(),
      };
      const updatedFiles = [...uploadedFiles, newFile];
      setUploadedFiles(updatedFiles);
      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>
          <h2 className="lg:text-xl font-semibold mb-4">Resources</h2>
          <div className="hero bg-[#E7E8EC] border rounded-lg py-3">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <span className="avatar placeholder p-3 rounded-lg bg-[#e3ddf8]">
                  <FaUpload className="text-xl text-[#381A6D]" />
                </span>
                <p className="py-3">Click to upload file</p>
                <label className="btn bg-[#7262E4] text-white cursor-pointer border-0">
                  Upload file
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {uploadedFiles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>File Name</th>
                      <th>Upload Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFiles.map((file, index) => (
                      <tr key={index} className="rounded-md">
                        <th>1</th>
                        <td>{file.name}</td>
                        <td>{file.date}</td>
                        <td>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2 cursor-pointer p-2 hover:bg-slate-200 rounded-md "
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDeleteFile(index)}
                            className="cursor-pointer p-2 rounded-md hover:bg-slate-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}{" "}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default Assignments;
