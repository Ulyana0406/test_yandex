'use strict';

const products = document.querySelectorAll('.product');
const basketOne = document.querySelector('.basket-one');
const basketTwo = document.querySelector('.basket-two');
const basketThree = document.querySelector('.basket-three');
const btnPay = document.querySelector('.btn-pay');
const basket = document.querySelector('.basket');
const produktsInBasket = {
  basketOne: ['wine', 'milk', 'cake', 'chese'],
  basketTwo: ['beef', 'checken', 'cheeps'],
  basketThree: ['pineapple', 'banana', 'aple', 'salad']
};

let current = null;
let count = 0;
let zIndex = 1;

function updateBasket(produktsInBasket, basket, productName) {
  if (produktsInBasket.includes(productName)) {
    basket.appendChild(current);
    basket.style = `z-index: ${zIndex++}`;
    count += 1;
    console.log(`Count: ${count}`);
  }
}

function handleDrop() {
  if (!current) return;
  const productName = current.className.split(' ')[1];
  console.log(`Dropped product: ${productName}`);

  updateBasket(produktsInBasket.basketOne, basketOne, productName);
  updateBasket(produktsInBasket.basketTwo, basketTwo, productName);
  updateBasket(produktsInBasket.basketThree, basketThree, productName);

  if (count >= 3) {
    btnPay.classList.add('btn-pay-visible');
  }

  current.style.position = '';
  current.style.left = '';
  current.style.top = '';
  current = null;
}


products.forEach(function (elem) {
  elem.addEventListener('dragstart', function (e) {
    current = this;
  });
});

basket.addEventListener('dragover', function (e) {
  e.preventDefault();
});

basket.addEventListener('drop', handleDrop);


products.forEach(function (elem) {
  elem.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    current = this;


    const rect = current.getBoundingClientRect();
    current.style.position = 'absolute';
    current.style.zIndex = zIndex++;


    current.style.left = `${(touch.clientX - rect.width) / 2}px`;
    current.style.top = `${(touch.clientY - rect.height) / 2}px`;
  });

  elem.addEventListener('touchmove', function (e) {
    e.preventDefault();
    const touch = e.touches[0];

    current.style.left = `${(touch.clientX - current.offsetWidth) / 2}px`;
    current.style.top = `${(touch.clientY - current.offsetHeight) / 2}px`;
  });


  elem.addEventListener('touchend', function (e) {
    const touch = e.changedTouches[0];
    const basketRect = basket.getBoundingClientRect();


    if (
      touch.clientX > basketRect.left &&
      touch.clientX < basketRect.right &&
      touch.clientY > basketRect.top &&
      touch.clientY < basketRect.bottom
    ) {
      handleDrop();
    } else {
      current.style.position = '';
      current.style.left = '';
      current.style.top = '';
    }
    current = null;
  });
});


btnPay.addEventListener('click', () => {
  window.location.href = 'https://lavka.yandex.ru/';
});
