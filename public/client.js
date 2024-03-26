/**
    TODO
    - acortar codigo de getQuestion() la creacion de html es execisva, se debe poner en otra funcion aparte que acepte argumentos y llamarla 
    DONE cambiar de lugar las posiciones de la respuesta correcta
    DONE validar si la que la seleccion sea correcta o incorrecta en cierto y falso
    DONE validar si la que la seleccion sea correcta o incorrecta en selección multiple
    DONE mostrar con alert JS una alerta para las booleans
    DONE mostrar con alert JS una alerta para las multiples
    DONE mostrar con alert JS una alerta con la contestacion y los puntos obtenidos o restados
    DONE moved random question button and category select to a container to have it hidden and reopened
    - restar puntos y sumar puntos dependiendo la contestacion
    - Anadir timer de 7 segundos para contestar?
    DONE - Anadir un timer para cuando se oprima se desabilite por 2 segundos (Evitar multiple sends)
    - anadir usuarios
    - anadir base de datos de usuario (local storage)
    - anadir base de datos de usuario (online)
    - anadir sistema de puntos
    - anadir pantalla login con user y password
    - anadir disenos mejorar user interface
    - anadir icons
 */

const questionBtnsContainer = document.getElementById('questionBtnsContainer')
const categorySelect = document.querySelector('.selectOption')
const random_api_url = 'https://opentdb.com/api.php?amount=1';
const triviaContainer = document.getElementById('triviaContainer');

const questionBtn = document.getElementById('random')

// hide and unhide random button due to api call restriction every second
function questionBtnToggle(){
    questionBtnsContainer.style.display = 'none'
    setTimeout(()=>questionBtnsContainer.style.display = 'block',3000)
}

// Función para obtener datos de la API
async function fetchTriviaData(category = null) {
    let api_url = random_api_url
    if(category && category !== "Select A Category"){
        api_url += `&category=${category}`
    }
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

// crear category and type container
function createCategortTypeContainer(cat,tipo){
    const categoryTypeContainer = document.createElement('div');
    categoryTypeContainer.classList.add('label-container');
    categoryTypeContainer.id = 'categoryTypeContainer';
    categoryTypeContainer.innerHTML = `<span class='mb-2'>Category: ${cat}</span><span class='mb-2'>Type: ${tipo}</span>`;
    return categoryTypeContainer
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

    const allAnswers = incorrect_answers.slice()
    const correctIndex = Math.floor(Math.random() * allAnswers.length)
    allAnswers.splice(correctIndex, 0, correct_answer)

    allAnswers.forEach((answer, index)=>{
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-info', 'multiBtnanswers');
        button.textContent = decodeHtml(answer);
        btnContainer.append(button);

        button.addEventListener('click', () => {
            checkMultipleAnswer(index, answer, correct_answer);
        });
    })

    container.append(btnContainer);
    return container;
}

// verificar la contestacion multiple
function checkMultipleAnswer(selectedIndex, selectedAnswer, correctAnswer) {
    questionBtnToggle()
    const buttons = document.querySelectorAll('.multiBtnanswers');

    // Reiniciar las clases CSS de todos los botones
    buttons.forEach((button) => {
        button.classList.remove('btn-info','btn-success', 'btn-danger');
        button.disabled = true
    });
    
    // Resaltar la respuesta incorrecta seleccionada y la respuesta correcta
    buttons.forEach((button, index) => {
        if (button.textContent === correctAnswer) {
            // Resaltar la respuesta correcta
            button.classList.add('btn-success');        
        } else if (index === selectedIndex) {
            // Resaltar la respuesta incorrecta seleccionada por el usuario
            button.classList.add('btn-danger');
        }
    });
    
        // Puedes colocar la lógica para actualizar la puntuación aquí
        if (selectedAnswer === correctAnswer) {
            // Lógica para respuesta correcta
            Swal.fire({
                icon: "success",
                title: "Correct!",
                text: "Great! +10 points",
                footer: `<h3 class="swalFooter">You selected: ${selectedAnswer}. That's right!</h3>`
            });
        } else {
            // Lógica para respuesta incorrecta
            Swal.fire({
                icon: "error",
                title: `Incorrect!! you chose: ${selectedAnswer}`,
                text: "Too bad! -10 points",
                footer: `<h3 class="swalFooter">The Correct answer is: ${correctAnswer}</h3>`
            });
        }
}

// Función para crear el contenedor de preguntas booleanas
function createBooleanContainer(question, correct_answer) {
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
    truebutton.classList.add('btn','btn-info','booleanBtnanswers')
    truebutton.id = 'trueBtn'
    btnContainer.append(truebutton)

    truebutton.addEventListener('click', () => {
        checkBooleanAnswer(true, correct_answer);
    });

    const falsebutton = document.createElement('button')
    falsebutton.textContent = 'False'
    falsebutton.classList.add('btn','btn-info','booleanBtnanswers')
    falsebutton.id = 'falseBtn'
    btnContainer.append(falsebutton)

    falsebutton.addEventListener('click', () => {
        checkBooleanAnswer(false, correct_answer);
    });

    container.append(btnContainer);
    return container;
}

// check boolean answer function
function checkBooleanAnswer(selectedAnswer, isCorrectAnswerTrue) {
    questionBtnToggle()

    const trueButton = document.getElementById('trueBtn');
    trueButton.classList.remove('btn-info')
    const falseButton = document.getElementById('falseBtn');
    falseButton.classList.remove('btn-info')

    const isCorrect = selectedAnswer.toString().toLowerCase() === isCorrectAnswerTrue.toLowerCase();

     // Configurar la respuesta y los estilos de los botones basado en si la respuesta es correcta.
     if (isCorrect) {
        Swal.fire({
            icon: "success",
            title: "Correct!",
            text: "Great! +10 points",
            footer:`<h3 class="swalFooter">You selected: ${selectedAnswer}. That's right!</h3>`
        });
        if (selectedAnswer) {
            trueButton.classList.add('btn-success');
            falseButton.classList.add('btn-danger');
        } else {
            falseButton.classList.add('btn-success');
            trueButton.classList.add('btn-danger');
        }
        // Aquí puedes añadir la lógica para sumar puntos.
    } else {
        Swal.fire({
            icon: "error",
            title: "Incorrect!",
            text: "Too Bad! -10 points",
            footer: `<h3 class="swalIncorrect">You selected: ${selectedAnswer}. That's wrong!</h3>`
        });
        if (selectedAnswer) {
            trueButton.classList.add('btn-danger');
            falseButton.classList.add('btn-success');
        } else {
            falseButton.classList.add('btn-danger');
            trueButton.classList.add('btn-success');
        }
        // Aquí puedes añadir la lógica para restar puntos.
    }

    // Desactivar ambos botones después de que se seleccione una respuesta
    trueButton.disabled = true;
    falseButton.disabled = true;
}

// Función principal para controlar la lógica de la aplicación
async function getQuestion(selectedCategory=null) {
    triviaContainer.innerHTML = '';
    questionBtnToggle()
    
    const data = await fetchTriviaData(selectedCategory)
    const { category: fetchedCategory, correct_answer, incorrect_answers, question, type } = data;

    //remove special characters from question
    const decodedQuestion = decodeHtml(question);

    console.log(`From main ${correct_answer}`)

    // Crea y añade el contenedor de categoría y tipo
    triviaContainer.append(createCategortTypeContainer(fetchedCategory,type));

    // Crea y añade el contenedor específico de tipo de pregunta
    if (type === 'multiple') {
        const multiContainer = createMultipleChoiceContainer(decodedQuestion, incorrect_answers, correct_answer);
        triviaContainer.append(multiContainer);
    } else {
        const booleanContainer = createBooleanContainer(decodedQuestion,correct_answer);
        triviaContainer.append(booleanContainer);
    }
}

document.getElementById('random').addEventListener('click', () => getQuestion());
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    getQuestion(selectedCategory);
});
