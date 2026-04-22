import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete, onClick }) => {
  const colors = {
    'bg-blue-100': '#DBEAFE',
    'bg-green-100': '#D1FAE5',
    'bg-purple-100': '#F3E8FF',
    'bg-pink-100': '#FCE7F3',
    'bg-yellow-100': '#FEF3C7'
  };

  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100`}>
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-gray-400 hover:text-red-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
        {project.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Created {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;