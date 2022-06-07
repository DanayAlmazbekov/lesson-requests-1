/*
REQUESTS :
POST - добавление данных
PUT - полная замена данных
PATCH - частичная замена данных
DELETE - удаление данных
GET  - получение данных
*/
/*
команда для запуска json-server :
json-server -w db.json 8000
*/
/*
CRUD - Create(POST) Read(GET) Update(PUT/PATCH) Delete(DELETE)
*/
const API = "http://localhost:8000/todo";

//! Create

// получаем нужные для добавления элементы
let inpAdd = document.getElementById('inp-add');
let btnAdd = document.getElementById('btn-add');
// console.log(inpAdd, btnAdd);

// навесили событие на кнопку "сохранить"
btnAdd.addEventListener('click', async function () {
  // собираем объект для добавления db.json
  let newTodo ={
    todo: inpAdd.value,
  };
  // console.log(newTodo);
  // проверка на заполненность инпута и останавливаем код с помощью return, чтобы пост(POST) запрос не выполнился
  if(newTodo.todo.trim() === ''){
    alert('enter the field!');
    return;
  }
  // запрос для добавления
  await fetch(API, {
    method: 'POST', // указываем метод
    body: JSON.stringify(newTodo), // указываем что именно нужно запостить
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    }, // кодировка
  });
  // очищаем инпут после добавления
  inpAdd.value = '';
  // чтобы добавленный сразу отобразился в листе вызываем функцию, которая выполняет отображение
  getTodo()
});

//! Read
// получаем элемент, чтоб в нем отобразить все таски
let list = document.getElementById('list');
// проверяем в консоли, чтоб убедиться, что в переменной list сейчас НЕ пусто
console.log(list);
// функция для отображения всех тасков и отображения их в div#list
// async await нужен здесь, чтоб при отправке запроса мы сначала получили данные и только потом записали все в переменную response, иначе (если мы НЕ дождемся) туда запишется pending (состояния промиса, который еще не выполнен)
async function getTodo() {
  let result = await fetch(API) // если не указать метод, то по умолчанию это GET запрос
    .then(res => res.json()) // переводим все в json формат
    .catch(err => console.log(err)); // ловим ошибку
  console.log(result);
  // очищаем div#list, чтобы список тасков корректно отображался и не хранил там предыдущие html-элементы со старыми данными
  list.innerHTML = '';
  // перебираем из db.json массив и для каждого объекта из этого массива создаем div и задаем ему содержимое через метод innerHTML, каждый созданный элемент аппендим в div#list
  result.forEach((item) => {
    let newElem = document.createElement('div');
    newElem.innerHTML = `<span>${item.todo}</span>`;
    list.append(newElem);
  });
}
// вызываем функцию, чтобы как только откроется страница что-то было отображено
getTodo();
