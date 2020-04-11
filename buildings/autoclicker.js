let count = +localStorage.getItem('autoclickercount') || 0

setInterval(()=>{
  window.bruhs += count
}, 10000)

export function func () {
  localStorage.setItem('autoclickercount', ++count || 0)
  setInterval(()=>{
    window.bruhs += 1
  }, 10000)
}

export const startprice = 10
export const multiplier = 1.1
export const name = 'Autoclicker'
