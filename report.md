# OBOX Frontend Developer Assignment
## Cristion Gordon

---

## Deliverables

**Live Deployment**  
[https://obox-project-2ujp.vercel.app/](https://obox-project-2ujp.vercel.app/)

**Video Walkthrough**  
[View Video on Google Drive](https://drive.google.com/file/d/1jkSCdERl107Bf8A4m86BXZMk2mJIIl2J/view?usp=sharing)

**GitHub Repository**  
[https://github.com/GWizard98/OBOX-Project](https://github.com/GWizard98/OBOX-Project)
---

## Project Overview

This submission demonstrates a scroll-driven cinematic web experience built with vanilla JavaScript and GSAP ScrollTrigger. The implementation prioritizes smooth scroll-synchronized animations as specified in the assignment requirements, with particular emphasis on the synchronization of scrolling with element transitions, which was identified as the most critical aspect of the assignment.

---

## Technical Approach

The architecture centers on GSAP ScrollTrigger for all scroll-based animation orchestration. I selected vanilla JavaScript rather than a framework to maintain simplicity, performance, and code clarity. This decision aligns with the assignment's allowance for various frontend approaches and ensures the codebase remains accessible and maintainable.

For the creative challenge of replacing the three-dimensional elements, I implemented a looping video background as suggested in the assignment guidelines. This approach delivers the cinematic atmosphere required while avoiding the complexity and performance overhead of full three-dimensional scene rendering. The video creates visual interest and movement that enhances the scroll-driven experience without compromising animation smoothness.

---

## Implementation Details

The scroll-driven animation system includes several key components working in coordination. The video section implements opacity transitions synchronized to scroll position, creating a fade effect as users progress through the content. The primary title features coordinated fade and vertical movement animations triggered by scroll progress. Section elements animate into view as they enter the viewport, utilizing opacity and position transformations. Heading elements incorporate scale animations that activate when reaching threshold positions during scroll.

All animations utilize GSAP's scrub property to ensure smooth, performance-optimized transitions that remain synchronized with user scroll input regardless of scroll speed or direction.

---

## Code Structure

The implementation maintains clear separation of concerns across three primary files. The HTML structure defines semantic sections with appropriate identifiers and maintains clean hierarchy throughout the document. The CSS implementation provides foundational styling, typography, layout structure, and visual polish including gradients and transitions. The JavaScript layer handles all animation logic through GSAP ScrollTrigger, with each animation defined as a discrete, configurable unit.

This organization ensures the codebase remains readable and maintainable. Each animation can be modified independently without affecting other components, and the vanilla JavaScript approach means the code requires no build process or framework-specific knowledge to understand.

---

## Video Walkthrough Notes

The video walkthrough provides comprehensive coverage of the project's technical approach, architectural decisions, and implementation details. While the recommended duration was three to five minutes, I opted to provide thorough explanations of key technical decisions and demonstrate the full scope of the scroll-driven animation system. The additional time allows for detailed code review and articulation of strategic choices made throughout development.

For efficient navigation, the walkthrough covers project demonstration and scroll animation showcase in the opening segment, architectural decisions and technical approach in the middle section, and code review with specific implementation examples in the concluding portion.

---

## Development Process

I used Claude AI as a development mentor throughout this project for guidance on best practices, debugging assistance, and code structure recommendations. All code was written by me directly, and I can explain every implementation decision and line of code in detail. The AI assistance focused on providing direction and catching errors rather than generating code, ensuring I developed genuine understanding of the technical implementation.

---

## AI Tool Usage Declaration

Claude AI served as a technical mentor during development, providing guidance on GSAP ScrollTrigger best practices, debugging assistance when encountering errors, code structure recommendations for maintainability, and strategic direction on prioritizing core requirements.

All code implementation was performed directly by me. I can explain the purpose and function of every line of code in the project. The learning process ensured I developed practical understanding of scroll-driven animation techniques rather than simply copying generated solutions.

---

## Reflections and Future Enhancements

Given additional development time, I would implement several enhancements to extend the project's functionality. A working quiz component with state management and user interaction logic would add meaningful interactivity. A functional video player with standard controls and playback management would complete the library section. Interactive carousel navigation with smooth transitions would enhance the advertisement section presentation.

However, I deliberately prioritized the core assignment requirement of scroll-driven animations over these additional features. This strategic decision demonstrates practical project management and understanding that polished implementation of primary requirements delivers more value than incomplete implementation of numerous features. The current submission provides a solid foundation that could be extended with additional interactive components in a production environment.

---

## Time Investment

Total development time across the seventy-two hour window was approximately fourteen to sixteen hours, distributed across code implementation, debugging and refinement, video recording and revision, and deployment and documentation.

---

## Conclusion

This project demonstrates my ability to implement smooth scroll-driven animations using industry-standard tools, make strategic technical decisions under time constraints, write clean and maintainable code, and communicate technical approaches effectively. I appreciate the opportunity to complete this assignment and look forward to discussing the implementation in greater detail.

Thank you for your consideration.

Cristion Gordon