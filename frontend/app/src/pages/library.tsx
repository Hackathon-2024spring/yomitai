import { Select } from "@headlessui/react";
import { useRef, useState, useEffect } from "react";

interface BookData {
  book_id: number;
  book_title: string;
  end_date: string | null;
  image: string | null;
  tags: string[];
}

interface BookDetail {
  id: number;
  title: string;
  author: string;
  publisher: string;
  total_page: number;
  image: string | null;
  start_date: string;
  planned_end_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  book_id: number;
  genre_id: number;
}

interface Tag {
  "book_tags.id": number;
  tag_name: string;
}

interface Memo {
  "daily_logs.id": number;
  memo: string;
}

interface BookDetailsResponse {
  book_detail: BookDetail[];
  tags_list: Tag[];
  memo_list: Memo[];
}

interface BookCardProps {
  book: BookData;
  onClick: (bookId: number) => void;
}

interface BookDetailsProps {
  details: BookDetailsResponse;
}

// 書籍表示のコンポーネント
const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => (
  <div
    className="relative mx-auto my-4 h-28
                  w-96 transform cursor-pointer rounded-xl bg-green-100 text-gray-600 shadow-md transition-transform hover:scale-105"
    onClick={() => onClick(book.book_id)}
  >
    <div className="w-full p-4">
      <div className="flex ">
        <div className="mr-2">
          <img
            src={book.image || "../img/book_tailwind.jpg"}
            alt="description"
            className="h-20"
          />
        </div>
        <div className="flex flex-grow flex-col">
          <div className="mx-2 text-sm font-light">{book.book_title}</div>
          {book.tags.length != 0 && (
            <div className="my-2 rounded-xl bg-cyan-100 p-2 text-sm">
              {book.tags.join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// 書籍詳細のコンポーネント
const BookDetails: React.FC<BookDetailsProps> = ({ details }) => (
  <div
    className="relative mx-4 my-4 h-full w-full transform
                   rounded-xl bg-green-100 p-4 text-gray-600 shadow-md"
  >
    <div className="w-full p-4">
      <div className="flex ">
        <div className="mr-2">
          <img
            src={details.book_detail[0].image || "../img/book_tailwind.jpg"}
            alt="description"
            className="mr-4 h-40"
          />
        </div>
        <div className="font-midium flex flex-grow flex-col">
          <div className="mb-4 text-2xl">{details.book_detail[0].title}</div>
          <div className="mb-4">読書進捗ステータス情報</div>
          <div className="my-4 mb-4 rounded-xl bg-cyan-100 p-4">
            タグ: {details.tags_list.map((tag) => `#${tag.tag_name}`).join(" ")}
          </div>
          {details.memo_list.map((memo) => (
            <textarea
              key={memo["daily_logs.id"]}
              className="mb-4 rounded-xl bg-yellow-50 p-4"
              readOnly
              value={memo.memo}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Library() {
  const [fetchData, setFetchData] = useState<BookData[]>([]); // 初期値を空の配列に設定
  const [bookDetails, setBookDetails] = useState<BookDetailsResponse | null>(
    null,
  );
  const [selectTag, setSelectTag] = useState<string>(""); //選択されたタグ情報
  const ref = useRef<HTMLInputElement>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(1);

  useEffect(() => {
    fetch("http://localhost:8000/api/library", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data); // デバッグ用ログ
        if (Array.isArray(data)) {
          console.log("Books data:", data); // 追加のデバッグ用ログ
          setFetchData(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedBookId !== null) {
      console.log(`Fetching details for book ID: ${selectedBookId}`); // デバッグ用ログ
      fetch(`http://localhost:8000/api/books/${selectedBookId}/details`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Book details received:", data); // デバッグ用ログ
          setBookDetails(data);
        });
    }
  }, [selectedBookId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      console.log(ref.current.value);
    }
  };
  const handleBookClick = (bookId: number) => {
    console.log(`Book ID: ${bookId} clicked`);
    setSelectedBookId(bookId);
  };

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
                  fetchData.map(
                    (data) =>
                      data.tags.length != 0 && (
                        <option key={data.book_id} value={data.tags}>
                          {data.tags}
                        </option>
                      ),
                  )}
              </Select>
            </form>

            {/* 書籍一覧表示部 */}
            <div className="flex flex-col items-center p-4">
              {fetchData ? (
                fetchData &&
                fetchData.map((book) => (
                  <BookCard
                    key={book.book_id}
                    book={book}
                    onClick={handleBookClick}
                  />
                ))
              ) : (
                <p>No Books Available</p>
              )}
            </div>
          </div>
          <div className="m-4 flex w-3/5 items-center justify-center ">
            {bookDetails && <BookDetails details={bookDetails} />}
          </div>
        </div>
      </section>
    </>
  );
}
