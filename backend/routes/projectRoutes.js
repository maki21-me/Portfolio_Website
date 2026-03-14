const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const verifyToken = require("../middleware/auth");

// Get all projects
router.get("/", async (req, res) => {
  console.log("🔍 Fetching all projects...");
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`✅ Found ${projects.length} projects`);
    const mappedProjects = projects.map(p => ({ ...p.toJSON(), _id: p.id }));
    res.json(mappedProjects);
  } catch (error) {
    console.error("❌ Error in GET /api/projects:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single project
router.get("/:id", async (req, res) => {
  console.log(`🎯 Request received for project ID: ${req.params.id}`);
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      console.log(`✅ Project found: ${project.title}`);
      res.json({ ...project.toJSON(), _id: project.id });
    } else {
      console.warn(`⚠️ Project with ID ${req.params.id} not found in database`);
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.error(`❌ Error fetching project ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
});

// Create a project
router.post("/", verifyToken, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ ...newProject.toJSON(), _id: newProject.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a project
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const result = await Project.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: "Project deleted" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
