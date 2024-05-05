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
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row items-center flex-grow bg-yellow-50 divide-x divide-gray-400">
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
          <h1 className="text-5xl mb-8 text-gray-700 text-center">Login</h1>
          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center p-8"
            >
              <div className="mb-4 container flex flex-col items-center">
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
              <div className="mb-4 container flex flex-col items-center">
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
              <button
                type="submit"
                className="text-white bg-green-500 my-2 py-2 px-6 rounded text-lg hover:bg-green-600 duration-300 mx-auto"
              >
                ログイン
              </button>
            </form>
          </div>
          <Link
            to="/signup"
            className="mt-4 text-gray-600 border-b border-gray-600 hover:text-green-500 hover:border-green-500 my-2"
          >
            ユーザー登録はこちら
          </Link>
        </div>
      </div>
    </>
  );
}
