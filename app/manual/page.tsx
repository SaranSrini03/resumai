'use client';

import { useState, useRef } from 'react';
import { Download, User, Briefcase, GraduationCap, Lightbulb, Plus, Trash2, Eye, FileText, Edit3 } from 'lucide-react';

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

  const addExperience = () => {
    setExperience([...experience, {
      role: '',
      company: '',
      location: '',
      start: '',
      end: '',
      bullets: [''],
    }]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const addBullet = (expIndex: number) => {
    const updated = [...experience];
    updated[expIndex].bullets.push('');
    setExperience(updated);
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const updated = [...experience];
    updated[expIndex].bullets[bulletIndex] = value;
    setExperience(updated);
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...experience];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setExperience(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-900 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-2 px-6 rounded-full mb-4 shadow-lg">
              <Edit3 className="w-4 h-4 mr-2" />
              Manual Resume Builder
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-4">
              Build Your Resume Step by Step
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete control over every detail of your resume with our intuitive form builder
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto relative z-10">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-2xl mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Information</h2>
                <p className="text-gray-600 dark:text-gray-300">Fill in your details below</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="mt-4 space-y-4">
                  <input
                    placeholder="LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Professional Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    rows={4}
                  />
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <h3 className="font-semibold text-purple-900 dark:text-purple-200">Work Experience</h3>
                  </div>
                  <button
                    onClick={addExperience}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {experience.map((exp, expIndex) => (
                  <div key={expIndex} className="mb-6 p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Position {expIndex + 1}</h4>
                      {experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(expIndex)}
                          className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <input
                        placeholder="Job Title"
                        value={exp.role}
                        onChange={(e) => updateExperience(expIndex, 'role', e.target.value)}
                        className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                      />
                      <input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                        className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                      />
                      <input
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                        className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                      />
                      <div className="flex gap-2">
                        <input
                          placeholder="Start Date"
                          value={exp.start}
                          onChange={(e) => updateExperience(expIndex, 'start', e.target.value)}
                          className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                        />
                        <input
                          placeholder="End Date"
                          value={exp.end}
                          onChange={(e) => updateExperience(expIndex, 'end', e.target.value)}
                          className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Achievements</label>
                        <button
                          onClick={() => addBullet(expIndex)}
                          className="text-purple-600 hover:text-purple-700 p-1 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <div key={bulletIndex} className="flex gap-2">
                          <textarea
                            placeholder="Describe your achievement or responsibility..."
                            value={bullet}
                            onChange={(e) => updateBullet(expIndex, bulletIndex, e.target.value)}
                            className="flex-1 p-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm resize-none"
                            rows={2}
                          />
                          {exp.bullets.length > 1 && (
                            <button
                              onClick={() => removeBullet(expIndex, bulletIndex)}
                              className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="font-semibold text-green-900 dark:text-green-200">Skills</h3>
                </div>
                <input
                  placeholder="e.g. React, TypeScript, Project Management, Adobe Creative Suite"
                  value={skills.join(', ')}
                  onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">Separate skills with commas</p>
              </div>

              {/* Education */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                  <h3 className="font-semibold text-orange-900 dark:text-orange-200">Education</h3>
                </div>
                <div className="space-y-4">
                  <input
                    placeholder="School/University"
                    value={education.school}
                    onChange={(e) => setEducation({ ...education, school: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    placeholder="Degree"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    placeholder="Graduation Date"
                    value={education.date}
                    onChange={(e) => setEducation({ ...education, date: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume as PDF
              </button>
            </div>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="sticky top-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 h-fit">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl mr-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Preview</h2>
                  <p className="text-gray-600 dark:text-gray-300">See your resume in real-time</p>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div
                ref={resumeRef}
                className="bg-white p-8 rounded-xl shadow-sm space-y-6 border border-gray-200"
                style={{ backgroundColor: '#ffffff', color: '#000000' }}
              >
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                  <p className="text-lg text-gray-600">{title}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{email} | {phone}</p>
                    <p>{linkedin}</p>
                    <p>{location}</p>
                  </div>
                </div>

                {summary && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">Professional Summary</h2>
                    <p className="text-gray-700 leading-relaxed">{summary}</p>
                  </div>
                )}

                {experience.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">Work Experience</h2>
                    {experience.map((exp, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                            <p className="text-gray-600">{exp.company} | {exp.location}</p>
                          </div>
                          <p className="text-sm text-gray-500">{exp.start} - {exp.end}</p>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                          {exp.bullets.map((bullet, i) => (
                            bullet && <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {skills.length > 0 && skills[0] && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">Core Skills</h2>
                    <p className="text-gray-700">{skills.filter(skill => skill).join(', ')}</p>
                  </div>
                )}

                {education.school && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">Education</h2>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{education.school}</h3>
                        <p className="text-gray-600">{education.degree}</p>
                      </div>
                      <p className="text-sm text-gray-500">{education.date}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}