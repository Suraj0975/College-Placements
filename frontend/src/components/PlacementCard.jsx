import { Link } from "react-router";

const PlacementCard = ({ placement, onDelete, formatCurrency, getBadgeClass }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-5">
        {/* Header: Student Name & Status */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
              {placement.studentName}
            </h2>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              {placement.role}
            </p>
          </div>
          <span className={`badge badge-sm py-3 px-3 font-bold ${getBadgeClass(placement.status)}`}>
            {placement.status}
          </span>
        </div>

        {/* Details Section */}
        <div className="space-y-3 border-y border-slate-50 py-4 my-4">
          <div className="flex items-center text-sm text-slate-600">
            <span className="w-8">🏢</span>
            <span className="font-medium">{placement.company}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <span className="w-8">💰</span>
            <span className="font-bold text-indigo-600">
               {formatCurrency(placement.package)} <small className="text-[10px] text-slate-400">LPA</small>
            </span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <span className="w-8">📅</span>
            <span>{placement.interviewDate ? new Date(placement.interviewDate).toLocaleDateString("en-IN") : "No Date Set"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <Link 
            to={`/edit/${placement._id}`} 
            className="flex-1 btn btn-sm btn-outline btn-info border-slate-200 hover:border-info"
          >
            Edit
          </Link>
          <button 
            onClick={() => onDelete(placement._id)}
            className="btn btn-sm btn-ghost text-error hover:bg-error/10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementCard;