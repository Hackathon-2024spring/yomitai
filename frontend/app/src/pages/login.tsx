import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginForm = {
  username: string;
  password: string;
};

const LoginScheme: z.ZodType<LoginForm> = z.object({
  username: z.string().min(1, { message: "ユーザー名を入力してください" }),
  password: z
    .string()
    .min(8, { message: "8文字以上のパスワードを入力してください" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginScheme) });

  const onSubmit: SubmitHandler<LoginForm> = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            id="username"
            className="border"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <input
            id="password"
            className="border"
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">ログイン</button>
      </form>
      <Link to="/signup">ユーザー登録はこちら</Link>
    </div>
  );
}
