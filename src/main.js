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

// Interactive Grid with Twisted Polygon Effect
function initInteractiveGrid() {
  const canvas = document.getElementById('grid-canvas')
  const heroSection = document.getElementById('home')
  if (!canvas || !heroSection) return

  const ctx = canvas.getContext('2d')
  let mouseX = 0
  let mouseY = 0
  let time = 0
  let isMouseInHero = false
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // Mouse move handler with throttling
  let lastMouseMove = 0
  const throttleDelay = 8 // ~120fps for smoother animation
  
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
  
  // Calculate twist effect and visibility based on mouse position
  function getTwistOffset(baseX, baseY) {
    const dx = mouseX - baseX
    const dy = mouseY - baseY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 120 // Reduced by 20% from 150
    const influence = Math.max(0, 1 - distance / maxDistance)
    // Ease the animation with smoother influence curve
    const easedInfluence = Math.pow(influence, 1.5)
    const twistStrength = 12 * easedInfluence
    
    return {
      x: (dx / distance) * twistStrength * easedInfluence,
      y: (dy / distance) * twistStrength * easedInfluence,
      visible: distance <= maxDistance
    }
  }
  
  // Draw twisted polygon grid
  function drawGrid() {
    const gridSize = 40
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'
    ctx.lineWidth = 2
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const baseX = i * gridSize
        const baseY = j * gridSize
        
        // Get twist offset and visibility for this cell
        const twist = getTwistOffset(baseX + gridSize/2, baseY + gridSize/2)
        
        // Only draw if mouse is in hero section and cell is visible
        if (isMouseInHero && twist.visible) {
          // Calculate opacity based on distance for smooth fade
          const dx = mouseX - (baseX + gridSize/2)
          const dy = mouseY - (baseY + gridSize/2)
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 120
          const opacity = Math.max(0, 1 - distance / maxDistance)
          
          // Draw simple twisted rectangle for better performance
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`
          ctx.beginPath()
          ctx.moveTo(baseX + twist.x, baseY + twist.y)
          ctx.lineTo(baseX + gridSize + twist.x, baseY + twist.y)
          ctx.lineTo(baseX + gridSize + twist.x, baseY + gridSize + twist.y)
          ctx.lineTo(baseX + twist.x, baseY + gridSize + twist.y)
          ctx.closePath()
          ctx.stroke()
          
          // Add subtle fill for some cells
          if ((i + j) % 4 === 0) {
            ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.08})`
            ctx.fill()
          }
        }
      }
    }
    
    // Simplified connection lines for better performance
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
    ctx.lineWidth = 1
    
    // Only draw main connection lines
    for (let i = 0; i <= cols; i++) {
      const x = i * gridSize
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    
    for (let i = 0; i <= rows; i++) {
      const y = i * gridSize
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // Draw grid points only in visible area
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize
        const y = j * gridSize
        const twist = getTwistOffset(x, y)
        
        if (isMouseInHero && twist.visible) {
          // Calculate opacity based on distance for smooth fade
          const dx = mouseX - x
          const dy = mouseY - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 120
          const opacity = Math.max(0, 1 - distance / maxDistance)
          
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.6})`
          ctx.beginPath()
          ctx.arc(x + twist.x, y + twist.y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Update time for animation
    time += 1
    
    // Draw twisted grid
    drawGrid()
    
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