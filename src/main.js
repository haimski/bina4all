import './style.css'

// Parallax scrolling functionality
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]')
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.1
      const translateY = scrolled * speed
      element.style.transform = `translateY(${translateY}px)`
    })
  })
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]')
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })

  // Initialize parallax
  initParallax()
})

// Intersection Observer for scroll-based navigation and animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '-10% 0px -10% 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add fade-in animation to elements
      const animatedElements = entry.target.querySelectorAll('.parallax-title, .parallax-subtitle, .parallax-text, .parallax-element')
      animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`
        el.classList.add('animate-fade-in')
      })
      
      const id = entry.target.getAttribute('id')
      // Update active navigation state if needed
    }
  })
}, observerOptions)

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]')
  sections.forEach(section => observer.observe(section))
})

// Background parallax effect
function initBackgroundParallax() {
  const heroSection = document.querySelector('#home')
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * 0.3
      heroSection.style.backgroundPosition = `center ${rate}px`
    })
  }
}

// Initialize background parallax
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParallax()
})

// Add staggered animations to service cards
function initStaggeredAnimations() {
  const serviceCards = document.querySelectorAll('.service-card')
  serviceCards.forEach((card, index) => {
    card.classList.add(`stagger-${index + 1}`)
    card.classList.add('animate-slide-up')
  })
}

// Initialize staggered animations
document.addEventListener('DOMContentLoaded', () => {
  initStaggeredAnimations()
})

// Interactive Neuron Network Map
function initInteractiveGrid() {
  const canvas = document.getElementById('grid-canvas')
  const heroSection = document.getElementById('home')
  if (!canvas || !heroSection) return

  const ctx = canvas.getContext('2d')
  let mouseX = 0
  let mouseY = 0
  let isMouseInHero = false
  
  // Neuron nodes
  const nodes = []
  const nodeCount = 55
  const maxConnectionDistance = 160
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    // Regenerate nodes on resize
    generateNodes()
  }
  
  // Generate neuron nodes
  function generateNodes() {
    nodes.length = 0
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2.5 + Math.random() * 1.5,
        baseRadius: 2.5 + Math.random() * 1.5
      })
    }
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // Mouse move handler with throttling
  let lastMouseMove = 0
  const throttleDelay = 8
  
  function handleMouseMove(e) {
    const now = Date.now()
    if (now - lastMouseMove < throttleDelay) return
    
    const rect = heroSection.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
    lastMouseMove = now
  }
  
  // Mouse enter/leave handlers
  function handleMouseEnter() {
    isMouseInHero = true
  }
  
  function handleMouseLeave() {
    isMouseInHero = false
  }
  
  // Calculate distance between two points
  function distance(x1, y1, x2, y2) {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
  }
  
  // Draw neuron network
  function drawNeuronNetwork() {
    // Update node positions with slight movement
    nodes.forEach(node => {
      // Boundary checking with bounce
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      
      // Keep nodes within bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x))
      node.y = Math.max(0, Math.min(canvas.height, node.y))
      
      // Update position
      node.x += node.vx
      node.y += node.vy
      
      // Mouse interaction - nodes are attracted/repelled by mouse
      if (isMouseInHero) {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
          const force = (200 - dist) / 200
          const angle = Math.atan2(dy, dx)
          node.vx += Math.cos(angle) * force * 0.02
          node.vy += Math.sin(angle) * force * 0.02
        }
      }
      
      // Damping
      node.vx *= 0.98
      node.vy *= 0.98
    })
    
    // Draw connections between nearby nodes
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)'
    ctx.lineWidth = 0.8
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i]
        const nodeB = nodes[j]
        const dist = distance(nodeA.x, nodeA.y, nodeB.x, nodeB.y)
        
        if (dist < maxConnectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (dist / maxConnectionDistance)
          
          // Enhance connection if mouse is nearby
          let connectionOpacity = opacity * 0.08
          if (isMouseInHero) {
            const mouseDistA = distance(mouseX, mouseY, nodeA.x, nodeA.y)
            const mouseDistB = distance(mouseX, mouseY, nodeB.x, nodeB.y)
            const minMouseDist = Math.min(mouseDistA, mouseDistB)
            
            if (minMouseDist < 150) {
              const mouseInfluence = 1 - (minMouseDist / 150)
              connectionOpacity = Math.max(connectionOpacity, opacity * 0.25 * mouseInfluence)
            }
          }
          
          ctx.strokeStyle = `rgba(59, 130, 246, ${connectionOpacity})`
          ctx.beginPath()
          ctx.moveTo(nodeA.x, nodeA.y)
          ctx.lineTo(nodeB.x, nodeB.y)
          ctx.stroke()
        }
      }
    }
    
    // Draw nodes
    nodes.forEach(node => {
      const dist = isMouseInHero ? distance(mouseX, mouseY, node.x, node.y) : Infinity
      const maxInfluenceDist = 100
      
      let nodeRadius = node.baseRadius
      let nodeOpacity = 0.5
      
      if (dist < maxInfluenceDist) {
        const influence = 1 - (dist / maxInfluenceDist)
        nodeRadius = node.baseRadius + influence * 3.5
        nodeOpacity = 0.5 + influence * 0.5
      }
      
      // Draw glow effect
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeRadius * 3)
      gradient.addColorStop(0, `rgba(59, 130, 246, ${nodeOpacity})`)
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${nodeOpacity * 0.3})`)
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, nodeRadius * 3, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw node core
      ctx.fillStyle = `rgba(59, 130, 246, ${nodeOpacity})`
      ctx.beginPath()
      ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
      ctx.fill()
    })
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawNeuronNetwork()
    requestAnimationFrame(animate)
  }
  
  // Event listeners
  heroSection.addEventListener('mousemove', handleMouseMove)
  heroSection.addEventListener('mouseenter', handleMouseEnter)
  heroSection.addEventListener('mouseleave', handleMouseLeave)
  
  // Start animation
  animate()
}

// Initialize interactive grid
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveGrid()
}) 

function initProjectsSection() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // שמות קבצי התמונות (ב-public/projects)
  const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg'
  ];

  // Grid: responsive columns via JS breakpoints
  grid.innerHTML = '';
  grid.style.display = 'grid';
  grid.style.gap = '32px';
  grid.style.justifyItems = 'center';
  grid.style.alignItems = 'start';

  function applyGridColumns() {
    const width = window.innerWidth;
    // Tailwind-like breakpoints: <640=1, 640-<1024=2, >=1024=3
    if (width < 640) {
      grid.style.gridTemplateColumns = 'repeat(1, minmax(0, 1fr))';
    } else if (width < 1024) {
      grid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
    } else {
      grid.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
    }
  }
  applyGridColumns();
  window.addEventListener('resize', applyGridColumns);

  images.forEach((file) => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.alignItems = 'center';

    const img = document.createElement('img');
    img.src = `/projects/${file}`;
    img.alt = '';
    img.style.width = '100%';
    img.style.maxWidth = '280px';
    img.style.height = '200px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '0';
    img.style.boxShadow = '0 4px 24px 0 rgba(59,130,246,0.10)';
    img.style.background = 'rgba(255,255,255,0.7)';
    img.style.transition = 'transform 0.2s, box-shadow 0.2s, opacity 0.2s';
    img.style.opacity = '0.85';
    img.style.cursor = 'pointer';
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.04)';
      img.style.boxShadow = '0 8px 32px 0 rgba(59,130,246,0.18)';
      img.style.opacity = '1';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.boxShadow = '0 4px 24px 0 rgba(59,130,246,0.10)';
      img.style.opacity = '0.85';
    });
    img.addEventListener('click', () => showLargeImage(file));

    item.appendChild(img);
    grid.appendChild(item);
  });

  function showLargeImage(file) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.82)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.style.cursor = 'pointer';

    const largeImg = document.createElement('img');
    largeImg.src = `/projects/${file}`;
    largeImg.alt = '';
    largeImg.style.maxWidth = '90vw';
    largeImg.style.maxHeight = '80vh';
    largeImg.style.borderRadius = '0';
    largeImg.style.boxShadow = '0 0 60px 0 rgba(59,130,246,0.25)';
    largeImg.style.background = 'rgba(255,255,255,0.85)';
    largeImg.style.opacity = '0.97';

    overlay.appendChild(largeImg);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectsSection();
});