const container = document.getElementById('reptile-container');
const segments = [];
const segmentCount = 20;
const mouse = { x: 0, y: 0 };

// 1. Create the segments
for (let i = 0; i < segmentCount; i++) {
    const div = document.createElement('div');
    div.className = 'segment';
    
    // Make segments smaller toward the tail
    const size = 30 - (i * 1.2); 
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    // Make tail segments more transparent
    div.style.opacity = 1 - (i / segmentCount);
    
    container.appendChild(div);
    segments.push({ 
        element: div, 
        x: 0, 
        y: 0 
    });
}

// 2. Track mouse position
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// 3. Animation Loop
function animate() {
    let targetX = mouse.x;
    let targetY = mouse.y;

    segments.forEach((seg, index) => {
        // "Follow" logic: move toward the target
        // Adjust 0.2 to change the stiffness (lower = more "slithery")
        seg.x += (targetX - seg.x) * 0.2;
        seg.y += (targetY - seg.y) * 0.2;

        seg.element.style.left = `${seg.x}px`;
        seg.element.style.top = `${seg.y}px`;

        // The next segment follows this one
        targetX = seg.x;
        targetY = seg.y;
    });

    requestAnimationFrame(animate);
}

animate();