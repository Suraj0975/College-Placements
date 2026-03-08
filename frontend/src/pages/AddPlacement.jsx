import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import API from "../lib/axios";
import Navbar from "../components/Navbar";
import { ArrowLeft, Save, X, Loader2 } from "lucide-react"; 
const AddPlacement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    package: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !form.studentName ||
        !form.company ||
        !form.role ||
        !form.package ||
        !form.status
      ) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      const payload = {
        studentName: form.studentName.trim(),
        company: form.company.trim(),
        role: form.role.trim(),
        package: Number(form.package),
        status: form.status,
        interviewDate:
          form.status === "Interview"
            ? new Date().toISOString()
            : null,
      };

      await API.post("/placements/add", payload);
      toast.success("Placement added successfully 🚀",{
        position:"top-center",
      });

      setForm({
        studentName: "",
        company: "",
        role: "",
        package: "",
        status: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add placement"
      );
    } finally {
      setLoading(false);
    }
  };


  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
        <p className="text-gray-400 font-medium animate-pulse tracking-widest">LOADING FORM...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10 animate-in fade-in duration-500">
        <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-xl p-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-gray-800 transition"
            >
              <ArrowLeft size={22} />
            </button>
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Add New Placement
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              autoComplete="off"
              className="input w-full bg-gray-800 border-gray-700 text-white focus:border-indigo-500"
              value={form.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              autoComplete="off"
              className="input w-full bg-gray-800 border-gray-700 text-white focus:border-indigo-500"
              value={form.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Job Role"
              autoComplete="off"
              className="input w-full bg-gray-800 border-gray-700 text-white focus:border-indigo-500"
              value={form.role}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="package"
              placeholder="Package (LPA)"
              autoComplete="off"
              className="input no-spinner w-full bg-gray-800 border-gray-700 text-white focus:border-indigo-500"
              value={form.package}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              className="select w-full bg-gray-800 border-gray-700 text-white focus:border-indigo-500"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Interview">Interview</option>
              <option value="Placed">Placed</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 flex-1 bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold shadow-lg disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                {loading ? "Saving..." : "Save Placement"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 flex-1 border border-gray-600 hover:bg-gray-800 transition px-4 py-2 rounded-lg"
                disabled={loading}
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlacement;