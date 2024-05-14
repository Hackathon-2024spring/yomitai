import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, ChangeEvent } from "react";
import Quagga from "@ericblade/quagga2";
import { useBookContext } from "../contexts/bookContext";

interface BarcodeReaderProps {
  onClose: () => void; // モーダルを閉じる関数
  openForm: () => void; // BookRegisterForm を表示する関数
}

// export default function BarcodeReader() {
export default function BarcodeReader({
  onClose,
  openForm,
}: BarcodeReaderProps) {
  const [image, setImage] = useState("");
  const [barcode, setBarcode] = useState("");
  const { setBookInfo } = useBookContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file) || "");
    } else {
      setImage("");
    }
  };

  const decodeBarcode = () => {
    Quagga.decodeSingle(
      {
        src: image,
        numOfWorkers: 0,
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (result) => {
        if (result && result.codeResult) {
          const code = result.codeResult.code as string;
          setBarcode(code);
          searchBook(code);
        } else {
          setBarcode("バーコードを読み取れませんでした。");
        }
      },
    );
  };

  const searchBook = async (barcode: string) => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}`);
    const data = await res.json();

    const item = data.items[0];
    const title = item.volumeInfo.title;
    const authors = item.volumeInfo.authors.join(', ');
    const publisher = item.volumeInfo.publisher;
    const pages = item.volumeInfo.pageCount;

    setBookInfo({
      title: title,
      authors: authors,
      publisher: publisher,
      pages: pages
    });
  }

  return (
    <>
      <Dialog open={true} onClose={onClose} className="relative z-50 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 text-gray-700">
          <DialogPanel className="flex h-auto w-auto flex-col rounded-xl bg-cyan-100">
            <DialogTitle className="m-4 text-center text-lg  underline underline-offset-8">
              書籍情報登録
            </DialogTitle>
            <p className="mx-auto my-4 p-4 ">
              本のバーコードを撮影してアップロードしてください
            </p>
            <div className="m-2 flex flex-col">
              <input
                className="m-4"
                type="file"
                accept="image/"
                onChange={handleChange}
              />
              <p className="m-4 underline ">バーコードデータ: {barcode}</p>
              <Button
                className="boder-0 m-4 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
                onClick={decodeBarcode}
              >
                バーコードを読み取る
              </Button>
              <Button
                onClick={() => {
                  openForm();
                }}
                className="boder-0 m-4 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
              >
                フォームから入力する
              </Button>
              <Button
                className="boder-0 m-4 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
                onClick={onClose}
              >
                キャンセル
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
