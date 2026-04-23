import React, { useState, useEffect, useCallback } from "react";

const ProjectForm = ({ project, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ name: false });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        color: project.color || "#3B82F6",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    if (name === "name") {
      const trimmed = value.slice(0, 50); // max length 50
      setFormData(prev => ({ ...prev, name: trimmed }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateName = () => {
    const trimmed = formData.name.trim();
    if (!trimmed) return "Project name is required";
    if (trimmed.length < 2) return "Name must be at least 2 characters";
    if (trimmed.length > 50) return "Name cannot exceed 50 characters";
    return null;
  };

  const nameError = touched.name ? validateName() : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const nameErr = validateName();
    if (nameErr) {
      setError(nameErr);
      setTouched(prev => ({ ...prev, name: true }));
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose(); // close on success
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.name.trim().length >= 2 && !loading;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {project ? "✏️ Edit Project" : "📁 Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Project Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              placeholder="e.g., E‑commerce Website"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                nameError && touched.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
              disabled={loading}
            />
            {nameError && touched.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span> {nameError}
              </p>
            )}
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Min 2 chars</span>
              <span>{formData.name.length}/50</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="What's this project about?"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all resize-y"
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">Max 500 characters</p>
          </div>

          {/* Color picker with live preview */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Project Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                disabled={loading}
              />
              <div
                className="flex-1 h-12 rounded-lg border border-gray-200 shadow-inner"
                style={{ backgroundColor: formData.color }}
              />
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2 text-sm">
              <span className="text-lg">❌</span>
              <span>{error}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                project ? "Update Project" : "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;