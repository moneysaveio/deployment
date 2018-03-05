const Merchant = require('../models/Merchant');
const Product = require('../models/Product');
const axios = require('axios');

const bonusMerchants = [
  'bestbuy.com',
  'homeclick.com',
  'mrporter.com',
  'mensusa.com',
  'novica.com',
  'ralphlauren.com',
  'sierratradingpost.com',
  'sears.com',
  'shopperschoice.com',
  'dwr.com',
  'reebok.com',
  'tipsyelves.com',
  'factoryoutletstore.com',
  'shopdisney.com',

  'surlatable.com',
  'walmart.com',
  'nflshop.com',
  'backcountry.com',
  'jcpenney.com',
  'novica.com',
  'builddirect.com',
  'thinkgeek.com',
  'pacsun.com',
  'nordstrom.com',
  'shoemall.com',
  'thewalkingcompany.com',
  'build.com',
  'officedepot.com',
  'republicwireless.com',
  'samsclub.com',
  'lastcall.com',
  'countryoutfitter.com',
  'barneys.com',
  'soccer.com',
  'stagestores.com',
  'hobbytron.com',
];

let uniq = a => [...new Set(bonusMerchants)];

const updateMerchantsByDomain = (cb) => {
  var merchantDomains = uniq(bonusMerchants);
  merchantDomains.map((merchantDomain) => {
    axios.get(`http://api.prosperent.com/api/merchant?filterDomain=${merchantDomain}`).then((resp) => {
      var merchantObj = resp.data.data[0];
      var merchant = new Merchant(merchantObj);
      merchant.name = merchantObj.merchant;
      merchant.isPremium = true;
      if (merchant.numProducts > 100) {
        axios.get(`http://api.prosperent.com/api/search?&filterPriceSale=1.00,&filterMerchant=${merchant.name}&sortBy=percentOff&api_key=4e67da23f1607368949c7e7deb6fbfd2&limit=1000`).then((resp) => {
          var productList = resp.data.data;
          if (productList.length >= 20) {
            console.log("Qualifying merchant", merchant.name, merchant.numProducts, productList.length);
            merchant.hasVerifiedProducts = true;
            merchant.numVerifiedProducts = productList.length;
            var num_products_merchant = 0;
            productList.map((item, index) => {
              var product = new Product(item);
              num_products_merchant += 1;
              product.save();
            })
          } else {
            merchant.hasVerifiedProducts = false;
          }
          if (num_products_merchant) {
            merchant.numVerifiedProducts = num_products_merchant;
          }
          merchant.save();
        });
      }
    })
  })
}

var db = require('../initializers/database');
db.connect(updateMerchantsByDomain);