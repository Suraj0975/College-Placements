import Placement from "../models/placementModel.js";

/* ================= ADD ================= */
export const addPlacement = async (req, res) => {
  try {
    const placement = await Placement.create(req.body);
    res.status(201).json(placement);
  } catch (error) {
    res.status(500).json({
      message: "Error creating placement",
      error: error.message,
    });
  }
};

/* ================= GET ALL (FILTER + SORT FIXED) ================= */
export const getPlacements = async (req, res) => {
  try {
    const { name, company, status, sort } = req.query;

    let filter = {};

    // ✅ Name Filter
    if (name) {
      filter.studentName = {
        $regex: name,
        $options: "i",
      };
    }

    // ✅ Company Filter
    if (company) {
      filter.company = {
        $regex: company,
        $options: "i",
      };
    }

    // ✅ Status Filter (Interview bhi properly match karega)
    if (status) {
      filter.status = {
        $regex: status,
        $options: "i",
      };
    }

    // ✅ Query Build
    let query = Placement.find(filter);

    // ✅ Sort Fix
    if (sort === "high") {
      query = query.sort({ package: -1 });
    }

    if (sort === "low") {
      query = query.sort({ package: 1 });
    }

    const placements = await query;

    res.status(200).json(placements);
  } catch (error) {
    res.status(500).json({
      message: "Data fetch error",
      error: error.message,
    });
  }
};

/* ================= GET BY ID ================= */
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(placement);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
    });
  }
};

/* ================= UPDATE ================= */
export const updatePlacement = async (req, res) => {
  try {
    const updated = await Placement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

/* ================= DELETE ================= */
export const deletePlacement = async (req, res) => {
  try {
    const deleted = await Placement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};