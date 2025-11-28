import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

type Form = { email: string; password: string };

export default function Login() {
    const { register, handleSubmit } = useForm<Form>();
    const { login } = useAuth();
    const nav = useNavigate();

    const onSubmit = async (v: Form) => {
        await login(v.email, v.password);
        nav("/events");
    };

    return (
        <div style={{maxWidth:360, margin:"24px auto"}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="email"{...register("email")} />
                <input placeholder="password" type="password" {...register("password")}/>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}