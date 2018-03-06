import config from './config'
var APIS = config.APIS

var mock = {}

mock[APIS.getdictbytype] = {
    "retCode": "1",
    "retMsg": "成功",
    "data": [
         {
             "value": "AJFW_NSL_YJY",
             "label": "按揭服务",
             "type": "productName",
             "description": "产品类型",
             "sort": "10"
         },
         {
             "value": "JYB_YSL_YJY_ISR",
             "label": "交易保-有赎楼",
             "type": "productName",
             "description": "产品类型",
             "sort": "20"
         },
         {
             "value": "JYB_NSL_YJY_ISR",
             "label": "交易保-无赎楼",
             "type": "productName",
             "description": "产品类型",
             "sort": "30"
         },
         {
             "value": "TFB_YSL_NJY_ISR",
             "label": "提放保-有赎楼",
             "type": "productName",
             "description": "产品类型",
             "sort": "40"
         },
         {
             "value": "TFB_NSL_NJY_ISR",
             "label": "提放保-无赎楼",
             "type": "productName",
             "description": "产品类型",
             "sort": "50"
         },
         {
             "value": "SLY_YSL_YJY_CSH",
             "label": "赎楼E-交易",
             "type": "productName",
             "description": "产品类型",
             "sort": "60"
         },
         {
             "value": "SLY_YSL_NJY_CSH",
             "label": "赎楼E-非交易",
             "type": "productName",
             "description": "产品类型",
             "sort": "70"
         },
         {
             "value": "JSD_NSL_YJY_CSH",
             "label": "及时贷-交易",
             "type": "productName",
             "description": "产品类型",
             "sort": "80"
         },
         {
             "value": "JSD_NSL_NJY_CSH",
             "label": "及时贷-非交易",
             "type": "productName",
             "description": "产品类型",
             "sort": "90"
         }
    ]
}

export default mock