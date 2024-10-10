import React from 'react'

interface WordInfo {
  word: string;
  pronunciation: string;
  chineseMeaning: string;
  wordForms: string;
  englishDefinitions: string[];
  phrases: string[];
  examples: string[];
  memoryTip: string;
  themeColor: string;
}

interface ColorVariables {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  sectionBackground: string;
}

const WordCard: React.FC<{ wordInfo: WordInfo }> = ({ wordInfo }) => {
  const {
    word,
    pronunciation,
    chineseMeaning,
    wordForms,
    englishDefinitions,
    phrases,
    examples,
    memoryTip,
    themeColor
  } = wordInfo

  const getColorVariables = (color: string): ColorVariables => {
    // 这是一个简化版本。在实际应用中，您可能需要一个颜色库来生成这些变体。
    return {
      primary: color,
      secondary: color, // 您可能想要调整这个为更浅的色调
      background: '#ffffff',
      text: '#333333',
      sectionBackground: '#f0f0f0'
    }
  }

  const colors = getColorVariables(themeColor)

  return (
    <div className="card w-full rounded-3xl shadow-lg overflow-hidden" style={{background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`}}>
      <div className="p-6">
        <div className="mb-5">
          <h2 className="text-3xl font-bold mb-1" style={{color: colors.text}}>{word}</h2>
          <p className="text-xl" style={{color: colors.text}}>{chineseMeaning}</p>
          <p className="text-lg" style={{color: colors.text}}>{pronunciation}</p>
        </div>

        <div className="rounded-xl p-4 mb-4 shadow-sm" style={{backgroundColor: colors.sectionBackground}}>
          <h3 className="text-xl font-semibold flex items-center mb-3" style={{color: colors.primary}}>
            <i className="fas fa-sync-alt mr-3" style={{color: colors.secondary}}></i>词态变化
          </h3>
          <p style={{color: colors.text}}>{wordForms}</p>
        </div>

        <div className="rounded-xl p-4 mb-4 shadow-sm" style={{backgroundColor: colors.sectionBackground}}>
          <h3 className="text-xl font-semibold flex items-center mb-3" style={{color: colors.primary}}>
            <i className="fas fa-book mr-3" style={{color: colors.secondary}}></i>英文释义
          </h3>
          <ul style={{color: colors.text}}>
            {englishDefinitions.map((def, index) => (
              <li key={index}>{def}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl p-4 mb-4 shadow-sm" style={{backgroundColor: colors.sectionBackground}}>
          <h3 className="text-xl font-semibold flex items-center mb-3" style={{color: colors.primary}}>
            <i className="fas fa-link mr-3" style={{color: colors.secondary}}></i>固定搭配
          </h3>
          <ul style={{color: colors.text}}>
            {phrases.map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl p-4 mb-4 shadow-sm" style={{backgroundColor: colors.sectionBackground}}>
          <h3 className="text-xl font-semibold flex items-center mb-3" style={{color: colors.primary}}>
            <i className="fas fa-quote-left mr-3" style={{color: colors.secondary}}></i>例句
          </h3>
          <ul style={{color: colors.text}}>
            {examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl p-4 mb-4 shadow-sm" style={{backgroundColor: colors.sectionBackground}}>
          <h3 className="text-xl font-semibold flex items-center mb-3" style={{color: colors.primary}}>
            <i className="fas fa-lightbulb mr-3" style={{color: colors.secondary}}></i>记忆方法
          </h3>
          <p style={{color: colors.text}}>{memoryTip}</p>
        </div>
      </div>
    </div>
  )
}

export default WordCard