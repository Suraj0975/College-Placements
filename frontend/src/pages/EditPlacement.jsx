import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import API from "../lib/axios";
import Navbar from "../components/Navbar";
import { ArrowLeft, Save, X, Trash2 } from "lucide-react";

const EditPlacement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    studentName: "",
    company: "",
    role: "",
    package: "",
    status: "Interview",
  });

  /* FETCH DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(`/placements/${id}`);

        setForm({
          studentName: data.studentName || "",
          company: data.company || "",
          role: data.role || "",
          package: data.package || "",
          status: data.status || "Interview",
        });

      } catch {
        toast.error("Data fetch failed");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* UPDATE */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        package: Number(form.package),
        interviewDate:
          form.status === "Interview"
            ? new Date().toISOString()
            : null,
      };

      await API.put(`/placements/update/${id}`, payload);

      toast.success("Updated Successfully 🚀",{
        position:"top-center",
      });

      setTimeout(() => navigate("/"), 500);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed",{
        position:"top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  /* DELETE */
  const handleDelete = async () => {
    try {
      setDeleting(true);

      await API.delete(`/placements/delete/${id}`);

      toast.success("Deleted Successfully",{
        position:"top-center",
      });

      navigate("/");

    } catch {
      toast.error("Delete failed",{
        position:"top-center",
      });
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">

        <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-xl p-8">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-4">

              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg hover:bg-gray-800 transition"
              >
                <ArrowLeft size={22} />
              </button>

              <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Edit Placement
              </h2>

            </div>

            {/* Trash Icon */}
            <button
              onClick={() => setShowConfirm(true)}
              className="text-red-400 hover:text-red-300 transition"
            >
              <Trash2 size={22} />
            </button>

          </div>

          <form onSubmit={handleUpdate} className="space-y-5">

            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              className="input w-full bg-gray-800 border-gray-700 text-white"
              value={form.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="input w-full bg-gray-800 border-gray-700 text-white"
              value={form.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Job Role"
              className="input w-full bg-gray-800 border-gray-700 text-white"
              value={form.role}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="package"
              placeholder="Package (LPA)"
              className="input w-full bg-gray-800 border-gray-700 text-white"
              value={form.package}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              className="select w-full bg-gray-800 border-gray-700 text-white"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Interview">Interview</option>
              <option value="Placed">Placed</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                className="flex items-center justify-center gap-2 flex-1 bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold"
                disabled={loading}
              >
                <Save size={18} />
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 flex-1 border border-gray-600 hover:bg-gray-800 transition px-4 py-2 rounded-lg"
              >
                <X size={18} />
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* DELETE CONFIRM MODAL */}
      {showConfirm && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-80 text-center shadow-xl">

            <Trash2 className="mx-auto text-red-400 mb-3" size={30} />

            <h3 className="text-lg font-semibold mb-2">
              Delete Record
            </h3>

            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete this placement?
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-600 rounded-lg py-2 hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-2"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default EditPlacement;