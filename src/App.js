import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');  
  const [uniqueWords, setUniqueWords] = useState(0);  
  const [charCount, setCharCount] = useState(0);  
  const [searchString, setSearchString] = useState('');  
  const [replaceString, setReplaceString] = useState('');  
  const [highlightedText, setHighlightedText] = useState('');  


  useEffect(() => {
    const words = text.toLowerCase().match(/\b\w+\b/g);  
    const uniqueWordSet = new Set(words);
    setUniqueWords(uniqueWordSet.size);

    const chars = text.replace(/[^a-zA-Z0-9]/g, '');  
    setCharCount(chars.length);
  }, [text]);

  
  const handleReplace = () => {
    const regex = new RegExp(searchString, 'g');  
    const newText = text.replaceAll(regex, replaceString);
    setText(newText);
    
  
    const highlighted = newText.replaceAll(replaceString, `<span class="highlight">${replaceString}</span>`);
    setHighlightedText(highlighted);
  };

  return (
    <div className="container">
      <h1>Real-Time Text Statistics</h1>
     
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      />

      
      <div>
        <input
          type="text"
          placeholder="Search for..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

   
      <div className="statistics">
        <p>Unique words: {uniqueWords}</p>
        <p>Characters (excluding spaces & punctuation): {charCount}</p>
      </div>

      
      <div
        className="highlight-output"
        dangerouslySetInnerHTML={{ __html: highlightedText || text }}
      />
    </div>
  );
};

export default App;
