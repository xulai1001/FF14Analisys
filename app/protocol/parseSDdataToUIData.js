exports.exec = function(arr, callback) {
    var dates = arr.map(function(obj) {
        return obj.itemTradeDate;
    })
    var itemBottomPrices = arr.map(function(obj) {
        return obj.itemBottomPrice;
    })
    var itemAveragePrizes = arr.map(function(obj) {
        return obj.itemAveragePrize;
    })
    var itemPeakPrices = arr.map(function(obj) {
        return obj.itemPeakPrice;
    });
    
    var name = "未找到";
    if (arr.length>0) name = arr[0].itemNameCn;

    var returnObj = {
        dates : dates,
        itemBottomPrices : itemBottomPrices,
        itemAveragePrizes : itemAveragePrizes,
        itemPeakPrices : itemPeakPrices,
        name : name
    };

    callback(returnObj);
}