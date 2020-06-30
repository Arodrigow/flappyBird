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

    const deslc = 0.2

    this.animate = () =>{
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - deslc)

            if (pair.getX() < -height){
                pair.setX(pair.getX() + off * this.pairs.length)
                pair.createSpace()
            }

            const mid = width / 2
            const midCross = pair.getX() + deslc >= mid && pair.getX() < mid

            if (midCross) pointNot()
        })
    }
}

function Bird(gameHeight){

    this.element = newElement('img', 'bird')
    this.element.src = 'imgs/bird.png'

    this.getY = () => parseFloat(this.element.style.bottom.split('rem')[0])
    this.setY = y => this.element.style.bottom = `${y}rem`
    let add = 0
    window.onkeypress = e => add = 4

    this.animate = () => {
        const newY = this.getY() + add - 0.2       
        add = 0
        const maxHeight = gameHeight - 2.5

        if (newY <= 0){
            this.setY(0)
        } else if (newY >= maxHeight){
            this.setY(maxHeight)
        }else{
            this.setY(newY)
        }
    }

    this.setY(gameHeight/2)
}

function Progress(){
    this.element = newElement('span', 'progress')
    this.updatePoints = pontos => {
        this.element.innerHTML = pontos
    }
    this.updatePoints(0)
}

function FlappyBird(){
    let score = 0
    let height = 30
    let width = 60

    const gameArea = document.querySelector('[wm-flappy]')
    
    const progress = new Progress()
    const barriers = new barriersControl(height, width, 12.5, 20, 
        () => progress.updatePoints(++score))
    const bird = new Bird(height)

    gameArea.appendChild(progress.element)
    gameArea.appendChild(bird.element)
    barriers.pairs.forEach(pair => gameArea.appendChild(pair.element))

    this.start = () => {
        const timer = setInterval(() => {
            barriers.animate()
            bird.animate()
        },20)
    }
}

new FlappyBird().start()