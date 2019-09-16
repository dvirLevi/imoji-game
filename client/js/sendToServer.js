import score from './score.js'
import fetchService from '../services/fetch.js'

const sendToServer = {
    inputName: document.getElementById('namePlayer'),
    table: document.getElementById('table'),
    scoreObj: {
        name: "",
        score: 0,
    },
    async sendScoreToServer() {
        this.scoreObj.name = this.inputName.value;
        this.scoreObj.score = score.numScore;
        let respons = await fetchService.sendScore(this.scoreObj)
        console.log(respons)
    },
    async getScoreToTable(){
        this.table.innerHTML = "";
        let score = await fetchService.getScore();
        for(let x in score){
            this.table.innerHTML += `<div>${score[x].name}</div><div>${score[x].score}</div>`
        }
        console.log(score)
    }
}

export default sendToServer