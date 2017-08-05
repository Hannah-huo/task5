const database = [
    {code: 'ITEM000001', price: 3.00, name:'雪碧', measure:'瓶'},
    {code: 'ITEM000003', price: 15.00, name:'荔枝', measure:'斤'},
    {code: 'ITEM000005', price: 4.50, name:'方便面', measure:'袋'}
]

const discount = [
    {code: 'ITEM000001', count: 1},
    {code: 'ITEM000005', count: 1}
]

module.exports = function main() {
    let inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];
    printInventory(inputs);
};
function printInventory(inputs) {
    //step1；计算购买商品count:[{item1:3},{item2:4}]
    let goodsInfo = [];
    for(let item of inputs){
        if(item.indexOf('-') !== -1){
            let kv = item.split('-')
            goodsInfo.put(
                {code:kv[0], count:kv[1]}
            )
        }else{
            if(findCode(goodsInfo, item)){
                var v = goodsInfo.find(r => item === r.code);
                v++;
            }else{
               goodsInfo.put({
                   code:item,
                   count:1
               })
            }
        }
    }
    //step2:计算商品价格小计：[{name:'',count:'2dai',price:3.00,subtotal:6.00}]
    let subtotalInfo = caclulateSubtotal(goodsInfo)
    //step3:计算折扣信息
    let discountInfo = caclulateDiscount()
    //step4:计算汇总


    console.log(finalResult)
}

//查找某个元素是否在集合中出现
function findCode(goodsInfo,item){
    for(let i in goodsInfo){
        return i.code === item;
    }
}

function caclulateSubtotal(goodsInfo){
    let result = ''
    result += '***<没钱赚商店>购物清单***\n'
    //let template='名称：{}，数量：{}{}，单价：{}(元)，小计：{}(元)'
    for(let goods in goodsInfo){
        let db = database.find(v => v.code === goods.code)
        //avoid this ugly behaivour
        result += '名称：'+db.name+'，数量：'+goods.count+db.measure+'，单价：'+
            db.price+'(元)'+'，小计：'+(goods.count*db.price)+'(元)\n'
        //template.formatByArray([db.name,goods.count,
        //  db.measure,db.price,goods.count*db.price])
    }
    result += '----------------------\n'
    return result
}

// String.prototype.formatByArray = function(args){
//     this.repl
//
//     return
// }