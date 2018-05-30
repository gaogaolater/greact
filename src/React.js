import { render } from './ReactDOM'

function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

let componentArray = [];

class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        componentArray.push(this);
        this._stateChangeArray = [];
    }

    setState(stateChange) {
        //延迟执行setState
        this._stateChangeArray.push(stateChange);
    }
}

if (flushTimer) {
    clearInterval(flushTimer);
}
let flushTimer = setInterval(() => {
    componentArray.forEach(com => {
        let item = null;
        let hasChange = false;
        while (item = com._stateChangeArray.shift()) {
            hasChange = true;
            if (typeof item == "function") {
                Object.assign(com.state, item.call(com, com.state));
            } else {
                Object.assign(com.state, item);
            }
        }
        if (hasChange) {
            let vnode = com.render();
            let dom = render(vnode);
            diff(dom, com.base);
            com.base.parentNode.replaceChild(dom, com.base);
            com.base = dom;
        }
    })
}, 200);

function diff(newDom, oldDom) {
    //检查 节点类型，节点属性，节点事件，子节点
    //console.log(newDom.tagName);
    if (newDom.tagName == oldDom.tagName) {
        //判断 增加或减少的dom
        
    }
}


//状态队列
// let stateQueue = [];

// if (queueTimer) {
//     clearInterval(queueTimer);
// }
// let queueTimer = setInterval(() => {
//     let result = {};
//     if (stateQueue.length > 0) {
//         stateQueue.forEach(state => {
//             Object.assign(result, state);
//         })

//     }
// }, 200);

let React = {
    createElement,
    Component
}

export default React;