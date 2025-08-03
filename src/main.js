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