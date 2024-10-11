import React from 'react';

interface OutputProps {
  output: string;
}

const Output: React.FC<OutputProps> = ({ output }) => {
  return (
    <div className="bg-black text-white p-4 h-full overflow-auto rounded">
      <h2 className="text-xl font-semibold mb-2">Output</h2>
      <pre className="font-mono text-sm">{output || 'Run your code to see the output here.'}</pre>
    </div>
  );
};

export default Output;