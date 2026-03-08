import express from "express";
import {
  addPlacement,
  getPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement
} from "../controllers/placementController.js";

const router = express.Router();

router.post("/add", addPlacement);
router.get("/", getPlacements);
router.get("/:id", getPlacementById);
router.put("/update/:id", updatePlacement);
router.delete("/delete/:id", deletePlacement);

export default router;
