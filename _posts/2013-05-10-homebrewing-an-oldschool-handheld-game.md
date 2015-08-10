---
layout: post
title: Homebrewing an "Oldschool" Handheld Game
author: erik
category: software
tags: [games]
permalink: /software/homebrewing-an-oldschool-handheld-game.html
---

Moore's Law and miniaturization of computers is fascinating.  I can fit a phone or a handheld gaming system in my pocket that has more processing power than the giant beige box that sat on my desk 20 years ago.  I can barely tell the difference between native and interpreted user interfaces and sometimes I wonder if I should wrap a log statement in an "`if (log.isDebugEnabled())`" check or explicitly use a StringBuilder instead of lazily using the + operator to concatenate my Strings.  That two-year timespan is long enough that I barely see such huge differences in computing power day-to-day or even when I renew my phone or upgrade my computer.  But over a span of ten years?  Yes, definitely noticeable.

It feels like the days when a developer had to use some very sneaky tricks to squeeze every ounce of power out of a processor are slowly dwindling.  It has officially been ten years since I have written assembly language.  I used to love writing assembly.  Deep down I still do.  Even when working on a hardware project recently, I saw that you can get an Arduino that will let you interact with the hardware using a high level language for so cheap that I couldn't possibly make a case for doing something a little lower level.  I love the advancements that we are making in computing, but a part of me is sad to say goodbye to those days where I worked so closely with the computer.

I started thinking about all of this when I dusted off an old game I made for the Game Boy Advance.  I played the game and remembered all of the learning I had to do to make this game work.  The GBA in my opinion is one of the last handhelds where writing assembly language might be practical even for a basic puzzle game like the one I wrote.  Even then, there wasn't much assembly; most of the code was written in C.

The game was named Xorlix.  The idea behind the game came from a similar game my friend Keith had made for his PDA.  It's similar to Lights Out: you select a peg and it and all adjacent pegs turn off if they were on and vice versa.  It's a simple game but given the limited resources and some specific goals I had when creating the game (working with backgrounds, sprites, palettes, animation, saving and loading game state, and displaying text), simple became complicated in a hurry.

This project was a lot of work but I had a blast creating it!  There were some interesting problems to overcome:

* I decided to use sprites to draw all of the pegs.  The GBA can only keep track of so many of them at a time and I need to draw more than that limit so I detected when half of the sprites had been drawn and wait for the next horizontal sync so I could swap out those sprites with the remaining ones.
* DevKitAdvance (the compiler tools I used for development) offered no support for drawing text.  I had to come up with a solution for drawing text at specific locations on the screen.
* PaintShop Pro was my image editing tool of choice because it was cheap and had great support for drawing images using palettes.  I wanted to change the background color and peg colors at the end of each round so I had to write my own tool to convert PaintShop Pro palette files to C code that could be compiled and linked into the game.
* Animation.  I wanted to animate the cursor but I had no idea how to do it.  I came up with my own sort of timer to smoothly animate the cursor.  This solution problem has no resemblance to how animation in any actually-published GBA game was implemented.

If you're very curious then you can [check out the code](https://github.com/egillespie/xorlix-gba) and the compiled ROM for the game on GitHub.  If you're only mildly curious, you can check out this animated GIF that I created of the game being played:

<div class="gala">
  <img src="/img/xorlix.gif" alt="Xorlix in Action!"/>
</div>

I wish I had the opportunity to work on more projects like this.  Everything I do now is web-based and while I have some interesting ideas (to me, anyway), they just don't have that low-level aspect that really got me into programming in the first place.  That's not regret that you're picking up in my writing, it's myself realizing and accepting that I have transitioned into a different type of developer.

EDIT: Replaced the downloadable zip file with a link to the code on GitHub.
