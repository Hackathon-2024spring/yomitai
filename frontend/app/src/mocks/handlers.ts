import { http, HttpResponse } from "msw";

type LoginPost = {
  username: string;
  password: string;
};
export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const loginPost = (await request.json()) as LoginPost;

    if (loginPost.username === "admin" && loginPost.password === "password") {
      return HttpResponse.json(loginPost, { status: 200 });
    } else {
      return HttpResponse.json(loginPost, { status: 401 });
    }
  }),
];
