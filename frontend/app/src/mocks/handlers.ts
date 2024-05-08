import { http, HttpResponse } from "msw";

type LoginPost = {
  user_name: string;
  password: string;
};

type SignupPost = {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type CreateBook = {
  title: string;
  author: string;
  publisher: string;
  total_page: number;
  isbn: string;
  image: string;
  created_at: string;
  updated_at: string;
  planned_end_date: string;
  genre: string;
  tag: string[];
};

type CreateDailyLog = {
  title: string;
  page_read: number;
  memo: string;
  reading_date: string;
  created_at: string;
  updated_at: string;
};

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const loginPost = (await request.json()) as LoginPost;

    if (loginPost.user_name === "admin" && loginPost.password === "password") {
      return HttpResponse.json(loginPost, { status: 200 });
    } else {
      return HttpResponse.json(loginPost, { status: 401 });
    }
  }),

  http.post("/api/signup", async ({ request }) => {
    const signupPost = (await request.json()) as SignupPost;

    if (signupPost.user_name === "admin") {
      return HttpResponse.json(signupPost, { status: 401 });
    } else {
      return HttpResponse.json(signupPost, { status: 200 });
    }
  }),

  http.post("/api/logout", () => {
    return HttpResponse.json({ status: 200 });
  }),

  // create_book
  http.post("/api/books", async ({ request }) => {
    const createBook = (await request.json()) as CreateBook;

    return HttpResponse.json(createBook, { status: 200 });
  }),

  // create_daily_log
  http.post("/api/logs", async ({ request }) => {
    const createDailyLog = (await request.json()) as CreateDailyLog;

    return HttpResponse.json(createDailyLog, { status: 200 });
  }),
];
