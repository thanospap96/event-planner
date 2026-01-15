import {useState} from "react";
import Login from "./Login";
import {Register} from "./Register.tsx";
import { cn } from "../../lib/util";

type Mode = "login" | "register";

export default function WelcomePage() {
    const [mode, setMode] = useState<Mode>("login");

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Event Planner</h1>
                    <p className="text-gray-600">Create and manage amazing events</p>
                </div>

                <div className="flex gap-2 rounded-lg p-1">
                    <button
                        type="button"
                        onClick={() => setMode("login")}
                        className={cn(
                            "flex-1 py-3 px-4 text-sm font-medium transition-all rounded-md",
                            mode === "login"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        )}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("register")}
                        className={cn(
                            "flex-1 py-3 px-4 text-sm font-medium transition-all rounded-md",
                            mode === "register"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        )}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="mt-6">
                    {mode === "login" ? <Login /> : <Register onSuccess={() => setMode("login")} />}
                </div>
            </div>
        </div>
    );
}