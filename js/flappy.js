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

    this.getX = () => parseFloat(this.element.style.left.split('rem')[0])
    this.setX = x => this.element.style.left = `${x}rem`
    this.getWidth = () => this.element.clientWitdh

    this.createSpace()
    this.setX(x)
}

function barriersControl(height, width, space, off, pointNot){

    this.pairs = [
        new Barriers(height, space, width),
        new Barriers(height, space, width + off),
        new Barriers(height, space, width + off * 2),
        new Barriers(height, space, width + off * 3),
        new Barriers(height, space, width + off * 4)
    ]

    const deslc = 0.5

    this.animate = () =>{
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - deslc)
            console.log(pair.getX())
            if (pair.getX() < -height){
                pair.setX(pair.getX() + off * this.pairs.length)
                pair.createSpace()
            }

           /* const mid = width / 2
            const midCross = pair.getX() + deslc >= mid
                && pair.getX() < mid

            if (midCross) pointNot()*/
        })
    }
}

const barriers = new barriersControl(30, 60, 10, 20)
const gameArea = document.querySelector('[wm-flappy]')
barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))
setInterval(() => {
    barriers.animate()
}, 5)