Hello? Hello.
Can you hear me?
Yep pretty well…can you hear me?
Yep, well see ya.
Yea, talk later!
 
For those who are unfamiliar with what a complete FT8 QSO (contact) sequence might look like, here's a usual sequence.
1.       CQ call
2.       Response
3.       Signal Report
4.       Confirmation
5.       Confirmation and goodbye
6.       Goodbye
 
Introductions in real life repeat a lot of the same information your name and where you're from. A concept I came across was *a priori* decoding (AP decoding). Without AP decoding the threshold for FT8 is around -20dB. But with AP decoding the software uses information that it already knows might be in the signal to help decode the weaker signals. This can include your callsign, callsign of stations you're currently in QSO with, "CQ" and other message conventions that are helpful. This can mean the threshold can be a lot lower.

Another piece of theory I read into was digital modulation itself, of course the community in GNU Radio is likely already familiar with this but I'll provide a bit more information anyhow. Binary modulation is sending just 1 bit per symbol, this is like simple on/off keying. But for FT8 we have higher-order modulation and here each symbol can carry multiple bits. So for example m = 2, means each symbol carries 2 bits (2^2 = 4 possible states), for m = 3, each symbol carries 3 bits (2^3 = 8 possible states), etc. In FT8, m=3 so each symbol carries three bits and with 8 different frequencies there's 8 different symbol values.

Also, and this is building on last week but if you recall I read about Hamming (7,4) correction. LDPC is a similar concept but much more difficult to implement. Out of the 174 bits transmitted 77 are message bits, plus 83 parity bits are added to this. The redundancy is spread across all 174 bits, so the math is very robust. So even if 30% of your transmission is corrupted for example, the math will likely cause the original signal to be reconstructed perfectly. The original LDPC paper linked below is quite extensive and I haven't gotten through it yet. I will say though, I see more and more why Wylie suggested I use a library for implementing this.

I've been going through implementing the first parts of the encoder block. Even something as simple as this however has so many details that keep building out. I'll give an example. Say you want to accept a text input from the user, well first off you have to do some clean up. Then you have to detect the message type, and finally you have to parse for specific tokens that might exist. Assuming you were successful with that (I'm not prepared to make that claim yet), you have to go through and validate call signs then the grid locator and so on and so on. So yes, I'm working through this but the process has been extensive, however I can't deny I'm enjoying this quite a bit. It's so cool planning out then going through implementing it step by step. But yeah for this first block the steps I'll need are message parsing, bit encoding, LDPC encoding, and symbol generation.

Also, please watch this video! This is made by the legendary Joe Taylor (the creator of the original WSJT-X software) and it's just so cool to me: [https://www.youtube.com/watch?v=233HQs_8JGQ](https://www.youtube.com/watch?v=233HQs_8JGQ)

Finally the tips by Gary Hinson linked below is a great resource the amateur community, there's so many practical tips when it comes to actually operating FT8.

Till next week, adios. 

References:
[https://web.stanford.edu/class/ee388/papers/ldpc.pdf](https://web.stanford.edu/class/ee388/papers/ldpc.pdf)
[https://wsjt.sourceforge.io/Work_the_World_part1.pdf](https://wsjt.sourceforge.io/Work_the_World_part1.pdf)
[https://wsjt.sourceforge.io/Work_the_World_part2.pdf](https://wsjt.sourceforge.io/Work_the_World_part2.pdf)
[https://www.g4ifb.com/FT8_Hinson_tips_for_HF_DXers.pdf](https://www.g4ifb.com/FT8_Hinson_tips_for_HF_DXers.pdf)

**2025-05-23-GSoC Week 1: FT8 Research and Technical Preparation**

After my initial meeting with GSoC mentors Marcus and Wylie on May 16th, I've spent the week going through FT8 research and preparation. We discussed the project goals - ideally having a complete FT8/WSPR implementation in a GNU Radio OOT module ready for the October conference - and decided to start with FT8 due to its better documentation and reference implementations.

I've been going through the technical specs: FT8 uses 174-bit fixed rate datagrams with 77 bits of actual user info (3 bits for message type, 74 for payload), plus 14 CRC bits and 83 LDPC parity bits for error correction. The modulation uses 8 different tones over 15-second cycles, with Gray coding to minimize bit errors between adjacent frequencies. The Costa array sequence [3,1,4,0,6,5,2] handles synchronization. My plan is to use gr_modtool to create the ft8 module, starting with an ft8_encoder block to handle the 174-bit conversion, followed by an ft8_modulator for audio waveform generation. Starting with audio samples rather than IQ makes the most sense for initial development, and I can validate progress by comparing generated signals against known good FT8 transmissions using spectrum analyzer software. I've also been reviewing GNU Radio's OOT module guides and reviewing common error correction fundamentals like Hamming codes and convolutional encoders per Wylie's suggestions.

[This is a nice paper to read for anyone interested in further details](https://wsjt.sourceforge.io/FT4_FT8_QEX.pdf)

