// netlify/functions/trivia.js
  exports.handler = async function(event, context) {
    const triviaQuestions = [
        {
          "category": "Culture: Puerto Rico",
          "type": "multiple",
          "difficulty": "medium",
          "question": "What is the name of the indigenous group that inhabited Puerto Rico before European arrival?",
          "correct_answer": "Taíno",
          "incorrect_answers": ["Caribs", "Arawak", "Chibcha"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "boolean",
          "difficulty": "easy",
          "question": "Is the coquí a symbolically significant frog in Puerto Rican culture?",
          "correct_answer": "True",
          "incorrect_answers": ["False"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "multiple",
          "difficulty": "medium",
          "question": "Which dish is considered traditional in Puerto Rican cuisine?",
          "correct_answer": "Mofongo",
          "incorrect_answers": ["Taco", "Paella", "Ceviche"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "multiple",
          "difficulty": "easy",
          "question": "What is the capital city of Puerto Rico?",
          "correct_answer": "San Juan",
          "incorrect_answers": ["Ponce", "Mayagüez", "Caguas"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "multiple",
          "difficulty": "hard",
          "question": "What year did Puerto Rico become a U.S. Commonwealth?",
          "correct_answer": "1952",
          "incorrect_answers": ["1898", "1917", "1941"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "boolean",
          "difficulty": "medium",
          "question": "Is the Puerto Rican parrot considered critically endangered?",
          "correct_answer": "True",
          "incorrect_answers": ["False"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "multiple",
          "difficulty": "medium",
          "question": "What popular festival takes place annually in Loíza, Puerto Rico?",
          "correct_answer": "Fiesta de Santiago Apóstol",
          "incorrect_answers": ["Carnaval Ponceño", "Fiestas de la Calle San Sebastián", "Festival de la Piña Paradisíaca"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "boolean",
          "difficulty": "easy",
          "question": "Does Puerto Rico have its own Olympic team?",
          "correct_answer": "True",
          "incorrect_answers": ["False"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "multiple",
          "difficulty": "easy",
          "question": "Which musical genre is commonly associated with Puerto Rico?",
          "correct_answer": "Reggaeton",
          "incorrect_answers": ["Samba", "Merengue", "Bachata"]
        },
        {
          "category": "Culture: Puerto Rico",
          "type": "boolean",
          "difficulty": "medium",
          "question": "Was the Pina Colada cocktail invented in Puerto Rico?",
          "correct_answer": "True",
          "incorrect_answers": ["False"]
        }
      ]      
  
    // Select a random question
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const question = triviaQuestions[randomIndex];
  
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        result: question
      })
    };
  
    return response;
  };
  