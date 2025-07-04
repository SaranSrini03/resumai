export default function ResumePreview({
    name,
    title,
    contact,
    summary,
    experience,
    skills,
    education,
}: {
    name: string;
    title: string;
    contact: string;
    summary: string;
    experience: {
        role: string;
        company: string;
        location: string;
        start: string;
        end: string;
        bullets: string[];
    }[];
    skills: string[];
    education: {
        school: string;
        degree: string;
        date: string;
    };
}) {
    return (
        <div className= "w-full max-w-3xl p-8 bg-white text-black font-serif space-y-6" id = "resume" >
            {/* Header */ }
            < div className = "text-center space-y-1" >
                <h1 className="text-3xl font-bold" > { name } </h1>
                    < p className = "text-gray-700" > { title } </p>
                        < p className = "text-sm italic text-gray-600" > { contact } </p>
                            </div>

    {/* Summary */ }
    <p>{ summary } </p>

    {/* Work Experience */ }
    <div>
        <h2 className="text-lg font-bold mb-2" > Work Experience </h2>
    {
        experience.map((exp, idx) => (
            <div key= { idx } className = "mb-4" >
            <div className="flex justify-between text-sm font-medium" >
            <div>
            { exp.role } < span className = "italic" >| { exp.company } </span>{" "}
            < span className = "text-gray-500 italic" >| { exp.location } </span>
            </div>
            < div className = "text-gray-500" > { exp.start } - { exp.end } </div>
            </div>
            < ul className = "list-disc list-inside text-sm mt-1 space-y-1" >
            {
                exp.bullets.map((point, i) => (
                    <li key= { i } > { point } </li>
                ))
    }
    </ul>
        </div>
        ))
}
</div>

{/* Core Skills */ }
<div>
    <h2 className="text-lg font-bold mb-2" > Core Skills </h2>
        < p className = "text-sm" > { skills.join(", ") } </p>
            </div>

{/* Education */ }
<div>
    <h2 className="text-lg font-bold mb-2" > Education </h2>
        < div className = "flex justify-between text-sm font-medium" >
            <span>{ education.school } </span>
            < span className = "text-gray-500" > { education.date } </span>
                </div>
                < p className = "italic text-sm" > { education.degree } </p>
                    </div>
                    </div>
  );
}
