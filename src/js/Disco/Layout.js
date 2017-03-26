//////////////////////////////////////////////////////////////////////////////////////////
import {getRandomNumber} from './utils'

//////////////////////////////////////////////////////////////////////////////////////////
class Layout {
  constructor ({gradient, duration}) {
    this.gradient = gradient
    this.duration = duration
    if (this.gradient) {
      this.createNode()
    }
  }

  createNode () {
    this.node = document.createElement('div')
    this.node.className = 'gradient-layout'
    this.node.style.transitionDuration = `${this.duration}ms`
    this.node.style.background = `
      linear-gradient(
        ${getRandomNumber(360)}deg,
        ${this.gradient.colors[0]} 0%,
        ${this.gradient.colors[1]} 100%
      )
    `
    document.body.insertBefore(this.node, document.body.firstChild)
  }

  onHide (callback) {
    this.node.classList.add('fade-out')
    this.node.addEventListener('transitionend', () => {
      this.node.parentNode.removeChild(this.node)
      if (typeof callback === 'function') {
        callback()
      }
    }, false)
  }

  getNode () {
    return this.node
  }

  getGradientName () {
    return this.gradient.name
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
export default Layout
