import Link from "next/link";
import {useState} from "react";

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export default function Vincent() {
  const [state, setState] = useState({chapter: 975, page: 9});

  return (
    <div style={{ height: "100%" }}>
      <div style={{ margin: "0px", background: "#0e0e0e", height: "100%" }}>
        <div>
          <input value={state.chapter} onInput={(e) => {setState({...state, chapter: parseInt(e.target.value) })}}/>
        <button type="button" class="btn btn-primary" onClick={() => {setState({...state, page: state.page + 1})}}>Next</button>
        <button type="button" class="btn btn-primary" onClick={() => {setState({...state, page: state.page - 1})}}>Back</button>
        </div>
        <p style={{color: "white"}}>{state.chapter} - {state.page}</p>
        <img
        onClick={() => {setState({...state, page: state.page + 1})}}
          style={{"display": "block", "-webkit-user-select": "none", "margin": "auto", "cursor": "zoom-in", "background-color": "hsl(0, 0%, 90%)", "transition": "background-color 300ms"}}
          src={`https://cdn.onepiecechapters.com/file/opctcb/onepiece/onepiecechapters_${state.chapter}_${pad(state.page, 2)}.jpg`}
          // width="620"
          // height="931"
        />
      </div>
    </div>
  );
}
