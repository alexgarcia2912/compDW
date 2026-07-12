import e from "express";
import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Login = new mongoose.model("Login", loginSchema);

export default Login;