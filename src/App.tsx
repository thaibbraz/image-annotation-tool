import React, { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";
import {
  defaultShapeStyle,
  ReactPictureAnnotation,
} from "react-picture-annotation";

function App() {
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const onResize = () => {
    setCanvasSize({ width: 800, height: 600 });
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [annotations, setAnnotations] = useState<any[]>([]);
  const onSelect = (selectedId: any) => console.log(selectedId);
  const onChange = (data: any) => {
    console.log("data inform", data);
    setAnnotations(data);
  };
  // const downloadTxtFile = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob([JSON.stringify(annotations)], {
  //     type: "text/plain;charset=utf-8",
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = "myFile.txt";
  //   document.body.appendChild(element);
  //   element.click();
  // };
  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(annotations)], {
      type: "text/plain;charset=utf-8",
    });
    const filename = Date.now();
    element.href = URL.createObjectURL(file);
    element.download = String(filename);
    document.body.appendChild(element);
    element.click();
  };
  const importAnnotations = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      if (e.target) {
        const contents = e.target.result;
        console.log(contents);
        if (typeof contents === "string") {
          setAnnotations(JSON.parse(contents));
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="App">
        <ReactPictureAnnotation
          image="https://source.unsplash.com/random/800x600"
          onSelect={onSelect}
          onChange={onChange}
          annotationData={annotations}
          width={canvasSize.width}
          height={canvasSize.height}
          scrollSpeed={0}
        />
      </div>

      <button onClick={() => download()}>Download</button>
      <input onChange={importAnnotations} type={"file"} />
    </>
  );
}

export default App;
