

const background = document.getElementById("background")
const main = document.querySelector(".main")
const toggleCover = document.querySelectorAll(".toggle-cover")
const numberOfStars = 100
const minSize = 1
const maxSize = 5
const minDistance = 30

toggleCover.forEach((el) =>{

    el.addEventListener("click", (e) =>{
        e.preventDefault()

        if(main.classList.contains("day")){

            main.classList.remove("day")
            main.classList.add("night")

        }else if(main.classList.contains("night")){

            main.classList.remove("night")
            main.classList.add("day")

        }

    })

})

function randomInRange(min, max){
    return Math.random() * (max - min) + min
}

function starsOverlap(x1,y1,r1,x2,y2,r2){
    const dx = x2 - x1
    const dy = y2 - y1
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < (r1 + r2 + minDistance)
}

const stars = []

for(let i = 0; i < numberOfStars; i++){

    let size = randomInRange(minSize, maxSize)
    let x, y;
    let validPosition = false
    let overflow = 100

    while(!validPosition){

        x = randomInRange(0, window.innerWidth - size)
        y = randomInRange(0, window.innerHeight - size)

        validPosition = true

        for(let star of stars){
            if(starsOverlap(x,y,size / 2, star.x, star.y, star.size / 2)){
                validPosition = false
                break
            }
        }

        overflow--
        if(overflow <= 0){
            overflow = 100
            break
        }

    }

    const star = document.createElement("div")

    if(size > 3.5){
        const duration = 1 + Math.random() * 3
        const delay = Math.random() * 2
        star.classList.add("twinkle")
        star.style.animationDuration = `${duration}s`
        star.style.animationDelay = `${delay}s`
    }

    star.classList.add("star")
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.left = `${x}px`
    star.style.top = `${y}px`

    background.appendChild(star)
    stars.push({x, y, size})


}