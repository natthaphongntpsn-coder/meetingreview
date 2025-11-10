
import React from 'react';
import { ReportData } from '../types';

interface ReportFormProps {
  data: ReportData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<{label: string, name: keyof ReportData, value: string, onChange: any, type?: string, isTextArea?: boolean, placeholder?: string}> = ({ label, name, value, onChange, type = 'text', isTextArea = false, placeholder }) => {
    const commonProps = {
        id: name,
        name: name,
        value: value,
        onChange: onChange,
        placeholder: placeholder || `กรอก${label}...`,
        className: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            {isTextArea ? (
                <textarea {...commonProps} rows={3}></textarea>
            ) : (
                <input {...commonProps} type={type} />
            )}
        </div>
    );
};


const ReportForm: React.FC<ReportFormProps> = ({ data, onChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <InputField label="ชื่อผู้รายงาน" name="reporterName" value={data.reporterName} onChange={onChange} />
        <InputField label="ชื่อผู้บริหารสถานศึกษา" name="administratorName" value={data.administratorName} onChange={onChange} />
        <InputField label="วันที่เข้าร่วม" name="date" value={data.date} onChange={onChange} type="date" placeholder=""/>
        <InputField label="เรื่อง/หัวข้อ" name="subject" value={data.subject} onChange={onChange} />
        <InputField label="สถานที่" name="location" value={data.location} onChange={onChange} />
        <InputField label="ชื่อประธาน/วิทยากร" name="speaker" value={data.speaker} onChange={onChange} />
      </div>

      <InputField label="กิจกรรม/หัวข้อ/ประเด็นสำคัญ" name="activities" value={data.activities} onChange={onChange} isTextArea={true} />
      <InputField label="สื่อ/เอกสารที่ได้รับ" name="materials" value={data.materials} onChange={onChange} isTextArea={true} />
      <InputField label="สรุปผลที่ได้รับ" name="summary" value={data.summary} onChange={onChange} isTextArea={true} />
      <InputField label="การนำผลไปใช้พัฒนางาน" name="application" value={data.application} onChange={onChange} isTextArea={true} />
      <InputField label="ข้อเสนอแนะ/ความคิดเห็น" name="suggestions" value={data.suggestions} onChange={onChange} isTextArea={true} />
    </form>
  );
};

export default ReportForm;
