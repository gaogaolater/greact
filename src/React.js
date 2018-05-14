function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

let React = {
    createElement,
    Component
}

export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {}
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}

function renderComponent(component) {
    
}

export default React;