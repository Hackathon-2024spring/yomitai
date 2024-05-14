import { useState } from "react";
import BarcodeReader from "../components/barcodeReader";
import BookRegisterForm from "../components/bookRegisterForm";

export default function Modals() {
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
        className="boder-0 m-4 rounded-xl bg-green-400 px-6 py-2 text-lg text-white duration-300 hover:bg-green-500"
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
