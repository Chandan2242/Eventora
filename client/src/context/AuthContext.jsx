
import React, { createContext, useState, useEffect } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================
    // Load User
    // =========================
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) {
            try {
                setUser(JSON.parse(userInfo));
            } catch (error) {
                console.log("Invalid userInfo:", error);
                localStorage.removeItem("userInfo");
            }
        }

        setLoading(false);
    }, []);

    // =========================
    // Login
    // =========================
    const login = async (email, password) => {
        try {
            const { data } = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("Login response:", data);

            setUser(data);

            localStorage.setItem(
                "userInfo",
                JSON.stringify(data)
            );

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            return data;

        } catch (error) {
            console.log(
                "Login error:",
                error.response?.data || error.message
            );

            if (error.response?.data?.needsVerification) {
                throw error.response.data;
            }

            throw (
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Login failed"
            );
        }
    };

    // =========================
    // Register
    // =========================
    const register = async (name, email, password) => {
        console.log("1. Register started");

        try {
            console.log("2. Sending request...");

            const { data } = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            console.log("3. Response received:", data);

            return data;

        } catch (error) {
            console.log(
                "4. Registration error:",
                error.response?.data || error.message
            );

            throw (
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration failed"
            );
        }
    };

    // =========================
    // Verify OTP
    // =========================
    const verifyOTP = async (email, otp) => {
        console.log("OTP verification started");
        console.log("Email:", email);
        console.log("OTP:", otp);

        try {
            const { data } = await api.post(
                "/auth/verify-otp",
                {
                    email,
                    otp: String(otp).trim(),
                }
            );

            console.log(
                "OTP verification response:",
                data
            );

            setUser(data);

            localStorage.setItem(
                "userInfo",
                JSON.stringify(data)
            );

            if (data.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );
            }

            return data;

        } catch (error) {
            console.log(
                "OTP verification error:",
                error.response?.data || error.message
            );

            throw (
                error.response?.data?.message ||
                error.response?.data?.error ||
                "OTP verification failed"
            );
        }
    };

    // =========================
    // Logout
    // =========================
    const logout = () => {
        setUser(null);

        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                verifyOTP,
                logout,
                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

