const score = {
    elementScore: document.getElementsByClassName('score'),
    numScore: 0,
    innerScore(score) {
        this.numScore = this.numScore + score;
        for(let x = 0; x < 2; x++){
            this.elementScore[x].innerHTML = this.numScore;
        }
    }
}
export default score
