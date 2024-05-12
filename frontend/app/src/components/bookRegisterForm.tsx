import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from "@headlessui/react";

interface bookRegisterFormProps {
  onClose: () => void; // モーダルを閉じる関数
}

export default function BookRegisterForm({ onClose }: bookRegisterFormProps) {
  return (
    <>
      <Dialog open={true} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 text-gray-700">
          <DialogPanel className="flex h-auto w-auto flex-col rounded-xl bg-cyan-100">
            <DialogTitle className="m-4 text-center text-lg text-gray-700 underline underline-offset-8">
              書籍情報登録
            </DialogTitle>
            <Fieldset className="m-2 flex flex-col">
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  タイトル
                </Label>
                <Input
                  className="rounded-lg border p-2 text-center"
                  name="title"
                />
              </Field>
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  著者名
                </Label>
                <Input
                  className="rounded-lg border p-2 text-center"
                  name="author"
                />
              </Field>
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  出版社
                </Label>
                <Input
                  className="rounded-lg border p-2 text-center"
                  name="publisher"
                />
              </Field>
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  ページ数
                </Label>
                <Input
                  className="rounded-lg border p-2 text-center"
                  name="pages"
                />
              </Field>
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  ジャンル
                </Label>
                <Select
                  className="rounded-lg border p-2 text-center"
                  name="genre"
                >
                  <option>仮ジャンル1</option>
                  <option>仮ジャンル2</option>
                </Select>
              </Field>
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  タグ
                </Label>
                <Input
                  className="rounded-lg border p-2 text-center"
                  name="tag"
                />
              </Field>
              <Field className="m-2 grid grid-cols-2">
                <Label className="mr-2 flex items-center justify-center">
                  読了完了目標日
                </Label>
                <Input
                  className="rounded-lg border p-2 text-center"
                  name="date"
                />
              </Field>
            </Fieldset>
            <div className="mx-auto flex w-[50%] flex-col">
              <Button
                className="boder-0 m-2 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
                onClick={onClose}
              >
                登録
              </Button>
              <Button
                className="boder-0 m-2 rounded-xl bg-cyan-400 px-6 py-2 text-lg text-white duration-300 hover:bg-cyan-500"
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
