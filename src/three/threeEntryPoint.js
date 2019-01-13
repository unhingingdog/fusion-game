import sceneManager from './sceneManager'

export default canvas => {

    const render = () => {
        requestAnimationFrame(() => {
            sceneManager(canvas)
        })
    }

    render()
}