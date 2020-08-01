const header = document.getElementById("header")
const border_bottom = document.getElementById("border_bottom_transition")

header.addEventListener("mousemove", (e) => {
  let percent = e.clientX / document.body.clientWidth * 100
  border_bottom.style.backgroundImage = `linear-gradient(to right, var(--font-color), var(--accent-color) ${percent}%, var(--font-color))`
})