// @ts-ignore
import QuillBetterTable from "quill-better-table";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Editor from "@monaco-editor/react";

import "quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";

/* ---------------- REGISTER MODULES ONCE ---------------- */
Quill.register("modules/better-table", QuillBetterTable, true);

// Disable sanitization (keep styles)
const Clipboard = Quill.import("modules/clipboard") as any;
class CustomClipboard extends Clipboard {
  sanitize(html: string) {
    return html;
  }
}
Quill.register("modules/clipboard", CustomClipboard, true);

interface TextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const initialized = useRef(false);

  const [showCode, setShowCode] = useState(false);
  const [codeValue, setCodeValue] = useState(value || "");

  /* ---------------- TOGGLE HTML MODE ---------------- */
  const toggleCodeView = () => {
    if (!quillRef.current) return;

    if (!showCode) {
      // Editor → Code
      setCodeValue(quillRef.current.root.innerHTML);
    } else {
      // Code → Editor
      quillRef.current.clipboard.dangerouslyPasteHTML(codeValue, "silent");
      onChange(codeValue);
    }

    setShowCode(prev => !prev);
  };

  /* ---------------- INIT QUILL (ONCE) ---------------- */
  useEffect(() => {
    if (!editorRef.current || !toolbarRef.current || initialized.current) return;
    initialized.current = true;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Start typing...",
      modules: {
        toolbar: toolbarRef.current,
        clipboard: { matchVisual: false },
        "better-table": {
          operationMenu: {
            items: {
              insertColumnRight: { text: "Insert Column Right" },
              insertColumnLeft: { text: "Insert Column Left" },
              insertRowUp: { text: "Insert Row Up" },
              insertRowDown: { text: "Insert Row Down" },
              deleteColumn: { text: "Delete Column" },
              deleteRow: { text: "Delete Row" },
              deleteTable: { text: "Delete Table" },
              mergeCells: { text: "Merge Cells" },
              unmergeCells: { text: "Unmerge Cells" },
            },
          },
        },
        keyboard: {
          bindings: QuillBetterTable.keyboardBindings,
        },
      },
    });

    quillRef.current = quill;

    // Sync editor → parent
    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      setCodeValue(html);
      onChange(html);
    });

    // Initial value
    if (value) {
      quill.clipboard.dangerouslyPasteHTML(value, "silent");
      setCodeValue(value);
    }

    // Custom table button
    const tableBtn = toolbarRef.current.querySelector(".ql-table");
    tableBtn?.addEventListener("click", e => {
      e.preventDefault();
      const table = quill.getModule("better-table") as any;
      table.insertTable(3, 3);
    });

    return () => {
      quill.off("text-change");
    };
  }, []);

  /* ---------------- EXTERNAL VALUE SYNC ---------------- */
  useEffect(() => {
    if (!quillRef.current) return;

    if (value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || "", "silent");
      setCodeValue(value || "");
    }
  }, [value]);

  /* ---------------- UI ---------------- */
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* WYSIWYG */}
      <div style={{ flex: 1 }}>
        <div
          onClick={toggleCodeView}
          style={{
            marginBottom: 8,
            padding: "8px 14px",
            background: "#0f172a",
            color: "#fff",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            width:"max-content"
          }}
        >
          {showCode ? "Apply HTML & Close" : "Edit HTML"}
        </div>

        {/* Toolbar */}
        <div ref={toolbarRef} className="ql-toolbar ql-snow">
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-header">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="" />
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-table">Table</button>
          </span>
          <span className="ql-formats">
            <button className="ql-clean" />
          </span>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          style={{
            minHeight: 350,
            border: "1px solid #e5e7eb",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
          }}
        />
      </div>

      {/* HTML CODE (MONACO) */}
      {showCode && (
        <div style={{ width: "45%", height: "420px" }}>
          <Editor
            height="100%"
            language="html"
            theme="vs-dark"
            value={codeValue}
            onChange={(val) => setCodeValue(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        </div>
      )}
    </div>
  );
}
