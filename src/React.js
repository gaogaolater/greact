import {render} from './ReactDOM'

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
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}

function renderComponent(component) {
    var dom = component.render();
    render(dom);
}


function render(vnode, container) {
    if (typeof vnode.tag == "function") {
        //console.log(vnode.tag);
        var instance;
        if (vnode.tag.render) {
            instance = new vnode.tag(vnode.attrs);
        } else {
            instance = {
                render: function () {
                    return vnode.tag(vnode.attrs)
                }
            }
        }
        if (instance.componentWillMount) {
            instance.componentWillMount();
        }
        var component = instance.render();
        render(component, container);
    } else {
        var tag = document.createElement(vnode.tag);
        if (vnode.attrs) {
            for (var key in vnode.attrs) {
                setAttribute(tag, key, vnode.attrs[key]);
            }
        }
        if (vnode.children && vnode.children.length > 0) {
            vnode.children.forEach(node => {
                if (typeof node == "string" || typeof node == "number") {
                    var textNode = document.createTextNode(node);
                    tag.appendChild(textNode);
                } else {
                    render(node, tag);
                }
            })
        }
        container.appendChild(tag);
    }
}

let React = {
    createElement,
    Component
}

export default React;