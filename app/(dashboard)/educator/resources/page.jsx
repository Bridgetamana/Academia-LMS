'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFilePdf, faFileImage, faFileWord, faEllipsisV, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for MVP UI
  const [resources, setResources] = useState([
    { id: 1, name: 'Syllabus Template 2024.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 12, 2024' },
    { id: 2, name: 'Course Banner Image.png', type: 'image', size: '1.1 MB', date: 'Oct 10, 2024' },
    { id: 3, name: 'Assignment 1 Guidelines.docx', type: 'word', size: '840 KB', date: 'Sep 28, 2024' },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'pdf': return <FontAwesomeIcon icon={faFilePdf} className="text-red-500 w-8 h-8" />;
      case 'image': return <FontAwesomeIcon icon={faFileImage} className="text-blue-500 w-8 h-8" />;
      case 'word': return <FontAwesomeIcon icon={faFileWord} className="text-blue-700 w-8 h-8" />;
      default: return <FontAwesomeIcon icon={faFilePdf} className="text-neutral-500 w-8 h-8" />;
    }
  };

  const filteredResources = resources.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Resource Library</h1>
          <p className="text-neutral-500 mt-1">Manage files, templates, and media for your courses.</p>
        </div>
        <button className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload File
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
          </div>
          <div className="text-sm text-neutral-500 font-medium hidden sm:block">
            {resources.length} files
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="font-medium text-neutral-900">No resources found</p>
            <p className="text-sm mt-1">Try a different search term or upload a new file.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-600">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-900 font-semibold">
                <tr>
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Date Added</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0">
                        {getIcon(resource.type)}
                      </div>
                      <span className="font-medium text-neutral-900">{resource.name}</span>
                    </td>
                    <td className="px-6 py-4">{resource.size}</td>
                    <td className="px-6 py-4">{resource.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
