const Task = require("../models/task.model");

// [GET] /api/v1/tasks/
module.exports.task = async (req, res) => {
    const find = ({
        deleted: false
    });

    // Bộ lọc
    const status = req.query.status;
    if(status){
        find.status = status;
    }
    // Hết bộ lọc

    // Sắp xếp
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    };
    // Hết sắp xếp

    // Phân trang
    const pagination = {
        limit: 2,
        page: 1
    };
    if(req.query.page){
        pagination.page = parseInt(req.query.page);
    }
    if(req.query.limit){
        pagination.limit = parseInt(req.query.limit);
    }
    const skip = (pagination.page - 1) * pagination.limit;
    // Hết phân trang

    // Tìm kiếm
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    // Hết tìm kiếm
    
    const tasks = await Task
        .find(find)
        .sort(sort)
        .limit(pagination.limit)
        .skip(skip);

    res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id/
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findOne({
            _id: id,
            deleted: false
        });

        res.json(task);
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại bản ghi"
        })
    }
};

// [PATCH] /api/v1/tasks/change-status/:id/
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        console.log(id);
        console.log(status);

        const listStatus = ["initial", "doing", "pending", "finish", "notFinish"];

        if(listStatus.includes(status)){
            await Task.updateOne({
                _id: id
            }, {
                status: status
            });
    
            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công!"
            });
        } else {
            res.json({
                code: 400,
                message: `Trạng thái ${status} không hợp lệ!`
            });
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại bản ghi!"
        })
    }
};

// [PATCH] /api/v1/tasks/change-multi/
module.exports.changeMulti = async (req, res) => {
    try {
        const [ids, status] = req.body;
        console.log(ids);
        console.log(status);
        const listStatus = ["initial", "doing", "pending", "finish", "notFinish"];
        if(listStatus.includes(status)){
            await Task.updateMany({
                _id: { $in: id }
            }, {
                status: status
            });

            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công!"
            });
        } else{
            res.json({
                code: 400,
                message: `Trạng thái ${status} không hợp lệ!`
            });
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Bản ghi không tồn tại!"
        });
    }
}

// [POST] /api/v1/tasks/create/
module.exports.create = async (req, res) => {
    const task = new Task(req.body);
    await task.save();

    res.json({
        code: 200,
        message: "Tạo mới công việc thành công!"
    })
}

// [PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Task.updateOne({
        _id: id,
        deleted: false
    }, data);

    res.json({
        code: 200,
        message: "Cập nhật thành công!"
    });
}