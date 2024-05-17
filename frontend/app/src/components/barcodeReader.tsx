import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
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
  const { setBookInfo } = useBookContext();
  const [isbncode, setIsbncode] = useState("");
  const [jancode, setJancode] = useState("");

  const searchBook = async (isbncode: string) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbncode}`,
    );
    const data = await res.json();

    const item = data.items[0];
    const title = item.volumeInfo.title;
    const authors = item.volumeInfo.authors.join(", ");
    const publisher = item.volumeInfo.publisher;
    const pages = item.volumeInfo.pageCount;

    setBookInfo({
      title: title,
      authors: authors,
      publisher: publisher,
      pages: pages,
      isbn: isbncode,
    });
  };

  useEffect(() => {
    Quagga.onDetected((result) => {
      console.log("Detected!!!");
      if (result !== undefined) {
        const code: string | null = result.codeResult.code;
        if (code.startsWith("978")) {
          setIsbncode(code);
          searchBook(code);
        } else if (code.startsWith("192")) {
          setJancode(code);
        }
      }
    });

    const config = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: "#preview",
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment",
        },
        singleChannel: false,
      },
      frequency: 10,
      locator: {
        patchSize: "large",
        halfSample: true,
        willReadFrequently: true,
      },
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {},
          },
        ],
      },
      numOfWorker: navigator.hardwareConcurrency || 4,
      locate: true,
      src: null,
    };

    Quagga.init(config, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });
  }, []);

  useEffect(() => {
    if (isbncode !== "") {
      searchBook(isbncode);
    }
  }, []);

  return (
    <>
      <Dialog open={true} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 text-gray-700">
          <DialogPanel className="flex h-auto w-auto flex-col rounded-xl bg-cyan-100">
            <DialogTitle className="m-4 text-center text-lg  underline underline-offset-8">
              書籍情報登録
            </DialogTitle>
            {/* <div id="barcodeview" className="mx-auto my-4 p-4 ">
              本のバーコードを撮影してアップロードしてください。
            </div> */}
            <div className="m-2 flex flex-col">
              <div className="h-60 w-80" id="preview"></div>
              <div>
                <p>
                  ISBN Code: {isbncode !== "" ? `${isbncode}` : "スキャン中"}
                </p>
                <p>JAN Code: {jancode !== "" ? `${jancode}` : "スキャン中"}</p>
              </div>
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
