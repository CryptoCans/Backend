const store = require('./store');
const { mint } = require('../../services/nftGenerate');
const socket = require('../../socket').socket;

const getCan = (id) => {
    return new Promise( async (resolve, reject) => {
        try { 
            if(!id) throw 'Id no valido';  
            let can = await store.get(id);
            if(!can) resolve({ message: "Este Id no existe", can });
            resolve(can);  
        } catch (error) {
            reject(error);
        }
    });
};

const getCansUser = wallet => {
    return new Promise( async (resolve, reject) => {
        try { 
            if(!wallet) throw 'Wallet no valido';  
            let cans = await store.cansUser(wallet);
            if(!cans) resolve({ message: "No hay Canes", cans })
            resolve(cans);  
        } catch (error) {
            reject(error);
        }
    });
}

const mintCan = ({packageId, wallet, canId}) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            if(!packageId || !wallet, !canId) throw 'Datos Invalidos'; 
           
            const can = mint(packageId, wallet); //minteamos el can
            can.id = canId;
            const newCan = await store.add(can); //agregamos el nuevo can
            resolve(newCan);

        } catch (error) {
            reject(error);
        }        
    })
}

const setStatusCan = (id, can) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!id) throw "Datos Invalidos";
            const newCan = await store.set(id, can);

            //websocket
            const cansAll = await store.getAllCans();
            socket.io.emit('data', cansAll);

            resolve(newCan);
        } catch (error) {
            reject(error);
        }
    });
};

const deleteCans = (id, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!id, !wallet) throw "Datos Invalidos";
            const checkCan = await store.get(id);
            
            if(checkCan.wallet !== wallet) throw "Accion Invalida";
            const can = await store.delete(id);
            resolve(can);
        } catch (error) {
            reject(error);
        }
    });
};
 
module.exports = {
    getCan,
    mintCan,
    setStatusCan,
    getCansUser,
    deleteCans
}