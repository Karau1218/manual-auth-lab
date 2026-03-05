import express from "express";
import authCtl from "../controllers/auth.controller.js";
import pageController from "../controllers/page.controller.js";
import { isLoggedIn,hasRole, logout } from "../controllers/auth.controller.js";
// import {  } from "../controllers/auth.controller.js";

const router = express.Router();


router.get("/", pageController.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

//requires a logged in user
router.get("/dashboard", isLoggedIn, pageController.dashboardPage);
//requires an admin logged in
router.get("/admin", isLoggedIn, hasRole("admin"), pageController.adminPage);

// router.get("/admin", isLoggedIn, isAdmin, pageCtl.adminPage);
router.get("/logout", logout);

export default router;