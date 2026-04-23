---
# Use the Intro widget of the Blog template
widget: about.avatar

# This file represents a page section.
headless: true

# Order that this section will appear in.
weight: 10

author: admin
#design:
#  background:
#    color: '#090a0b'
#    text_color_light: true
#    video:
#      path:  # enter filename of a video in /assets/media
#  css_class: fullscreen
---

👋 Hi, there! I'm **Alice**, a machine learning researcher at Netflix.
{style="font-size: 1.2rem; background: #FFB76B; background: linear-gradient(to right, #FFB76B 0%, #FFA73D 30%, #FF7C00 60%, #FF7F04 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"}

Check out my [resumé](/about/) and portfolio below 😍

<div class="word-reel" data-word-reel>
  <div class="word-reel__history">
    <h4>走过的词</h4>
    <ul class="word-reel__history-list"></ul>
  </div>
  <div class="word-reel__viewport" aria-label="无限平滑词流滚动">
    <div class="word-reel__lane"></div>
  </div>
</div>

<label class="word-reel__speed-control" for="word-speed">
  滑块调速
  <input id="word-speed" type="range" min="-0.4" max="0.9" step="0.01" value="0.18" />
  <span class="word-reel__speed-value"></span>
</label>

<script src="/word-reel.js" defer></script>
