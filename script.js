const AddContact = document.querySelector('.addContact');
const ContactForm = document.querySelector('.contactForm');
const EditContact = document.querySelector('.editContactForm');
const ShowBox = document.querySelector('.showBox');
const Sort = document.querySelector('#sortByName');
const Icon = document.querySelector('#icon');
const SearchBox = document.getElementById('searchBox');
const Cancel = document.getElementById('cancel');
const Add = document.getElementById('add');
const PhoneNumber = document.getElementById('phoneNumber');
const Email = document.getElementById('email');
const LastName = document.getElementById('lastName');
const FirstName = document.getElementById('firstName');
const Header = document.querySelector('header');
const CloseBtn = document.querySelectorAll('.closeBtn')

CloseBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.style.display = "none";
    })
});
SearchBox.addEventListener('keyup', searchContact);
AddContact.addEventListener('click', contactFormOpen);
Sort.addEventListener('click', sortByName);

function searchContact() {
    var filter = SearchBox.value.toUpperCase();
    var Tr = document.querySelectorAll('tr');
    for(i = 1; i < Tr.length; i++) {
        if(Tr[i].textContent.toUpperCase().indexOf(filter) > -1) {
            Tr[i].style.display = "";
        } else {
            Tr[i].style.display = "none";
        }
    }
    
}
function contactFormOpen() {
    AddContact.style.display = 'none';
    ContactForm.style.display = 'block';
    
    Cancel.addEventListener('click', contactFormClose)
    Add.addEventListener('click', submitContactForm)
}

function contactFormClose() {
    ContactForm.style.display = 'none';
    AddContact.style.display = 'flex';
    FirstName.value = "";
    LastName.value = "";
    PhoneNumber.value = "";
    Email.value = "";
}

function submitContactForm() {
    if(FirstName.value === "") {
        formError()
    } else if(PhoneNumber.value === "") {
        formError()
    } else {
        showContact()
        storeToLocalStorage(FirstName.value, PhoneNumber.value, LastName.value, Email.value)
        contactFormClose()
    }
    FirstName.value = "";
    LastName.value = "";
    PhoneNumber.value = "";
    Email.value = "";
}

function formError() {
    var errorBox = document.querySelector('.errorBox');
    errorBox.style.display = "block";

    setTimeout(() => {
        if(errorBox.style.display === "block") {
            errorBox.style.display = "none";
        }
    }, 3000)

}

function showContact() {
    const ContactInfo = [FirstName.value, LastName.value, PhoneNumber.value, Email.value];
    const DeleteTr = document.createElement('button');
    DeleteTr.classList = 'deleteTr';

    const EditTr = document.createElement('button');
    EditTr.classList = 'editTr';

    DeleteTr.innerText = 'Delete';
    DeleteTr.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
    })

    EditTr.innerText = 'Edit';
    EditTr.addEventListener('click', (e) => {
        AddContact.style.display = 'none'
        var data = [];
        var info;
        for(let i = 0; i <= 3; i++){
            info = e.target.parentElement.parentElement.children[i].innerText;
            EditContact.children[i].value = info;
            data.push(info);
        }
        editContactForm(data);
        data = [];
    });

    for(let i = 0; i < 1; i++) {
        const Tr = document.createElement('tr');
        for(info of ContactInfo) {
            const Td = document.createElement('td');
            Td.append(info);
            Tr.append(Td);
        }
        const Td = document.createElement('td');
        const TBody = document.querySelector('tbody');
        Td.append(DeleteTr, EditTr);
        Tr.append(Td);
        TBody.append(Tr);
    }
}

function editContactForm(data) {
    EditContact.style.display = "block";
    const Tr = document.querySelectorAll('tr');
    const Submit = document.querySelector('.submit');
    const Cancel = document.querySelector('.cancel');
    const SuccessBox = document.querySelector('.successBox');

    var target;
    var indexTarget;
    let i = 0;
    Tr.forEach((element, index) => {
        i++
        if(element.children[i].textContent === data[i]) {
            target = index;
        }
    });
    for(let i = 0; i <= 3; i++) {
        indexTarget = data[i];
        Tr[target].children[i].value = indexTarget;
    }

    Submit.addEventListener('click', () => {
        for(let i = 0; i <= 3; i++) {
            Tr[target].children[i].innerHTML = EditContact.children[i].value;
        }

        EditContact.style.display = 'none';
        AddContact.style.display = 'flex';
        FirstName.value = "";
        LastName.value = "";
        PhoneNumber.value = "";
        Email.value = "";
        SuccessBox.style.display = 'block';
        setTimeout(() => {
            SuccessBox.style.display = 'none';
        }, 3000)
    })

    Cancel.addEventListener('click', () => {
        EditContact.style.display = 'none';
        AddContact.style.display = 'flex';
        FirstName.value = "";
        LastName.value = "";
        PhoneNumber.value = "";
        Email.value = "";
    })
}

function storeToLocalStorage(name, phone, LastName, Email) {
    // i have to store user values to local storage
    let info;
    if(localStorage.getItem('info') === null) {
        info = [];
    } else {
        info = localStorage.getItem('info').split(',');
    }
    info.push(name, phone, LastName, Email);
    localStorage.setItem('info', info);
    FirstName.value = "";
    LastName.value = "";
    PhoneNumber.value = "";
    Email.value = "";
}

function sortByName() {
    var tr, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    if(Icon.className == "fa fa-arrow-up") {
        Icon.className = "fa fa-arrow-down";
    } else {
        Icon.className = "fa fa-arrow-up";
    }
    while (switching) {
        switching = false;
        tr = document.querySelectorAll('tr');
        for (i = 1; i < (tr.length - 1); i++) {
            shouldSwitch = false;
            x = tr[i].getElementsByTagName("td")[0];
            y = tr[i + 1].getElementsByTagName("td")[0];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            tr[i].parentNode.insertBefore(tr[i + 1], tr[i]);
            switching = true;
            switchcount ++;      
        } else {
            if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
            }
        }
    }
}