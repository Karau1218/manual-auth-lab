import express from "express";
import authCtl from "../controllers/auth.controller.js";
import pageCtl from "../controllers/page.controller.js";
import { hasRole } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";

const router = express.Router();
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.redirect("/login?errors=Please log in first");
    }
};
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next(); 
    } else {
        return res.redirect("/dashboard?errors=Admins only.");
    }
};

router.get("/", pageCtl.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);


router.get("/dashboard", isLoggedIn, (req, res) => {
    console.log("Current session user:", req.session.user);
    res.render("dashboard", { 
        title: "Dashboard", 
        user: req.session.user 
    });
});



router.get("/admin", isLoggedIn, isAdmin, pageCtl.adminPage);
router.get("/logout", logout);

export default router;