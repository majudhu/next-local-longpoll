import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const listLength = useRef();
  listLength.current = list.length;

  useEffect(
    () =>
      (async function () {
        while (true) {
          const res = await fetch(`/api/hello?q=${listLength.current}`);
          setList(await res.json());
        }
      })(),
    []
  );

  async function sendMessage() {
    await fetch("/api/hello", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });
    setText("");
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>send</button>
      {list.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </div>
  );
}
