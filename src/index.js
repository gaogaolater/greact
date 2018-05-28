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

class ComB extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
        return <div>
            <span>{this.props.name}</span>
        </div>
    }
}

//console.log('comb',ComB);

setInterval(() => {
    ReactDOM.render(
        <div className="wrap" onClick={e => { alert(123) }}>
            hello <span style={{ color: 'red' }}>world {new Date().toLocaleTimeString()}</span>
            <ComA name="ComAName"></ComA>
            <ComB name="ComBName"></ComB>
        </div>,
        document.querySelector("#root")
    );
}, 1000)




