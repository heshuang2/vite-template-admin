<template>
    <canvas class="absolute w-full h-full"/>
</template>

<script setup>
onMounted(() => {
    const canvas = document.querySelector('canvas')
    resizeCanvas(canvas)
    window.addEventListener('resize', canvas => resizeCanvas(canvas) )
    const ctx = canvas.getContext('2d')
    const MAX_STARS = 250
    const STAR_COLORS = ['#444', '#888', '#FFF']
    class Stars {
        constructor() {
            this.stars = []
            for (let i = 0; i < MAX_STARS; i++) {
                const x = ~~(Math.random() * canvas.width)
                const y = ~~(Math.random() * canvas.height)
                const speed = ~~(1 + Math.random() * 5)
                const color = ~~(Math.random() * 3)
                this.stars.push({ x, y, speed, color })
            }
        }

        draw() {
            for (let i = 0; i < MAX_STARS; i++) {
                const star = this.stars[i]
                ctx.lineWidth = 1
                ctx.strokeStyle = STAR_COLORS[this.stars[i].color]
                ctx.strokeRect(star.x, star.y, 1, 1)
            }
        }

        update() {
            for (let i = 0; i < MAX_STARS; i++) {
                this.stars[i].y += this.stars[i].speed
                const isOutScreen = this.stars[i].y > canvas.height
                isOutScreen && (this.stars[i].y = 0)
            }
        }
    }
    const stars = new Stars()

    const clearScreen = () => ctx.clearRect(0, 0, canvas.width, canvas.height)
    const loop = () => {
        clearScreen()
        requestAnimationFrame(loop)
        stars.update()
        stars.draw()
    }
    loop()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas)
})

function resizeCanvas ( canvas ) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}


</script>

<style scoped>
</style>
