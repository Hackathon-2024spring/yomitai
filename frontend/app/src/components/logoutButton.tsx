import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include", // クッキーを送信するために必要
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        navigate("/login"); // ログインページにリダイレクト
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="my-2 rounded-xl bg-green-400 px-2 py-1 text-base text-white duration-300 hover:bg-green-500"
    >
      ログアウト
    </button>
  );
}
