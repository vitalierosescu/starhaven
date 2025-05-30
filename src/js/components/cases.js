import gsap from 'gsap'
import { Draggable } from 'gsap/all'

// gsap.registerPlugin(Draggable, InertiaPlugin)

export default function cases() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  const slidesCheck = gsap.utils.toArray('[data-slider="slide"]')

  if (slidesCheck) {
    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
      },
      context => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions

        function initSlider() {
          const slides = gsap.utils.toArray('[data-slider="slide"]')

          const nextButton = document.querySelector(
            '[data-slider="button-next"]',
          )
          const prevButton = document.querySelector(
            '[data-slider="button-prev"]',
          )

          const totalElement = document.querySelector(
            '[data-slide-count="total"]',
          )
          const stepElement = document.querySelector(
            '[data-slide-count="step"]',
          )
          const stepsParent = stepElement.parentElement

          let activeElement
          const totalSlides = slides.length

          // Update total slides text, prepend 0 if less than 10
          totalElement.textContent =
            totalSlides < 10 ? `0${totalSlides}` : totalSlides

          // Create step elements dynamically
          stepsParent.innerHTML = '' // Clear any existing steps
          slides.forEach((_, index) => {
            const stepClone = stepElement.cloneNode(true) // Clone the single step
            stepClone.textContent = index + 1 < 10 ? `0${index + 1}` : index + 1
            stepsParent.appendChild(stepClone) // Append to the parent container
          })

          // Dynamically generated steps
          const allSteps = stepsParent.querySelectorAll(
            '[data-slide-count="step"]',
          )

          const loop = horizontalLoop(slides, {
            paused: true,
            //   draggable: true,
            center: false,
            onChange: (element, index) => {
              // We add the active class to the 'next' element because our design is offset slightly.
              activeElement && activeElement.classList.remove('active')
              const nextSibling = element.nextElementSibling || slides[0]
              nextSibling.classList.add('active')
              activeElement = nextSibling

              // Move the number to the correct spot
              gsap.to(allSteps, {
                y: `${-1 * index}em`,
                ease: 'power3',
                duration: 0.45,
                stagger: 0,
                onStart() {
                  console.log('move number')
                },
              })
            },
          })

          // Similar to above, we substract 1 from our clicked index on click because our design is offset
          slides.forEach((slide, i) =>
            slide.addEventListener('click', () =>
              loop.toIndex(i - 1, { ease: 'power3', duration: 0.725 }),
            ),
          )

          nextButton.addEventListener('click', () =>
            loop.next({ ease: 'power3', duration: 0.725 }),
          )
          prevButton.addEventListener('click', () =>
            loop.previous({ ease: 'power3', duration: 0.725 }),
          )
        }

        function horizontalLoop(items, config) {
          let timeline
          items = gsap.utils.toArray(items)
          config = config || {}
          gsap.context(() => {
            let onChange = config.onChange,
              lastIndex = 0,
              tl = gsap.timeline({
                repeat: config.repeat,
                onUpdate:
                  onChange &&
                  function () {
                    let i = tl.closestIndex()
                    if (lastIndex !== i) {
                      lastIndex = i
                      onChange(items[i], i)
                    }
                  },
                paused: config.paused,
                defaults: { ease: 'none' },
                onReverseComplete: () =>
                  tl.totalTime(tl.rawTime() + tl.duration() * 100),
              }),
              length = items.length,
              startX = items[0].offsetLeft,
              times = [],
              widths = [],
              spaceBefore = [],
              xPercents = [],
              curIndex = 0,
              indexIsDirty = false,
              center = config.center,
              pixelsPerSecond = (config.speed || 1) * 100,
              snap =
                config.snap === false
                  ? v => v
                  : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
              timeOffset = 0,
              container =
                center === true
                  ? items[0].parentNode
                  : gsap.utils.toArray(center)[0] || items[0].parentNode,
              totalWidth,
              getTotalWidth = () =>
                items[length - 1].offsetLeft +
                (xPercents[length - 1] / 100) * widths[length - 1] -
                startX +
                spaceBefore[0] +
                items[length - 1].offsetWidth *
                  gsap.getProperty(items[length - 1], 'scaleX') +
                (parseFloat(config.paddingRight) || 0),
              populateWidths = () => {
                let b1 = container.getBoundingClientRect(),
                  b2
                items.forEach((el, i) => {
                  widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'))
                  xPercents[i] = snap(
                    (parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i]) *
                      100 +
                      gsap.getProperty(el, 'xPercent'),
                  )
                  b2 = el.getBoundingClientRect()
                  spaceBefore[i] = b2.left - (i ? b1.right : b1.left)
                  b1 = b2
                })
                gsap.set(items, {
                  // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
                  xPercent: i => xPercents[i],
                })
                totalWidth = getTotalWidth()
              },
              timeWrap,
              populateOffsets = () => {
                timeOffset = center
                  ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
                  : 0
                center &&
                  times.forEach((t, i) => {
                    times[i] = timeWrap(
                      tl.labels['label' + i] +
                        (tl.duration() * widths[i]) / 2 / totalWidth -
                        timeOffset,
                    )
                  })
              },
              getClosest = (values, value, wrap) => {
                let i = values.length,
                  closest = 1e10,
                  index = 0,
                  d
                while (i--) {
                  d = Math.abs(values[i] - value)
                  if (d > wrap / 2) {
                    d = wrap - d
                  }
                  if (d < closest) {
                    closest = d
                    index = i
                  }
                }
                return index
              },
              populateTimeline = () => {
                let i, item, curX, distanceToStart, distanceToLoop
                tl.clear()
                for (i = 0; i < length; i++) {
                  item = items[i]
                  curX = (xPercents[i] / 100) * widths[i]
                  distanceToStart =
                    item.offsetLeft + curX - startX + spaceBefore[0]
                  distanceToLoop =
                    distanceToStart +
                    widths[i] * gsap.getProperty(item, 'scaleX')
                  tl.to(
                    item,
                    {
                      xPercent: snap(
                        ((curX - distanceToLoop) / widths[i]) * 100,
                      ),
                      duration: distanceToLoop / pixelsPerSecond,
                    },
                    0,
                  )
                    .fromTo(
                      item,
                      {
                        xPercent: snap(
                          ((curX - distanceToLoop + totalWidth) / widths[i]) *
                            100,
                        ),
                      },
                      {
                        xPercent: xPercents[i],
                        duration:
                          (curX - distanceToLoop + totalWidth - curX) /
                          pixelsPerSecond,
                        immediateRender: false,
                      },
                      distanceToLoop / pixelsPerSecond,
                    )
                    .add('label' + i, distanceToStart / pixelsPerSecond)
                  times[i] = distanceToStart / pixelsPerSecond
                }
                timeWrap = gsap.utils.wrap(0, tl.duration())
              },
              refresh = deep => {
                let progress = tl.progress()
                tl.progress(0, true)
                populateWidths()
                deep && populateTimeline()
                populateOffsets()
                deep && tl.draggable
                  ? tl.time(times[curIndex], true)
                  : tl.progress(progress, true)
              },
              onResize = () => refresh(true),
              proxy
            gsap.set(items, { x: 0 })
            populateWidths()
            populateTimeline()
            populateOffsets()
            window.addEventListener('resize', onResize)
            function toIndex(index, vars) {
              vars = vars || {}
              Math.abs(index - curIndex) > length / 2 &&
                (index += index > curIndex ? -length : length) // always go in the shortest direction
              let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex]
              if (time > tl.time() !== index > curIndex && index !== curIndex) {
                // if we're wrapping the timeline's playhead, make the proper adjustments
                time += tl.duration() * (index > curIndex ? 1 : -1)
              }
              if (time < 0 || time > tl.duration()) {
                vars.modifiers = { time: timeWrap }
              }
              curIndex = newIndex
              vars.overwrite = true
              gsap.killTweensOf(proxy)
              return vars.duration === 0
                ? tl.time(timeWrap(time))
                : tl.tweenTo(time, vars)
            }
            tl.toIndex = (index, vars) => toIndex(index, vars)
            tl.closestIndex = setCurrent => {
              let index = getClosest(times, tl.time(), tl.duration())
              if (setCurrent) {
                curIndex = index
                indexIsDirty = false
              }
              return index
            }
            tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex)
            tl.next = vars => toIndex(tl.current() + 1, vars)
            tl.previous = vars => toIndex(tl.current() - 1, vars)
            tl.times = times
            tl.progress(1, true).progress(0, true) // pre-render for performance
            if (config.reversed) {
              tl.vars.onReverseComplete()
              tl.reverse()
            }
            if (config.draggable && typeof Draggable === 'function') {
              proxy = document.createElement('div')
              let wrap = gsap.utils.wrap(0, 1),
                ratio,
                startProgress,
                draggable,
                dragSnap,
                lastSnap,
                initChangeX,
                wasPlaying,
                align = () =>
                  tl.progress(
                    wrap(
                      startProgress + (draggable.startX - draggable.x) * ratio,
                    ),
                  ),
                syncIndex = () => tl.closestIndex(true)
              // typeof InertiaPlugin === 'undefined' &&
              //   console.warn(
              //     'InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club',
              //   )
              draggable = Draggable.create(proxy, {
                trigger: items[0].parentNode,
                type: 'x',
                onPressInit() {
                  let x = this.x
                  gsap.killTweensOf(tl)
                  wasPlaying = !tl.paused()
                  tl.pause()
                  startProgress = tl.progress()
                  refresh()
                  ratio = 1 / totalWidth
                  initChangeX = startProgress / -ratio - x
                  gsap.set(proxy, { x: startProgress / -ratio })
                },
                onDrag: align,
                onThrowUpdate: align,
                overshootTolerance: 0,
                //   inertia: true,
                snap(value) {
                  if (Math.abs(startProgress / -ratio - this.x) < 10) {
                    return lastSnap + initChangeX
                  }
                  let time = -(value * ratio) * tl.duration(),
                    wrappedTime = timeWrap(time),
                    snapTime =
                      times[getClosest(times, wrappedTime, tl.duration())],
                    dif = snapTime - wrappedTime
                  Math.abs(dif) > tl.duration() / 2 &&
                    (dif += dif < 0 ? tl.duration() : -tl.duration())
                  lastSnap = (time + dif) / tl.duration() / -ratio
                  return lastSnap
                },
                onRelease() {
                  syncIndex()
                  draggable.isThrowing && (indexIsDirty = true)
                },
                onThrowComplete: () => {
                  syncIndex()
                  wasPlaying && tl.play()
                },
              })[0]
              tl.draggable = draggable
            }
            tl.closestIndex(true)
            lastIndex = curIndex
            onChange && onChange(items[curIndex], curIndex)
            timeline = tl
            return () => window.removeEventListener('resize', onResize)
          })
          return timeline
        }

        initSlider()
      },
    )
  }
}
