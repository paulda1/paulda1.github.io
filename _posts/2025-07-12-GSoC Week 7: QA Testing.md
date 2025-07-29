This week I focused on building out QA tests for my FT8 encoder, and I’ve realized that each stage of the encoding process deserves its own magnifying glass. Let’s walk through what I’ve been validating.

First off we have the LDPC parity check, and this might have been the hardest part, if not for the fact I have the parity.dat values. FT8 relies on Low-Density Parity-Check codes and so I load the 83×174 parity check matrix from parity.dat, then run a codeword through it. The goal is simple:

1. Multiply the codeword by the parity matrix (in GF(2))

2. Check that all 83 parity equations evaluate to zero

3. If even one bit is wrong, the whole block fails

Next up is basic message encoding. Here the focus is just getting the 77 raw bits out of a callsign grid message like CQ K1ABC FN42. The test doesn’t need the whole waveform, just confirmation that:

1. The size is exactly 77 bits

2. At least one bit is set (because a fully zeroed message would be nonsense)

Then there’s the CRC check. This is where we append a 14‑bit Cyclic Redundancy Check to the 77 message bits, ending up with 91 bits. The test makes sure the original message bits are preserved exactly and that the CRC portion isn’t just a row of zeros. 

After that we run the LDPC encoding, which expands the 91 bits into 174 with parity. The test ensures not only that parity bits were added, but also that the original 91 bits are untouched at the start of the block. Without that, downstream decoding would go bad fast.

The next stage is symbol conversion, mapping the 174 bits into 8‑FSK symbols. This test is actually quite fun: we check that every symbol is between 0 and 7 and that the known FT8 sync sequence (costas) shows up exactly where it should at positions 0–6, 36–42, and 72–78.

And finally complete waveform generation, This one should check:
1. That the number of samples is right

2. That the waveform isn’t mostly zeros

3. That amplitude ranges stay reasonable

When the min and max values look normal, and the sync patterns still line up, you know you’ve got a signal that could be transmitted and decoded on the air.

Until next week,
Maulaga
