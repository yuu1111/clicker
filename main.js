var VERSION=1.000;
var DEBUG = 1
var money = 0;

var factory1 = 0;
var factory1price = 10;

var cookies = document.cookie;
var cookieItem = cookies.split(";");

const obj = convertCookieToObject(document.cookie);

window.onload = function() {
  money = obj["money"];
  factory1 = obj["factory1"];
  Cookie_Check();
  Money_Update();
  Factory_Update();
  console.log(obj);
}

function Cookie_Check() {
  if (money == undefined) {
    money = 0;
  }
  if (factory1 == undefined) {
    factory1 = 0;
  }
}

function convertCookieToObject(cookies) {
  const cookieItems = cookies.split(';');

  const obj = {};
  cookieItems.forEach((item) => {
    var elem = item.split('=');
    const key = elem[0].trim();
    const val = decodeURIComponent(elem[1]);
    obj[key] = val;
  });
  return obj;
}

function Update() {
  Money_Update();
  Factory_Update();
  if (factory1 > 0) {
    money = Number(money);
  money += Number(factory1) * 0.1
  }
}

function Money_Update() {
  target = document.getElementById("moneytxt");
  target.innerHTML = money.toLocaleString() + "円";
}

function Factory_Update() {
  FactoryPrice_Calc();
  target = document.getElementById("factory1value");
  target.innerHTML = factory1.toLocaleString() + "個";
  target = document.getElementById("factory1price");
  target.innerHTML = factory1price.toLocaleString() + "円";
}

function FactoryPrice_Calc() {
  if (factory1 > 0) {
    factory1price = factory1 * 10 + 10;
  } else {
    factory1price = 10;
  }
}

function Click() {
  money++;
  target = document.getElementById("moneytxt");
  target.innerHTML = money + "円";
}

function BuyClick(button) {
    if (button == 1 && money > factory1price - 1) {
      money -= factory1price;
      factory1++;
    }
  Update();
}
function Save() {
  document.cookie = 'money=' + money;
  document.cookie = 'factory1=' + factory1;
}

function Reset() {
  document.cookie = 'money=0';
  document.cookie = 'factory1=0';
  money = 0;
  factory1 = 0;
  factory1price = 0;
  Update();
}

function Debug_Log(str) {
  if (DEBUG == 1) {
    console.log(str);
  }
}

setInterval(Update, 1000);
