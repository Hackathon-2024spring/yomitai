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
    <>
      <div className="flex h-screen w-screen flex-grow flex-col items-center divide-gray-400 bg-yellow-50 md:flex-row md:divide-x">
        <div className="flex flex-col items-center">
          <div className="mx-8 mt-8 text-9xl font-black italic text-gray-200">
            Yomitai
          </div>
          <img
            src="../public/img/Yomitai_icon.png"
            alt="Yomitai_icon"
            className="md:w-1/2 lg:max-w-lg"
          />
        </div>
        <div className="container flex flex-col items-center">
          <h1 className="mb-4 text-center text-5xl text-gray-700">Signup</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center p-8"
          >
            <div className="container mb-2 flex flex-col items-center">
              <input
                id="username"
                {...register("username", { required: true })}
                placeholder="Username"
                className="rounded-lg border p-2 text-center"
              />
              {/* エラーメッセージがあれば表示、なければ非表示要素を配置。要素の位置ずれ防止のため。 */}
              {errors.username && (
                <div className="mt-1 text-red-500">
                  {errors.username.message}
                </div>
              )}
              {!errors.username && (
                <div className="invisible mt-1 text-red-500">*</div>
              )}
            </div>
            <div className="container mb-2 flex flex-col items-center">
              <input
                id="email"
                className="rounded-lg border p-2 text-center"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email && (
                <div className="mt-1 text-red-500">{errors.email.message}</div>
              )}
              {!errors.email && (
                <div className="invisible mt-1 text-red-500">*</div>
              )}
            </div>
            <div className="container mb-2 flex flex-col items-center">
              <input
                id="password"
                className="rounded-lg border p-2 text-center"
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <div className="mt-1 text-red-500">
                  {errors.password.message}
                </div>
              )}
              {!errors.password && (
                <div className="invisible mt-1 text-red-500">*</div>
              )}
            </div>
            <div className="container mb-2 flex flex-col items-center">
              <input
                id="confirm-password"
                className="rounded-lg border p-2 text-center"
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <div className="mt-1 text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
              {/* {!errors.confirmPassword && (
                <div className="text-red-500 mt-1 invisible">*</div>
              )} */}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "refine" && (
                  <div>{errors.confirmPassword.message}</div>
                )}
              {!errors.confirmPassword && (
                <div className="invisible mt-1 text-red-500">*</div>
              )}
            </div>
            <button
              type="submit"
              className="mx-auto mt-2 rounded bg-green-500 px-6 py-2 text-lg text-white duration-300 hover:bg-green-600"
            >
              サインアップ
            </button>
          </form>
          <Link
            to="/login"
            className="my-2 border-b border-gray-600 text-gray-600 hover:border-green-500 hover:text-green-500"
          >
            ログインはこちら
          </Link>
        </div>
      </div>
    </>
  );
}
