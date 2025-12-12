import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 1. Global Styles & Font Import
const GlobalStyle = createGlobalStyle`
  /* Import IBM Plex Mono from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #1a1a1a;
    font-family: 'IBM Plex Mono', monospace;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: border-box;
  }
`;

// 2. Layout Components

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
`;

// Header using Grid: 1fr auto 1fr ensures exact center alignment for the logo
const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const HeaderLeft = styled.div`
  justify-self: start;
  min-width: 0; /* allow the column to shrink */
`;

const HeaderCenter = styled.div`
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderRight = styled.div`
  justify-self: end;
  min-width: 0; /* allow the column to shrink */
`;

// 3. Specific Text Elements

const SiteTitle = styled.h1`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* responsive: shrink font on small screens but clamp to a min size */
  font-size: clamp(10px, 2.5vw, 14px);
`;

const ContactLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  color: inherit;
  
  &:hover {
    text-decoration: underline;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(10px, 2.5vw, 14px);
`;

const LogoPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e0e0e0; /* Placeholder grey */
  border-radius: 50%; /* Optional: circular logo area */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #666;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  object-fit: contain;
  /* Keep logo fairly consistent on small screens; override if needed */
  @media (max-width: 420px) {
    width: 90px; /* small reduction for very small phones */
  }
`;

// 4. Center Content (Table of Contents)

const MainContent = styled.main`
  flex: 1;
  display: flex;
  font-size: 14px; // Larger size for emphasis in the middle
  flex-direction: column;
  justify-content: center; // Center vertically
  align-items: center;     // Center horizontally
  /* Take up most of the initial viewport so sections start when you scroll */
  min-height: calc(100vh - 160px);
`;

// Final full-page footer section (centered content like TOC)
const FullPageSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
`;

const FooterLogo = styled(Logo)`
  width: 160px;
  @media (max-width: 420px) {
    width: 100px;
  }
`;

const FooterName = styled.h3`
  margin: 1rem 0 0.5rem 0;
  font-weight: 600;
  text-transform: uppercase;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;

const FooterCopyright = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  color: #888;
  font-size: 12px;
`;


const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const TOCItem = styled.li`
  margin-bottom: 1.5rem;
  
  a {
    text-decoration: none;
    color: inherit;
    
    
    transition: opacity 0.2s ease;
    display: flex; /* number + label layout */
    align-items: baseline;
    gap: 0.25rem;

    /* &:hover {
      opacity: 0.6;
    } */
  }
`;

const BoldUnderline = styled.a`
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

// Fixed-width number portion for aligning numerals in TOC
const TocNumber = styled.span`
  display: inline-block;
  min-width: 4ch; /* enough for roman numerals like "iii." and a period */
  text-align: left; /* numbers align on the left edge */
  font-weight: 300;
`;

// Sections stack and section style: left-aligned content with left justification
const Sections = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 3rem 2rem;
  width: 100%;
  align-items: center; /* center the content container; content itself will be left-justified */
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center; /* centers SectionContent horizontally */
`;

const SectionContent = styled.div`
  width: min(900px, 100%);
  font-size: 14px;
  text-align: left; /* left-justified text */
  line-height: 1.6;
  font-weight: 300;
`;

const SectionTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 14px;
  font-weight: 600;
`;

const Italics = styled.span`
  font-style: italic;
`;

// 5. Main Application Component
const App = () => {

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        
        <Header>
          <HeaderLeft>
            <SiteTitle>Sabrina Button</SiteTitle>
          </HeaderLeft>

          <HeaderCenter>
            <a href="#contact">
            <Logo src='sb-logo.png' alt="Logo" />
            </a>
          </HeaderCenter>

          <HeaderRight>
            <ContactLabel>
              <BoldUnderline href="mailto:sabrinarosebutton@gmail.com">contact me↗</BoldUnderline>
            </ContactLabel>
          </HeaderRight>
        </Header>

        <MainContent>

          <nav>
            <TOCList>
              <TOCItem><Bold>table of contents</Bold></TOCItem>
              <TOCItem><a href="#about"><TocNumber>i.</TocNumber><BoldUnderline>about↗</BoldUnderline></a></TOCItem>
              <TOCItem><a href="#experience"><TocNumber>ii.</TocNumber><BoldUnderline>experience↗</BoldUnderline></a></TOCItem>
              <TOCItem><a href="#publications"><TocNumber>iii.</TocNumber><BoldUnderline>publications↗</BoldUnderline></a></TOCItem>
              <TOCItem><a href="#projects"><TocNumber>iv.</TocNumber><BoldUnderline>projects↗</BoldUnderline></a></TOCItem>
              <TOCItem><a href="#education"><TocNumber>v.</TocNumber><BoldUnderline>education↗</BoldUnderline></a></TOCItem>
              <TOCItem><a href="#origins"><TocNumber>vi.</TocNumber><BoldUnderline>origins↗</BoldUnderline></a></TOCItem>
            </TOCList>
          </nav>
        </MainContent>

        <Sections>
          <Section id="about">
            <SectionContent>
              <SectionTitle>i. about</SectionTitle>
              <p>
                <Bold>I build autonomous systems for unpredictable environments.</Bold> My work focuses on state estimation and control, leveraging robotics to (1) solve the democratization of transportation, and (2) enable ecological monitoring in harsh environments by deploying resident systems.
              </p>
            </SectionContent>
          </Section>

          <Section id="experience">
            <SectionContent>
              <SectionTitle>ii. experience</SectionTitle>
              <p>
                <BoldUnderline href="https://www.rheinmetall.com/en/company/subsidiaries/provectus-robotics-solutions">Provectus Robotics Solutions↗</BoldUnderline> (aq. Rheinmetall), <Italics>Robotics Engineer Intern</Italics> (2025)
              </p>
              <p>
                <BoldUnderline href="https://aquatonomous.ca">aQuatonomous↗</BoldUnderline>, <Italics>Co-Founder and Co-Captain</Italics> (2023-2025)
              </p>
              <p>
                <BoldUnderline href="https://www.nvidia.com/en-us/">NVIDIA↗</BoldUnderline>, <Italics>Autonomous Vehicle Software Engineer Intern</Italics> (2024)
              </p>
              <p>
                <BoldUnderline href="https://ingenuitylabs.queensu.ca/">Ingenuity Labs Research Institute↗</BoldUnderline>, <Italics>Undergraduate Research Fellow</Italics> (2023)
              </p>
            </SectionContent>
          </Section>

          <Section id="publications">
            <SectionContent>
              <SectionTitle>iii. publications</SectionTitle>
              <p>
               Thomas M. C. Sears, M. Riley Cooper, Sabrina R. Button, Joshua A. Marshall. (2024). OtterROS: Picking and Programming an Uncrewed Surface Vessel for Experimental Field Robotics Research with ROS 2. IEEE ICRA Workshop on Field Robotics 2024. IEEE International Conference on Robotics and Automation (ICRA) <BoldUnderline href="https://arxiv.org/abs/2404.05627">[arXiv↗]</BoldUnderline>
              </p>
            </SectionContent>
          </Section>

          <Section id="projects">
            <SectionContent>
              <SectionTitle>iv. (featured) projects</SectionTitle>
                <p>
                Simultaneous Planning and Control of an Autonomous Surface Vehicle <BoldUnderline href="/button-proposal-arctic-asv.pdf" target="_blank" rel="noopener noreferrer">[Proposal↗]</BoldUnderline>
                </p>
                <p>
                Underwater Swarm Robots for Diluted Bitumen Mapping <Bold>[In Progress]</Bold>
                </p>
                <p>
                Nautical Disaster Autonomous Surface Vehicle <BoldUnderline href="https://aquatonomous.vercel.app/asv">[Overview↗]</BoldUnderline>
                </p>
                <p>
                Computer Vision Driven Autonomous Pet Feeder <BoldUnderline href="https://youtu.be/ULbh-ibkO7Q">[Demo↗]</BoldUnderline>
                </p>
                <p>
                Continuous Differential Omni-Directional Mobile Robot Design and Control <BoldUnderline href="/omni-diff-drive.pdf" target="_blank" rel="noopener noreferrer">[Paper↗]</BoldUnderline>
                </p>
                <p>
                CO2 Spatiotemporal Mapping Rover <BoldUnderline href="https://github.com/sabrinabutton/ros-slam-heat-map">[GitHub↗]</BoldUnderline>
                </p>
            </SectionContent>
          </Section>

          <Section id="education">
            <SectionContent>
              <SectionTitle>v. education</SectionTitle>
              <p>
                B.A.Sc. Mechatronics and Robotics Engineering, <Italics>Queen’s University</Italics> (2026)
              </p>
              <p>
                <Italics>
                USSRF - $11,000 (2023) <br/>
                Schulich Leader Scholarship - $100,000 (2021) <br/>
                Ingenium-NSERC Steam Horizon Award - $25,000 (2021)
                </Italics>
              </p>
            </SectionContent>
          </Section>

          <Section id="origins">
            <SectionContent>
              <SectionTitle>vi. origins</SectionTitle>
              <p>
              <Bold>2019</Bold> - Landed my first software development role at age 16 after shipping a roguelike game during a hackathon.
              </p>
              <p>
              <Bold>2021</Bold> - Joined the inaugural cohort of Mechatronics and Robotics Engineering at Queen’s University
              </p>
              <p>
              <Bold>2023</Bold> - Conducted experimental field robotics research with the Offroad Robotics group at Ingenuity Labs. Learned how robotics can have a positive impact on the planet.
                    Started <BoldUnderline href="https://aquatonomous.ca">aQuatonomous↗</BoldUnderline>, a student design team, to design and build a robotic boat to carry out critical water research efforts on Lake Ontario.
              </p>
              <p>
              <Bold>2024</Bold> - Scaled <BoldUnderline href="https://aquatonomous.ca">aQuatonomous↗</BoldUnderline> to 60+ members and raised $35k in funding. Interned at NVIDIA (AV planning). Published my first paper on field robotics.
              </p>
              <p>
              <Bold>2025</Bold> - Tackled R&D on a small team at Provectus Robotics Solutions. Deployed planning algorithms currently running on off-road trucks in Europe.
              </p>
            </SectionContent>
          </Section>
        </Sections>

        <FullPageSection id="contact">
          <FooterLogo src='sb-logo.png' alt="Logo" />
          <FooterName>Sabrina Button</FooterName>
          <FooterLinks>
            <FooterLink href="https://github.com/sabrinabutton" target="_blank" rel="noopener noreferrer">GitHub↗</FooterLink> /
            <FooterLink href="https://www.linkedin.com/in/sabrinabutton/" target="_blank" rel="noopener noreferrer">LinkedIn↗</FooterLink> /
            <FooterLink href="https://medium.com/@sabrinarosebutton" target="_blank" rel="noopener noreferrer">Medium↗</FooterLink>
          </FooterLinks>
          <FooterCopyright>© Sabrina Button 2025</FooterCopyright>
        </FullPageSection>

        

      </PageContainer>
    </>
  );
};

export default App;