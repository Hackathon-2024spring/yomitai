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
      <div className="h-screen w-screen flex flex-col md:flex-row items-center flex-grow bg-yellow-50 md:divide-x divide-gray-400">
        <div className="flex flex-col items-center">
          <div className="italic font-black text-9xl text-gray-200 mx-8 mt-8">
            Yomitai
          </div>
          <img
            src="../public/img/Yomitai_icon.png"
            alt="Yomitai_icon"
            className="md:w-1/2 lg:max-w-lg"
          />
        </div>
        <div className="container flex flex-col items-center">
          <h1 className="text-5xl mb-4 text-gray-700 text-center">Signup</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center p-8"
          >
            <div className="mb-2 container flex flex-col items-center">
              <input
                id="username"
                {...register("username", { required: true })}
                placeholder="Username"
                className="border rounded-lg p-2 text-center"
              />
              {/* エラーメッセージがあれば表示、なければ非表示要素を配置。要素の位置ずれ防止のため。 */}
              {errors.username && (
                <div className="text-red-500 mt-1">
                  {errors.username.message}
                </div>
              )}
              {!errors.username && (
                <div className="text-red-500 mt-1 invisible">*</div>
              )}
            </div>
            <div className="mb-2 container flex flex-col items-center">
              <input
                id="email"
                className="border rounded-lg p-2 text-center"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email && (
                <div className="text-red-500 mt-1">{errors.email.message}</div>
              )}
              {!errors.email && (
                <div className="text-red-500 mt-1 invisible">*</div>
              )}
            </div>
            <div className="mb-2 container flex flex-col items-center">
              <input
                id="password"
                className="border rounded-lg p-2 text-center"
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-red-500 mt-1">
                  {errors.password.message}
                </div>
              )}
              {!errors.password && (
                <div className="text-red-500 mt-1 invisible">*</div>
              )}
            </div>
            <div className="mb-2 container flex flex-col items-center">
              <input
                id="confirm-password"
                className="border rounded-lg p-2 text-center"
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 mt-1">
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
                <div className="text-red-500 mt-1 invisible">*</div>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-green-500 mt-2 py-2 px-6 rounded text-lg hover:bg-green-600 duration-300 mx-auto"
            >
              サインアップ
            </button>
          </form>
          <Link
            to="/login"
            className="text-gray-600 border-b border-gray-600 hover:text-green-500 hover:border-green-500 my-2"
          >
            ログインはこちら
          </Link>
        </div>
      </div>
    </>
  );
}
