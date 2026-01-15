import {useAuth} from "../../context/AuthContext.tsx";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

type RegisterForm = {
    username: string;
    password: string;
    email: string;
}

interface RegisterProps {
    onSuccess?: () => void;
}

export function Register({ onSuccess }: RegisterProps) {
    const { register: registerField, handleSubmit} = useForm<RegisterForm>();
    const { register } = useAuth();

    const onSubmit = async (values: RegisterForm) => {
        try {
            await register(values.username, values.email, values.password);
            toast.success("Registration successful! Please login.");
            onSuccess?.();
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || "Registration failed";
            
            if (errorMessage.toLowerCase().includes("email") && errorMessage.toLowerCase().includes("exist")) {
                toast.error("Email already exists. Please use a different email.");
            } else if (errorMessage.toLowerCase().includes("username") && errorMessage.toLowerCase().includes("exist")) {
                toast.error("Username already exists. Please choose a different username.");
            } else {
                toast.error(errorMessage);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <input 
                    placeholder="Username" 
                    {...registerField("username", { required: "Username is required" })} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input 
                    placeholder="Email" 
                    type="email"
                    {...registerField("email", { required: "Email is required" })} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    {...registerField("password", { required: "Password is required" })} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
                Sign Up
            </button>
        </form>
    );
}