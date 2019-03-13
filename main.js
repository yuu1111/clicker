var VERSION=1.000;
var DEBUG = true;
var money = 0;

var factory1 = 0;
var factory1price = 10;

var money_txt;
var factory1value_txt;
var factory1price_txt;

var cookies = document.cookie;
var cookieItem = cookies.split(";");

const obj = convertCookieToObject(document.cookie);

window.onload = function() {
  money = obj["money"];
  factory1 = obj["factory1"];
  Get_txt()
  Cookie_Check();
  Money_Update();
  Factory_Update();
  console.log(obj);
}

function Get_txt() {
  money_txt = document.getElementById("money");
  factory1value_txt = document.getElementById("factory1value");
  factory1price_txt = document.getElementById("factory1price");
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
  money_txt.innerHTML = money.toLocaleString() + "円";
}

function Factory_Update() {
  FactoryPrice_Calc();
  factory1value_txt.innerHTML = factory1.toLocaleString() + "個";
  factory1price_txt.innerHTML = factory1price.toLocaleString() + "円";
}

function FactoryPrice_Calc() {
  factory1price = 10;
  if (factory1 > 0) {
    factory1price = factory1 * 10 + 10;
  }
}

function Click() {
  money++;
  Money_Update()
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
  if (DEBUG) {
    console.log(str);
  }
}

setInterval(Update, 1000);
