import Header from "../components/Header";
import BarcodeReader from "../components/barcodeReader";
import { CalendarComponent } from "../components/calendarComponent";

export default function Home() {
  return (
    <>
      <Header />
      {/* Sectionをコンポーネント化 */}
      <section className="h-screen w-screen bg-yellow-50 text-xl">
        <div className=" mx-auto flex flex-col py-8 md:flex-row">
          {/* 左側の要素：カレンダ */}
          <div className="flex-grow text-center md:w-1/2 md:text-left">
            <CalendarComponent />
          </div>
          {/* 右側の要素：書籍カード */}
          <div className="w-1/2 md:w-1/2 lg:max-w-lg">
            {/* book card(あとでコンポーネント化) */}
            <div className="flex flex-col items-center p-4">
              {/* カード要素：ここを自動で増やしたい */}
              <div
                className="relative m-auto h-28
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
                      <div>
                        <div className="mx-2 mt-2 w-auto bg-blue-50">
                          <div
                            className="bg-green-600 p-1 text-center text-xs leading-none text-white"
                            style={{ width: "65%" }}
                          >
                            65%
                          </div>
                        </div>
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
                      <div>
                        <div className="mx-2 mt-2 w-full bg-pink-300">
                          <div
                            className="bg-green-600 p-1 text-center text-xs leading-none text-white"
                            style={{ width: "65%" }}
                          >
                            65%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <BarcodeReader />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
