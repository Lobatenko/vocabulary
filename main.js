const englishInput = document.getElementById('input-eng'),
    russianInput = document.getElementById('input-rus'),
    inputs = document.querySelectorAll('input'),
    saveButton = document.getElementById('btn'),
    table = document.getElementById('table');

let words,
    btnsdelete;
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
    table.innerHTML += `
    <tr>
        <td>${words[index].translate}</td>
        <td>${words[index].russian}</td>
    <td>
        <button class="btn-delete"></button>
    </td>
    </tr>`
}

words.forEach((item,index) => {
    addWordToTable(index);
});

class createWord{
    constructor(translate,russian){
        this.translate = translate;
        this.russian = russian;
    }
}

saveButton.addEventListener('click', () => {
    if(
        englishInput.value.length < 1 ||
        russianInput.value.length < 1 ||
        !isNaN(englishInput.value)    ||
        !isNaN(russianInput.value)
    ){
        for(let key of inputs){
            key.classList.add('error');
        }
    }
    else {
            for(let key of inputs){
                key.classList.remove('error');
            }
            words.push(new createWord(englishInput.value, russianInput.value));
            //console.log(words);
            localStorage.setItem('words',JSON.stringify(words));
            addWordToTable(words.length-1);
            englishInput.value = null;
            russianInput.value = null;
            addDeleteWord();
        }
});

const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    console.log(rowIndex);
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}

const addDeleteWord = () => {
    if (words.length > 0){
        btnsDelete = document.querySelectorAll('.btn-delete');
        for(let btn of btnsDelete){
            btn.addEventListener('click', e => {
                deleteWord(e);
            })
        }
    }
}

addDeleteWord();