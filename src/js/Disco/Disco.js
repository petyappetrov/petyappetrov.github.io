//////////////////////////////////////////////////////////////////////////////////////////
import Gradients from './Gradients'
import Layout from './Layout'

//////////////////////////////////////////////////////////////////////////////////////////
class Disco {
  constructor (options) {
    this.gradients = new Gradients()
    this.trigger = true

    this.initialize()
  }

  initialize () {
    this.gradients.load(() => {
      this.build()
      setTimeout(this.start.bind(this), 100)
    })
  }

  build () {
    this.firstLayout = new Layout({
      gradient: this.gradients.getRandomGradient()
    })
    this.secondLayout = new Layout({
      gradient: this.gradients.getRandomGradient()
    })
  }

  start () {
    if (this.trigger) {
      this.trigger = false
      this.firstLayout.onHide(() => {
        this.firstLayout = new Layout({
          gradient: this.gradients.getRandomGradient()
        })
        this.start()
      })
    } else {
      this.trigger = true
      this.secondLayout.onHide(() => {
        this.secondLayout = new Layout({
          gradient: this.gradients.getRandomGradient()
        })
        this.start()
      })
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
export default Disco
