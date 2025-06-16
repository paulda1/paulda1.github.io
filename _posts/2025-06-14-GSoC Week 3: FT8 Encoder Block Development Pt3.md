---
title: "GSoC Week 3: FT8 Encoder Block Development Pt3"
---

Users know what they are doing 

– Or at least that's the assumption I will be making as I build out this FT8 module.

However, this past week was spent writing out a script that takes into consideration the situations in which that is *not* the case.

In preprocessing, after making sure there's actually input, we then trim whitespace and make sure only certain characters are allowed: A-Z, 0-9, and "/". Now my mentor Marcus mentioned that this might be too restrictive and that I might be better leaving this to the users themselves to decide. This will be something I have to consider as I make changes to the script next week. 

After these initial steps, the next set of functions oversee message type detection. The main types of messages sent via FT8 (as described by the reference https://wsjt.sourceforge.io/FT4_FT8_QEX.pdf) are:

1. Free text
2. DXpedition  
3. Field Days
4. Telemetry
5. Standard Messages (such as those in the QSO described last week)
6. European VHF
7. RTTY (radioteletype) RU
8. Non-standard calls

If you're wondering how I might go about automatically detecting which type of message the user is trying to send, that's a valid question. You see, the messages sent via FT8 follow pretty consistent patterns, patterns that some might even dare to call **regular expressions**. Wait I've heard of those before from somewhere! Yes, yes you have. Regular expressions or regex as it's commonly known is one of the most beautiful creations in computer science in my opinion. 

So here's an example, I know the dxpedition contacts always have to have a call sign transmitted. But I surely can't run through every possible list of call sign that exists can I? So what do I do? Well I know that call signs follow a regular pattern, and this pattern is `^[A-Z0-9]{1,2}[0-9][A-Z]{1,3}(?:/[A-Z0-9]{1,4})$`

In English the above line reads: "One to two alphanumerical characters, followed by one number, then three letters, then sometimes (by not strictly) followed by a slash and then one to four alphanumerical characters again". This complex pattern can be so succinctly captured by the magic of regex, and this is why this detection portion uses so much of it.

This level of preprocessing, after discussing with my mentors Marcus and Wylie I realized is not needed in the actual encoder block (which should be focused on only the encoding anyway). So next week I'll be taking it out of the block but making it a script that anyone can use standalone. I'll also be needing to create some tests to make sure the script does all it promises to. 

But with that I wish you a pleasant week, and see you back here soon when some actual encoding has taken place.

Arrivederci.

References:
[https://wsjt.sourceforge.io/FT4_FT8_QEX.pdf](https://wsjt.sourceforge.io/FT4_FT8_QEX.pdf)
