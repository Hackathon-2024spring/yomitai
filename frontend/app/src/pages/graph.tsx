// import Header from "../components/Header";
import RadioButton from "../components/togleButton";

export default function Graph() {
  return (
    <>
      {/* <Header /> */}
      <section className="h-screen w-screen bg-yellow-50 text-xl">
        <div className="text-gray-600">
          <div className="flex items-center">
            <div
              className="relative mx-4 my-4 h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              これまでの合計は100ページです。
            </div>
            <div
              className="relative mx-4 my-4 h-full w-1/2 rounded-xl
                    p-4 text-center"
            >
              <RadioButton />
            </div>
          </div>
          <div className="flex">
            <div
              className="relative mx-4 my-4 h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              棒グラフ
            </div>
            <div
              className="relative mx-4 my-4 h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              円グラフ
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
