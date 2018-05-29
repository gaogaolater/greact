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
        this.state = {
            now: new Date().toLocaleTimeString()
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        // this.timer = setInterval(() => {
        //     this.setState({
        //         now: new Date().toLocaleTimeString()
        //     });
        // }, 1000);
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
        return <div>
            <span>{this.props.name}:{this.state.now}</span>
        </div>
    }
}

//console.log('comb',ComB);

ReactDOM.render(
    <div className="wrap" onClick={e => { alert(123) }}>
        hello <span style={{ color: 'red' }}>world</span>
        <ComA name="ComAName"></ComA>
        <ComB name="ComBName"></ComB>
    </div>,
    document.querySelector("#root")
);




