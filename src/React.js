import { render } from './ReactDOM'

function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {}
    }

    setState(stateChange) {
        //this.base.parentNode.removeChild(this.base);
        Object.assign(this.state, stateChange);
        let vnode = this.render();
        let dom = render(vnode);
        // console.log(this.base.parentNode);
        // this.base.parentNode.replaceChild(this.base, dom);
    }
}

let React = {
    createElement,
    Component
}

export default React;