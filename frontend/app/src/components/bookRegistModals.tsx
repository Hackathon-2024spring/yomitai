import { useState } from "react";
import BarcodeReader from "./barcodeReader";
import BookRegisterForm from "./bookRegisterForm";

export default function BookRegistModals() {
  const [isBarcodeReaderOpen, setIsBarcodeReaderOpen] = useState(false);
  const [isBookRegisterFormOpen, setIsBookRegisterFormOpen] = useState(false);

  const openBarcodeReader = () => {
    setIsBarcodeReaderOpen(true);
  };

  const openBookRegisterForm = () => {
    console.log("HOGE");
    setIsBarcodeReaderOpen(false); // BarcodeReader モーダルを閉じる
    setIsBookRegisterFormOpen(true); // BookRegisterForm モーダルを開く
  };

  return (
    <>
      <button
        className="my-2 rounded-xl bg-green-400 px-2 py-1 text-lg text-white duration-300 hover:bg-green-500"
        onClick={openBarcodeReader} // ボタンがクリックされた時にモーダルを開く
      >
        書籍登録
      </button>
      {/* isBarcodeReaderOpen が true の時に BarcodeReader を表示 */}
      {isBarcodeReaderOpen && (
        <BarcodeReader
          onClose={() => setIsBarcodeReaderOpen(false)}
          openForm={openBookRegisterForm}
        />
      )}{" "}
      {/* isBookRegisterFormOpen が true の時に BookRegisterForm を表示 */}
      {isBookRegisterFormOpen && (
        <BookRegisterForm onClose={() => setIsBookRegisterFormOpen(false)} />
      )}{" "}
    </>
  );
}
