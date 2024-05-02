import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h2 className="text-xl">Home</h2>
      <Link to="/login">Login</Link>
    </>
  );
}
