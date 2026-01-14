import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

type Form = { email: string; password: string };

export default function Login() {
    const { register, handleSubmit } = useForm<Form>();
    const { login } = useAuth();
    const nav = useNavigate();

    const onSubmit = async (v: Form) => {
        try {
            await login(v.email, v.password);
            toast.success("Login successful!");
            nav("/events");
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || "Login failed";
            
            if (errorMessage.toLowerCase().includes("user") || errorMessage.toLowerCase().includes("not found") || errorMessage.toLowerCase().includes("does not exist")) {
                toast.error("User does not exist. Please check your email.");
            } else if (errorMessage.toLowerCase().includes("password") || errorMessage.toLowerCase().includes("credentials") || errorMessage.toLowerCase().includes("invalid")) {
                toast.error("Wrong credentials. Please check your email and password.");
            } else {
                toast.error(errorMessage);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <input 
                    placeholder="Email" 
                    type="email"
                    {...register("email", { required: "Email is required" })} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input 
                    placeholder="Password" 
                    type="password" 
                    {...register("password", { required: "Password is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
                Log In
            </button>
        </form>
    );
}