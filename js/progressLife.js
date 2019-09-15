// import eventAndToggle from './eventAndToggle.js'
// const modalScore = document.getElementById('modalScore');

const progressLife = {
    progressLife: document.getElementById('progressLife'),
    width: 0,
    innerWidth(size) {
        // alert()
        this.width = this.width + size;
        this.progressLife.style.width = this.width + '%';
        // if(this.width <= 0){
        //     eventAndToggle.addToggle(modalScore)
        // }
    }
}
export default progressLife
