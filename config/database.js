const mongoose = require('mongoose');

module.exports.connect = async () => {
    try{
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Kết nối Database thành công!");
    }
    catch{
        console.log("Kết nối Database thất bại!");
        console.log(error);
    }
}