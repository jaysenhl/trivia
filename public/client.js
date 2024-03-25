/**
    TODO
    - acortar codigo de getQuestion() la creacion de html es execisva, se debe poner en otra funcion aparte que acepte argumentos y llamarla 
    - cambiar de lugar las posiciones de la respuesta correcta
    - validar si la que la seleccion sea correcta o incorrecta
    - restar puntos y sumar puntos dependiendo la contestacion
    - anadir los botones de boolean y multi
    - Anadir timer de 7 segundos para contestar
    DONE - Anadir un timer para cuando se oprima se desabilite por 2 segundos (Evitar multiple sends)
    - anadir usuarios
    - anadir base de datos de usuario (local storage)
    - anadir base de datos de usuario (online)
    - anadir sistema de puntos
    - anadir pantalla login con user y password
    - anadir disenos mejorar user interface
    - anadir icons
 */

// URL de la API
const api_url = 'https://opentdb.com/api.php?amount=1';
const triviaContainer = document.getElementById('triviaContainer');

// hide and unhide random button due to api call restriction every second
const questionBtn = document.getElementById('random')
function questionBtnToggle(){
    questionBtn.style.visibility = 'hidden'
    setTimeout(()=>questionBtn.style.visibility = 'visible',3000)
}

// Función para obtener datos de la API
async function fetchTriviaData() {
    const response = await fetch(api_url);
    const data = await response.json();
    return data.results[0];
}

// Función para decodificar caracteres especiales
function decodeHtml(html) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
}

// Función para crear el contenedor de preguntas múltiples
function createMultipleChoiceContainer(question, incorrect_answers, correct_answer) {
    const container = document.createElement('div');
    container.classList.add('container');
    container.id = 'multiContainer';

    const questionElement = document.createElement('h3');
    questionElement.classList.add('question', 'text-center', 'text-light');
    questionElement.textContent = question;
    container.append(questionElement);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('multiBtnContainer');

    incorrect_answers.concat(correct_answer).forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-info', 'multiBtnanswers');
        button.textContent = decodeHtml(answer);
        btnContainer.append(button);
    });

    container.append(btnContainer);
    return container;
}

// Función para crear el contenedor de preguntas booleanas
function createBooleanContainer(question) {
    const container = document.createElement('div');
    container.classList.add('container');
    container.id = 'booleanContainer';

    const questionElement = document.createElement('h3');
    questionElement.classList.add('question', 'text-center', 'text-light');
    questionElement.textContent = question;
    container.append(questionElement);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('booleanBtnContainer');

    const truebutton = document.createElement('button')
    truebutton.textContent = 'True'
    truebutton.classList.add('btn', 'btn-success', 'booleanBtnanswers')
    truebutton.id = 'trueBtn'
    btnContainer.append(truebutton)

    const falsebutton = document.createElement('button')
    falsebutton.textContent = 'False'
    falsebutton.classList.add('btn', 'btn-danger', 'booleanBtnanswers')
    falsebutton.id = 'falseBtn'
    btnContainer.append(falsebutton)

    container.append(btnContainer);
    return container;
}

// Función principal para controlar la lógica de la aplicación
async function getQuestion() {
    triviaContainer.innerHTML = '';
    questionBtnToggle()

    const { category, correct_answer, incorrect_answers, question, type } = await fetchTriviaData();

    const decodedQuestion = decodeHtml(question);

    // Crea y añade el contenedor de categoría y tipo
    const categoryTypeContainer = document.createElement('div');
    categoryTypeContainer.classList.add('label-container');
    categoryTypeContainer.id = 'categoryTypeContainer';
    categoryTypeContainer.innerHTML = `<span class='mb-2'>Category: ${category}</span><span class='mb-2'>Type: ${type}</span>`;

    triviaContainer.append(categoryTypeContainer);

    // Crea y añade el contenedor específico de tipo de pregunta
    if (type === 'multiple') {
        const multiContainer = createMultipleChoiceContainer(decodedQuestion, incorrect_answers, correct_answer);
        triviaContainer.append(multiContainer);
    } else {
        const booleanContainer = createBooleanContainer(decodedQuestion);
        triviaContainer.append(booleanContainer);
    }
}

