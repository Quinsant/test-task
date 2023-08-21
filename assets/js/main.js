const btnBookCons = document.querySelector("#book-cons");
const btnFreeCons = document.querySelector("#free-cons");
const btnNav = document.querySelector(".mobile-menu-btn");

const modalAll = document.querySelectorAll(".modal-win");
const modalBlur = document.querySelector(".modal-blur");
const modalExit = document.querySelectorAll(".modal-exit");

const checkboxes = document.querySelectorAll("input[type='checkbox']");

const textContent = document.querySelector(".text-content");

const textSubBlockOne = document.querySelector(".text-subblock-one");
const textSubBlockTwo = document.querySelector(".text-subblock-two");

const bookConsForm = document.querySelector("#bookConsForm");

// скрытие форм
function closeModal() {
    modalAll.forEach((item) => {
        item.removeAttribute("open");
    })
    modalBlur.setAttribute("hidden", "");
}

// отображение форм
function showModal(id) {
    let modal = document.querySelector(`#${id}`);
    if(modal.getAttribute("open") == null) {
        modal.setAttribute("open", "");
        modalBlur.removeAttribute("hidden");
    }
}


modalExit.forEach((item) => item.addEventListener("click", () => closeModal()));
modalBlur.addEventListener("click", () => closeModal())

btnBookCons.addEventListener("click", function() {
    showModal("bookConsModal");
});
btnNav.addEventListener("click", () => {
    showModal("mobileNav");
})

// изменение контента при масштабировании экрана
function reTextContent() {
    if(window.innerWidth <= 768) {
        textContent.textContent = "Ваш успех зависит от ваших действий";
        btnBookCons.children[0].textContent = "Записаться";
        btnFreeCons.children[0].textContent = "Заказать звонок";
        textSubBlockOne.textContent = "техники";
        textSubBlockTwo.textContent = "продуктивности";
    }
    else {
        textContent.textContent = "Когда ваше время и энергия лучше сфокусированы, стремление к новым возможностям становится реальностью, ваш успех зависит от ваших действий"
        btnBookCons.children[0].textContent =  "Записаться на консультацию"
        btnFreeCons.children[0].textContent = "Бесплатная консультация"
        textSubBlockOne.textContent = "техник для достижения целей";
        textSubBlockTwo.textContent = "увеличение личной продуктивности";
    }
}

function hiddenMobileNav() {
    let mobileNav = document.querySelector("#mobileNav");

    if((window.innerWidth > 1024) && (mobileNav.getAttribute("open") !== null)) {
        mobileNav.removeAttribute("open");
        modalBlur.setAttribute("hidden", "");
    }
}

checkboxes.forEach((e) => {
    e.addEventListener("click", () => {
        if(e.getAttribute("checked") !== null) e.removeAttribute("checked");
        else e.setAttribute("checked", "");
    })
})

//  обработка формы
bookConsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.clear();

    let name = e.target[0].value;
    let phone = e.target[1].value;

    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);

    console.log(localStorage)
    checkSentData(e.target);
})

// проверка содержимого в localStorage и отображение сообщения
function checkSentData(form) {
    if(localStorage.length !== 0) {
        form.setAttribute("success", "");
    }
}

// обработка поля имени
document.querySelector("#name").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^A-Za-zА-Яа-яЁё ]/g, "").slice(0, 50);
})

// обработка поля номера телефона
document.querySelector("#phone").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^+0-9]/g, "").slice(0, 12);
})

reTextContent();
hiddenMobileNav();
checkSentData(bookConsForm);
window.onresize = () => {reTextContent();hiddenMobileNav()}