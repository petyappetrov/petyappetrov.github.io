//////////////////////////////////////////////////////////////////////////////////////////
import {getRandomNumber} from './utils.js'

//////////////////////////////////////////////////////////////////////////////////////////
class Gradients {
  constructor () {
    this.gradients = []
    this.cache = []
  }

  load (callback) {
    try {
      const request = new XMLHttpRequest()
      request.open('GET', './gradients.json', true)
      request.send()
      request.onload = () => {
        if (request.status !== 200) {
          throw new Error('Failed load json')
        }
        this.gradients = JSON.parse(request.response)
        this.cache = this.gradients
        if (typeof callback === 'function') {
          callback.call(this, this.gradients)
        }
      } 
    } catch (err) {
      console.error(err)
    }
  }

  getRandomGradient () {
    if (!this.gradients.length) {
      this.gradients = this.cache
    }
    const randomGradient = this.gradients[getRandomNumber(this.gradients.length)]
    this.gradients = this.gradients.filter(g => g.name !== randomGradient.name)
    return randomGradient
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
export default Gradients
