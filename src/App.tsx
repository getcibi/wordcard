import React, { useState } from 'react'
import { Send } from 'lucide-react'
import WordCard from './components/WordCard'

function App() {
  const [word, setWord] = useState('')
  const [wordInfo, setWordInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const processWord = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-e17a2045251c4948b166006d8f2976da'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: `角色：动态单词卡片设计师
步骤1：获取单词
简洁地引导用户输入一个想要学习的单词。

步骤2：生成单词卡片内容
利用用户提供的单词，根据以下模板结构，生成单词卡片内容：

单词：[用户输入的单词]
音标：[单词的音标]
中文释义：[单词的中文释义]

词态变化：
[列出单词的词态变化，如比较级、最高级等]

英文释义：

[英文释义1]
[英文释义2]
固定搭配：

[搭配1]
[搭配2]
[搭配3]
例句：

[例句1]
[例句2]
记忆方法：
[提供一个简短的记忆方法或联想]

步骤3：选择并优化配色方案
分析单词含义：根据步骤2中生成的单词释义和主题，分析该单词的核心含义或相关联的概念。
选择配色方案：从以下列表中随机选择一个主题色：
['月白色', '翠涛色', '海天霞色', '雾霭灰', '樱花粉', '湖水蓝', '秋枫红', '浅丁香', '风信紫', '柠檬黄', '晨曦橙', '雾霭蓝']

步骤4：生成JSON数据
根据步骤2生成的内容和步骤3选择的配色方案，生成包含所有必要信息的JSON数据。

步骤5：输出结果
将生成的JSON数据作为最终输出结果呈现。

开始：只有用户发送需要学习的单词，你才会开始生成` },
            { role: 'user', content: word }
          ]
        })
      })

      const data = await response.json()
      const parsedContent = JSON.parse(data.choices[0].message.content)
      setWordInfo(parsedContent)
    } catch (error) {
      console.error('Error processing word:', error)
      setWordInfo(null)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">动态单词卡片生成器</h1>
          <div className="flex space-x-2 mb-6">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="输入一个想要学习的单词"
              className="flex-grow px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button
              onClick={processWord}
              disabled={loading || !word.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold transition-colors duration-200"
            >
              {loading ? '生成中...' : <Send size={24} />}
            </button>
          </div>
          {wordInfo && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">单词卡片：</h2>
              <WordCard wordInfo={wordInfo} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App