const canvas = document.getElementById("board")
const board = canvas.getContext("2d")

let box = canvas.getBoundingClientRect()
let scale = canvas.height / (box.bottom - box.top)

let stroke = false
let width = 10 //future feature?

board.lineWidth = width
board.lineCap = "round"

//color selection

board.strokeStyle = window.getComputedStyle(document.body, null).getPropertyValue("background-color") //default color (--background-color)
document.body.style.setProperty("--accent-color", board.strokeStyle)

const panel = document.getElementById("panel")
for(let child of panel.children){
  child.addEventListener("click", () => {
    board.strokeStyle = window.getComputedStyle(child, null).getPropertyValue("background-color")
    document.body.style.setProperty("--accent-color", board.strokeStyle)
    console.log(window.getComputedStyle(child, null).getPropertyValue("background-color"))
  })
}

//client drawing actions

canvas.addEventListener("mousedown", (e) => {
  stroke = true
  const position = [(e.clientX - box.left) * scale, (e.clientY - box.top) * scale]
  board.moveTo(position[0], position[1])
  board.beginPath()
})

canvas.addEventListener("mouseup", (e) => {
  stroke = false
  const position = [(e.clientX - box.left) * scale, (e.clientY - box.top) * scale]
  board.lineTo(position[0], position[1])
  board.stroke()
  board.closePath()
  board.moveTo(position[0], position[1])
})

canvas.addEventListener("mousemove", (e) => {
  if(stroke){
    const position = [(e.clientX - box.left) * scale, (e.clientY - box.top) * scale]
    board.lineTo(position[0], position[1])
    board.stroke()
    board.moveTo(position[0], position[1])
  }
})