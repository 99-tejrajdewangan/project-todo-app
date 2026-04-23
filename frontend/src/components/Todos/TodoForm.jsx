import React, { useState, useEffect } from "react";

const TodoForm = ({ todo, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    completed: false,
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ title: false });

  useEffect(() => {
    setFormData({
      title: todo?.title || "",
      description: todo?.description || "",
      priority: todo?.priority || "medium",
      completed: todo?.completed || false,
      dueDate: todo?.dueDate ? todo.dueDate.split("T")[0] : "",
    });
    setError("");
    setTouched({ title: false });
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError("");
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateTitle = () => {
    const trimmed = formData.title.trim();
    if (!trimmed) return "Title is required";
    if (trimmed.length < 3) return "Title must be at least 3 characters";
    if (trimmed.length > 100) return "Title cannot exceed 100 characters";
    return null;
  };

  const titleError = touched.title ? validateTitle() : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const titleErrorMsg = validateTitle();
    if (titleErrorMsg) {
      setError(titleErrorMsg);
      setTouched(prev => ({ ...prev, title: true }));
      return;
    }

    try {
      setLoading(true);
      await onSubmit(todo?._id, formData);
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save todo");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !!formData.title.trim() && formData.title.trim().length >= 3 && !loading;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {todo ? "✏️ Edit Todo" : "✨ Add New Todo"}
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
          {/* Title field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => handleBlur("title")}
              placeholder="e.g., Finish project report"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                titleError && touched.title
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
              disabled={loading}
            />
            {titleError && touched.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span> {titleError}
              </p>
            )}
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Min 3 chars</span>
              <span>{formData.title.length}/100</span>
            </div>
          </div>

          {/* Description field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Add more details..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all resize-y"
              disabled={loading}
            />
          </div>

          {/* Priority and Completed row - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                disabled={loading}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={loading}
                />
                <span className="text-gray-700 font-medium">✓ Mark as completed</span>
              </label>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={loading}
            />
          </div>

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2 text-sm">
              <span className="text-lg">❌</span>
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
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
                todo ? "Update Todo" : "Create Todo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;