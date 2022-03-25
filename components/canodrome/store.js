const Model = require('./model');

const getAll = wallet => Model.find({ wallet }).populate('userId').exec();
const getCanodrome = _id => Model.findOne({ _id }).populate('userId').exec();
const addCanodrome = data => Model(data).save();
const updateCanodrome = ( _id, can) => Model.findOneAndUpdate({ _id }, { $push: { cans: can } });
const energyCanodrome = ( _id, energy) => Model.findOneAndUpdate({ _id }, energy );

module.exports = {
    getAll: getAll,
    get: getCanodrome,
    add: addCanodrome,
    update: updateCanodrome,
    updateEnergy: energyCanodrome
}