/**
 * @fileoverview nftGenerate Canodromes, funciones para generar el nft del Canodromo
 * @version 1
 * @author Jason Hernandez <kaltre10@gmail.com>
 * @copyright cryptocans.io
 * ----
 */

/**
 * Array del tipo de nft con los valores 
 *  para sus propiedades 
 */
//tipos de canodromos 
const typeCanodrome = {
    1: { amount: 3, energy: 12, url: "URL CANODROME COMMON" },  //tipo 1 (common) cans max 3
    2: { amount: 6, energy: 24, url: "URL CANODROME RARE" },   //tipo 2 (rares) cans max 6
    3: { amount: 9, energy: 36, url: "URL CANODROME EPIC" },   //tipo 3 (epic) cans max 9
    4: { amount: 12, energy: 48, url: "URL CANODROME LEGENDARY" }    //tipo 4 (legendary) cans max 12
}

/**
 * generador de un numero random entre un min y max 
 * @param {number} min
 * @param {number} max
 * @return {number}  
 */
let random = (min, max) => parseInt(Math.random() * (max - min) + min);

/**
 * generador del nft common
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateCommon = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 1000) return 4; // 0.1% legendary
    if (numRandom > 1000 && numRandom <= 50000) return 3; // 4.9% epic
    if (numRandom > 50000 && numRandom <= 350000) return 2; // 30% rare
    if (numRandom > 350000 && numRandom <= 1000000) return 1; // 65% common
};

/**
 * generador del nft epic
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateEpic = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 10000) return 4; // 1% legendary
    if (numRandom > 10000 && numRandom <= 200000) return 3; // 19% epic
    if (numRandom > 200000 && numRandom <= 600000) return 2; // 40% rare
    if (numRandom > 600000 && numRandom <= 1000000) return 1; // 40% common
};

/**
 * generador del nft legendary
 * @param {number} numRandom
 * @return {number}  
 */
const typeGenerateLegendary = (numRandom) => {
    if (numRandom >= 1 && numRandom <= 50000) return 4; // 5% legendary
    if (numRandom > 50000 && numRandom <= 400000) return 3; // 35% epic
    if (numRandom > 400000 && numRandom <= 1000000) return 2; // 60% rare
    if (numRandom > 0 && numRandom <= 0) return 1; // 0% common
};

/**
 * Array de los Paquetes de nft con valores de las 
 *  funciones para cada tipo de paquete 
 */
const typePackage = {
    4: () => typeGenerateCommon(random(1, 1000000)),   //common
    // 2: () => typeGenerateEpic(random(1, 1000000)),     //epic
    5: () => typeGenerateLegendary(random(1, 1000000)) //legendary 
}

/**
 * Generamos el nft con sus propiedades
 * @param  {number} type
 * @param  {number} userId
 * @param  {string} wallet
 * @return  {object} 
 */
const nftGenerate = (type, userId, wallet, packageId) => {
    return { 
        wallet,
        userId,
        energy: typeCanodrome[type].energy,
        type,
        url: typeCanodrome[type].url,
        packageId
    };
};

/**
 * Minteamos el nft de acuerdo al package
 *  y mantenemos la wallet del usuario
 * @param  {number} wallet
 * @param  {string} userId
 * @param  {string} packageId
 * @return  {funtion} nftGenerate
 */
const mint = ({wallet, userId, packageId}) => {
    if(!wallet || !userId ||!packageId) throw "Error Inesperado";
    const type = typePackage[packageId]();
    return nftGenerate(type, userId, wallet, packageId);   
}

module.exports = { 
    mint
};