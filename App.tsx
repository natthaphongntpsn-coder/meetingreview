
import React, { useState, useRef } from 'react';
import ReportForm from './components/ReportForm';
import ReportPreview from './components/ReportPreview';
import { ReportData } from './types';
import { generatePdf } from './services/pdfService';

const initialData: ReportData = {
  reporterName: '',
  administratorName: '',
  date: '',
  subject: '',
  location: '',
  speaker: '',
  activities: '',
  materials: '',
  summary: '',
  application: '',
  suggestions: '',
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<ReportData>(initialData);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportPdf = async () => {
    setIsGenerating(true);
    try {
      await generatePdf(formData);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-kanit">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            สร้างรายงานการประชุม/อบรม
          </h1>
          <button
            onClick={handleExportPdf}
            disabled={isGenerating}
            className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'กำลังสร้าง PDF...' : 'Export เป็น PDF'}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">กรอกข้อมูลรายงาน</h2>
            <ReportForm data={formData} onChange={handleInputChange} />
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">ตัวอย่างรายงาน</h2>
             <div className="max-w-[210mm] mx-auto overflow-x-auto">
                <ReportPreview ref={previewRef} data={formData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
