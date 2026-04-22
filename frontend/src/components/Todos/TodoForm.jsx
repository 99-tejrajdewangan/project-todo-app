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

  useEffect(() => {
    const newFormData = {
      title: todo?.title?.trim() || "",
      description: todo?.description || "",
      priority: todo?.priority || "medium",
      completed: todo?.completed || false,
      dueDate: todo?.dueDate ? todo.dueDate.split("T")[0] : "",
    };
    setFormData(newFormData);
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError("");
    if (name === "title") {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        setFormData((prev) => ({
          ...prev,
          title: trimmed.slice(0, 100), // max length
        }));
      }
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || formData.title.length < 3) {
      setError("Title is required and must be at least 3 characters");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(todo?._id, formData);
      onClose?.(); // Close modal on success
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !!formData.title && formData.title.length >= 3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {todo ? "Edit Todo" : "Add New Todo"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title * (min 3 chars)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
              minLength="3"
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.title.length} / 100 characters (min 3)
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {formData.title.trim().length > 0 &&
              formData.title.trim().length < 3 && (
                <p className="text-yellow-600 text-sm mt-1">
                  Title must be at least 3 characters
                </p>
              )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="input-field"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-field"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Completed
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as complete
              </span>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? "Saving..." : todo ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
