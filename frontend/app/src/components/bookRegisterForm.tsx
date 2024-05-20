import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";
import { useBookContext } from "../contexts/bookContext";
import React, { useState } from "react";

interface bookRegisterFormProps {
  onClose: () => void; // モーダルを閉じる関数
}

interface BookForm {
  title: string;
  author: string;
  publisher: string;
  total_page: number;
  image: string;
  created_at: string;
  start_date: string;
  planned_end_date: string;
  isbn_code: number;
  genre: string;
  tag: string[];
}

export default function BookRegisterForm({ onClose }: bookRegisterFormProps) {
  const { bookInfo } = useBookContext();
  const [bookForm, setBookForm] = useState<BookForm>({
    title: bookInfo.title || "",
    author: bookInfo.authors || "",
    publisher: bookInfo.publisher || "",
    total_page: Number(bookInfo.pages) || 0,
    image: "",
    created_at: new Date().toISOString(),
    start_date: new Date().toISOString().split('T')[0],
    planned_end_date: "",
    isbn_code: bookInfo.isbn ? parseInt(bookInfo.isbn, 10) : 0,
    genre: "",
    tag: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "tag") {
      setBookForm({ ...bookForm, [name]: value.split(",") });
    } else if (name === "total_page" || name === "isbn_code") {
      setBookForm({ ...bookForm, [name]: parseInt(value, 10) });
    } else {
      setBookForm({ ...bookForm, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookForm),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={true} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 text-gray-700">
          <DialogPanel className="flex h-auto w-auto flex-col rounded-xl bg-cyan-100">
            <DialogTitle className="m-4 text-center text-lg text-gray-700 underline underline-offset-8">
              書籍情報登録
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <Fieldset className="m-2 flex flex-col">
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    タイトル
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="title"
                    value={bookForm.title}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    著者名
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="author"
                    value={bookForm.author}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    出版社
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="publisher"
                    value={bookForm.publisher}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    ページ数
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="total_page"
                    type="number"
                    value={bookForm.total_page}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    ジャンル
                  </Label>
                  <Select
                    className="rounded-lg border p-2 text-center"
                    name="genre"
                    value={bookForm.genre}
                    onChange={handleChange}
                  >
                    <option value="">選択して下さい</option>
                    <option value="仮ジャンル1">仮ジャンル1</option>
                    <option value="仮ジャンル2">仮ジャンル2</option>
                  </Select>
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    タグ
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="tag"
                    value={bookForm.tag.join(",")}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    読了完了目標日
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="planned_end_date"
                    type="date"
                    value={bookForm.planned_end_date}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    ISBNコード
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="isbn_code"
                    type="number"
                    value={bookForm.isbn_code}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    画像
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="image"
                    value={bookForm.image}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="m-2 grid grid-cols-2">
                  <Label className="mr-2 flex items-center justify-center">
                    読了開始日
                  </Label>
                  <Input
                    className="rounded-lg border p-2 text-center"
                    name="start_date"
                    type="date"
                    value={bookForm.start_date}
                    onChange={handleChange}
                  />
                </Field>
              </Fieldset>
              <div className="mx-auto flex w-[50%] flex-col">
                <Button
                  type="submit"
                  className="boder-0 m-2 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
                >
                  登録
                </Button>
                <Button
                  type="button"
                  className="boder-0 m-2 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
                  onClick={onClose}
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

