---
layout: post
title: Inadvertent Password Theft with Chrome
author: Erik Gillespie
category: software
tags: []
permalink: /software/inadvertent-password-theft-with-chrome.html
---

I recently discovered a way to steal other peoples' passwords using Chrome.  The discovery was accidental and it took me a long time to put the pieces together.

The discovery took some time because of peculiar behavior that I was experiencing only once every couple of months.  Sometimes at work I would navigate to [Crucible](https://www.atlassian.com/software/crucible/overview) (the web-based code review software that our office uses) and instead of my usual dashboard I would instead be redirected to the login page and the username and password of one of my coworkers would be staring right back at me!

This took months to figure out because the first time this happened I just brushed the incident aside and went on about my code reviews.  After a couple more times of the same coworker's credentials appearing in the login form, I started to become curious.  I decided to talk to my coworker.

In doing so, another colleague overheard the mysterious happenings and asked me to check out my stored passwords in Chrome.  I didn't expect to find much because I usually decline Chrome's offer to store my passwords because I'm pretty good at remembering them on my own.  I was surprised when dozens of web sites were listed and nearly all of the credentials stored belonged to the same coworker.

My coworker came over to my desk, asked me to look away, and then viewed some of the passwords.  He confirmed that they were indeed his real passwords and asked me to delete them.  I did.  I also disabled password management and auto-fill in Chrome as precautionary messages.

The three of us talked about the issue.  It was obvious that the strange behavior I had been seeing over the past several months was Crucible's cookie expiring and redirecting me to the login page where Chrome would auto-fill the username and password of my coworker.  But how did his credentials get stored in Chrome on my work computer?  Some of the sites that had stored credentials were definitely not sites my coworker would have visited while we were pair programming at my desk.  (He may be a huge Pearl Jam fan and frequent their home page.)

Eventually I remembered that many months ago I discovered [Postman](http://www.getpostman.com), a Chrome app that makes it very easy to test RESTful web services.  I remembered that when I learned about this app that I thought my coworker would also be interested.  And then I remembered that instead of having him install the plugin, I signed into Chrome on his computer but using my account so that the app would just show up on a new tab (which was certainly faster than finding and installing the extension).

This is where it all clicked.  In my excitement to show my coworker the app I didn't think about the syncing that all of your Chrome installations do with each other.  It never occurred to me that as soon as I signed in to Chrome on his PC that all of his stored usernames, passwords and auto-fill data would be pulled down to my work PC.  It also never occurred to me that this kind of data would stick around even after I asked him later that same day to log me out of Chrome on his computer.

The repercussions here seem more severe than the risk of someone gaining access to your computer and being able to open up Chrome and look at your passwords.  That would take some time to pull off but I can sign into Chrome on a computer in no time at all.  Then I can peruse usernames and passwords on my computer at my leisure.  If I have a very basic Chrome installation and no stored passwords of my own then there's also very little way for someone to suspect anything fishy had happened after I signed out.

My words of advice: Do not let anyone sign into Chrome on your computer!
