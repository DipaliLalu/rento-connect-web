// @ts-ignore
import QuillBetterTable from "quill-better-table";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";

Quill.register("modules/better-table", QuillBetterTable, true);

// 🔥 Fix: Disable Quill sanitizing inline styles
const Clipboard = Quill.import("modules/clipboard") as any;
class CustomClipboard extends Clipboard {
  sanitize(html: string) {
    return html; // keep styles
  }
}
Quill.register("modules/clipboard", CustomClipboard, true);

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const initialized = useRef(false); // Prevent double init

  const [showCode, setShowCode] = useState(false);
  const [codeValue, setCodeValue] = useState(value || "");

  // ✅ TOGGLE + SYNC HTML WHEN BUTTON CLICKED
  const toggleCodeView = () => {
    if (!quillRef.current) return;

    if (!showCode) {
      setCodeValue(quillRef.current.root.innerHTML);
    } else {
      quillRef.current.clipboard.dangerouslyPasteHTML(codeValue, "silent");
      onChange(codeValue);
    }

    setShowCode(prev => !prev);
  };


  // Initialize Quill only once
  useEffect(() => {
    if (!editorRef.current || !toolbarRef.current || initialized.current) return;

    initialized.current = true;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Start typing...",
      // formats: [
      //   "bold", "italic", "underline", "strike",
      //   "color", "background",
      //   "header", "list", "align",
      //   "link", "image"
      // ],
      modules: {
        toolbar: toolbarRef.current,
        // toolbar: [["bold", "italic", "underline", "strike"], [{ header: [1, 2, 3, false] }], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], [{ align: [] }], ["clean"], ["table"] // ✅ table button
        // ],
        // table: false,
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
        clipboard: {
          allowed: {
            tags: [
              "a", "b", "strong", "i", "em", "u", "s", "p", "h1", "h2", "h3", "h4", "h5", "h6",
              "ul", "ol", "li", "br", "img", "table", "thead", "tbody", "tr", "th", "td", "span", "div"
            ],
            attributes: [
              "class", "style", "width", "height", "colspan", "rowspan",
              "align", "valign", "bgcolor", "border", "cellpadding", "cellspacing"
            ],
          },
        },
      },
    });

    quillRef.current = quill;
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      if (node instanceof HTMLElement) {
        delta.ops?.forEach(op => {
          if (op.insert && typeof op.insert === "string") {
            op.attributes = {
              ...op.attributes,
              style: node.getAttribute("style") || undefined,
            };
          }
        });
      }
      return delta;
    });


    // Custom table button
    const tableButton = toolbarRef.current?.querySelector(".ql-table");
    if (tableButton) {
      tableButton.addEventListener("click", (e) => {
        e.preventDefault();
        const tableModule = quill.getModule("better-table") as any;
        tableModule.insertTable(3, 3);
      });
    }

    // Sync Quill → Parent + Code View
    // quill.on("text-change", () => {
    //   const html = quill.root.innerHTML;
    //   setCodeValue(html);
    //   onChange(html);
    //   quill.clipboard.dangerouslyPasteHTML(html, "silent");
    // });
    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      setCodeValue(html);
      onChange(html);
    });

    // Set initial value
    if (value) {
      quill.clipboard.dangerouslyPasteHTML(value, "silent");
      setCodeValue(value);
    }

    // Cleanup
    return () => {
      quill.off("text-change");
    };
  }, []); // Empty dependency = run once

  // Sync external value changes → Quill (e.g., form reset)
  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current;

    if (value !== quill.root.innerHTML) {
      quill.root.innerHTML = value || "";
    }

    setCodeValue(value || "");
  }, [value]);

  // // External value update SAFE
  // useEffect(() => {
  //   if (!quillRef.current) return;
  //   const quill = quillRef.current;

  //   if (value !== quill.root.innerHTML) {
  //     quill.clipboard.dangerouslyPasteHTML(value, "silent");
  //     setCodeValue(value);
  //   }
  // }, [value]);

  // Handle direct HTML editing
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    setCodeValue(html);

    if (!quillRef.current) return;

    const quill = quillRef.current;
    const selection = quill.getSelection();

    quill.history.clear();
    quill.root.innerHTML = html;

    // Restore cursor
    setTimeout(() => {
      if (selection) {
        quill.setSelection(selection);
      }
    }, 0);

    onChange(html);
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontFamily: "system-ui, sans-serif" }}>
      {/* WYSIWYG Editor */}
      <div
        style={{ flex: 1 }}
      >
        <div
          onClick={toggleCodeView}
          style={{
            marginBottom: "6px",
            padding: "10px 16px",
            background: "#1e293b",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            width: "150px",
            textAlign: "center",
          }}
        >
          {showCode ? "Hide HTML Code" : "Show HTML Code"}
        </div>

        {/* Toolbar */}
        <div ref={toolbarRef} style={{
          border: "1px solid #e2e8f0",
          borderBottom: "none",
          borderRadius: "12px 12px 0 0",
          background: "#f8fafc",
          padding: "8px",
        }}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="">Normal</option>
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
          // onChange={handleCodeChange}
          style={{
            height: 'auto',
            minHeight: '350px',
            // minHeight: '100px',
            border: "1px solid #e2e8f0",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            background: "#fff",
          }}
        />
      </div>

      {/* Live HTML Editor */}
      {showCode && (
        <div style={{ width: "45%" }}>
          <h4 style={{ margin: "0 0 10px 0", fontWeight: 600, color: "#1e293b" }}>
            Live HTML Code (Editable)
          </h4>
          <textarea
            value={codeValue}
            onChange={handleCodeChange}
            spellCheck={false}
            style={{
              width: "100%",
              height: "420px",
              padding: "14px",
              fontFamily: "Consolas, monospace",
              fontSize: "13.5px",
              border: "1px solid #334155",
              borderRadius: "12px",
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}