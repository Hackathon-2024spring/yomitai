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
import { useBookContext } from "../contexts/bookContext";
import Cookies from "js-cookie";

interface bookRegisterFormProps {
  onClose: () => void; // モーダルを閉じる関数
}

export default function BookMemoModal({ onClose }: bookRegisterFormProps) {
  const { bookInfo } = useBookContext();
  const [bookForm, setBookForm] = useState({
    title: bookInfo.title || "",
    authors: bookInfo.authors || "",
    publisher: bookInfo.publisher || "",
    pages: bookInfo.pages || 0,
    genre: "",
    tag: "",
    date: "",
    isbn: bookInfo.isbn || "",
  });

  type ReceiveItem = {
    id: number;
    book_title: string;
  };

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
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setBookForm({ ...bookForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/books", {
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
                    name="genre"
                    value={bookForm.title}
                    onChange={handleChange}
                  >
                    <option value="">選択して下さい</option>
                    <option value="Tailwind CSS 実践入門">
                      Tailwind CSS 実践入門
                    </option>
                    <option value="リーダブルコード">リーダブルコード</option>
                  </Select>
                  {/* <Input
                    className="w-80 flex-grow rounded-lg border p-2"
                    name="title"
                    value={bookForm.title}
                    onChange={handleChange}
                  /> */}
                </Field>
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">読み終わったページNo.</Label>
                  <Input
                    className="rounded-lg border p-1"
                    name="authors"
                    value={bookForm.authors}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">読書日</Label>
                  {/* Date pickerを実装する。 */}
                  <Input
                    className="rounded-lg border p-1"
                    name="publisher"
                    value={bookForm.publisher}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">タグ</Label>
                  <Input
                    className="rounded-lg border p-1"
                    name="pages"
                    value={bookForm.tag}
                    onChange={handleChange}
                  />
                </Field>
                <Field className="mx-4 mb-2 flex flex-col">
                  <Label className="">メモ</Label>
                  <Textarea className={"rounded-lg border"} rows={4} />
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

//   const item = data.items[0];
//   const title = item.volumeInfo.title;
//   const authors = item.volumeInfo.authors.join(", ");
//   const publisher = item.volumeInfo.publisher;
//   const pages = item.volumeInfo.pageCount;

//   setBookInfo({
//     title: title,
//     authors: authors,
//     publisher: publisher,
//     pages: pages,
//     isbn: isbncode,
//   });
// };
// const handleSubmit = (e) => {
//   e.preventDefault()
//   // console.log(ref.current.value)

//   // API URL
//   const endpointURL =
//     `https://pixabay.com/api/?key=43385307-62aaa7aff1ec0a25276441c07&q=${ref.current.value}&image_type=photo`
//   // APIを叩くデータフェッチング　　fetch or axios
//   fetch(endpointURL)
//   .then((res) => {
//     return res.json()
//   })
//   .then((data) => {
//     setFetchData(data.hits)
//   })
// }
