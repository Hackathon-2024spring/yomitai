import { useState, useEffect } from "react";
import Quagga from "@ericblade/quagga2";

const Scan = () => {
  const [isbncode, setIsbncode] = useState("");
  const [jancode, setJancode] = useState("");

  useEffect(() => {
    Quagga.onDetected((result) => {
      console.log("Detected!!!");
      if (result !== undefined) {
        const code: string | null = result.codeResult.code;
        if (code.startsWith("978")) {
          setIsbncode(code);
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

  return (
    <>
      <div className="h-60 w-80" id="preview"></div>
      <div>
        <p>ISBN Code: {isbncode !== "" ? `${isbncode}` : "スキャン中"}</p>
        <p>JAN Code: {jancode !== "" ? `${jancode}` : "スキャン中"}</p>
      </div>
    </>
  );
};

export default Scan;
