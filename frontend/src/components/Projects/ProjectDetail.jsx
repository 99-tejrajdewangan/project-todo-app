import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { todoService } from "../../services/todoService";
import TodoList from "../Todos/TodoList";
import TodoForm from "../Todos/TodoForm";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await projectService.getProject(id);
      setProject(response.data.project);
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching project:", error);
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (_, todoData) => {
    try {
      const response = await todoService.createTodo({
        ...todoData,
        project: id,
      });
      setTodos([response.data, ...todos]);
      setShowTodoForm(false);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleUpdateTodo = async (todoId, todoData) => {
    try {
      const response = await todoService.updateTodo(todoId, todoData);
      setTodos(todos.map((t) => (t._id === todoId ? response.data : t)));
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await todoService.deleteTodo(todoId);
        setTodos(todos.filter((t) => t._id !== todoId));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      const response = await todoService.toggleTodo(todoId);
      setTodos(todos.map((t) => (t._id === todoId ? response.data : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate("/projects")}
          className="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Projects
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 mt-2">{project.description}</p>
            )}
          </div>
          <button
            onClick={() => setShowTodoForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Todo
          </button>
        </div>
      </div>

      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onEdit={setEditingTodo}
        onDelete={handleDeleteTodo}
      />

      {(showTodoForm || editingTodo) && (
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          onClose={() => {
            setShowTodoForm(false);
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
