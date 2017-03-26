//////////////////////////////////////////////////////////////////////////////////////////
import Gradients from './Gradients'
import Layout from './Layout'
import {getLast, getNext} from './utils'

//////////////////////////////////////////////////////////////////////////////////////////
const defaultOptions = {
  duration: {
    max: 2000,
    min: 500
  },
  layouts: ['first', 'second']
}

//////////////////////////////////////////////////////////////////////////////////////////
class Disco {
  constructor (options) {
    this.options = Object.assign({}, defaultOptions, options)
    this.layouts = this.options.layouts
    this.duration = this.options.duration
    this.gradients = new Gradients()
    this.initialize()
  }

  initialize () {
    this.gradients.load(this.build.bind(this))
  }

  build () {
    this.layouts.forEach(this.createLayout.bind(this))
    setTimeout(this.start.bind(this), 100)
  }

  start (name = getLast(this.layouts)) {
    this.handleChangeLayout(getNext(this.layouts, name))
  }

  handleChangeLayout (name) {
    this[name].onHide(() => {
      this.createLayout(name)
      this.start(name)
    })
  }

  createLayout (name) {
    const {min, max} = this.duration
    this[name] = new Layout({
      gradient: this.gradients.getRandomGradient(),
      duration: Math.floor(Math.random() * (max - min + 1)) + min
    })
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
export default Disco
