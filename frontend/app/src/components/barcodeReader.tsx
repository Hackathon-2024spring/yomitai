import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, ChangeEvent } from "react";
import Quagga from "@ericblade/quagga2";

export default function BarcodeReader() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string>("");
  const [barcode, setBarcode] = useState("");

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
          setBarcode(result.codeResult.code as string);
        } else {
          setBarcode("バーコードを読み取れませんでした。");
        }
      },
    );
  };

  return (
    <>
      <Button
        className="boder-0 m-4 rounded-xl bg-green-400 px-6 py-2 text-lg text-white duration-300 hover:bg-green-500"
        onClick={() => setIsOpen(true)}
      >
        書籍登録
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-cyan-100 backdrop:bg-gray-900">
            <DialogTitle>書類情報登録</DialogTitle>
            <p>本のバーコードを撮影してアップロードしてください</p>
            <div>
              <input type="file" accept="image/" onChange={handleChange} />
              <Button onClick={decodeBarcode}>バーコードを読み取る</Button>
              <p>バーコードデータ: {barcode}</p>
              <Button>フォームから入力する</Button>
              <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
