import React from 'react';
import { Button } from './components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeStart from './components/HomeStart';
import LoginPage from './components/LoginPage';
function App() {
  return (
    <main>
      <Router>
      <Routes>
      <Route path="/" element={<HomeStart />} />  {/* Set LoginForm as the default route */}
      <Route path="/login" element={<LoginPage />} />
      </Routes>
      </Router>
    </main>
  );
}

export default App;
