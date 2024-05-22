import { useState, useEffect } from "react";

// import Header from "../components/Header";

// Awardの型定義
interface Award {
  award_name: string;
  award_type: string;
  award_criteria: number;
  award_date: string;
  next_goal: number;
  is_max_goal: boolean;
}

export default function Mission() {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/awards", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data); // デバッグ用ログ
        setAwards(data.user_awards);
      })
      .catch((error) => {
        console.error("There was an error fetching the user awards!", error);
      });
  }, []);

  const getImageSrc = (awardType: string) => {
    switch (awardType) {
      case "days":
        return "/img/mission_calendar_2.png";
      case "times":
        return "/img/mission_memo_2.png";
      case "pages":
        return "/img/mission_pages_2.png";
      case "books":
        return "/img/mission_books_2.png";
      default:
        return "";
    }
  };

  // ミッションタイプごとにアワードを分類
  const groupedAwards = awards.reduce(
    (acc, award) => {
      if (!acc[award.award_type]) {
        acc[award.award_type] = [];
      }
      acc[award.award_type].push(award);
      return acc;
    },
    {} as { [key: string]: Award[] },
  );

  console.log("Grouped Awards:", groupedAwards); // デバッグ用ログ

  return (
    <>
      {/* <Header /> */}
      <section className="h-screen w-screen bg-yellow-50 text-xl">
        <div className="text-gray flex justify-center">
          {Object.entries(groupedAwards).map(([awardType, awardList]) => (
            <div
              key={awardType}
              className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md"
            >
              <div className="mb-4 mt-2 underline underline-offset-4">
                {awardType === "days"
                  ? "連続読書日数"
                  : awardType === "times"
                    ? "読書回数"
                    : awardType === "pages"
                      ? "読書ページ数"
                      : "読書冊数"}
              </div>
              <img className="mb-4 h-32" src={getImageSrc(awardType)} alt="" />
              <div className="relative mb-4 w-full rounded-xl bg-green-200">
                <p className="text-center text-lg">次の目標</p>
                <p className="text-center text-base">
                  {awardList[0].is_max_goal
                    ? "ミッションコンプリート！"
                    : `${awardList[0]?.next_goal} ${
                        awardType === "days"
                          ? "日"
                          : awardType === "times"
                            ? "回"
                            : awardType === "pages"
                              ? "ページ"
                              : "冊"
                      }`}
                </p>
              </div>
              {awardList.map((award) => (
                <div
                  key={award.award_criteria}
                  className="mb-4 flex flex-row items-center"
                >
                  <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
                  <div className="text-base">
                    {award.award_criteria}{" "}
                    {awardType === "days"
                      ? "日達成！"
                      : awardType === "times"
                        ? "回達成！"
                        : awardType === "pages"
                          ? "ページ達成！"
                          : "冊達成！"}
                  </div>
                </div>
              ))}
            </div>

            // <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            //   <div className="mb-4 mt-2 underline underline-offset-4">
            //     読書記録
            //   </div>
            //   <img className="mb-4 h-32" src="/img/mission_memo_2.png" alt="" />
            //   <div className="relative mb-4 w-full rounded-xl bg-green-200">
            //     <p className="text-center text-lg">次の目標</p>
            //     <p className="text-center text-base">10回記録</p>
            //   </div>
            //   <div className="mb-4 flex flex-row items-center">
            //     <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
            //     <div className="text-base">3回記録</div>
            //   </div>
            //   <div className="mb-4 flex flex-row items-center">
            //     <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
            //     <div className="text-base">7回記録</div>
            //   </div>
            // </div>

            // <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            //   <div className="mb-4 mt-2 underline underline-offset-4">
            //     読書ページ
            //   </div>
            //   <img className="mb-4 h-32" src="/img/mission_pages_2.png" alt="" />
            //   <div className="relative mb-4 w-full rounded-xl bg-green-200">
            //     <p className="text-center text-lg">次の目標</p>
            //     <p className="text-center text-base">100ページ</p>
            //   </div>
            //   <div className="mb-4 flex flex-row items-center">
            //     <img className="mr-2 h-5" src="/img/trofy_icon.png" alt="" />
            //     <div className="text-base">30ページ</div>
            //   </div>
            // </div>

            // <div className="relative mx-2 mt-4 flex flex-col items-center rounded-xl bg-green-100 text-gray-600 shadow-md">
            //   <div className="mb-4 mt-2 underline underline-offset-4">
            //     読書冊数
            //   </div>
            //   <img className="mb-4 h-32" src="/img/mission_books_2.png" alt="" />
            //   <div className="relative mb-4 w-full rounded-xl bg-green-200">
            //     <p className="text-center text-lg">次の目標</p>
            //     <p className="text-center text-base">3冊</p>
            //   </div>
            // </div>
          ))}
        </div>
      </section>
    </>
  );
}
