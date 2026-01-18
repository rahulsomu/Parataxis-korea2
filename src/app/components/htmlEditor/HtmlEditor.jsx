// import CKEditor from "ckeditor4-react";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorApiKey } from "../../../constants";

const HtmlEditor = ({ value, onChange, id }) => {
  const [content, setContent] = useState(value || "");
  const apikey = editorApiKey;
  // const config = {
  //   allowedContent: true,
  //   versionCheck: false,
  //   // Remove modal-based plugins
  //   removePlugins:
  //     "dialog,dialogadvtab,image,link,table,flash,forms,iframe,about",
  //   // Keep toolbar minimal + include Source toggle
  //   toolbar: [
  //     { name: "document", items: ["Source"] },
  //     {
  //       name: "basicstyles",
  //       items: ["Bold", "Italic", "Underline", "Strike", "-", "RemoveFormat"],
  //     },
  //     {
  //       name: "paragraph",
  //       items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent"],
  //     },
  //     { name: "clipboard", items: ["Undo", "Redo"] },
  //     { name: "editing", items: ["Find", "Replace"] },
  //   ],
  // };
  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
  };
  useEffect(() => {
    if (content) {
      onChange(content, id, true);
    }
  }, [content]);

  return (
    // <CKEditor
    //   type="classic"
    //   data={value}
    //   onChange={(event) => {
    //     onChange(event.editor.getData(), id, true);
    //   }}
    //   config={config}
    // />/
    <>
      <Editor
        apiKey={apikey}
        // initialValue={content}
        value={content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
        onEditorChange={(newcontent) => handleEditorChange(newcontent)}
      />
    </>
  );
};

export default HtmlEditor;
