import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null); // For DOM element
  const quillRef = useRef<Quill | null>(null); // For Quill instance

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start typing...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
        formats: [
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "link",
          "image",
          "video",
          "color",
          "background",
          "align",
        ],
      });

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current!.root.innerHTML);
      });
    }

    // Update editor if parent value changes
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value, onChange]);

  return <div ref={editorRef} style={{ minHeight: "200px", borderRadius:"8px" ,borderColor:"oklch(0.929 0.013 255.508)"}}/>;
}
