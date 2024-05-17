import Header from "../components/Header";
import { useRef, useState } from "react";
// import './App.css';
// import ImageGallery from './ImageGallery';

export default function Library() {
  const [fetchData, setFetchData] = useState([]);
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(ref.current.value)

    // API URL
    const endpointURL = `https://pixabay.com/api/?key=43385307-62aaa7aff1ec0a25276441c07&q=${ref.current.value}&image_type=photo`;
    // APIを叩くデータフェッチング　　fetch or axios
    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchData(data.hits);
      });
  };

  return (
    <>
      <Header />
      <section className="h-screen w-screen bg-yellow-50 text-xl text-gray-700">
        <div className="container flex divide-x divide-gray-400">
          <div className=" mx-auto flex w-2/5 flex-col items-center p-4">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" placeholder="Search tags" ref={ref} />
            </form>
            {/* 書籍カードを表示するコンポーネント化を行う */}
            <div className="flex flex-col items-center p-4">
              {/* カード要素：ここを自動で増やしたい */}
              <div
                className="relative mx-auto my-4 h-28
                  w-96 transform rounded-xl bg-green-100 text-gray-600 shadow-md transition-transform hover:scale-105"
              >
                <div className="w-full p-4">
                  <div className="flex ">
                    <div className="mr-2">
                      <img
                        src="../img/book_tailwind.jpg"
                        alt="description"
                        className="h-20"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="mx-2 font-light">
                        tailwindcss 実践入門
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="relative m-2 h-28
                  w-96 transform rounded-xl bg-green-100 text-gray-600 shadow-md transition-transform hover:scale-105"
              >
                <div className="w-full p-4">
                  <div className="flex ">
                    <div className="mr-2">
                      <img
                        src="../img/book_leadablecode.jpeg"
                        alt="description"
                        className="h-20"
                      />
                    </div>
                    <div>
                      <div className="mx-2 font-light">リーダブルコード</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4 flex w-3/5 items-center justify-center ">
            <div
              className="relative mx-4 my-4 h-full w-full transform
                   rounded-xl bg-green-100 p-4 text-gray-600 shadow-md transition-transform "
            >
              書籍情報
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
