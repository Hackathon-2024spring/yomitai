import Header from "../components/Header";

export default function Mission() {
  return (
    <>
      <Header />
      <section className="h-screen w-screen bg-yellow-50 text-xl">
        <div className="text-gray flex justify-center">
          <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            <div className="mb-4 mt-2 underline underline-offset-4">
              連続読書日数
            </div>
            <img
              className="mb-4 h-32"
              src="/img/mission_calendar_2.png"
              alt=""
            />
            <div className="relative mb-4 w-full rounded-xl bg-green-200">
              <p className="text-center text-lg">次の目標</p>
              <p className="text-center text-base">10日</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
              <div className="text-base">3日</div>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
              <div className="text-base">7日</div>
            </div>
          </div>

          <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            <div className="mb-4 mt-2 underline underline-offset-4">
              読書記録
            </div>
            <img className="mb-4 h-32" src="/img/mission_memo_2.png" alt="" />
            <div className="relative mb-4 w-full rounded-xl bg-green-200">
              <p className="text-center text-lg">次の目標</p>
              <p className="text-center text-base">10回記録</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
              <div className="text-base">3回記録</div>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
              <div className="text-base">7回記録</div>
            </div>
          </div>

          <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            <div className="mb-4 mt-2 underline underline-offset-4">
              読書ページ
            </div>
            <img className="mb-4 h-32" src="/img/mission_pages_2.png" alt="" />
            <div className="relative mb-4 w-full rounded-xl bg-green-200">
              <p className="text-center text-lg">次の目標</p>
              <p className="text-center text-base">100ページ</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
              <div className="text-base">30ページ</div>
            </div>
          </div>

          <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            <div className="mb-4 mt-2 underline underline-offset-4">
              読書冊数
            </div>
            <img className="mb-4 h-32" src="/img/mission_books_2.png" alt="" />
            <div className="relative mb-4 w-full rounded-xl bg-green-200">
              <p className="text-center text-lg">次の目標</p>
              <p className="text-center text-base">3冊</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
