import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function BarcodeReader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Barcord Reader</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel>
            <DialogTitle>書類情報登録</DialogTitle>
            <p>本のバーコードを撮影してアップロードしてください</p>
            <div>
              <Button>アップロード</Button>
              <Button>フォームから入力する</Button>
              <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
