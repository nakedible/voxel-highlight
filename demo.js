var createGame = require('voxel-engine')
var texturePath = require('painterly-textures')(__dirname)
var highlight = require('./')

var container = document.querySelector('#container')

var game = createGame({
  startingPosition: [0, 1000, 0],
  texturePath: texturePath
})


window.game = game // for debugging
game.controls.pitchObject.rotation.x = -1.5 // look down
game.appendTo(container)
game.currentMaterial = 1

highlight(game)

game.on('mousedown', function (pos) {
  if (game.erase) game.setBlock(pos, 0)
  else game.createBlock(pos, game.currentMaterial)
})

container.addEventListener('click', function() {
  game.requestPointerLock(container)
})

game.erase = true
window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'X'.charCodeAt(0)) {
    game.erase = !game.erase
  }
})

function ctrlToggle (ev) { game.erase = !ev.ctrlKey }
window.addEventListener('keyup', ctrlToggle)
window.addEventListener('keydown', ctrlToggle)