import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import API from "../lib/axios";
import Navbar from "../components/Navbar";
import { Pencil, Trash2 } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchPlacements = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (company) params.append("company", company);
      if (status) params.append("status", status);
      if (sort) params.append("sort", sort);

      const { data } = await API.get(`/placements?${params}`);
      setPlacements(data);
    } catch {
      toast.error("Failed to load data",{
        position:"top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [name, company, status, sort]);

  useEffect(() => {
    const timer = setTimeout(fetchPlacements, 300);
    return () => clearTimeout(timer);
  }, [fetchPlacements]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/placements/delete/${deleteId}`);
      setPlacements((prev) => prev.filter((item) => item._id !== deleteId));
      toast.success("Deleted Successfully",{
        position:"top-center",
      });
    } catch {
      toast.error("Delete Failed",{
        position:"top-center",
      });
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const resetFilters = () => {
    setName("");
    setCompany("");
    setStatus("");
    setSort("");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Placed":
        return "badge-success";
      case "Rejected":
        return "badge-error";
      case "Interview":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };

  const getSchedule = (placement) => {
    if (placement.status === "Placed") {
      return "Joined Company";
    }

    if (placement.status === "Rejected") {
      return "Process Ended";
    }

    if (placement.status === "Interview") {
      return placement.interviewDate
        ? new Date(placement.interviewDate).toLocaleDateString("en-IN")
        : "Not Scheduled";
    }

    return "Not Available";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Placement Dashboard
            </h1>
            <p className="text-gray-400">
              Track and manage student placements
            </p>
          </div>

          

        </div>

        <div className="card bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-xl mb-8">
          <div className="card-body">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

              <input
                type="text"
                className="input bg-gray-800 border-gray-700 text-white"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                className="input bg-gray-800 border-gray-700 text-white"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <select
                className="select bg-gray-800 border-gray-700 text-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Placed">Placed</option>
                <option value="Rejected">Rejected</option>
                <option value="Interview">Interview</option>
                <option value="Pending">Pending</option>
              </select>

              <select
                className="select bg-gray-800 border-gray-700 text-white"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort Package</option>
                <option value="high">High → Low</option>
                <option value="low">Low → High</option>
              </select>

              <button
                onClick={resetFilters}
                className="btn btn-outline btn-error"
              >
                Reset
              </button>

            </div>

          </div>
        </div>

        <div className="card bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-2xl">

          <div className="overflow-x-auto">

            <table className="table text-white">

              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th>Student</th>
                  <th>Company</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Schedule</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-20">
                      <span className="loading loading-spinner loading-lg"></span>
                    </td>
                  </tr>
                ) : placements.length > 0 ? (
                  placements.map((p) => (

                    <tr key={p._id} className="hover:bg-gray-800 transition">

                      <td>
                        <div className="font-bold">{p.studentName}</div>
                        <div className="text-xs text-gray-400">
                          #{p._id.slice(-6)}
                        </div>
                      </td>

                      <td>
                        <div className="font-semibold">{p.company}</div>
                        <div className="text-sm text-gray-400">{p.role}</div>
                      </td>

                      <td className="font-bold text-indigo-400">
                        ₹{p.package} LPA
                      </td>

                      <td>
                        <span className={`badge ${getStatusBadge(p.status)}`}>
                          {p.status}
                        </span>
                      </td>

                      <td>
                        {getSchedule(p)}
                      </td>

                      <td className="text-right flex justify-end gap-4">

                        <button
                          onClick={() => navigate(`/edit/${p._id}`)}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => confirmDelete(p._id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-20 text-gray-400">
                      No placement records found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {showConfirm && (

        <div className="modal modal-open">

          <div className="modal-box bg-gray-900 border border-gray-700 text-white">

            <h3 className="font-bold text-lg text-error">
              Confirm Delete
            </h3>

            <p className="py-4 text-gray-400">
              Are you sure you want to delete this record?
            </p>

            <div className="modal-action">

              <button
                onClick={() => setShowConfirm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="btn btn-error text-white"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default HomePage;