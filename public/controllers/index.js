kissImg = [{
    image: 'assets/frogKingWait.jpeg'
}, { image: 'assets/frogKingKiss.jpeg' }]
let kissTimes = 0
const pleaseKiss = new Audio("assets/giveMeAKissTaiwanese.mp3")
const kissSound = new Audio("assets/quickKiss.mp3")
const dataPanel = document.querySelector('#data-panel')
let kissEnd = true

dataPanel.addEventListener("click", function (event) {
    if (event.target.matches(".img") && kissEnd) {
        kissEnd = false

        // Sounds
        kissSound.play()
        // Img
        const imgBlock = event.target
        imgBlock.src = kissImg[1].image

        // Img-back
        kissSound.addEventListener("ended", function () {
            kissSound.currentTime = 0;
            imgBlock.src = kissImg[0].image
            pleaseKiss.play()
        });

        // Kisses
        const kissBox = event.target.parentElement.children[0]
        let kiss = parseInt(kissBox.innerText.match(/\d+/)[0])
        // updateTimes(kiss)
        kiss += 1
        kissBox.innerHTML = `<h2>親了 ${kiss} 次了</h2>`

        pleaseKiss.addEventListener("ended", function () {
            kissEnd = true
        });
    }
})