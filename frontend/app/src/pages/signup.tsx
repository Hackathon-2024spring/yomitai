import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
type SignupForm = {
  username: string
  email: string
  password: string
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-xl">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input id="username" className="border" {...register("username", { required: true })} placeholder="Username" />
          {errors.username && <span>ユーザー名が必要です</span>}
        </div>
        <div>
          <input id="email" className="border" {...register("email", { required: true })} placeholder="Email" />
          {errors.email && <span>メールアドレスが必要です</span>}
        </div>
        <div>
          <input id="password" className="border" {...register("password", { required: true })} type="password" placeholder="Password" />
          {errors.password && <span>パスワードが必要です</span>}
        </div>
        <div>
          <input id="re-enter-password" className="border" {...register("password", { required: true })} type="password" placeholder="Password" />
          {errors.password && <span>パスワードが必要です</span>}
        </div>
        <button type="submit">サインアップ</button>
      </form>
      <Link to="/login">ログインはこちら</Link>
    </div>
  )
}
