import { http, HttpResponse } from "msw";

type LoginPost = {
  username: string;
  password: string;
};

type SignupPost = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  http.post("/api/signup", async ({ request }) => {
    const signupPost = (await request.json()) as SignupPost;

    if (signupPost.username === "admin") {
      return HttpResponse.json(signupPost, { status: 401 });
    } else {
      return HttpResponse.json(signupPost, { status: 200 });
    }
  }),
];
