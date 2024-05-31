module.exports.create = (req, res, next) => {
    if(!req.body.title) {
        res.json({
            code: 400,
            message: "Nhập tên công việc!"
        })
        return;
    };

    if(!req.body.status) {
        res.json({
            code: 400,
            message: "Nhập trạng thái công việc!"
        })
        return;
    };

    const listStatus = ["initial", "doing", "pending", "finish", "notFinish"];
    if(!listStatus.includes(req.body.status)){
        res.json({
            code: 400,
            message: "Trạng thái công việc không hợp lệ!"
        })
        return;
    }

    if(!req.body.timeStart) {
        res.json({
            code: 400,
            message: "Nhập thời gian bắt đầu công việc!"
        })
        return;
    };

    if(!req.body.timeFinish) {
        res.json({
            code: 400,
            message: "Nhập thời gian hoàn thành công việc!"
        })
        return;
    };

    next();
}

module.exports.edit = (req, res, next) => {
    if(!req.body.title) {
        res.json({
            code: 400,
            message: "Nhập tên công việc!"
        })
        return;
    };

    if(!req.body.status) {
        res.json({
            code: 400,
            message: "Nhập trạng thái công việc!"
        })
        return;
    };

    const listStatus = ["initial", "doing", "pending", "finish", "notFinish"];
    if(!listStatus.includes(req.body.status)){
        res.json({
            code: 400,
            message: "Trạng thái công việc không hợp lệ!"
        })
        return;
    }

    next();
}