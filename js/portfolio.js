// Portfolio Page - Horizontal Scroll Interactions

document.addEventListener('DOMContentLoaded', () => {
    initPortfolioScroll();
    initKeyboardNav();
    initTouchNav();
    hideScrollHint();
});

// Scroll Progress Tracking
function initPortfolioScroll() {
    const scrollWrapper = document.querySelector('.portfolio-scroll-wrapper');
    const progressFill = document.getElementById('progressFill');
    
    if (!scrollWrapper || !progressFill) return;
    
    scrollWrapper.addEventListener('scroll', () => {
        const scrolled = scrollWrapper.scrollLeft;
        const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
        const progress = (scrolled / maxScroll) * 100;
        
        progressFill.style.width = progress + '%';
    });
}

// Keyboard Navigation (Arrow Keys)
function initKeyboardNav() {
    const scrollWrapper = document.querySelector('.portfolio-scroll-wrapper');
    
    if (!scrollWrapper) return;
    
    document.addEventListener('keydown', (e) => {
        const currentScroll = scrollWrapper.scrollLeft;
        const slideWidth = window.innerWidth;
        
        if (e.key === 'ArrowRight') {
            scrollWrapper.scrollTo({
                left: currentScroll + slideWidth,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowLeft') {
            scrollWrapper.scrollTo({
                left: currentScroll - slideWidth,
                behavior: 'smooth'
            });
        }
    });
}

// Touch/Swipe Navigation
function initTouchNav() {
    const scrollWrapper = document.querySelector('.portfolio-scroll-wrapper');
    
    if (!scrollWrapper) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    scrollWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    scrollWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const currentScroll = scrollWrapper.scrollLeft;
            const slideWidth = window.innerWidth;
            
            if (diff > 0) {
                // Swipe left - go next
                scrollWrapper.scrollTo({
                    left: currentScroll + slideWidth,
                    behavior: 'smooth'
                });
            } else {
                // Swipe right - go previous
                scrollWrapper.scrollTo({
                    left: currentScroll - slideWidth,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Hide Scroll Hint After First Scroll
function hideScrollHint() {
    const scrollWrapper = document.querySelector('.portfolio-scroll-wrapper');
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (!scrollWrapper || !scrollHint) return;
    
    scrollWrapper.addEventListener('scroll', () => {
        if (scrollWrapper.scrollLeft > 50) {
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            scrollHint.style.opacity = '1';
            scrollHint.style.pointerEvents = 'auto';
        }
    });
}

// Show Project Details Modal
function showDetails(projectName) {
    const projectData = {
        aerosign: {
            title: 'AeroSign - Digital Signature Platform',
            details: [
                'Client: ACAS Therapy for Kids',
                'Timeline: 4 weeks development + ongoing',
                'Tech Stack: Next.js 15, TypeScript, Supabase, PostgreSQL, Vercel',
                'Features: QR code integration, mobile signatures, cloud storage, HIPAA-ready',
                'Status: Live in production across multiple locations',
                'Usage: Processing 50+ signatures daily',
                'Future: Part of larger $35K practice management system'
            ]
        },
        goldenhandz: {
            title: 'Golden Handz Services - Service Business Website',
            details: [
                'Client: Golden Handz Services (Miami Handyman)',
                'Timeline: Same-day deployment',
                'Tech Stack: HTML5, CSS3, Vanilla JavaScript, Netlify, FFmpeg',
                'Features: Video gallery, lead capture, mobile optimization, SEO',
                'Status: Live and generating leads',
                'Performance: Sub-2 second load time, 90+ PageSpeed score',
                'Cost: $0/month hosting on Netlify free tier'
            ]
        },
        aerovault: {
            title: 'AeroVault - Backend Infrastructure Platform',
            details: [
                'Status: Production (powering AeroSign)',
                'Completion: 70% complete',
                'Tech Stack: Python, FastAPI, PostgreSQL, Docker, Alembic, SQLAlchemy',
                'Features: Microservices architecture, API authentication, database migrations',
                'Purpose: Backend platform for AeroSign and future Aero* products',
                'Deployment: Containerized with Docker',
                'Repository: Available on GitHub'
            ]
        },
        cyberguardian: {
            title: 'Cyber Guardian - AI Cybersecurity Platform',
            details: [
                'Status: In Development (60% complete)',
                'Launch: Q2 2025',
                'Tech Stack: Rust, Python, AI/ML, FastAPI',
                'Features: Real-time threat detection, automated response, security analytics',
                'Target Market: Enterprise security teams',
                'Innovation: AI-powered threat intelligence',
                'Business Model: Enterprise subscription'
            ]
        },
        tradeeco: {
            title: 'TradeEco - Automated Trading Platform',
            details: [
                'Status: In Development (40% complete)',
                'Launch: Q3 2025',
                'Tech Stack: Python, FastAPI, Machine Learning, Redis',
                'Features: Algorithmic trading, risk management, portfolio optimization',
                'Target Market: Sophisticated investors',
                'Innovation: Intelligent trading automation',
                'Business Model: SaaS subscription + performance fees'
            ]
        }
    };
    
    const project = projectData[projectName];
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'details-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeDetailsModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeDetailsModal()">
                <i class="fas fa-times"></i>
            </button>
            <h2>${project.title}</h2>
            <div class="modal-details">
                ${project.details.map(detail => `
                    <p><i class="fas fa-check-circle"></i> ${detail}</p>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add modal styles if not present
    if (!document.querySelector('style[data-modal-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal-styles', 'true');
        style.textContent = `
            .details-modal {
                position: fixed;
                inset: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                inset: 0;
                background: rgba(5, 7, 17, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                position: relative;
                background: linear-gradient(135deg, rgba(10, 14, 39, 0.95), rgba(26, 30, 58, 0.95));
                padding: 50px;
                border-radius: 30px;
                border: 1px solid rgba(0, 212, 255, 0.3);
                max-width: 700px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.4s ease;
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 212, 255, 0.3);
                transform: rotate(90deg);
            }
            
            .modal-content h2 {
                font-family: 'Orbitron', sans-serif;
                font-size: 2rem;
                margin-bottom: 30px;
                background: linear-gradient(135deg, #00D4FF, #FFFFFF);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .modal-details p {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                margin-bottom: 15px;
                color: #B0B8C4;
                line-height: 1.6;
            }
            
            .modal-details i {
                color: #00D4FF;
                margin-top: 3px;
                flex-shrink: 0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    padding: 30px 20px;
                }
                
                .modal-content h2 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Close on Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeDetailsModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeDetailsModal() {
    const modal = document.querySelector('.details-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// Performance Logging
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Portfolio loaded in ${pageLoadTime}ms`, 'color: #00D4FF; font-weight: bold;');
    }
});

// Console Branding
console.log('%c🎨 Portfolio Showcase', 'font-size: 24px; font-weight: bold; color: #00D4FF;');
console.log('%c✨ Wakanda-Style Horizontal Scroll', 'font-size: 14px; color: #00FF88;');
console.log('%c🌊 Matrix Theme', 'font-size: 12px; color: #B0B8C4;');