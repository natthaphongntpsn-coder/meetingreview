
import React, { forwardRef } from 'react';
import { ReportData } from '../types';

interface ReportPreviewProps {
  data: ReportData;
}

const DottedLine: React.FC<{ text?: string }> = ({ text }) => (
    <div className="relative border-b border-dotted border-black mt-2 mb-4 h-6">
      {text && <span className="absolute left-2 -top-1 bg-white px-1 text-sm">{text}</span>}
    </div>
);

const LabeledSection: React.FC<{ number: string; title: string; content: string }> = ({ number, title, content }) => (
  <div className="mb-4">
    <p className="font-semibold">{`${number}. ${title}`}</p>
    <div className="pl-4 pt-1 pb-2 border-b border-dotted border-black min-h-[2rem]">
      <p className="text-gray-800 whitespace-pre-wrap">{content || '...'}</p>
    </div>
  </div>
);

const ReportPreview = forwardRef<HTMLDivElement, ReportPreviewProps>(({ data }, ref) => {
    return (
        <div ref={ref} className="bg-white p-8 shadow-lg aspect-[1/1.414] w-full min-w-[210mm] text-black">
            <div className="border-2 border-black p-6 h-full">
                <header className="text-center mb-6">
                    <h2 className="text-xl font-bold">รายงานการประชุม/อบรม/สัมมนา/ศึกษาดูงาน</h2>
                    <h3 className="text-lg font-semibold mt-1">โรงเรียนไขศรีปราโมชอนุสรณ์ สำนักงานเขตบางกะปิ กรุงเทพมหานคร</h3>
                    <h3 className="text-lg font-semibold">ปีการศึกษา ๒๕๖๗</h3>
                </header>

                <main className="text-sm">
                    <section className="mb-4">
                      <p className="font-semibold">๑. การเข้าร่วมประชุม/อบรม/สัมมนา/ศึกษาดูงาน</p>
                      <div className="pl-4">
                        <p>ข้าพเจ้าได้รับมอบหมาย/ได้รับคำสั่งให้เข้าร่วมประชุม/อบรม/สัมมนา/ศึกษาดูงาน</p>
                        <p>ในวันที่.................. {data.date ? new Date(data.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'}) : ''} ............................</p>
                        <p>เรื่อง............... {data.subject || '....................................................................'} ..............................................</p>
                        <p>ณ................... {data.location || '....................................................................'} ...............................................</p>
                        <p>ชื่อประธาน/วิทยากร(ประชุม/อบรม/สัมมนา/ศึกษาดูงาน)...... {data.speaker || '...................'} ........</p>
                      </div>
                    </section>
                    
                    <LabeledSection number="๒" title="กำหนดกิจกรรม หัวข้อ ประเด็นสำคัญ ประชุม/อบรม/สัมมนา/ศึกษาดูงาน" content={data.activities} />
                    <LabeledSection number="๓" title="สื่อ สิ่งพิมพ์ เอกสาร ที่ได้รับจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน" content={data.materials} />
                    <LabeledSection number="๔" title="สรุปผลที่ได้รับจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน" content={data.summary} />
                    <LabeledSection number="๕" title="การนำผลที่ได้รับจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน ไปใช้พัฒนางานในหน้าที่" content={data.application} />
                    <LabeledSection number="๖" title="ข้อเสนอแนะ ความเห็นจากการประชุม/อบรม/สัมมนา/ศึกษาดูงาน" content={data.suggestions} />

                </main>
                
                <footer className="mt-12 text-sm">
                    <div className="flex justify-around">
                        <div className="text-center">
                            <p>ลงชื่อ.................................................ผู้รายงาน</p>
                            <p>( {data.reporterName || '.................................................'} )</p>
                        </div>
                        <div className="text-center">
                            <p>ลงชื่อ.................................................</p>
                            <p>( {data.administratorName || '.................................................'} )</p>
                            <p>ผู้บริหารสถานศึกษา</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
});

export default ReportPreview;
