import React, { useState, useEffect } from "react";
import "./styles.css";

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    // Harici API'den alıntıları çekmek için useEffect kullanımı:useEffect(() => { ... }, []);
    const fetchQuotes = async () => {
      //fetchQuotes fonksiyonu  fetch ile belirtilen API'den alıntıları çeker ve bu veriyi json fonksiyonu ile işler.
      try {
        const response = await fetch("https://type.fit/api/quotes"); // await anahtar kelimesi, fonksiyonun tamamlanmasını bekler.ardından bir HTTP yanıtı döndürür.
        const data = await response.json(); //API yanıtını JSON formatına çevirir.

        // Alıntıları yerel state olan 'quotes' içine koy
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []); // Boş bağımlılık dizisi, sadece bir kere çağrılmasını sağlar

  // Yeni bir rastgele alıntı seçme fonksiyonu
  const selectRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes?.length); // Optional chaining eklenmiş
    const randomQuote = quotes?.[randomIndex]; // Optional chaining eklenmiş

    // Optional chaining ile seçilen alıntıyı 'quote' state'ine koyma
    setQuote(randomQuote?.text || "");
    setAuthor(getAuthorWithoutTypeFit(randomQuote?.author) || "");
  };
  //yazar isminden type.fit i kurtarmaak icin
  const getAuthorWithoutTypeFit = (fullAuthor) => {
    if (fullAuthor && fullAuthor.includes(",")) {
      // Eğer yazar bilgisinde virgül varsa, virgülden önceki kısmı al
      return fullAuthor.split(",")[0].trim();
    }
    return fullAuthor;
  };
  return (
    <div className="mainContainer">
      <h2>Project 3: Quote Generator</h2>
      <div className="newQuoteContainer">
        <button className="newQuoteButton" onClick={selectRandomQuote}>
          New Quote
        </button>
        <p>"{quote}"</p>
        <p>-{author}</p>
      </div>
    </div>
  );
};

export default QuoteGenerator;
