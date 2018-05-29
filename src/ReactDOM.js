export function render(vnode) {
    if (typeof vnode.tag == "function") {
        //console.log(vnode.tag);
        let component, dom
        if (vnode.tag.prototype.render) {
            let instance = new vnode.tag(vnode.attrs);
            if (instance.componentWillMount) {
                instance.componentWillMount();
            }
            component = instance.render();
            if (instance.componentDidMount) {
                instance.componentDidMount();
            }
            dom = render(component);
            instance.base = dom;
        } else {
            component = vnode.tag(vnode.attrs);
            dom = render(component);
        }
        return dom;
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
        return tag;
    }
}

function renderCom(vnode,container){
    container.innerHTML = "";
    var dom = render(vnode);
    container.appendChild(dom);
}

function setAttribute(dom, key, val) {
    if (key == "className") key = "class";
    if (/on\w+/.test(key)) {
        key = key.toLowerCase();
        dom[key] = val || '';
    } else if (key == "style") {
        if (typeof val == "string") {
            dom[key] = val;
        } else if (typeof val == "object") {
            for (let name in val) {
                dom.style[name] = typeof val[name] == "number" ? val[name] + "px" : val[name];
            }
        }
    } else {
        if (val) {
            dom.setAttribute(key, val);
        } else {
            dom.removeAttribute(key);
        }
    }
}

let ReactDOM = {
    render(vnode, container) {
        if (vnode && container) {
            renderCom(vnode, container);
        }
    }
}

export default ReactDOM;