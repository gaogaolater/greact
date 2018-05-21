export function render(vnode, container) {
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

function createComponent(func, attrs) {
    var component = func(attrs);
    return component;
}

function setComponentProps(component, attrs) {

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
            container.innerHTML = "";
            render(vnode, container);
        }
    }
}

export default ReactDOM;