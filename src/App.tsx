import React, { useState, useRef, useEffect } from 'react'
import { Send, Download } from 'lucide-react'
import html2canvas from 'html2canvas'

function App() {
  const [word, setWord] = useState('')
  const [wordInfo, setWordInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardContentRef = useRef<HTMLDivElement>(null)

  const processWord = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
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
定义颜色变量：
主题色 (themeColor)：选中的颜色
背景色 (bgColor)：主题色的浅色调或白色
文本色 (textColor)：深色，确保与背景色有高对比度
强调色 (accentColor)：主题色的深色调或互补色
设计背景效果：
选择一种背景效果：水彩、渐变或简笔画图案（类似Notion）
确保背景效果不影响文本可读性
字体选择：
选择有设计感的字体，确保其清晰易读
为标题和正文选择不同的字体，增加层次感
颜色应用：
使用主题色作为卡片的主要色调
将背景色应用于卡片背景
使用文本色为主要文本内容
使用强调色突出重要信息或作为装饰元素
对比度检查和调整：
确保文本色与背景色的对比度至少为4.5:1（WCAG AA标准）
如果对比度不足，调整颜色直到达到标准
避免使用振动色（如红色文字配蓝色背景）
视觉层次：
使用颜色和字体大小创建清晰的视觉层次
确保重要信息（如单词本身）最为突出
一致性和平衡：
保持整个卡片的颜色方案一致
确保背景效果与整体设计和谐统一
最终检查：
进行视觉检查，确保整体设计美观且协调
验证所有元素的可读性，特别是在不同尺寸的设备上

步骤4：生成HTML代码
根据步骤2生成的内容和步骤3选择的配色方案，使用以下HTML模板生成单词卡片的HTML代码：

复制
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>单词卡片 - [单词]</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
        body { 
            font-family: 'Roboto', sans-serif;
            background-color: [bgColor]; 
            background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23[secondaryColor]' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .card { 
            background: linear-gradient(to bottom right, [gradientStart], [gradientEnd]); 
        }
        .section { background-color: [sectionBgColor]; }
        .text-primary { color: [primaryColor]; }
        .text-secondary { color: [secondaryColor]; }
        .text-content { color: [textColor]; }
    </style>
head>
<body class="flex justify-center items-center min-h-screen">
    <div class="card w-full max-w-md rounded-3xl shadow-lg overflow-hidden">
        <div class="p-6">
            <div class="mb-5">
                <h2 class="text-3xl font-bold text-primary mb-1">[单词]</h2>
                <p class="text-xl text-secondary">[中文释义]</p>
                <p class="text-lg text-content">[音标]</p>
            </div>

            <div class="section rounded-xl p-4 mb-4 shadow-sm">
                <h3 class="text-xl font-semibold text-primary flex items-center mb-3">
                    <i class="fas fa-sync-alt mr-3 text-secondary"></i>词态变化
                </h3>
                <p class="text-content">[词态变化内容]</p>
            </div>

            <div class="section rounded-xl p-4 mb-4 shadow-sm">
                <h3 class="text-xl font-semibold text-primary flex items-center mb-3">
                    <i class="fas fa-book mr-3 text-secondary"></i>英文释义
                </h3>
                <p class="text-content">[英文释义内容]</p>
            </div>

            <div class="section rounded-xl p-4 mb-4 shadow-sm">
                <h3 class="text-xl font-semibold text-primary flex items-center mb-3">
                    <i class="fas fa-link mr-3 text-secondary"></i>固定搭配
                </h3>
                <p class="text-content">[固定搭配内容]</p>
            </div>

            <div class="section rounded-xl p-4 mb-4 shadow-sm">
                <h3 class="text-xl font-semibold text-primary flex items-center mb-3">
                    <i class="fas fa-quote-left mr-3 text-secondary"></i>例句
                </h3>
                <p class="text-content">[例句内容]</p>
            </div>

            <div class="section rounded-xl p-4 mb-4 shadow-sm">
                <h3 class="text-xl font-semibold text-primary flex items-center mb-3">
                    <i class="fas fa-lightbulb mr-3 text-secondary"></i>记忆方法
                </h3>
                <p class="text-content">[记忆方法内容]</p>
            </div>
        </div>
    </div>
</body>
</html>
步骤5：最终输出结果（仅输出html代码）
将生成的HTML代码作为最终输出结果呈现给用户。

请注意：在实际生成HTML时，请确保将所有的 [方括号] 中的内容替换为相应的实际内容或颜色值。这个优化后的提示词应该能够生成一个动态变化的、视觉吸引力强的单词卡片，其中背景色、卡片颜色和方框颜色都会根据选择的主题而变化。

限制：1.只有用户发送需要学习的单词，你才会开始生成
2.最后仅输出html代码，其他内容都不输出
` },
            { role: 'user', content: word }
          ]
        })
      })

      const data = await response.json()
      const content = data.choices[0].message.content
      
      console.log('API response:', content)

      setWordInfo(content)
    } catch (error) {
      console.error('Error processing word:', error)
      setWordInfo(null)
    }
    setLoading(false)
  }

  const downloadWordCard = async () => {
    console.log('Download button clicked')
    if (!cardContentRef.current) {
      console.error('Card content element not found')
      return
    }

    try {
      const canvas = await html2canvas(cardContentRef.current, {
        scale: 2,
        logging: true,
        useCORS: true,
        backgroundColor: null,
        windowWidth: cardContentRef.current.scrollWidth,
        windowHeight: cardContentRef.current.scrollHeight,
      })
      
      console.log('Canvas generated')

      const dataUrl = canvas.toDataURL('image/png')
      console.log('Data URL generated:', dataUrl.substring(0, 50) + '...')

      const link = document.createElement('a')
      link.download = `${word}_card.png`
      link.href = dataUrl
      link.click()
      console.log('Download link clicked')
    } catch (error) {
      console.error('Error during download:', error)
    }
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-800">单词卡片：</h2>
                <button
                  onClick={downloadWordCard}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 flex items-center"
                >
                  <Download size={18} className="mr-2" />
                  下载卡片 (PNG)
                </button>
              </div>
              <div ref={cardContentRef} dangerouslySetInnerHTML={{ __html: wordInfo }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App