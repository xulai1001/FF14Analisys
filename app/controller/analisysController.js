var findItemInfo = require('../protocol/findItemInfo');
var getItemTradeData = require('../protocol/getItemTradeData');
var parseSDdataToUIData = require('../protocol/parseSDdataToUIData');

exports.init = function (req, res) {
    res.render('analisys.ejs');
}

exports.searchItemTrade = function(req, res) {
    var areaId = req.query.areaId;
    var groupId = req.query.groupId;

    var keyword = req.query.keyword;
    var uikindkey = req.query.uikindkey;

    findItemInfo.exec(keyword, uikindkey, function(itemObj) {
        if (itemObj == null && isNaN(keyword)) {
            res.send({error : "没找到", id : keyword});
        }
        else {
            var id = keyword;
            if (itemObj) id = itemObj.id;
            getItemTradeData.exec(id, areaId, groupId, function(tradeData) {
                if (tradeData == null) {
                    res.send({error : "没找到", id : id});
                }
                else {
                    parseSDdataToUIData.exec(tradeData, function(uiData) {
                        if (itemObj) {
                            uiData.iconUrl = itemObj.iconUrl;
                            uiData.hqIconUrl = itemObj.hqIconUrl;
                        }
                        res.send({uiData : uiData});
                    })
                }
            })
        }
    });
}