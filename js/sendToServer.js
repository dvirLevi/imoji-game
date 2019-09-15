import score from './score.js'
import fetchServce from '../services/fetch.js'

const sendToServer = {
    inputName: document.getElementById('namePlayer'),
    scoreObj: {
        name: "",
        score: 0,
    },
    async sendScoreToServer() {
        this.scoreObj.name = this.inputName.value;
        this.scoreObj.score = score.numScore;
        let respons = await fetchServce.sendScore(this.scoreObj)
        console.log(respons)
    }
}

export default sendToServer