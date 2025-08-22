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
        gender: 'female'
    },
    {
        name: 'Steve K',
        age: 26,
        role: 'Industrial Designer',
        quote: 'I use a multi-button mouse to replace keyboard shortcuts, but manually opening the mouse software to switch settings for different design tools breaks my flow.',
        tools: 'SolidWorks, Rhino, KeyShot, Photoshop',
        painPoints: 'Manual macro switching, interrupted workflow',
        habits: 'Heavy use of side buttons, high customization',
        environment: 'Dual monitors and drawing tablet on a large desk',
        gender: 'male'

    },
    {
        name: 'Justin T',
        age: 29,
        role: 'Digital Marketer / Video Editor',
        quote: 'I type slowly, so I rely on AI and copy-paste. My mouse helps me avoid switching to the keyboard.',
        tools: 'ChatGPT, Midjourney, After Effects, Keynote, Wix',
        painPoints: 'Slow typing',
        habits: 'Maps essential tasks to mouse buttons',
        environment: 'Dual monitors with frequent multitasking',
        gender: 'male'
    },
    {
        name: 'George C',
        age: 30,
        role: 'Software Developer',
        quote: 'With AI helping me code, I now use the mouse more for taking screenshots and copying error messages to debug. Also, I constantly move my cursor between two monitors, so a high-DPI, multi-button mouse really improves my speed and overall workflow.',
        tools: 'GitHub Copilot, ChatGPT, VS Code',
        painPoints: 'Slow cursor movement, multitasking strain',
        habits: 'Uses high-DPI and fast navigation settings',
        environment: 'Home office with dual monitors on a compact desk',
        gender: 'male'
    },
    {
        "name": "David M",
        "age": 33,
        "role": "Interior Designer",
        "quote": "For the sake of portability, I often bring my small laptop to client meetings or construction sites. But with my big old hands, using that tiny keyboard and touch pad is really inconvenient.",
        "tools": "AutoCAD, SketchUp, Photoshop, Revit, Rhino, Keynote",
        "painPoints": "Tiny laptop keyboard and touch pad uncomfortable for big hands",
        "habits": "Prefers an external mouse for design work and quick operations",
        "environment": "Often travels between client offices and job sites",
        gender: 'male'
    },
    {
        name: 'Sophia W',
        age: 37,
        role: 'Data Analyst',
        quote: 'I spend hours in Excel and Tableau every day. Dragging fields, adjusting filters, and building dashboards all require a mouse — but after long hours, my hand often feels sweaty and sticky.',
        tools: 'Excel, Tableau, Power BI, Python, SQL',
        painPoints: 'Frequent mouse-keyboard switching, repetitive drag-and-drop actions, wrist fatigue after long sessions',
        habits: 'Customizes shortcuts but still relies heavily on mouse for visual manipulation',
        environment: 'Dual-monitor workstation with one screen dedicated to dashboards and another for code/queries',
        gender: 'female'
    }
];


export default function Research() {
    return (
        <div
            className="container-fluid pt-5 research"
            style={{
                backgroundImage: 'url("./rgbw.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",   // 拉長填滿容器
                backgroundPosition: "center",
                minHeight: "100vh"         // 保證高度至少滿一整個螢幕
            }}
        >
            <div className="container py-4 font-sans px-2">
                <h2 className=" mb-4 text-dark text-center mt-4  fs-1">Project Overview</h2>
                <p className=' text-dark text-center'>
                    I helped my client expand beyond the gaming market with a next-gen mouse designed for both gamers and creative professionals. Having accumulated extensive experience in gaming mice*, my client was ready to cross over into the productivity space. I assisted by integrating high performance, AI-powered features, and intuitive usability—bridging gaming and professional workflows without compromise.
                </p>


                <div className="text-dark">
                    <h2 className="mb-4 text-dark text-center mt-5 mb-0 fs-1">Competitor Analysis</h2>
                    <p className='text-center'>To evaluate the feasibility of crossing over from gaming mice to productivity mice, we analyzed leading work-oriented models and explored how to integrate more productivity tools while retaining the sleek gaming aesthetics, enabling the mouse to meet the needs of both gaming and work.</p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "3rem",
                            marginTop: "2rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* MX Master 3S */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                maxWidth: "350px",
                                flex: "1 1 300px",

                            }}
                        >
                            <img
                                src="./logi.webp"
                                alt="MX Master 3S"
                                style={{
                                    width: "230px",
                                    height: "auto",
                                    marginBottom: "3.2rem",
                                    marginTop: "1rem",
                                }}
                            />
                            <div style={{
                                borderLeft: "3px solid rgb(190,190,190)",
                                paddingLeft: "1rem",
                            }}>
                                <h3>Logitech MX Master 3S</h3>
                                <strong>Strengths:</strong>
                                <ul>
                                    <li>Palm grip design provides excellent hand support.</li>
                                    <li>Detects active software and automatically switches to the corresponding profile.</li>
                                    <li>Suitable for both gaming and work.</li>
                                </ul>
                                <strong>Weaknesses:</strong>
                                <ul>
                                    <li>Large and heavy, not ideal for portability.</li>
                                    <li>Auto profile switching cannot handle multi-monitor workflows with multiple apps open simultaneously.</li>
                                </ul>
                            </div>
                        </div>

                        {/* MX ERGO S */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                maxWidth: "350px",
                                flex: "1 1 300px",

                            }}
                        >
                            <img
                                src="./ergo.webp"
                                alt="Logitech MX ERGO S"
                                style={{ width: "270px", height: "auto", marginBottom: "-0.9rem", marginTop: "-1.5rem", }}
                            />
                            <div style={{
                                borderLeft: "3px solid rgb(190,190,190)",
                                paddingLeft: "1rem",
                            }}>
                                <h3>Logitech MX ERGO S</h3>
                                <strong>Strengths:</strong>
                                <ul>
                                    <li>Trackball design reduces wrist strain.</li>
                                    <li>Adjustable hinge for custom tilt angle.</li>
                                    <li>Saves space, no need to move the mouse.</li>
                                    <li>Easy-Switch supports multiple devices.</li>
                                </ul>
                                <strong>Weaknesses:</strong>
                                <ul>
                                    <li>Large and heavy, not ideal for portability.</li>
                                    <li>Not suitable for fast-paced gaming.</li>
                                    <li>Trackball requires regular cleaning.</li>
                                    <li>Bulkier and less portable than standard mice.</li>
                                    <li>Adjustable tilt hinge may feel unstable to some users.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Razer Pro Click V2 Vertical */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                maxWidth: "350px",
                                flex: "1 1 300px",
                                marginTop: "1.2rem",
                            }}
                        >
                            <img
                                src="./razer.webp"
                                alt="Razer Pro Click V2 Vertical"
                                style={{ width: "180px", height: "auto", marginBottom: "1rem", marginTop: "-1.4rem" }}
                            />
                            <div style={{
                                borderLeft: "3px solid rgb(190,190,190)",
                                paddingLeft: "1rem",
                            }}>
                                <h3>Razer Pro Click V2 Vertical</h3>
                                <strong>Strengths:</strong>
                                <ul>
                                    <li>Vertical design reduces wrist strain.</li>
                                    <li>Can be customized to quickly call third-party AI tools (e.g., ChatGPT / Copilot).</li>
                                    <li>Detects active software and automatically switches to the corresponding profile.</li>
                                    <li>Suitable for both gaming and work.</li>
                                </ul>
                                <strong>Weaknesses:</strong>
                                <ul>
                                    <li>Vertical form factor makes it less portable.</li>
                                    <li>Auto profile switching cannot handle multi-monitor workflows with multiple apps open simultaneously.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>



                <h2 className="mt-5 mb-4 text-center text-dark fs-1">User Interviews</h2>


                <div className="row">
                    {personas.map((p, i) => (
                        <div key={i} className="col-md-6 mb-4 d-flex">
                            <div className="card w-100 p-3 border shadow">
                                <div className="card-body">
                                    <img
                                        src={p.gender === "male" ? "./1.jpg" : "./2.jpg"}
                                        alt={p.name}
                                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                    />
                                    <h5 className="card-title fs-5 mt-2">{p.name}</h5>
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
                <p className="text-secondary mb-4">
                    <em>*These interviews were work-oriented, given my client’s prior expertise in gaming mouse design.</em>
                </p>
                <br />




                <div className="text-dark mt-5 mb-3">
                    <h2 className="mt-5 mb-4 text-center text-dark fs-1">Design Goals</h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "2rem",
                            flexWrap: "wrap",           // 🔑 小螢幕換行
                            justifyContent: "center",
                        }}
                    >
                        {/* Card 1 */}
                        {/* Card 1 */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: "1 1 300px",
                                maxWidth: "350px",
                                padding: "1.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h4>Palm Ventilation</h4>
                            <p>
                                Use sweat-resistant materials and ventilation to keep hands dry and comfortable during long use.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: "1 1 300px",
                                maxWidth: "350px",
                                padding: "1.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h4>Cross-Software Auto-Switching</h4>
                            <p>
                                Automatically detect active software and switch profiles to maintain a smooth workflow.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: "1 1 300px",
                                maxWidth: "350px",
                                padding: "1.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h4>High Keyboard Replacement</h4>
                            <p>
                                Add multiple programmable buttons to handle complex tasks and reduce reliance on the keyboard.
                            </p>
                        </div>



                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: "1 1 300px",
                                maxWidth: "350px",
                                padding: "1.5rem",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h4>Portability</h4>
                            <p>
                                Design the mouse to be lightweight, compact, and easy to store,
                                ensuring it is convenient to carry and fits well in different workspaces.
                            </p>
                        </div>
                    </div>
                </div>

                <img src="./sketch.jpg" alt="" className="d-block mx-auto w-100 mt-5" />
            </div>
        </div>
    );

}
