// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useState } from "react";

// // ASSETS
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
//   const [data, setData] = useState(null); // Initialize data as `null`
//   const [inputText, setInputText] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function fetchDataFromGeminiProAPI() {
//     try {
//       if (!inputText) {
//         alert("Please enter text!");
//         return;
//       }
//       setLoading(true);
      
//       const genAI = new GoogleGenerativeAI(API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
//       const result = await model.generateContent(
//         `Give me 10 mcq questions level intermediate on topic ${inputText} and in form of json which consists of question, option, and answer.`
//       );
  
//       let text = await result.response.text();
      
//       // Remove unwanted backticks or markdown code block markers
//       text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
//       // Log the raw response for debugging
      
//       // Attempt to fix common JSON formatting issues (e.g., trailing commas)
//       text = text.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      
//       // Remove any remaining control characters that might cause issues
//       text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
      
//       try {
//         // Parse the cleaned text as JSON
//         const parsedData = JSON.parse(text);
//         setData(parsedData);
//       } catch (parseError) {
//         console.error("JSON Parsing error: ", parseError);
//         alert("There was an issue parsing the JSON response. Please check the format.");
//       }
      
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("fetchDataFromGeminiProAPI error: ", error);
//     }
//   }
  
//   console.log("Raw response text:", data);
  
  

//   return (
//     <>
//       <div className="card">
//         <input
//           type="text"
//           style={{ width: 400 }}
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         {" | "}
//         <button disabled={loading} onClick={fetchDataFromGeminiProAPI}>
//           {loading ? "Loading..." : "Get PRO data"}
//         </button>
//         <hr />
//         {/* Render Quiz only when data is available */}
//         {data ? <Quiz questions={data} /> : <p>No quiz data available</p>}
//       </div>
//     </>
//   );
// }

// const Quiz = ({ questions }) => {
//   // Add a defensive check to ensure questions is a valid array
//   if (!questions || questions.length === 0) {
//     return <p>No questions available.</p>;
//   }

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [showScore, setShowScore] = useState(false);

//   const handleAnswerSelect = (selectedOption) => {
//     setUserAnswer(selectedOption);
//   };

//   const handleSubmitAnswer = () => {
//     if (userAnswer === questions[currentQuestionIndex].answer) {
//       setScore(score + 1);
//     }

//     const nextQuestionIndex = currentQuestionIndex + 1;
//     if (nextQuestionIndex < questions.length) {
//       setCurrentQuestionIndex(nextQuestionIndex);
//       setUserAnswer("");
//     } else {
//       setShowScore(true);
//     }
//   };

//   return (
//     <div>
//       {showScore ? (
//         <div>
//           <h1>
//             Your Score: {score} / {questions.length}
//           </h1>
//         </div>
//       ) : (
//         <div>
//           <h2>{questions[currentQuestionIndex]?.question || "Question not found"}</h2>
//           <div>
//             {questions[currentQuestionIndex]?.options?.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(option)}
//                 style={{
//                   backgroundColor: userAnswer === option ? "black" : "gray",
//                 }}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//           <button onClick={handleSubmitAnswer} disabled={!userAnswer}>
//             Submit Answer
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


// export default App;
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [data, setData] = useState(null); // Initialize data as `null`
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from Gemini API
  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(
        `Give me 10 MCQ questions at an intermediate level on the topic "${inputText}" in JSON format, containing question, options, and answer.`
      );

      let text = await result.response.text();

      // Log the raw response for debugging
      console.log("Raw response text:", text);

      // Attempt to fix common JSON formatting issues (e.g., trailing commas)
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      text = text.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

      try {
        // Parse the cleaned text as JSON
        const parsedData = JSON.parse(text);
        setData(parsedData);
        console.log("Parsed data: ", parsedData);
      } catch (parseError) {
        console.error("JSON Parsing error: ", parseError);
        alert("There was an issue parsing the JSON response. Please check the format.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch data.");
      console.error("fetchDataFromGeminiProAPI error: ", error);
    }
  }

  useEffect(() => {
    console.log("Data updated: ", data);
  }, [data]);

  return (
    <>
      <div className="card">
        <input
          type="text"
          style={{ width: 400 }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {" | "}
        <button disabled={loading} onClick={fetchDataFromGeminiProAPI}>
          {loading ? "Loading..." : "Get PRO data"}
        </button>
        <hr />
        {/* Render error or loading state */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading data...</p>}
        {!loading && data ? (
          <Quiz questions={data} />
        ) : (
          !loading && <p>No quiz data available</p>
        )}
      </div>
    </>
  );
}

const Quiz = ({ questions }) => {
  // Defensive check: Ensure questions is a valid array and contains data
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return <p>No questions available.</p>;
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (selectedOption) => {
    setUserAnswer(selectedOption);
  };

  const handleSubmitAnswer = () => {
    if (userAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setUserAnswer("");
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div>
          <h1>
            Your Score: {score} / {questions.length}
          </h1>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestionIndex]?.question || "Question not found"}</h2>
          <div>
            {questions[currentQuestionIndex]?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                style={{
                  backgroundColor: userAnswer === option ? "lightgray" : "gray",
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={handleSubmitAnswer} disabled={!userAnswer}>
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
