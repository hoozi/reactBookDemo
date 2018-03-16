
/**
 * 把一个类型为string的dom模版转成一个真正的dom
 * @param {String} tpl dom的字符串模版
 * @returns {Element} div 返回一个真正的dom 
 */
const _createDomFromString = (tpl) => {
    let div = document.createElement('div');
    div.innerHTML = tpl;
    return div;
}

/**
 * 挂载组件到节点上   
 * @param {Class} component 组件类 
 * @param {Element} wrap 页面上的节点
 */
const render = (component, wrap) => {

    // 挂载组件到节点上
    wrap.appendChild(component._renderDom())

    /**
     * 监听state改变，删除旧el 添加新el
     * @param {Element} oldEl 旧的el
     * @param {Element} newEl 新的el
     */
    component.onStateChange = (oldEl, newEl) => {
        console.log('change')
        wrap.insertBefore(newEl, oldEl); 
        wrap.removeChild(oldEl);
    }
}
class Component {
    constructor(props) {
        this.props = props
    }

    /**
     * 设置组件状态,调用相关的renderDom以及运行组件的onStateChange
     * @param {any} state 组件状态
     */
    setState(state) {
        let oldEl = this.el; 
        this.state = state;
        this.el = this._renderDom();
        if(this.onStateChange) this.onStateChange(oldEl, this.el)
    }

    /**
     * 调用render方法，生成一个真正的dom,并且返回
     */
    _renderDom() {
        this.el = _createDomFromString(this.render());

        // 判断是否有onClick方法，有的话直接调用dom的addEventListener方法并且调用onClick
        // onClick内部调用setState方法,以更新组件
        if(this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this), false);
        }
        return this.el;
    }
}

const simple = {
    Component: Component,
    render: render
}
