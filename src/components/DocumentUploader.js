import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown'

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSummarize = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSummary(response.data);
    } catch (error) {
      console.error('Error summarizing document:', error);
    }
  };

  return (
    <div>
      <h1>Referral Document Summarizer</h1>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && (
        <div>
          <h2>Summary</h2>
          <Markdown>{summary}</Markdown>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
