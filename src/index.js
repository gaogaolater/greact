import React from './React.js'
import ReactDOM from './ReactDOM.js'

const element = (
    <div className="wrap" onClick={e => { alert(123) }}>
        hello <span style={{ color: 'red' }}>world {new Date().getTime()}</span>
    </div>
)

const ComA = (props) => {
    return <div style={{ color: 'green' }}>{props.name}</div>
}

console.log(element);

ReactDOM.render(
    <div className="wrap" onClick={e => { alert(123) }}>
        hello <span style={{ color: 'red' }}>world {new Date().toLocaleTimeString()}</span>
        <ComA name="ComAName">111</ComA>
    </div>,
    document.querySelector("#root")
);


