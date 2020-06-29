function newElement(tagName, className){
    const element = document.createElement(tagName)
    element.className = className

    return element
}

function Barrier(reverse = false){
    this.element = newElement('div', 'barrier')

    const border = newElement('div', 'border')
    const body = newElement('div', 'body')
    this.element.appendChild(reverse ? body : border)
    this.element.appendChild(reverse ? border : body)

    this.setHeight = altura => {
        return body.style.height = `${altura}rem`
    }
}

function Barriers(height, space, x ){
    this.element = newElement('div', 'barriers')

    this.top = new Barrier(true)
    this.bottom = new Barrier(false)

    this.element.appendChild(this.top.element)
    this.element.appendChild(this.bottom.element)

    this.createSpace = () =>{
        const heightTop = Math.random() * (height - space)
        const heightBottom = height - space - heightTop
        this.top.setHeight(heightTop)
        this.bottom.setHeight(heightBottom)
    }

    this.getX = () => parseInt(this.element.style.left.split('rem')[0])
    this.setX = () => this.element.style.left = `${x}rem`
    this.getWidth = () => this.element.clientWidth

    this.createSpace()
    this.setX()
}

const b = new Barriers(25,5,40)
document.querySelector('[wm-flappy]').appendChild(b.element)
