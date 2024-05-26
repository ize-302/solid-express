import { Show, createEffect, createSignal } from "solid-js";

const Modal = (props) => {
  const [showModal, setShowModal] = createSignal(false);

  createEffect(() => {
    if (props.isOpen) {
      setShowModal(true);
    }
  });

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      props.onClose();
    }, 300); // Duration of the animation
  };

  return (
    // <Show when={props.isOpen || showModal()}>
    <dialog
      isOpen={props.isOpen || showModal()}
      class={`fixed w-screen h-screen overflow-hidden z-10 inset-0 bg-black/10 flex justify-center items-center transition-opacity duration-300 ${
        props.isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeModal}
    >
      <div
        class={`max-w-xl container relative -top-80 rounded-lg px-8 py-10 bg-white shadow-sm space-y-5 transition-transform duration-300 ${
          props.isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div class="flex justify-between items-center">
          {props.title ? <h1>{props.title}</h1> : <div />}
          <button
            onClick={closeModal}
            class="absolute right-2 top-2 w-8 h-8 bg-white border rounded-full"
          ></button>
        </div>
        <div class="mt-2">{props.children}</div>
      </div>
    </dialog>
    // </Show>
  );
};

export default Modal;
