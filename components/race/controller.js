const storeCans = require('../cans/store');
const storeUser = require('../user/store');
const storeCareers = require('../carrers/store');
const { random } = require('../../services/nftGenerate');

//* type and gain for career
const type = {
    1: { // common type, token earning per place
        1: 30, //first place
        2: 20, //second place
        3: 10  //trird place
    },
    2: { // rare type, token earning per place (common * 2)
        1: 60, //first place
        2: 40, //second place
        3: 20  //trird place
    },
    3: { // epic type, token earning per place (common * 4)
        1: 120, //first place
        2: 80, //second place
        3: 40  //trird place
    },
    4: { // legendary type, token earning per place (common * 8)
        1: 240, //first place
        2: 160, //second place
        3: 80  //trird place 
    }
}

const clickPlay = async (wallet, id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const can = await getCan(id);
            const userWallet = await getUser(wallet);
            if(!can) throw "disculpe!! no existe el can";
            if(!userWallet) throw "disculpe!! no existe esta wallet";

            if(can.wallet !== userWallet.wallet) throw "No tiene permisos para esta acción";

            resolve(playRun(can, userWallet.balance))

        } catch (error) {
            reject(error);
        }
    })
}

const getCan = id => storeCans.get(id);
const getUser = wallet => storeUser.get(wallet);

const playRun = async (can, balance) => {

    const numRandom = () => random(1, 7);

    const cansResult = []; //career result array
    for (let i = 0; i < 6; i++) {
        let random = numRandom();
        (!cansResult.includes(random)) ? cansResult[i] = random : i--
    }

    let career = await careerSave(cansResult.indexOf(1) + 1, can, balance);
    
    return {
        places: cansResult,
        career
    };
}

const careerSave = async (place, can, balance) => {

    let gainToken = type[can.rarity][place] || 0;
    let balanceAfter = balance + gainToken || balance ;
    
    const data = {
        wallet: can.wallet,
        place: place,
        balancePrev: balance,
        balanceAfter: balanceAfter,
        gainToken: gainToken,
        canId: can.id
    }
    
    const career = await storeCareers.add(data);
    await storeUser.update(career);
    return career;
}

module.exports = {
    clickPlay
}