import './styles/style.css'
import gsap from 'gsap'
import { CustomEase, ScrollTrigger } from 'gsap/all'
import challenges from './js/components/challenges'
import loader from './js/components/loader'
import press from './js/components/press'
import cases from './js/components/cases'
import services from './js/components/services'
import SplitType from 'split-type'
import addLineInner from './js/utils/addlineInner'
import interlude from './js/components/interlude'
import subNav from './js/components/subNav'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create('smoothOut', '.39,0,.22,1')
new SplitType('[split-type]', { types: 'lines', tagName: 'span' })

$('[split-type]').each(function (index) {
  gsap.set($(this), { autoAlpha: 1 })
  let textElement = $(this)
  addLineInner(textElement)
})

setTimeout(() => {
  $('[lines-slide-up]').each(function (index) {
    let textElement = $(this)
    let allLineElements = $('.line-inner')
    let textContentRaw = textElement.find(allLineElements)
    let textContent = ''

    textContentRaw.each(function () {
      // Concatenate each element's text content to the textContent string
      textContent += $(this).text() + ' '
    })
    textContent.trim()

    let tl

    function animateHeadings() {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: textElement,
          start: 'top bottom',
          end: 'bottom bottom',
          // toggleActions: 'none play none reset',
        },
      })
      tl.fromTo(
        textElement.find('.line-inner'),
        { yPercent: 105 },
        {
          yPercent: 5,
          duration: 1,
          ease: 'smoothOut',
          stagger: { amount: 0.1 },
        },
      )
    }
    animateHeadings()

    let windowWidth = window.innerWidth
    window.addEventListener('resize', function () {
      if (windowWidth !== window.innerWidth) {
        windowWidth = window.innerWidth
        tl.kill()
        textElement.text(textContent)
        // animateHeadings()
      }
    })
  })
}, 700)

loader()
challenges()
press()
interlude()
subNav()
services()
cases()
