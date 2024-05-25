import RadioButton from "../components/togleButton";
import { BarChart, PieChart } from "@mui/x-charts";

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
              Total Page Count : 100
              {/* これまでの合計は100ページです。 */}
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
              className="relative mx-4 my-4 flex h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: [
                      "5/12",
                      "5/13",
                      "5/14",
                      "5/15",
                      "5/16",
                      "5/17",
                      "5/18",
                    ],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: [20, 50, 30, 40, 10, 30, 60],
                  },
                ]}
                width={400}
                height={300}
              />
            </div>

            <div
              className="relative mx-4 my-4 flex h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 30, label: "フロントエンド" },
                      { id: 1, value: 15, label: "バックエンド" },
                      { id: 2, value: 20, label: "インフラ" },
                    ],
                    innerRadius: 40,
                    outerRadius: 100,
                    paddingAngle: 3,
                    cornerRadius: 0,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                  },
                ]}
                width={450}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
