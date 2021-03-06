/* global Promise */
import ost from './ost.js'
ost([
  'https://invidio.us/latest_version?id=0IwIwsxVMZ0&itag=18', // Steventhedreamer - Synchobonk
  'https://invidio.us/latest_version?id=ktUd6imka5Y&itag=18' // Steventhedreamer - Electronic Voluntary
])
const bruhcount = document.getElementById('bruhcount')
/** @type HTMLAudioElement */
const sound = document.getElementById('bruhsound')

Object.defineProperty(window, 'bruhs', {
  get () {
    return +localStorage.getItem('bruhcount') || 0
  },
  set (value) {
    localStorage.setItem('bruhcount', Math.round(+value))
    if (value > 1 || value === 0) {
      bruhcount.innerText = `${window.bruhs} bruhs`
    } else {
      bruhcount.innerText = `${window.bruhs} bruh`
    }
    return Math.round(+value)
  }
})

const upgradelist = document.getElementById('upgradelist')

const beagle = document.getElementById('beagle')
beagle.addEventListener('click', () => {
  window.bruhs++
  sound.onplay = ()=>beagle.src = './assets/bark/birthday.jpg'
  sound.currentTime = 0
  sound.play()
  sound.onended = ()=>beagle.src = './assets/beg/snout.jpg'
})

window.bruhs += 0

function addUpgrade ({name = 'Untitled Building', func, startprice = 0, multiplier = 1}) {
  let price = localStorage.getItem(name) || startprice
  const building = document.createElement('article')
  const heading = document.createElement('h3')
  heading.innerText = name
  const pricep = document.createElement('p')
  pricep.innerText = `${Math.round(price)} bruh(s)`
  building.appendChild(heading)
  building.appendChild(pricep)
  upgradelist.appendChild(building)
  building.addEventListener('click', () => {
    if (price <= window.bruhs) {
      func()
      window.bruhs -= price
      price *= multiplier
      pricep .innerText = `${Math.round(price)} bruh(s)`
      localStorage.setItem(name, price)
    } else {
      building.animate([
        {left: '0'},
        {left: '-10%', transform: 'rotate(-0.0625turn)'},
        {left: '10%', transform: 'rotate(0.0625turn)'},
        {left: '0'}
      ], {
        duration: 1000,
        easing: 'ease'
      })
    }
  })
  return building
}

async function loadGame (upgrades) {
  return {
    upgrades: await Promise.all( // Promise<any>[] -> Promise<any[]>
      upgrades.map(
        filename => import(`./buildings/${filename}.js`).then(addUpgrade) // name -> upgrade
      )
    )
  }
}

loadGame(['autoclicker']).catch(console.error)
