---
title: "GSoC Week 4: FT8 Bit Fields"
---

A bit field is just a sequence of binary digits (0's and 1's) that represents some data. In FT8, there are a few standard bit fields.

There is the c28 28-bit bit field, for example. So, all standard callsigns, CQ variants, DE, QRZ, and even 22-bit hash codes are all implemented using this standard. 22-bit hash codes are implemented here by embedding them within the 28-bit c28 field by adding an offset that allows a specific range of the values to be reserved for only that. The standard for c28 reserves ranges for specific types of inputs: for example, 0 to 532,443 is for special words, 2,063,592 to 6,257,895 is reserved for 22-bit hash codes, and 6,257,896+ is reserved for the standard callsigns. 

Something interesting I found is that in the subdivisions there are gaps, let me explain. Formats following structures like CQ AA - CQ ZZ have the bit field ranges 1031 to 1731, while structures like CQ AAA - CQ ZZZ have the bit field ranges 1760 to 20685. I don't know if you were paying attention, but there's a gap—1732 to 1759 are unused values. And there are many of these gaps to be found. Isn't that super interesting?

A discussion on Stack Overflow gives us some hints for why that may be the case. Sometimes there are scenarios when creating this encoding to set aside some padding for future assignment. So, for example, I might decide that a few bits of those 28 might be best used for one specific type of callsign that doesn't quite fit in and should be given attention outside of free text. I found that so cool, though! Maybe I should personalize my implementation so that when my callsign and "AWESOME" are used in conjunction, they should be packed in one of the gaps. Just a thought :)

C28 was one of the bit fields. The others are c58 (58-bit Non-Standard Callsign field), g15 (15-bit Grid/Report field), g25 (25-bit extended grid field), and f71 (71-bit Free Text field). If you're wondering about the size differences, it's due to how specific a pattern it is, and how small it is. Standard callsigns, by virtue of them being "standard," follow a very rigid structure. This in fact allows us (well, by us I mean the geniuses behind the original FT8 paper) to calculate exactly how many bits are necessary for encoding this callsign. As described in the paper, there are two possible character prefixes, then a number, then a suffix with max of three letters. So, if you're keeping track, that comes to 37×36×10×27×27×27 = 262,177,560. And since 2^28 = 268,435,456 is above that, and 2^27 is too small, we realize that 28 bits are sufficient to encode any standard callsign. 

If you remember our discussion just before, you'll notice that there are exactly 6,257,896 bits which are unassigned. What does this mean? After removing the bits that are then assigned for 22-bit hashes and those CQ variants, etc., anything left over is for us to do with as we please! I mean, obviously within protocol limits etc., but I think that's super exciting and leaves room for us amateur radio enthusiasts to implement even more cool features that may appear unnecessary to some. I mean, to be fair, while we might like to believe otherwise, I think our entire hobby is built on perfecting the unnecessary because it's just so cool. I better stop myself before going out on an entire pro-amateur radio tirade.

Unit tests are still something incoming, so we'll see this week how what I wrote fares in the real world.

Anyways, with that, auf Wiedersehen!

**References:**
- [stackoverflow.com/questions/1004660/to-pad-or-not-to-pad-creating-a-communication-protocol](https://stackoverflow.com/questions/1004660/to-pad-or-not-to-pad-creating-a-communication-protocol)
- [https://wsjt.sourceforge.io/FT4_FT8_QEX.pdf](https://wsjt.sourceforge.io/FT4_FT8_QEX.pdf)
