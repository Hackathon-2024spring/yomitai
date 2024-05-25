import { Select } from "@headlessui/react";
import { useRef, useState, useEffect } from "react";

interface BookData {
  book_id: number;
  book_title: string;
  end_date: string | null;
  image: string | null;
  tags: string[];
}

export default function Library() {
  const [fetchData, setFetchData] = useState<BookData[]>([]); // fetchData の初期状態を null に設定
  const [tagList, setTagList] = useState<string[]>([""]); //全てのタグ情報
  const [selectTag, setSelectTag] = useState<string>(""); //選択されたタグ情報
  // const [bookData, setBookData] = useState<BookData[]>([]);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDatafunc = async () => {
      await fetch("http://localhost:8000/api/library", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data received:", data); // デバッグ用ログ
          setFetchData(data);
          console.log("fetchData", fetchData);
          data.map((fetchbookData: BookData) =>
            fetchbookData.tags.map((tag: string) =>
              setTagList([...tagList, tag]),
            ),
          );
        });
    };
    fetchDatafunc();
  }, []); // [] はコンポーネントの初回レンダリング時のみ実行するため

  // タグ検索欄の更新
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // console.log("HandleChange: ", e.target);
    const { name, value } = e.target;
    setSelectTag(value);
    console.log(name, " : ", value);
    console.log("selectTag: ", selectTag);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      console.log(ref.current.value);
    }
  };

  return (
    <>
      <section className="h-screen w-screen bg-yellow-50 text-xl text-gray-700">
        <div className="container mx-auto flex divide-x divide-gray-400">
          <div className=" mx-auto flex w-2/5 flex-col items-center p-4 ">
            {/* タグ検索部 */}
            <form onSubmit={handleSubmit} className="flex">
              <button type="submit" className="m-2 w-8">
                <img src="../img/serch_icon.png" alt="serch_icon" />
              </button>
              <Select
                className=" w-80 rounded-lg border p-2 text-center"
                name="tags"
                value={selectTag}
                onChange={handleChange}
              >
                <option value="">タグを選択</option>
                {fetchData &&
                  fetchData.map((data) => (
                    <option key={data.book_id} value={data.tags}>
                      {data.tags}
                    </option>
                  ))}
                {/* <option>仮tag1</option>
                <option>仮tag2</option> */}
              </Select>
            </form>

            {/* 書籍一覧表示部 */}
            <div className="flex flex-col items-center p-4">
              {fetchData.length === 0 ? (
                <div>Loading...</div>
              ) : (
                fetchData.map((book) => (
                  <div
                    key={book.book_id}
                    className="relative mx-auto my-4 h-28
                  w-96 transform rounded-xl bg-green-100 text-gray-600 shadow-md transition-transform hover:scale-105"
                  >
                    <div className="w-full p-4">
                      <div className="flex ">
                        <div className="mr-2">
                          <img
                            src={
                              book.image ||
                              "../../public/img/book_leadablecode.jpeg"
                            } // デフォルト画像をとりあえずリーダブルコードの画像に設定
                            alt={book.book_title}
                            className="h-20"
                          />
                        </div>
                        <div className="flex flex-grow flex-col">
                          <div className="mx-2 font-light">
                            {book.book_title}
                          </div>
                          <div className="my-2 rounded-xl bg-cyan-100 p-2">
                            {book.tags.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="m-4 flex w-3/5 items-center justify-center ">
            <div
              className="relative mx-4 my-4 h-full w-full transform
                   rounded-xl bg-green-100 p-4 text-gray-600 shadow-md"
            >
              <div className="w-full p-4">
                <div className="flex ">
                  <div className="mr-2">
                    <img
                      src="../img/book_tailwind.jpg"
                      alt="description"
                      className="mr-4 h-40"
                    />
                  </div>
                  <div className="font-midium flex flex-grow flex-col">
                    <div className="mb-4 text-4xl underline underline-offset-8">
                      tailwindcss 実践入門
                    </div>
                    <div className="mb-4">読書進捗ステータス情報</div>
                    <div className="my-4 mb-4 rounded-xl bg-cyan-100 p-4">
                      タグ一覧
                    </div>
                    <textarea className="mb-4 rounded-xl bg-yellow-50 p-4">
                      メモ情報1
                    </textarea>
                    <textarea className="mb-4 rounded-xl bg-yellow-50 p-4">
                      メモ情報2
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
