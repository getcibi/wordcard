import React from 'react'

interface WordInfo {
  word: string
  pronunciation: string
  partOfSpeech: string
  definitions: string[]
  examples: string[]
  synonyms: string[]
  antonyms: string[]
  etymology: string
  idioms: string[]
}

interface WordProcessorProps {
  wordInfo: WordInfo
}

const WordProcessor: React.FC<WordProcessorProps> = ({ wordInfo }) => {
  return (
    <div 
      id="word-result" 
      className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white"
    >
      <h2 className="text-4xl font-bold mb-2">{wordInfo.word}</h2>
      <p className="text-xl mb-4">{wordInfo.pronunciation} • {wordInfo.partOfSpeech}</p>
      
      <section className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">Definitions</h3>
        <ol className="list-decimal list-inside">
          {wordInfo.definitions.map((def, index) => (
            <li key={index} className="mb-1">{def}</li>
          ))}
        </ol>
      </section>
      
      <section className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">Examples</h3>
        <ul className="list-disc list-inside">
          {wordInfo.examples.map((example, index) => (
            <li key={index} className="mb-1 italic">"{example}"</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">Synonyms & Antonyms</h3>
        <p><strong>Synonyms:</strong> {wordInfo.synonyms.join(', ')}</p>
        <p><strong>Antonyms:</strong> {wordInfo.antonyms.join(', ')}</p>
      </section>
      
      <section className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">Etymology</h3>
        <p>{wordInfo.etymology}</p>
      </section>
      
      {wordInfo.idioms.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-2">Idioms</h3>
          <ul className="list-disc list-inside">
            {wordInfo.idioms.map((idiom, index) => (
              <li key={index}>{idiom}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default WordProcessor