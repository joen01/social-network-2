import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppSamurai from './App';

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <AppSamurai/>
    );
}else {
    console.error("Element with id 'root' not found.")
}
reportWebVitals();
