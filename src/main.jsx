import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ==========================================
// 🔥 Agentation 條件式載入（僅開發環境）
// ==========================================
if (import.meta.env.DEV) {
  import('agentation').then((module) => {
    console.log('✨ Agentation 已啟用（開發模式）')
    console.log('👉 點擊右下角圖標開始標註')
    console.log('Agentation module:', module)
    
    // 如果有 init 方法，則執行初始化
    if (module.default && typeof module.default === 'function') {
      module.default()
    }
  }).catch((err) => {
    console.error('❌ Agentation 載入失敗:', err)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
