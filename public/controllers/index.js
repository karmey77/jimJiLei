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
        // let kiss = parseInt(kissBox.innerText.match(/\d+/)[0])
        // kissBox.innerHTML = `<h2>親了 ${kiss} 次了</h2>`
        fetch('/get-kiss-count')
            .then(response => response.json())
            .then(kissTimes => {
                kissBox.innerHTML = `<h2>親了 ${kissTimes} 次了</h2>`
            })
            .then(resp => {
                console.log(resp)

                let kiss = parseInt(kissBox.innerText.match(/\d+/)[0])
                // 將點擊次數發送到後端
                const payload = { kissCount: kiss };
                fetch('/update-kiss-count', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(resp => {
                        console.log(resp)

                        fetch('/leaderboard')
                            .then(response => response.json())
                            .then(data => {
                                // 生成排行榜內容
                                let leaderboardHtml = '<table id="lbtable">';
                                // 第一名
                                leaderboardHtml +=
                                    `
                        <tr>
                            <td class="number">1</td>
                            <td class="name">${data[0].name}</td>
                            <td class="points">
                                金 ${data[0].kissTimes} 下<img class="gold-medal"
                                src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                                alt="gold medal" />
                            </td>
                        </tr>
                    `

                                // 其他
                                for (let i = 1; i < data.length; i++) {
                                    const user = data[i];
                                    leaderboardHtml +=
                                        `
                        <tr>
                            <td class="number">${i + 1}</td>
                            <td class="name">${user.name}</td>
                            <td class="points"> 金 ${user.kissTimes} 下</td>
                        </tr>
                    `
                                }
                                leaderboardHtml += '</table>'

                                // 將排行榜內容插入到 HTML 元素中
                                const leaderboardElement = document.getElementById('lbtable');
                                leaderboardElement.innerHTML = leaderboardHtml;
                            })
                            .catch(error => {
                                console.error('無法獲取排行榜數據:', error);
                            });
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.error('無法獲取親吻數據:', error);
            });

        pleaseKiss.addEventListener("ended", function () {
            kissEnd = true
        });
    }
})