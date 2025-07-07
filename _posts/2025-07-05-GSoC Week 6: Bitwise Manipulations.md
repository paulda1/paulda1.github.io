---
title: "GSoC Week 6: Bitwise Manipulations"
---

Conveyer belts are great – the 14 bit shift register works like one too.

As I'm building out the FT8 encoder code, there are many important bitwise manipulations that I'm realizing more and more are relevant to how this protocol works. Let's go through these one by one, and you'll also get to learn.

First off we have the cyclic redundancy check (CRC) and this is the most complex bitwise manipulation I believe I had to implement. In it we have a polynomial in it's hexadecimal format – so here that would be 0x6757 – and this is the generator polynomial for the CRC. Of course, under the hood these are all represented as bit patterns in memory.

Going back to the conveyer belt, here's why the register worked like one:

1. There's the left shift, so all bits are shifted left by one position
2. Then there's the mask to 14 bits, so only the lower 14 bits (0-13) are kept
3. Next is the overflow detection, to check if bit 13 was set before shifting
4. And finally we have the XOR operations – this is when the bit falls of the left edge so to speak, which of course is when the polynomial we just talked about gets triggered

The polynomial exists for correction by flipping specific bits in the register to maintain the mathematical properties needed for error detection.

Second off we have gray code mapping. Compared to CRC this is pretty straightforward, you take in the complete array of bits and you go through processing 3 bits at a time. Here, the 3 bit binary values are converted into gray code symbols where adjacent values differ only by one bit. We can then use these downstream.

In the LDPC generation, we perform another XOR but here we can get away with using just the boolean "!", plus it kind of makes sense – let me explain. If you were to read the code as English, what it's essentially saying is this:

1. Start with false
2. Each time a relevant bit is set, you flip the parity
3. And finally if there is an odd number of bits return true

That reads a lot easier than the bitwise XOR I implemented in the CRC. But I'll also point out another fact, the CRC requires the XOR, this is because it's implementing polynomial division. When multiple bits are affected suddenly you can't get away with using just a Boolean.

But there you have it, a variety of technical considerations not assembled in a narrative format and therefore in a format I have trouble calling a blog post. Nonetheless, until next week.

Viszlát

## Reference Links

- [What are bitwise shift (bit-shift) operators and how do they work?](https://stackoverflow.com/questions/141525/what-are-bitwise-shift-bit-shift-operators-and-how-work)
