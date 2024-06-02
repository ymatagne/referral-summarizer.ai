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
      const response = await axios.post('https://server-referral-summarizer-6aaa29cf4520.herokuapp.com/upload', formData, {
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
  <div className="flex flex-col min-h-screen">
  <main className="flex-1 bg-gray-100 py-12 px-6">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Referral AI</h1>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">About Referral AI</h2>
        <p className="text-gray-600 mb-4">
          Referral AI is a powerful tool that helps healthcare providers streamline the referral process. By
          automating the analysis of referral documents, Referral AI saves time and ensures accurate patient
          information is captured.
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-4">Upload Referral PDF</h2>
      <p className="text-gray-600 mb-6">Drag and drop your referral PDF or click to select a file.</p>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 flex justify-center items-center cursor-pointer">
        <input type="file" accept=".pdf"  id="referral-pdf" onChange={handleFileUpload} />

        <button onClick={handleSummarize}>Summarize</button>
      </div>
      {summary && ( <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Referral Summary</h2>
        <div className="grid grid-cols-2 gap-6">                      
          <Markdown>{summary}</Markdown>
        
      
        </div>
      </div> )}
    </div>
  </main>
  <footer className="bg-gray-900 text-white py-4 px-6 text-center">
    <p>&copy; 2023 Referral AI. All rights reserved.</p>
  </footer>
  </div>
  );
};

export default DocumentUploader;