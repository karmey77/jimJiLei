kissImg = [{
    image: 'assets/frogKingWait.jpeg'
}, { image: 'assets/frogKingKiss.jpeg' }]
let kissTimes = 0
const pleaseKiss = new Audio("assets/giveMeAKissTaiwanese.mp3")
const kissSound = new Audio("assets/quickKiss.mp3")
const dataPanel = document.querySelector('#data-panel')
let kissEnd = true

function showImg(image) {

    let htmlContent = `
    <tr>
    <h2>親了 ${kissTimes} 次了</h2>
    <img src= "${image}" width="300" class="img">
    </tr>
    `
    return htmlContent
};

// function showGameFinished(kissTimes) {
//     const div = document.createElement('div');
//     div.classList.add('completed');
//     div.innerHTML = `
//     <p>太好了！</p>
//     <p>你親了國王 ${kissTimes} 下</p>
//     <p>你一定很愛國王</p>
//     `
//     const header = document.querySelector('#header');
//     header.before(div);
// };

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
        kiss += 1
        kissBox.innerHTML = `<h2>親了 ${kiss} 次了</h2>`

        // if (kiss === 100) {
        //     showGameFinished(kiss)
        //     return
        // }

        pleaseKiss.addEventListener("ended", function () {
            kissEnd = true
        });
    }
})

dataPanel.innerHTML = showImg(kissImg[0].image);