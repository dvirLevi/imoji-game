const eventAndToggle = {
    addEvent(Toggle, el, firstInital, ifOnlySelf) {
        if(firstInital === 'flex'){
        el.style.display = 'flex'

        }else {
            el.style.display = 'none'
        }
        Toggle.onclick = (e) => {
            console.log(e.target.id)
            console.log(Toggle.id)
        if(ifOnlySelf == 'self'){
            if(e.target.id === Toggle.id){
                this.addToggle(el)
               }
        }else{
            this.addToggle(el)
        }
          
        }
    },
    addToggle(el) {
        if(el.style.display === 'none'){
            el.style.display = 'flex'
        }else{
            el.style.display = 'none'
        }
    }
}
export default eventAndToggle