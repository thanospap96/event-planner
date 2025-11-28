import {useAuth} from "../../context/AuthContext.tsx";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

type RegisterForm = {
    username: string;
    password: string;
    email: string;
}

export function Register() {
    const { register: registerField, handleSubmit} = useForm<RegisterForm>();
    const { register } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values: RegisterForm) => {
        try {
            await register(values.username, values.email, values.password);
            navigate("/login");
        } catch ( err ) {
            console.error(err);// NA PROSTHESW UI
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Username "{...registerField("username")} />
                <input placeholder="Email" {...registerField("email")} />
                <input type="password" placeholder="Password" {...registerField("password")} />
                <button type="submit">Create account</button>
            </form>
        </div>
    );
}