
export const common = () => {
    const tag = ref<boolean>(false)

    const changeTag = () => {
        setTimeout(() => {
            tag.value = true
        }, 5000)
    }

    return { tag, changeTag }
}
