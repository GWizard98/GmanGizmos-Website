// Matrix Rain Animation - Shared across all pages
// GmanGizmos Web Development

class MatrixRain {
    constructor(canvasId = 'matrixCanvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Matrix canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.init();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Ensure fontSize is defined before calculating columns
        if (!this.fontSize) {
            this.fontSize = 14;
        }
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        // Ensure columns is a valid positive number
        if (!this.columns || this.columns <= 0 || !isFinite(this.columns)) {
            this.columns = Math.floor(window.innerWidth / 14);
        }
        this.drops = Array(this.columns).fill(1);
    }
    
    init() {
        // Matrix characters
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
        
        // Colors - cyan theme matching GmanGizmos
        this.colors = [
            'rgba(0, 212, 255, ',   // Cyan
            'rgba(0, 255, 136, ',   // Green  
            'rgba(0, 102, 255, '    // Blue
        ];
        
        this.start();
    }
    
    draw() {
        // Fade effect for trail
        this.ctx.fillStyle = 'rgba(5, 7, 17, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Random color
            const colorIndex = Math.floor(Math.random() * this.colors.length);
            const opacity = Math.random() * 0.5 + 0.5;
            this.ctx.fillStyle = this.colors[colorIndex] + opacity + ')';
            
            // Draw character
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            this.ctx.fillText(char, x, y);
            
            // Reset drop to top randomly or when reaching bottom
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    start() {
        this.animationId = setInterval(() => this.draw(), 50);
    }
    
    stop() {
        if (this.animationId) {
            clearInterval(this.animationId);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.matrixRain = new MatrixRain();
});
