const Model = require('./model');

const getAllCans = async () => await Model.find({ "onSale.sale": true });

const getCans = id => Model.findOne({ id });

const getCansUser = wallet => Model.find({ wallet });

const addCans = async (can) => {
    can.id = await incrementId();
    return Model(can).save();
};

const incrementId = async () => {
    try {
        //consultamos el ultimo registro
        let last = await Model.find().sort({ id: 'desc' }).limit(1);

        //verificamos si no hay registros
        if(last.length === 0) last = [{ id: 0 }];

        //incrementamos en 1
        return last[0].id + 1;

    } catch (error) {
        console.log(error);
    }
}

const setCan = (id, can) => Model.findOneAndUpdate({ id }, can, { new: true });

module.exports = {
    get: getCans,
    add: addCans,
    set: setCan,
    cansUser: getCansUser,
    getAllCans :getAllCans
}