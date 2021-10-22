var conn = new Mongo(); var db = conn.getDB('shopway');
db.createCollection('users', function(err, collection) {});
try { db.users.deleteMany( { } ); } catch (e) { print (e); }
let users = [{"_id":ObjectId("6169b1089499d200121187bc"),"stores":[ObjectId("6169b1089499d200121187b8")],"role":"Seller","createdAt":new ISODate("2021-10-15T16:45:05.653Z"),"active":true,"email":"mariorossi@seller.it","password":"$2a$12$Um2hqf6C/6vDHnHNA2w67.2komrPIuQvM0pjb8Lg2E5p4ltZ3RYqC","fullName":"Mario Rossi","__v":0,"photo":"logo-751d525c-836b-43d1-99b8-705a839fb864.png"},{"_id":ObjectId("6169b34a9499d20012118879"),"followerList":[ObjectId("6169b1089499d200121187b8")],"role":"Customer","createdAt":new ISODate("2021-10-15T16:45:05.653Z"),"active":true,"email":"giuseppeverdi@customer.it","password":"$2a$12$b42EjCmEqnIVaervue0lYeNWOrzb2GgxbApDXlfW7F5S8QuA3Mfzm","fullName":"Giuseppe Verdi","__v":0,"photo":"photo-6169b34a9499d20012118879.png"},{"_id":ObjectId("6169b5059499d200121188f8"),"followerList":[],"role":"Customer","createdAt":new ISODate("2021-10-15T16:45:05.653Z"),"active":true,"email":"mariabianchi@customer.it","password":"$2a$12$FF.ra6E1RrAB5WWHM1tR5O7lY.ELohTWukdJ/nlkmHOVyQwd5iIW2","fullName":"Maria Bianchi","__v":0,"photo":"photo-6169b5059499d200121188f8.png"}];
db.users.insertMany(users);

db.createCollection('stores', function(err, collection) {});
try { db.stores.deleteMany( { } ); } catch (e) { print (e); }
let stores = [{
  "_id": ObjectId("6169b1089499d200121187b8"),
  "phone": "+39 3331853939",
  "name": "Rossi's Store",
  "address": "Via dei cacciatori 16",
  "city": "Pesaro",
  "__v": 0,
  "logo": "logo-751d525c-836b-43d1-99b8-705a839fb864.png"
}];
db.stores.insertMany(stores);

db.createCollection('storevisits', function(err, collection) {});
try { db.storevisits.deleteMany( { } ); } catch (e) { print (e); }
let storeVisits = [{"_id":ObjectId("6169b1089499d200121187ba"),"storeId":ObjectId("6169b1089499d200121187b8"),"visits":[{"users":[ObjectId("6169b34a9499d20012118879"),ObjectId("6169b5059499d200121188f8")],"_id":ObjectId("6169b4659499d2001211889c"),"date":new ISODate("2021-10-15T00:00:00Z")}],"__v":0}];
db.storevisits.insertMany(storeVisits);

db.createCollection('articles', function(err, collection) {});
try { db.articles.deleteMany( { } ); } catch (e) { print (e); }
let articles = [{"_id":ObjectId("6169b12b9499d200121187c9"),"articleDetails":[ObjectId("6169b14a9499d200121187cf"),ObjectId("6169b1619499d200121187dc")],"createdAt":new ISODate("2021-10-15T10:45:06.922Z"),"brand":"Bershka","name":"T-Shirt Bershka","description":"bershka t-shirt printed","category":{"categoryArticle":"T-Shirt","categoryType":"Man"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0},{"_id":ObjectId("6169b1899499d200121187e9"),"articleDetails":[ObjectId("6169b19e9499d200121187ef"),ObjectId("6169b1b69499d200121187fb"),ObjectId("6169b1cd9499d20012118809")],"createdAt":new ISODate("2021-10-15T11:30:06.922Z"),"brand":"Solid","name":"Winter Jacket Solid","description":"Winter jacket","category":{"categoryArticle":"Jacket","categoryType":"Man"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0},{"_id":ObjectId("6169b20d9499d20012118816"),"articleDetails":[ObjectId("6169b2259499d2001211881c")],"createdAt":new ISODate("2021-10-15T12:12:38.922Z"),"brand":"Massimo Dutti","name":"Winter Coat","description":"Winter Coat","category":{"categoryArticle":"Jacket","categoryType":"Woman"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0},{"_id":ObjectId("6169b25e9499d20012118829"),"articleDetails":[ObjectId("6169b2759499d2001211882f")],"createdAt":new ISODate("2021-10-15T13:10:06.922Z"),"brand":"Nike","name":"Nike Sportswear","description":"Nike Sportswear trousers","category":{"categoryArticle":"Pants","categoryType":"Man"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0},{"_id":ObjectId("6169b29e9499d20012118847"),"articleDetails":[ObjectId("6169b2b29499d2001211884d")],"createdAt":new ISODate("2021-10-15T14:55:06.922Z"),"brand":"Stradivarius","name":"Blazer - Stradivarius","description":"Stradivarius Blazer","category":{"categoryArticle":"Jacket","categoryType":"Woman"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0},{"_id":ObjectId("6169b8839499d200121189b4"),"articleDetails":[ObjectId("6169b8a39499d200121189ba"),ObjectId("6169b90f9499d20012118a0a")],"createdAt":new ISODate("2021-10-15T15:29:06.922Z"),"brand":"Rebook","name":"Classic Club C","description":"Reebook shoes","category":{"categoryArticle":"Shoes","categoryType":"Man"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0},{"_id":ObjectId("6169b9779499d20012118a43"),"articleDetails":[ObjectId("6169b98b9499d20012118a49")],"createdAt":new ISODate("2021-10-15T16:55:06.922Z"),"brand":"Mango","name":"Blazer - Mango","description":"Mango Blazer","category":{"categoryArticle":"Jacket","categoryType":"Woman"},"store":ObjectId("6169b1089499d200121187b8"),"__v":0}];
db.articles.insertMany(articles);

db.createCollection('articledetails', function(err, collection) {});
try { db.articledetails.deleteMany( { } ); } catch (e) { print (e); }
let articleDetails = [{"_id":ObjectId("6169b14a9499d200121187cf"),"articleId":ObjectId("6169b12b9499d200121187c9"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b14a9499d200121187d0"),"size":"L","quantity":1},{"_id":ObjectId("6169b14a9499d200121187d1"),"size":"M","quantity":1},{"_id":ObjectId("6169b14a9499d200121187d2"),"size":"S","quantity":1},{"_id":ObjectId("6169b14a9499d200121187d3"),"size":"XL","quantity":1}],"color":"white","price":25,"discount":"20","image":"photo-42fcd749-93fd-4422-92ff-dee97f24bc57-.png","dateArticleAdded":new ISODate("2021-10-15T16:50:17.238Z"),"__v":0},{"_id":ObjectId("6169b1619499d200121187dc"),"articleId":ObjectId("6169b12b9499d200121187c9"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b1619499d200121187dd"),"size":"M","quantity":2},{"_id":ObjectId("6169b1619499d200121187de"),"size":"S","quantity":1},{"_id":ObjectId("6169b1619499d200121187df"),"size":"XS","quantity":2}],"color":"black","price":25,"image":"photo-ef7139fc-0155-4341-b326-eca092e5b4aa-.png","dateArticleAdded":new ISODate("2021-10-15T16:50:40.806Z"),"__v":0},{"_id":ObjectId("6169b19e9499d200121187ef"),"articleId":ObjectId("6169b1899499d200121187e9"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b19e9499d200121187f0"),"size":"L","quantity":1},{"_id":ObjectId("6169b19e9499d200121187f1"),"size":"M","quantity":1},{"_id":ObjectId("6169b19e9499d200121187f2"),"size":"S","quantity":1}],"color":"blue","price":50,"image":"photo-ed8871c5-7dd6-4ecc-8174-8e5dceb114b4-.png","dateArticleAdded":new ISODate("2021-10-15T16:51:41.306Z"),"__v":0},{"_id":ObjectId("6169b1b69499d200121187fb"),"articleId":ObjectId("6169b1899499d200121187e9"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b1b69499d200121187fc"),"size":"L","quantity":1},{"_id":ObjectId("6169b1b69499d200121187fd"),"size":"M","quantity":1},{"_id":ObjectId("6169b1b69499d200121187fe"),"size":"S","quantity":1},{"_id":ObjectId("6169b1b69499d200121187ff"),"size":"XL","quantity":1}],"color":"black","price":55,"discount":"50","image":"photo-6002129f-e3ef-424f-a7de-e59afea6775e-.png","dateArticleAdded":new ISODate("2021-10-15T16:52:05.943Z"),"__v":0},{"_id":ObjectId("6169b1cd9499d20012118809"),"articleId":ObjectId("6169b1899499d200121187e9"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b1cd9499d2001211880a"),"size":"L","quantity":1},{"_id":ObjectId("6169b1cd9499d2001211880b"),"size":"M","quantity":1},{"_id":ObjectId("6169b1cd9499d2001211880c"),"size":"S","quantity":1}],"color":"green","price":50,"image":"photo-136e2484-98be-42a3-8e5c-76a4aaa6760c-.png","dateArticleAdded":new ISODate("2021-10-15T16:52:28.270Z"),"__v":0},{"_id":ObjectId("6169b2259499d2001211881c"),"articleId":ObjectId("6169b20d9499d20012118816"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b2259499d2001211881d"),"size":"L","quantity":1},{"_id":ObjectId("6169b2259499d2001211881e"),"size":"M","quantity":2},{"_id":ObjectId("6169b2259499d2001211881f"),"size":"S","quantity":1},{"_id":ObjectId("6169b2259499d20012118820"),"size":"XS","quantity":1}],"color":"blue","price":100,"image":"photo-2db60107-1e9e-48ec-9751-d263f5d415ff-.png","dateArticleAdded":new ISODate("2021-10-15T16:53:56.851Z"),"__v":0},{"_id":ObjectId("6169b2759499d2001211882f"),"articleId":ObjectId("6169b25e9499d20012118829"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b8209499d20012118984"),"size":"40","quantity":2},{"_id":ObjectId("6169b8209499d20012118985"),"size":"42","quantity":1},{"_id":ObjectId("6169b8209499d20012118986"),"size":"44","quantity":1},{"_id":ObjectId("6169b8209499d20012118987"),"size":"46","quantity":2}],"color":"grey","price":65,"image":"photo-0acdef14-3e5d-4ded-8ac8-febebba7359f-.png","dateArticleAdded":new ISODate("2021-10-15T16:55:16.284Z"),"__v":0},{"_id":ObjectId("6169b2b29499d2001211884d"),"articleId":ObjectId("6169b29e9499d20012118847"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b2b29499d2001211884e"),"size":"M","quantity":2},{"_id":ObjectId("6169b2b29499d2001211884f"),"size":"S","quantity":1}],"color":"black","price":75,"image":"photo-5fcffb3a-81f6-4492-b50a-1efcccf832cf-.png","dateArticleAdded":new ISODate("2021-10-15T16:56:17.475Z"),"__v":0},{"_id":ObjectId("6169b8a39499d200121189ba"),"articleId":ObjectId("6169b8839499d200121189b4"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b8c09499d200121189ef"),"size":"36","quantity":2},{"_id":ObjectId("6169b8c09499d200121189f0"),"size":"37","quantity":2},{"_id":ObjectId("6169b8c09499d200121189f1"),"size":"40","quantity":2},{"_id":ObjectId("6169b8c09499d200121189f2"),"size":"42","quantity":2},{"_id":ObjectId("6169b8c09499d200121189f3"),"size":"43","quantity":2}],"color":"white","price":55,"image":"photo-0b4a27d3-5a97-4811-b7f1-f63d428ad550-.png","dateArticleAdded":new ISODate("2021-10-15T17:21:38.442Z"),"__v":0},{"_id":ObjectId("6169b90f9499d20012118a0a"),"articleId":ObjectId("6169b8839499d200121189b4"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b90f9499d20012118a0b"),"size":"38","quantity":1},{"_id":ObjectId("6169b90f9499d20012118a0c"),"size":"39","quantity":1},{"_id":ObjectId("6169b90f9499d20012118a0d"),"size":"40","quantity":1}],"color":"green","price":75,"image":"photo-c54c3f43-19dc-4913-a139-3600d3b185dd-.png","dateArticleAdded":new ISODate("2021-10-15T17:23:26.713Z"),"__v":0},{"_id":ObjectId("6169b98b9499d20012118a49"),"articleId":ObjectId("6169b9779499d20012118a43"),"storeId":ObjectId("6169b1089499d200121187b8"),"stockArticles":[{"_id":ObjectId("6169b98b9499d20012118a4a"),"size":"M","quantity":2},{"_id":ObjectId("6169b98b9499d20012118a4b"),"size":"S","quantity":1}],"color":"brown","price":120,"image":"photo-9290e5d4-f963-4ca1-a16d-a5c0315c42d7-.png","dateArticleAdded":new ISODate("2021-10-15T17:25:30.691Z"),"__v":0}];
db.articledetails.insertMany(articleDetails);

db.createCollection('orders', function(err, collection) {});
try { db.orders.deleteMany( { } ); } catch (e) { print (e); }
let orders = [{"_id":ObjectId("6169b4759499d200121188ad"),"sold":true,"nameArticle":"Winter Jacket Solid","brandArticle":"Solid","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b34a9499d20012118879"),"totalPrice":50,"articleDetails":ObjectId("6169b1cd9499d20012118809"),"size":"M","bookDate":new ISODate("2021-10-18T15:03:49.315Z"),"code":"SHOPWAY-mjx6ax","orderExpireAt":new ISODate("2021-10-19T15:03:49.333Z"),"__v":0},{"_id":ObjectId("6169b4939499d200121188c1"),"sold":true,"nameArticle":"Nike Sportswear","brandArticle":"Nike","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b34a9499d20012118879"),"totalPrice":65,"articleDetails":ObjectId("6169b2759499d2001211882f"),"size":"42","bookDate":new ISODate("2021-10-18T13:04:19.142Z"),"code":"SHOPWAY-v9gogm","orderExpireAt":new ISODate("2021-10-19T13:04:19.142Z"),"__v":0},{"_id":ObjectId("6169b49c9499d200121188d5"),"sold":true,"nameArticle":"T-Shirt Bershka","brandArticle":"Bershka","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b34a9499d20012118879"),"totalPrice":20,"articleDetails":ObjectId("6169b14a9499d200121187cf"),"size":"S","bookDate":new ISODate("2021-10-20T18:04:28.250Z"),"code":"SHOPWAY-9nbwh5","orderExpireAt":new ISODate("2021-10-21T18:04:28.251Z"),"__v":0},{"_id":ObjectId("6169b52a9499d2001211890d"),"sold":true,"nameArticle":"Nike Sportswear","brandArticle":"Nike","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b5059499d200121188f8"),"totalPrice":65,"articleDetails":ObjectId("6169b2759499d2001211882f"),"size":"38","bookDate":new ISODate("2021-10-20T13:06:50.174Z"),"code":"SHOPWAY-gc6lpj","orderExpireAt":new ISODate("2021-10-21T13:06:50.175Z"),"__v":0},{"_id":ObjectId("6169b5349499d20012118921"),"sold":false,"nameArticle":"Winter Coat","brandArticle":"Massimo Dutti","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b5059499d200121188f8"),"totalPrice":100,"articleDetails":ObjectId("6169b2259499d2001211881c"),"size":"S","bookDate":new ISODate("2021-10-22T11:07:00.010Z"),"code":"SHOPWAY-pkivaw","orderExpireAt":new ISODate("2021-10-23T11:07:00.010Z"),"__v":0},{"_id":ObjectId("6169b53b9499d20012118939"),"sold":false,"nameArticle":"Blazer - Stradivarius","brandArticle":"Stradivarius","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b5059499d200121188f8"),"totalPrice":75,"articleDetails":ObjectId("6169b2b29499d2001211884d"),"size":"S","bookDate":new ISODate("2021-10-22T10:07:07.643Z"),"code":"SHOPWAY-vbtm3g","orderExpireAt":new ISODate("2021-10-23T10:07:07.643Z"),"__v":0},{"_id":ObjectId("6169b5469499d2001211894d"),"sold":true,"nameArticle":"T-Shirt Bershka","brandArticle":"Bershka","store":ObjectId("6169b1089499d200121187b8"),"customer":ObjectId("6169b5059499d200121188f8"),"totalPrice":20,"articleDetails":ObjectId("6169b1619499d200121187dc"),"size":"S","bookDate":new ISODate("2021-10-18T21:07:18.854Z"),"code":"SHOPWAY-7k1baz","orderExpireAt":new ISODate("2021-10-19T21:07:18.855Z"),"__v":0}];
db.orders.insertMany(orders);

db.createCollection('notifications', function(err, collection) {});
try { db.notifications.deleteMany( { } ); } catch (e) { print (e); }
let notifications = [{"_id":ObjectId("6169b12b9499d200121187cc"),"receivers":[],"heading":"New product","content":"One of your followed store added a new article!","sender":ObjectId("6169b1089499d200121187b8"),"readBy":[],"createdAt":new ISODate("2021-10-15T16:49:47.396Z"),"__v":0},{"_id":ObjectId("6169b1899499d200121187ec"),"receivers":[],"heading":"New product","content":"One of your followed store added a new article!","sender":ObjectId("6169b1089499d200121187b8"),"readBy":[],"createdAt":new ISODate("2021-10-15T16:51:21.014Z"),"__v":0},{"_id":ObjectId("6169b20d9499d20012118819"),"receivers":[],"heading":"New product","content":"One of your followed store added a new article!","sender":ObjectId("6169b1089499d200121187b8"),"readBy":[],"createdAt":new ISODate("2021-10-15T16:53:33.088Z"),"__v":0},{"_id":ObjectId("6169b25e9499d2001211882c"),"receivers":[],"heading":"New product","content":"One of your followed store added a new article!","sender":ObjectId("6169b1089499d200121187b8"),"readBy":[],"createdAt":new ISODate("2021-10-15T16:54:54.360Z"),"__v":0},{"_id":ObjectId("6169b29e9499d2001211884a"),"receivers":[],"heading":"New product","content":"One of your followed store added a new article!","sender":ObjectId("6169b1089499d200121187b8"),"readBy":[],"createdAt":new ISODate("2021-10-15T16:55:58.636Z"),"__v":0},{"_id":ObjectId("6169b4759499d200121188b1"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba099499d20012118aa5"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:37.359Z")}],"createdAt":new ISODate("2021-10-18T17:03:49.347Z"),"__v":3},{"_id":ObjectId("6169b4939499d200121188c5"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba089499d20012118aa1"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:36.531Z")}],"createdAt":new ISODate("2021-10-18T17:04:19.159Z"),"__v":3},{"_id":ObjectId("6169b49c9499d200121188d9"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba079499d20012118a9d"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:35.806Z")}],"createdAt":new ISODate("2021-10-18T17:04:28.259Z"),"__v":3},{"_id":ObjectId("6169b4a89499d200121188f1"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169be7f9499d20012118bcd"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:46:39.912Z")}],"createdAt":new ISODate("2021-10-20T17:04:40.024Z"),"__v":5},{"_id":ObjectId("6169b52a9499d20012118911"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba049499d20012118a8c"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:32.699Z")}],"createdAt":new ISODate("2021-10-20T17:06:50.182Z"),"__v":5},{"_id":ObjectId("6169b5349499d20012118925"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba049499d20012118a8a"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:32.696Z")}],"createdAt":new ISODate("2021-10-22T17:07:00.017Z"),"__v":3},{"_id":ObjectId("6169b53b9499d2001211893d"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba049499d20012118a8e"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:32.702Z")}],"createdAt":new ISODate("2021-10-22T17:07:07.659Z"),"__v":4},{"_id":ObjectId("6169b5469499d20012118951"),"receivers":[ObjectId("6169b1089499d200121187bc")],"heading":"New order","content":"A client has required a reservation!","readBy":[{"_id":ObjectId("6169ba009499d20012118a81"),"user":ObjectId("6169b1089499d200121187bc"),"readAt":new ISODate("2021-10-15T17:27:28.839Z")}],"createdAt":new ISODate("2021-10-20T17:07:18.863Z"),"__v":4}];
db.notifications.insertMany(notifications);
