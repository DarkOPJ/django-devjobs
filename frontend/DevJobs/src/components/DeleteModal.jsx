import React from "react";
import ModalBtns from "./ModalBtns";
import { deleteJob } from "../services/JobApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/apiError";

const DeleteModal = ({ modalControl, id }) => {
  const navigate = useNavigate();

  const deletingJob = async () => {
    try {
      const result = await deleteJob(id);
      modalControl.current.close();
      navigate("/jobs");
      toast.success("Job deleted successfully!");
    } catch (error) {
      console.error('Failed to delete job:', error);
      handleApiError(error, navigate, 'Failed to delete job. Please try again.');
    }
  };

  return (
    <dialog
      ref={modalControl}
      className="dialog container sm:w-[375px] backdrop:bg-black/50 p-7 rounded-lg"
    >
      <h1 className="text-2xl font-bold mt-3 mb-1">Delete Job Confirmation</h1>
      <p className="text-sm text-slate-500 font-semibold my-2">
        Are you sure you want to delete this job? This action cannot be undone.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={deletingJob}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
        >
          Delete Job
        </button>
        <ModalBtns btnTxt="Cancel" inModal={true} modalControl={modalControl} />
      </div>
    </dialog>
  );
};

export default DeleteModal;
