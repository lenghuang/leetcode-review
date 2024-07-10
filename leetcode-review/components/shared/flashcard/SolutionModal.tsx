"use client";

import DOMPurify from "isomorphic-dompurify";

const onSolutionModalClick = () => {
  (document.getElementById("solution_modal") as HTMLDialogElement).showModal();
};

export const SolutionModal = ({ content }: { content?: string }) => {
  if (!content) {
    return null;
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="flex justify-end">
        <button
          className="btn btn-link btn-sm p-0"
          onClick={onSolutionModalClick}
        >
          See Submission Code
        </button>
      </div>
      <dialog
        id="solution_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <SolutionModalText content={content} />
          <div className="modal-action"></div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

const SolutionModalText = ({ content }: { content: string }) => {
  return (
    <div className="overflow-auto">
      <pre
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      ></pre>
    </div>
  );
};
