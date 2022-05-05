import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<App />)
