import React from 'react';

const personas = [
    {
      name: 'Alysa L',
      age: 20,
      role: 'Multimedia Design Student',
      quote: 'My palms get sweaty quickly, and using a mouse for long hours feels sticky and tiring. I get self-conscious when others touch my mouse.',
      tools: 'Figma, Framer, Photoshop, After Effects, Premiere Pro',
      painPoints: 'Sweaty hands, discomfort, fatigue, social awkwardness',
      habits: 'Minimizes palm contact for ventilation',
      environment: 'Single-screen laptop setup on a small desk in cafés or classrooms',
    },
    {
      name: 'Steve K',
      age: 26,
      role: 'Industrial Designer',
      quote: 'I use a multi-button mouse to replace keyboard shortcuts, but switching macros between design tools breaks my flow.',
      tools: 'SolidWorks, Rhino, KeyShot, Photoshop',
      painPoints: 'Manual macro switching, interrupted workflow',
      habits: 'Heavy use of side buttons, high customization',
      environment: 'Dual monitors and drawing tablet on a large desk',
    },
    {
      name: 'Justin T',
      age: 30,
      role: 'Digital Marketer / Video Editor',
      quote: 'I type slowly, so I rely on AI and copy-paste. My mouse helps me avoid switching to the keyboard.',
      tools: 'ChatGPT, Midjourney, After Effects, Keynote, Wix',
      painPoints: 'Slow typing',
      habits: 'Maps essential tasks to mouse buttons',
      environment: 'Dual monitors with frequent multitasking',
    },
    {
      name: 'George C',
      age: 29,
      role: 'Software Developer',
      quote: 'With AI helping me code, I now use the mouse more for taking screenshots and copying error messages to debug. Also, I constantly move my cursor between two monitors, so a high-DPI, multi-button mouse really improves my speed and overall workflow.',
      tools: 'GitHub Copilot, ChatGPT, VS Code',
      painPoints: 'Slow cursor movement, multitasking strain',
      habits: 'Uses high-DPI and fast navigation settings',
      environment: 'Home office with dual monitors on a compact desk',
    },
    {
        "name": "David M",
        "age": 37,
        "role": "Interior Designer",
        "quote": "For the sake of portability, I often bring my small laptop to client meetings or construction sites. But with my big old hands, using that tiny keyboard and touch pad is really inconvenient.",
        "tools": "AutoCAD, SketchUp, Photoshop, Revit, Rhino, Keynote",
        "painPoints": "Tiny laptop keyboard and touch pad uncomfortable for big hands",
        "habits": "Prefers an external mouse for design work and quick operations",
        "environment": "Often travels between client offices and job sites"
      },
      {
        name: 'Sophia W',
        age: 31,
        role: 'Data Analyst',
        quote: 'I spend hours in Excel and Tableau every day. Dragging fields, adjusting filters, and building dashboards is fast with a mouse—but switching constantly between keyboard and mouse sometimes slows me down.',
        tools: 'Excel, Tableau, Power BI, Python, SQL',
        painPoints: 'Frequent mouse-keyboard switching, repetitive drag-and-drop actions, wrist fatigue after long sessions',
        habits: 'Customizes shortcuts but still relies heavily on mouse for visual manipulation',
        environment: 'Dual-monitor workstation with one screen dedicated to dashboards and another for code/queries'
      }
  ];
  

export default function Research() {
    return (
    <div className="container-fluid bg-white pt-5 research" >
        <div className="container py-4 font-sans px-2">
            <h2 className=" mb-4 text-dark text-center mt-5  fs-1">Project Overview</h2>
            <p className=' text-dark '>
            I helped my client expand beyond the gaming market with a next-gen mouse designed for both gamers and creative professionals. Having accumulated extensive experience in gaming mice*, my client was ready to cross over into the productivity space. I assisted by integrating high performance, AI-powered features, and intuitive usability—bridging gaming and professional workflows without compromise.
            </p>

            <h2 className="mt-5 mb-4 text-center text-dark fs-1">User Interviews</h2>
            
            <div className="row">
                {personas.map((p, i) => (
                    <div key={i} className="col-md-6 mb-4 d-flex">
                        <div className="card w-100 p-3 border-0 shadow">
                            <div className="card-body ">
                                <h5 className="card-title fs-5">
                                    {p.name}  
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {p.role}, {p.age} years old
                                    </h6>
                                <p className="card-text my-3">
                                    <em>“{p.quote}”</em>
                                </p>
                                <ul className="list-unstyled mt-3">
                                    <li>• <strong>Common Tools:</strong> {p.tools}</li>
                                    <li>• <strong>Pain Points:</strong> {p.painPoints}</li>
                                    <li>• <strong>Mouse Habits:</strong> {p.habits}</li>
                                    <li>• <strong>Environment:</strong> {p.environment}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-secondary text-end">
  <em>Note: These interviews were work-oriented, given my client’s prior expertise in gaming mouse design.</em>
</p>
            <img src="./sketch.png" alt="" className="d-block mx-auto" />
            </div>
        </div>
    );

}
