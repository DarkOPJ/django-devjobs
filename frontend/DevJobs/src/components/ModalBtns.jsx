import React from "react";

const ModalBtns = ({ btnTxt, inModal = false, modalControl }) => {
  const buttonStyles = inModal
    ? "border border-indigo-400 text-black font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
    : "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block";

  const handleClick = () => {
    if (modalControl.current) {
      if (btnTxt === "Delete Job") { // Changed btnText to btnTxt
        modalControl.current.showModal();
      } else if (btnTxt === "Cancel") { // Changed btnText to btnTxt
        modalControl.current.close();
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={buttonStyles}
    >
      {btnTxt}
    </button>
  );
};

export default ModalBtns;
