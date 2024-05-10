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
import { useState } from "react";

export default function BookRegisterForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Book Register Form</Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel>
            <DialogTitle>書籍情報登録</DialogTitle>
            <Fieldset>
              <Field>
                <Label>タイトル</Label>
                <Input className="border" name="title" />
              </Field>
              <Field>
                <Label>著者名</Label>
                <Input className="border" name="author" />
              </Field>
              <Field>
                <Label>出版社</Label>
                <Input className="border" name="publisher" />
              </Field>
              <Field>
                <Label>ページ数</Label>
                <Input className="border" name="pages" />
              </Field>
              <Field>
                <Label>ジャンル</Label>
                <Select name="genre">
                  <option>仮ジャンル1</option>
                  <option>仮ジャンル2</option>
                </Select>
              </Field>
              <Field>
                <Label>タグ</Label>
                <Input className="border" name="tag" />
              </Field>
              <Field>
                <Label>読了完了目標日</Label>
                <Input className="border" name="date" />
              </Field>
            </Fieldset>
            <div>
              <Button onClick={() => setIsOpen(false)}>登録</Button>
              <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
