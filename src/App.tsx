import React, { useState } from 'react';
import Editor from './components/Editor';
import Output from './components/Output';
import { Play, Save, Folder } from 'lucide-react';

const initialCode = `program HelloWorld;
begin
  writeln('Hello, World!');
end.`;

function App() {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    // Here we would integrate with a Pascal interpreter
    // For now, we'll just set a placeholder output
    setOutput('Program output:\nHello, World!');
  };

  const handleSaveCode = () => {
    // Implement save functionality
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pascal_code.pas';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadCode = () => {
    // Implement load functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pas';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCode(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Pascal Online IDE</h1>
      </header>
      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4 h-[400px] md:h-auto">
          <Editor code={code} setCode={setCode} />
        </div>
        <div className="w-full md:w-1/3 p-4">
          <Output output={output} />
        </div>
      </main>
      <footer className="bg-gray-200 p-4 flex flex-wrap justify-center md:justify-between gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center transition-colors"
          onClick={handleRunCode}
        >
          <Play size={20} className="mr-2" />
          Run
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center transition-colors"
          onClick={handleSaveCode}
        >
          <Save size={20} className="mr-2" />
          Save
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center transition-colors"
          onClick={handleLoadCode}
        >
          <Folder size={20} className="mr-2" />
          Load
        </button>
      </footer>
    </div>
  );
}

export default App;