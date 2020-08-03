const canvas = document.getElementById("board")
const board = canvas.getContext("2d")

let box = canvas.getBoundingClientRect()
let scale = canvas.height / (box.bottom - box.top - 16)
console.log(box)

let stroke = false

board.lineCap = "round"

//resize handler

window.addEventListener("resize", () => {
  box = canvas.getBoundingClientRect()
  scale = canvas.height / (box.bottom - box.top)
})

//color selection

board.strokeStyle = window.getComputedStyle(document.body, null).getPropertyValue("background-color") //default color (--background-color)
document.body.style.setProperty("--accent-color", board.strokeStyle)

const color = document.getElementById("color")
for(let child of color.children){
  child.addEventListener("click", () => {
    board.strokeStyle = window.getComputedStyle(child, null).getPropertyValue("background-color")
    document.body.style.setProperty("--accent-color", board.strokeStyle)
    console.log(window.getComputedStyle(child, null).getPropertyValue("background-color"))
  })
}

//size selection

board.lineWidth = 10 //default (medium) width

document.getElementById("small").addEventListener("click", () => {
  board.lineWidth = 5
})

document.getElementById("medium").addEventListener("click", () => {
  board.lineWidth = 10
})

document.getElementById("large").addEventListener("click", () => {
  board.lineWidth = 20
})

//clear selection

document.getElementById("clear").addEventListener("click", () => {
  board.clearRect(0, 0, 1000, 1000)
})

//client drawing actions

canvas.addEventListener("mousedown", (e) => {
  stroke = true
  const position = [(e.clientX - box.left - 8) * scale, (e.clientY - box.top - 8) * scale]
  board.moveTo(position[0], position[1])
  board.beginPath()
})

canvas.addEventListener("mouseup", (e) => {
  stroke = false
  const position = [(e.clientX - box.left - 8) * scale, (e.clientY - box.top - 8) * scale]
  board.lineTo(position[0], position[1])
  board.stroke()
  board.closePath()
  board.moveTo(position[0], position[1])
})

canvas.addEventListener("mousemove", (e) => {
  if(stroke){
    const position = [(e.clientX - box.left - 8) * scale, (e.clientY - box.top - 8) * scale]
    board.lineTo(position[0], position[1])
    board.stroke()
    board.moveTo(position[0], position[1])
  }
})