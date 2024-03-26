// netlify/functions/trivia.js

exports.handler = async function(event, context) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        results: [
          // ... insert your trivia questions here ...
          {
            "category": "Culture: Puerto Rico",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the national animal of Puerto Rico?",
            "correct_answer": "Coqui",
            "incorrect_answers": [
              "El Yunque Parrot",
              "Puerto Rican Boa",
              "Caribbean Manatee"
            ]
          },
          {
            "category": "Culture: Puerto Rico",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which style of music originated in Puerto Rico?",
            "correct_answer": "Reggaeton",
            "incorrect_answers": [
              "Salsa",
              "Bachata",
              "Cumbia"
            ]
          }
        ]
      })
    };
    return response;
  };
  