import {useState} from "react";
import Login from "./Login";
import {Register} from "./Register.tsx";
// import { cn } from "../../lib"

type Mode = "login" | "register";

export default function WelcomePage() {
    const [mode, setMode] = useState<Mode>("login");

    return (
        <div className= "flex border-box black align-items-center ">
            <h1>Welcome</h1>
           <span>Create and Manage Events</span>

            <div className="flex flex-col">
                <button
                    type="button"
                    onClick={() => {setMode("login")}}
                    style={{
                    marginRight: 8,
                    fontWeight: mode === "login" ? "bold" : "normal",
                }}
                >
                Login
                </button>
                <button
                    type="button"
                    onClick={() => setMode("register")}
                    style={{ fontWeight: mode === "register" ? "bold" : "normal" }}
                >
                    Sign up
                </button>
            </div>

            <div>
                {mode === "login" ? <Login /> : <Register />}
            </div>
        </div>
    );
}