import { useEffect, useState } from "react";
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
  Textarea,
} from "@headlessui/react";
import Cookies from "js-cookie";

interface bookRegisterFormProps {
  onClose: () => void; // モーダルを閉じる関数
}

export default function BookMemoModal({ onClose }: bookRegisterFormProps) {
  const [bookMemoForm, setBookMemoForm] = useState({
    title: "",
    page_read: 0,
    memo: "",
    reading_date: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const [options, setOptions] = useState([]);

  type ReceiveItem = {
    my_book_id: number;
    my_book_title: string;
  };

  // ページ遷移後のデータ取得関数実行
  useEffect(() => {
    (async () => {
      console.log("Memo_modal api fetch START");
      const sessionData = Cookies.get("session_id");
      console.log("Get Cookies: ", sessionData);
      const headers = new Headers({
        "Set-Cookie": `session_id=${sessionData}`,
      });
      const res = await fetch("http://localhost:8000/api/books", {
        method: "GET",
        credentials: "include",
        headers,
      });
      const data = await res.json();
      console.log("Get APIData: ", data);
      setOptions(data);
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // console.log("HandleChange: ", e.target);
    const { name, value } = e.target;
    setBookMemoForm({ ...bookMemoForm, [name]: value });
    console.log("bookMemoForm: ", bookMemoForm);
  };

  const dateUpdated = () => {
    const date_time = new Date();
    setBookMemoForm({
      ...bookMemoForm,
      created_at: date_time,
      updated_at: date_time,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sessionData = Cookies.get("session_id");
      console.log("Get Cookies: ", sessionData);
      const headers = new Headers({
        "Content-Type": "application/json",
        "Set-Cookie": `session_id=${sessionData}`,
      });
      console.log("headers: ", headers);

      dateUpdated;
      const Req_Body = JSON.stringify(bookMemoForm);
      console.log("Req_Body: ", Req_Body);

      const response = await fetch("http://localhost:8000/api/logs", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(bookMemoForm),
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
          <DialogPanel className="flex flex-col rounded-xl bg-cyan-100 md:w-96">
            <DialogTitle className="m-4 text-center text-lg text-gray-700 underline underline-offset-8">
              読書記録
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <Fieldset className="m-2 flex flex-col">
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">書籍タイトル</Label>
                  <Select
                    className="rounded-lg border p-2"
                    name="title"
                    value={bookMemoForm.title}
                    onChange={handleChange}
                  >
                    <option value="">選択して下さい</option>
                    {options.map((book: ReceiveItem) => (
                      <option key={book.my_book_id} value={book.my_book_title}>
                        {book.my_book_title}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">読み終わったページNo.</Label>
                  <Input
                    className="rounded-lg border p-1"
                    name="page_read"
                    value={bookMemoForm.page_read}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">読書日</Label>
                  {/* Date pickerを実装する。 */}
                  <Input
                    className="rounded-lg border p-1"
                    name="reading_date"
                    value={bookMemoForm.reading_date}
                    onChange={handleChange}
                  />
                </Field>
                {/* <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">タグ</Label>
                  <Input
                    className="rounded-lg border p-1"
                    name="tag"
                    value={bookMemoForm.tag}
                    onChange={handleChange}
                  />
                </Field> */}
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">メモ</Label>
                  <Textarea
                    className={"rounded-lg border"}
                    rows={4}
                    name="memo"
                    value={bookMemoForm.memo}
                    onChange={handleChange}
                  />
                </Field>
              </Fieldset>
              <div className="mx-auto flex w-[50%] flex-col">
                <Button
                  type="submit"
                  className="boder-0 m-2 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
                >
                  記録
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
