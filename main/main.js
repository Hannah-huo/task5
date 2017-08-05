const database = require('./datbase')
const discount = [
    {barcode: 'ITEM000001', count: 1},
    {barcode: 'ITEM000005', count: 1}
]
let total = 0;
let discountMoney = 0;

module.exports = function main() {
    loadAllItems: loadAllItems
    printInventory:printInventory
};

function printInventory(inputs) {
    //step1；计算购买商品count:[{item1:3},{item2:4}]
    let goodsInfo = [];
    for (let item of inputs) {
        if (item.indexOf('-') !== -1) {
            let kv = item.split('-')
            goodsInfo.push(
                {barcode: kv[0], count: kv[1]}
            )
        } else {
            if (findCode(goodsInfo, item)) {
                var v = goodsInfo.find(r => item === r.barcode);
                v.count++;
            } else {
                goodsInfo.push({
                    barcode: item,
                    count: 1
                })
            }
        }
    }
    //step2:计算商品价格小计：[{name:'',count:'2dai',price:3.00,subtotal:6.00}]

    let subtotalInfo = caclulateSubtotal(goodsInfo)
    //step3:计算折扣信息
    let discountInfo = caclulateDiscount()
    //step4:计算汇总
    let finalResult = '总计：' + total.toFixed(2) + '(元)\n' +
        '节省：' + discountMoney.toFixed(2) + '(元)\n' +
        '**********************'
    console.log(subtotalInfo + discountInfo + finalResult)
}
//查找某个元素是否在集合中出现
function findCode(goodsInfo, item) {
    for (let i of goodsInfo) {
        if (i.barcode === item) {
            return true;
        }
    }
}

function caclulateSubtotal(goodsInfo) {
    let result = ''
    result += '***<没钱赚商店>购物清单***\n'
    for (let goods of goodsInfo) {
        let db = database.find(v => v.barcode === goods.barcode)
        let subtotal = 0
        for (let d of discount) {
            if (goods.barcode === d.barcode) {
                subtotal = (goods.count - d.count) * db.price
                break;
            } else {
                subtotal = goods.count * db.price
            }
        }
        total += subtotal
        result += '名称：' + db.name + '，数量：' + goods.count + db.unit + '，单价：' +
            db.price.toFixed(2) + '(元)' + '，小计：' + subtotal.toFixed(2) + '(元)\n'
    }
    result += '----------------------\n'
    return result
}

function caclulateDiscount() {
    let result = '挥泪赠送商品：\n';
    for (let item of discount) {
        let db = database.find(v => v.barcode === item.barcode)
        result += '名称：' + db.name + '，数量：' + item.count + db.unit + '\n'
        discountMoney += item.count * db.price;
    }
    result += '----------------------\n'
    return result;
}