import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  user_name: string;
  password: string;
};

const LoginScheme: z.ZodType<LoginForm> = z.object({
  user_name: z.string().min(1, { message: "ユーザー名を入力してください" }),
  password: z
    .string()
    .min(8, { message: "8文字以上のパスワードを入力してください" }),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginScheme) });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login success:", data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("Login error:", error);
      });
  };

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
          <h1 className="mb-8 text-center text-5xl text-gray-700">Login</h1>
          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center p-8"
            >
              <div className="container mb-4 flex flex-col items-center">
                <input
                  id="user-name"
                  {...register("user_name", { required: true })}
                  placeholder="Username"
                  className="rounded-lg border p-2 text-center"
                />
                {/* エラーメッセージがあれば表示、なければ非表示要素を配置。要素の位置ずれ防止のため。 */}
                {errors.user_name && (
                  <div className="mt-1 text-red-500">
                    {errors.user_name.message}
                  </div>
                )}
                {!errors.user_name && (
                  <div className="invisible mt-1 text-red-500">*</div>
                )}
              </div>
              <div className="container mb-4 flex flex-col items-center">
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
              <button
                type="submit"
                className="mx-auto my-2 rounded bg-green-500 px-6 py-2 text-lg text-white duration-300 hover:bg-green-600"
              >
                ログイン
              </button>
            </form>
          </div>
          <Link
            to="/signup"
            className="my-2 mt-4 border-b border-gray-600 text-gray-600 hover:border-green-500 hover:text-green-500"
          >
            ユーザー登録はこちら
          </Link>
        </div>
      </div>
    </>
  );
}
