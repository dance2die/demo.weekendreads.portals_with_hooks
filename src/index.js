import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  r/reactjs Weekend Reads
  [Weekend Reads] React Docs on Portals

  # 🤔 What?
  - implemented Portals example using React Hooks

  # 🙄 Why?
  - Converting it to Hooks actually forces me to understand what I am doing

  https://www.reddit.com/r/reactjs/comments/a48z9m/weekend_reads_react_docs_on_portals/
*/

const modalRoot = document.getElementById("modal-root");

function Modal({ children }) {
  const el = document.createElement("div");

  useEffect(
    () => {
      modalRoot.appendChild(el);
      return () => {
        modalRoot.removeChild(el);
      };
    },
    [el]
  );

  return ReactDOM.createPortal(children, el);
}

function App() {
  const [showModal, setModal] = useState(false);

  const handleShow = () => setModal(true);
  const handleHide = () => setModal(false);

  const modal = showModal ? (
    <Modal>
      <div className="modal">
        <div>
          With a portal, we can render content into a different part of the DOM,
          as if it were any other React child.
        </div>
        This is being rendered inside the #modal-container div.
        <button onClick={handleHide}>Hide modal</button>
      </div>
    </Modal>
  ) : null;

  return (
    <div className="app">
      This div has overflow: hidden.
      <button onClick={handleShow}>Show modal</button>
      {modal}
    </div>
  );
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
