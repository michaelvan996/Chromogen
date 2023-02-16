import React from 'react';
import shallow from 'zustand/shallow';
import useToDoStore from '../store/store';
import { useEffect } from 'react';

const selector = (state) => ({
  changeQuoteText: state.changeQuoteText,
  quoteText: state.quoteText,
});

const Quotes = () => {
  const { changeQuoteText, quoteText } = useToDoStore(selector, shallow);

  const fetchMe = () => {
    let randomNum = Math.floor(Math.random() * 1643);

    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        const quote = data[randomNum];
        changeQuoteText(`"${quote.text}"\n\t- ${quote.author || 'unknown'}`);
      })
      .catch((err) => {
        console.error(err);
        return 'No quote available';
      });
  };

  useEffect(() => fetchMe(), []);

  return (
    <>
      <div id="quoteContainer">
        <p>{quoteText}</p>
        <a onClick={() => fetchMe()}>New Quote</a>
      </div>
    </>
  );
};

export default Quotes;
