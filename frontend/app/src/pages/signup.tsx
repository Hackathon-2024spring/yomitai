import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupScheme: z.ZodType<SignupForm> = z
  .object({
    username: z.string().min(1, { message: "ユーザー名を入力してください" }),
    email: z.string().email({ message: "メールアドレスを入力してください" }),
    password: z
      .string()
      .min(8, { message: "8文字以上のパスワードを入力してください" }),
    confirmPassword: z
      .string()
      .min(8, { message: "パスワードを再入力してください" }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(SignupScheme) });

  const onSubmit: SubmitHandler<SignupForm> = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-xl">Signup</h1>
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
            id="email"
            className="border"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}
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
        <div>
          <input
            id="confirm-password"
            className="border"
            {...register("confirmPassword", { required: true })}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "refine" && (
              <span>{errors.confirmPassword.message}</span>
            )}
        </div>
        <button type="submit">サインアップ</button>
      </form>
      <Link to="/login">ログインはこちら</Link>
    </div>
  );
}
