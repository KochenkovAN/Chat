  //время сообщения
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
  const myDate = new Date();

  //объявление переменных

  const buttonElement = document.getElementById('add-button');
  const listElement = document.getElementById('list');
  const nameInputElement = document.getElementById('name-input');
  const comentInputElement = document.getElementById('coment-input');
  const likesButtons = document.querySelectorAll('.like-button');

  //данные для HTML разметки

  const comments = [
    {
        name: 'Глеб Фокин',
        text: 'Это будет первый комментарий на этой странице',
        date: '12.02.22 12:18',
        likes: 3,
        clicked: false,
        active: "",
    },
    {
        name: 'Варвара Н.',
        text: 'Мне нравится как оформлена эта страница! ❤',
        date: '13.02.22 19:22',
        likes: 75,
        clicked: false,
        active: "",
    },
    {
      name: 'Максим Н.',
      text: 'Мне не нравится как оформлена эта страница! ❤',
      date: '13.02.22 20:22',
      likes: 15,
      clicked: false,
      active: "",
  },
  ];

  
  
  //рендер HTML разметки

  const renderComment = () => {
    const commentHTML = comments.map((comments, index) => {
        return `<li class="comment">
        <div class="comment-header">
          <div class="comment-name" data-name ='${comments.name}'>${comments.name}</div>
          <div>${comments.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text" data-text ='${comments.text}'>
            ${comments.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span id='${index}' class="likes-counter">${comments.likes}</span>
            <button data-index='${index}' data-likes='${comments.likes}' class="like-button ${comments.active}"></button>
            <button data-index="${index}" class="delete-button">Удалить</button>
          </div>
        </div>
      </li>`}).join('');

    listElement.innerHTML = commentHTML;

    //ответ на комментарий
    
    const commentName = document.querySelectorAll('.comment-name');

    for(const el of commentName) {
      el.addEventListener('click', () => {
        const name = el.dataset.name;
        console.log(name);
        comentInputElement.value += `${name}`;
        // переносим пользователя в поле ввода текста
        comentInputElement.focus();
        })
    }

    const commentText = document.querySelectorAll('.comment-text');

    for(const el of commentText) {
      el.addEventListener('click', () => {
        const text = el.dataset.text;
        console.log(text);
        comentInputElement.value += `[BEGIN_QUOTE] ${text} [END_QUOTE]`;
        // переносим пользователя в поле ввода текста
        comentInputElement.focus();
        })
    }
  }
  
  renderComment();

  //кнопки Like

  const initLikesButton = () => {
    const likesButtons = document.querySelectorAll('.like-button');
    for(const el of likesButtons) {
      const index = el.dataset.index;
      el.addEventListener('click', () => {
        if(!comments[index].clicked) {
          comments[index].clicked = true;
          comments[index].active = '-active-like';
          comments[index].likes += 1;

          
        } else {
          comments[index].clicked = false;
          comments[index].active = '';
          comments[index].likes -= 1
        }
        renderComment();
        initLikesButton();
      });
    }
  };
  initLikesButton();
  

  // Переход на поле комментариев при нажатии на Enter в поле имя
  nameInputElement.addEventListener('keyup', (key) => {
    if (key.code === 'Enter') {
      comentInputElement.focus();
    };
  })

  //кнопка удалить

  const initDeleteButtons = () => {
    const deletButtons = document.querySelectorAll('.delete-button') //пройти по всем элементам с классом delete-button (кнопки Удалить)

    for(const el of deletButtons) {
        el.addEventListener('click', () => {
            const index = el.dataset.index;
            comments.splice(index, 1);
            renderComment();
        })
      }
  }
  initDeleteButtons();


  buttonElement.addEventListener('click', () => {

    const rusDate = myDate.getDate() + " " + months[myDate.getMonth()] + " " + myDate.getFullYear();
    const rusTime = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();

    nameInputElement.classList.remove('error') //снять подсветку поля (error)
    if (nameInputElement.value === "") {
      nameInputElement.classList.add('error') // подсветить поле ввода имени
      return;
    }

    comentInputElement.classList.remove('error') //снять подсветку поля (error)
    if (comentInputElement.value === "") {
      comentInputElement.classList.add('error') // подсветить поле ввода коммента
      return;
    }

    //добавление нового комментария путем добавления данных в массив

    comments.push( {
      name: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      text: comentInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      date: rusDate + " " + rusTime,
      likes: 3,
    } );

    renderComment();

    nameInputElement.value = ""; //обнулить поле ввода имени
    comentInputElement.value = ""; //обнулить поле ввода коммента
    initDeleteButtons();//инициировать функцию после того как пользователь написал коментарий
    initLikesButton();
  });

