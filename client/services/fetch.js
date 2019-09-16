// const url = 'https://answer-rambam.herokuapp.com/api/posts';
const url = 'http://localhost:3000/';


const fetchService = {
    sendScore(obj) {
        return new Promise(async (resolve, reject) => {
            try {
                const objtojson = JSON.stringify(obj);
                console.log(objtojson)
                const response = await fetch(url + 'take-score', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: objtojson
                });
                const json = await response.json();
                resolve(json)
            } catch (err) {
                reject(err)
            }
        })
    },
    getScore() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url + 'get-score');
                const json = await response.json();
                resolve(json)
            } catch (err) {
                reject(err)
            }
        })
    },
}

export default fetchService