import React from "react";
import ReactDOM from "react-dom";
import RevealAnimation from "../RevealAnimation";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";

const Modal = ({ children, onClose, maxWidth = null }) => {
  const { isDayMode } = useTheme();
  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-full ${isDayMode ? "bg-black/90" : "bg-black/90"} bg-opacity-10 z-99 flex items-center justify-center`}
      onClick={onClose}
    >
      <RevealAnimation>
        <div
          className="p-12 relative flex width-[90%] max-w-[1000px] mx-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: maxWidth ? maxWidth : "1000px" }}
        >
          <button
            className={`absolute top-12 right-12 ${isDayMode ? "text-black" : "text-white"} p-3 pointer z-99`}
            onClick={onClose}
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </RevealAnimation>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
