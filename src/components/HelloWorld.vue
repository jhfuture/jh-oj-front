<template>
  <div id="app" @mousemove="onMouseMove" class="trans3d">
    <header>
      <h1 style="font: 100 100px 'font'; margin-top: 20px">团队成员展示</h1>
      <!-- <div id="fps">{{ fpsMessage }}</div> -->
    </header>

    <div id="contentContainer" class="trans3d">
      <section id="carouselContainer" class="trans3d">
        <figure
          v-for="(image, index) in images"
          :key="index"
          class="carouselItem trans3d"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="carouselItemInner trans3d"
          />
        </figure>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { TweenMax, TweenLite } from "gsap";

export default {
  setup() {
    const images = ref([
      { src: "/images/hwc.jpg", alt: "Image 1" },
      { src: "/images/lhj.jpg", alt: "Image 2" },
      { src: "/images/lqg.jpg", alt: "Image 2" },
      { src: "/images/wph.jpg", alt: "Image 2" },
      { src: "/images/wds.jpg", alt: "Image 2" },
      { src: "/images/cwh.jpg", alt: "Image 2" },
    ]);
    const mouseX = ref(0);
    const mouseY = ref(0);
    const fpsMessage = ref("Framerate: 0/60 FPS");

    let ticker;

    const initCarousel = () => {
      const container = document.getElementById("contentContainer");
      const carousel = document.getElementById("carouselContainer");
      const items = carousel.getElementsByClassName("carouselItem");
      const itemLength = items.length;
      const rY = 360 / itemLength;
      const radius = Math.round(250 / Math.tan(Math.PI / itemLength));

      TweenMax.set(container, { perspective: 600 });
      TweenMax.set(carousel, { z: -radius });

      for (let i = 0; i < itemLength; i++) {
        const item = items[i];
        const block = item.getElementsByClassName("carouselItemInner")[0];
        TweenMax.set(item, {
          rotationY: rY * i,
          z: radius,
          transformOrigin: "50% 50% " + -radius + "px",
        });
        animateIn(item, block);
      }
    };

    const animateIn = (item, block) => {
      const nrX = 360 * (Math.random() * 2);
      const nrY = 360 * (Math.random() * 2);
      const nx = -2000 + Math.random() * 4000;
      const ny = -2000 + Math.random() * 4000;
      const nz = -4000 + Math.random() * 4000;
      const s = 1.5 + Math.random() * 10 * 0.1;
      const d = 1 - Math.random() * 8 * 0.1;

      TweenMax.set(item, { autoAlpha: 1, delay: d });
      TweenMax.set(block, {
        z: nz,
        rotationY: nrY,
        rotationX: nrX,
        x: nx,
        y: ny,
        autoAlpha: 0,
      });
      TweenMax.to(block, s, {
        delay: d,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        ease: "power1.inOut",
      });
      TweenMax.to(block, s - 0.5, {
        delay: d,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "power1.inOut",
      });
    };

    const onMouseMove = (event) => {
      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
    };

    const looper = () => {
      const carousel = document.getElementById("carouselContainer");
      const addX = mouseX.value;
      TweenMax.to(carousel, 1, {
        rotationY: addX,
        rotationX: mouseY.value,
        ease: "power1.out",
      });
      // Update FPS message
      fpsMessage.value =
        "Framerate: " +
        (1000 / (performance.now() - start)).toFixed(2) +
        "/60 FPS";
      start = performance.now();
    };

    let start = performance.now();
    ticker = setInterval(looper, 1000 / 60);

    onMounted(() => {
      initCarousel();
    });

    onUnmounted(() => {
      clearInterval(ticker);
    });

    return {
      images,
      fpsMessage,
      onMouseMove,
    };
  },
};
</script>

<style scoped>
body {
  background-color: #1a948d;
  background-repeat: no-repeat;
  background-position: top center;
  width: 100%;
  background-size: cover;
  height: 100%;
  min-height: 1000px;
  overflow: hidden;
  font-family: "quicksandlight", Helvetica, Arial;
  color: #ffffff;
  text-shadow: -1px -1px 4px rgba(0, 0, 0, 0.35);
  filter: dropshadow(color=#000000, offx=1, offy=1);
}

header {
  margin-top: 30px;
  position: absolute;
  z-index: 5;
  width: 420px;
  padding-top: 10px;
  padding-bottom: 10px;
}

h1 {
  font-size: 36px;
  letter-spacing: -2.5px;
  margin-left: 30px;
}

h3 {
  font-size: 16px;
  letter-spacing: -1.5px;
  margin-top: 5px;
  margin-left: 35px;
}

#fps {
  margin-top: 5px;
  margin-left: 35px;
}

a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
}

a:hover {
  color: rgba(255, 255, 255, 1);
}

.trans3d {
  -webkit-transform-style: preserve-3d;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform-style: preserve-3d;
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform-style: preserve-3d;
  -ms-transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0);
}

#contentContainer {
  position: absolute;
  margin-left: -375px;
  margin-top: -30px;
  left: 50%;
  top: 50%;
  width: 1000px;
  height: 800px;
  overflow: hidden;
}

#carouselContainer {
  position: absolute;
  margin-left: -500px;
  margin-top: -500px;
  left: 50%;
  top: 50%;
  width: 1000px;
  height: 1000px;
}

.carouselItem {
  width: 320px;
  height: 240px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -160px;
  margin-top: -120px;
  visibility: hidden;
}

.carouselItemInner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@font-face {
  font-family: "font";
  src: url("/public/优设标题黑_猫啃网.ttf");
}
</style>
