import React, { useState } from 'react';
import AuthorDescripion  from './components/AuthorDescription';
import CategoryForm from './components/CategoryForm';
import DeleteCategory from './components/DeleteCategory';
 
const App = () => {
  const [query, setQuery] = useState('physics');
  const [authorId, setAuthorId] = useState('');
  const [paperId, setPaperId] = useState('');
  const [results, setResults] = useState([]);
  const [authorPapers, setAuthorPapers] = useState([]);
  const [paperDetails, setPaperDetails] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const searchPapers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=10&fields=title,authors,year,url,paperId`
      );
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error('Помилка при пошуку:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const searchAuthorPapers = async () => {
    if (!authorId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers?limit=10&fields=title,year,paperId`
      );
      const data = await response.json();
      setAuthorPapers(data.data || []);
    } catch (error) {
      console.error('Помилка при пошуку автора:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const searchPaperById = async () => {
    if (!paperId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=title,authors,year,url,paperId`
      );
      const data = await response.json();
      setPaperDetails(data || null);
    } catch (error) {
      console.error('Помилка при пошуку статті:', error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
  <CategoryForm />
  <DeleteCategory />
      
      <h2>🔬 Semantic Scholar API Explorer</h2>
 
      
      <div>
        <h3>Пошук статей за темою</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Тема (наприклад, physics)"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={searchPapers} style={{ marginLeft: '1rem' }}>
          Пошук
        </button>
        <ul>
          {results.map((paper) => (
            <li key={paper.paperId}>
              <strong>{paper.title}</strong> ({paper.year})<br />
              <em>ID статті:</em> {paper.paperId}<br />
              <em>ID авторів:</em> {paper.authors?.map((a) => <AuthorDescripion  key={a.authorId}  name={a.name} id={a.authorId}/>)}<br />
              <a href={paper.url} target="_blank" rel="noopener noreferrer">Переглянути</a>
            </li>
          ))}
        </ul>
      </div>
 
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Пошук діяльності автора за ID</h3>
        <input
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          placeholder="Author ID"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={searchAuthorPapers} style={{ marginLeft: '1rem' }}>
          Пошук
        </button>
        <ul>
          {authorPapers?.map((paper) => (
            <li key={paper.paperId}>
              <strong>{paper.title}</strong> ({paper.year})<br />
              <em>ID статті:</em> {paper.paperId}
            </li>
          ))}
        </ul>
      </div>
 
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Пошук статті за ID</h3>
        <input
          type="text"
          value={paperId}
          onChange={(e) => setPaperId(e.target.value)}
          placeholder="Paper ID"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={searchPaperById} style={{ marginLeft: '1rem' }}>
          Пошук
        </button>
        {paperDetails && (
          <div style={{ marginTop: '1rem' }}>
            <strong>{paperDetails.title}</strong> ({paperDetails.year})<br />
            <em>ID статті:</em> {paperDetails.paperId}<br />
            <em>ID авторів:</em> {paperDetails.authors?.map((a) => a.authorId || '—').join(', ')}<br />
            <a href={paperDetails.url} target="_blank" rel="noopener noreferrer">Переглянути</a>
          </div>
        )}
      </div>
 
      {loading && <p>⏳ Завантаження...</p>}
    </div>
  );
};
 
export default App;