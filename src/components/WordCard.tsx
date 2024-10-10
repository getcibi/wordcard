import React from 'react'

const WordCard = ({ wordInfo }) => {
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

  const getColorVariables = (color) => {
    // This is a simplified version. In a real application, you'd use a color library to generate these variations.
    return {
      primary: color,
      secondary: color, // You might want to adjust this to be a lighter shade
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