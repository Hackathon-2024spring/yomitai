import { useState } from "react";
import BarcodeReader from "../components/barcodeReader";
import BookRegisterForm from "../components/bookRegisterForm";

export default function Modals() {
  const [isBarcodeReaderOpen, setIsBarcodeReaderOpen] = useState(false);

  return (
    <>
      <button
        className="boder-0 m-4 rounded-xl bg-green-400 px-6 py-2 text-lg text-white duration-300 hover:bg-green-500"
        onClick={() => setIsBarcodeReaderOpen(true)} // ボタンがクリックされた時にモーダルを開く
      >
        書籍登録
      </button>
      {isBarcodeReaderOpen && (
        <BarcodeReader onClose={() => setIsBarcodeReaderOpen(false)} />
      )}{" "}
      {/* isBarcodeReaderOpen が true の時に BarcodeReader を表示 */}
      <BookRegisterForm />
    </>
  );
}
