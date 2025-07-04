'use client';

import { useState, useRef } from 'react';

export default function ManualPage() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('Aria Stark');
  const [title, setTitle] = useState('Technical Writer');
  const [email, setEmail] = useState('ariastark@email.com');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/aria-stark');
  const [location, setLocation] = useState('San Francisco, CA, 94016, USA');
  const [phone, setPhone] = useState('(555) 555-1234');
  const [summary, setSummary] = useState(
    'Experienced Technical Writer with a strong background in creating internal guides, managing web content and implementing data-driven decisions for optimized web experiences.'
  );
  const [experience, setExperience] = useState([
    {
      role: 'Technical Writer',
      company: 'Joby Aviation',
      location: 'Atlanta',
      start: 'Feb 2021',
      end: 'Present',
      bullets: [
        'Focused on implementation of internal guides, whitepapers, and external-facing materials.',
        'Composed and maintained developer content.',
        'Worked with stakeholders to keep the site fresh.',
      ],
    },
  ]);
  const [skills, setSkills] = useState([
    'Editing and Proofreading',
    'Documentation Design',
    'CMS',
    'User Manual Development',
    'UX Writing',
  ]);
  const [education, setEducation] = useState({
    school: 'University of Florida',
    degree: 'Bachelor of Arts in Journalism and Media',
    date: 'Dec 2018',
  });

  const handleDownload = async () => {
    if (resumeRef.current) {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 p-10 bg-white text-black">
      {/* Form Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Enter Resume Info</h2>

        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <input placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="input" />
        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input" />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
        <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="input" rows={3} />

        <h3 className="font-semibold">Skills (comma separated)</h3>
        <input
          placeholder="e.g. React, TypeScript, UX Writing"
          value={skills.join(', ')}
          onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))}
          className="input"
        />

        <h3 className="font-semibold">Education</h3>
        <input placeholder="School" value={education.school} onChange={(e) => setEducation({ ...education, school: e.target.value })} className="input" />
        <input placeholder="Degree" value={education.degree} onChange={(e) => setEducation({ ...education, degree: e.target.value })} className="input" />
        <input placeholder="Graduation Date" value={education.date} onChange={(e) => setEducation({ ...education, date: e.target.value })} className="input" />

        <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download as PDF
        </button>
      </div>

      {/* Resume Preview Section */}
      <div
        ref={resumeRef}
        className="p-8 rounded shadow-md space-y-6 max-w-2xl mx-auto"
        style={{ backgroundColor: '#ffffff', color: '#000000' }} // avoid oklch!
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p style={{ color: '#4b5563' }}>{title}</p>
          <p className="text-sm italic" style={{ color: '#6b7280' }}>
            {email} | {linkedin} | {location} | {phone}
          </p>
        </div>

        <p>{summary}</p>

        <div>
          <h2 className="text-lg font-bold mb-2">Work Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm font-medium">
                <div>
                  {exp.role} <span className="italic">| {exp.company}</span>{' '}
                  <span className="italic" style={{ color: '#6b7280' }}>| {exp.location}</span>
                </div>
                <div style={{ color: '#6b7280' }}>{exp.start} - {exp.end}</div>
              </div>
              <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                {exp.bullets.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Core Skills</h2>
          <p className="text-sm">{skills.join(', ')}</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Education</h2>
          <div className="flex justify-between text-sm font-medium">
            <span>{education.school}</span>
            <span style={{ color: '#6b7280' }}>{education.date}</span>
          </div>
          <p className="italic text-sm">{education.degree}</p>
        </div>
      </div>
    </div>
  );
}
