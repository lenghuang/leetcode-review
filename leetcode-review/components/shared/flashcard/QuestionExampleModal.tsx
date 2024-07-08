"use client";

import DOMPurify from "isomorphic-dompurify";

const onQuestionExampleModalClick = () => {
  (
    document.getElementById("question_example_modal") as HTMLDialogElement
  ).showModal();
};

export const QuestionExampleModal = ({ content }: { content: string }) => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="flex justify-end">
        <button
          className="btn btn-link btn-sm p-0"
          onClick={onQuestionExampleModalClick}
        >
          See Examples + Constraints
        </button>
      </div>
      <dialog
        id="question_example_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <QuestionExampleText content={content} />
          <div className="modal-action"></div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

const QuestionExampleText = ({ content }: { content: string }) => {
  return (
    <div
      className="[&_code]:bg-base-300 [&_pre]:text-neutral [&_*]:text-pretty [&_*]:break-words [&_code]:mx-0.5 [&_code]:rounded [&_code]:p-1 [&_code]:text-xs [&_li]:m-1 [&_pre]:my-2 [&_pre]:border-l-2 [&_pre]:pl-2 [&_pre]:text-sm"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    ></div>
  );
};
