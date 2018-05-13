function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

const React = {
    createElement
}

function render(vnode, container) {
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

const ReactDOM = {
    render(vnode, container) {
        if (vnode && container) {
            container.innerHTML = "";
            render(vnode, container);
        }
    }
}

const element = (
    <div className="wrap" onClick={e => { alert(123) }}>
        hello <span style={{ color: 'red' }}>world {new Date().getTime()}</span>
    </div>
)

console.log(element);

setInterval(() => {
    ReactDOM.render(
        <div className="wrap" onClick={e => { alert(123) }}>
            hello <span style={{ color: 'red' }}>world {new Date().toLocaleTimeString()}</span>
        </div>,
        document.querySelector("#root")
    );
}, 1000);


