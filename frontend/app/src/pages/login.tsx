import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginForm = {
  username: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input id="username" className="border" {...register("username", { required: true })} placeholder="Username" />
          {errors.username && <span>ユーザー名が必要です</span>}
        </div>
        <div>
          <input id="password" className="border" {...register("password", { required: true })} type="password" placeholder="Password" />
          {errors.password && <span>パスワードが必要です</span>}
        </div>
        <button type="submit">ログイン</button>
      </form>
      <Link to="/signup">ユーザー登録はこちら</Link>
    </div>
  )
}
