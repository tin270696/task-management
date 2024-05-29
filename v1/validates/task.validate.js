module.exports.create = (req, res, next) => {
    if(!req.body.title) {
        res.redirect("back");
        return;
    };

    if(!req.body.status) {
        res.redirect("back");
        return;
    };

    if(!req.body.timeStart) {
        res.redirect("back");
        return;
    };

    if(!req.body.timeFinish) {
        res.redirect("back");
        return;
    };

    next();
}