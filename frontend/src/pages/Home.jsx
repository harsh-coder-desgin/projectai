import { Button } from "../Componets/index.js"
import "../styles/home.css"

function Home() {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-badge">
                    ✨ AI Powered Project Discovery
                </div>

                <h1>
                    Never Run Out of
                    <span> Project Ideas</span>
                </h1>

                <p>
                    Generate personalized software projects based on
                    your skills, experience, and career goals.
                    Build portfolio-worthy applications that help
                    you learn and get hired.
                </p>

                <Button className="hero-btn">
                    Generate Project Idea
                </Button>
            </section>

            <section className="ai-section">
                <div className="ai-card">
                    <div className="glow"></div>

                    <h2>Generate Projects with AI</h2>

                    <p>
                        Tell us your skills and experience level.
                        Our AI creates unique project ideas with
                        features, tech stack, and learning roadmap.
                    </p>

                    <div className="skills">
                        <span>React</span>
                        <span>Node.js</span>
                        <span>MongoDB</span>
                        <span>AI</span>
                    </div>

                    <div className="demo-container">
                        <div className="user-prompt">
                            <span>👨‍💻 User</span>
                            <p>
                                Generate a project idea using React,
                                Node.js and MongoDB for portfolio building.
                            </p>
                        </div>

                        <div className="ai-response">
                            <span>✨ AI Response</span>

                            <h3>JobTrack AI</h3>

                            <p>
                                Build an AI-powered job application tracker
                                where users can manage applications, upload
                                resumes, track interview rounds and receive
                                smart recommendations.
                            </p>

                            <div className="project-info">
                                <div>
                                    <strong>Difficulty</strong>
                                    <p>Intermediate</p>
                                </div>

                                <div>
                                    <strong>Duration</strong>
                                    <p>2-3 Weeks</p>
                                </div>

                                <div>
                                    <strong>Tech Stack</strong>
                                    <p>React • Express • MongoDB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button className="generate-btn">
                        Generate Your Project
                    </Button>
                </div>
            </section>
            <section className="how-it-works">
                <h2>How It Works</h2>

                <div className="steps">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Select Skills</h3>
                        <p>
                            Choose technologies you know like
                            React, Node.js, MongoDB, Python,
                            AI, and more.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>AI Analysis</h3>
                        <p>
                            The AI understands your skills,
                            experience level, and career goals.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Get Project Ideas</h3>
                        <p>
                            Receive detailed project ideas with
                            features, tech stack, and roadmap.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;