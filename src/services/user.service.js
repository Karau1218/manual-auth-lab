import db from "../db/db.js";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash (password, saltRounds);
};


export const findUserByUsername = async (username) => {
    const [results] = await db.query(
        "SELECT userId, username, password, role FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};


export const createUser = async (username, password, role = "user") => {
    if (!username) throw new Error("Username is required.");
    if (!password) throw new Error("Password is required."); // change to hashed
    if (role !== "user" && role !== "admin") throw new Error("Invalid role.");

    //hash the password before insert!
    const passwordHash = await hashPassword (password);

    const [result] = await db.execute(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, passwordHash, role]
    );

    return {
        userId: result.insertId, 
        username, 
        role
    };
};
export const validatePassword = async (plainPassword, storedHash) => {
return await bcrypt.compare (plainPassword, storedHash);
};
    