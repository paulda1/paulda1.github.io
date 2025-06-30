---
title: "GSoC Week 5: Algorithmic Thinking"
---

As we’d previously mentioned the message.cc file contains the entirety of the message type detection logic. And then this object is passed into the ft8_encoder class to handle encoding which each have different encoding rules and bit field structures. 
Call signs in the hash table based on the protocol definition often can be stored as different sized hashes (10-bit, 12-bit, 22-bit) after the initial transmission. But the hash length affects the encoding rules and the bit field placement quite a bit. Then there’s the added complexity from the fact that 22-bit hashes can encoded alone or in the 28-bit field. 
I’ve also been porting some old Fortran to C++ for the encoding algorithms, however this is an interesting process because some choices made by them are uniquely due to the nature of Fortran itself. For example the algorithm for free_text_to_f71 which converts free text to a 71 bit encoded message has a rather complex implementation – however upon a closer look you see that this is only because it doesn’t natively support 128-bit integers. However, if you import a library to handle this, such as the libgmpxx library (the C++ wrapper for the libgmp library), this algorithm simplifies greatly. Mostly this decoding then making it in as idiomatic C++ as possible is an interesting technical problem. And honestly, I’ll have to continue to get better at this to make sure I write in a way that makes sense for C++. I received advice to focus on the actual things I want to achieve so that I’m not creating extra work for myself down the line having to change so many different things at once. 
Some advice I got that I’ll be taking action on immediately is to implement one message type first for now, then write a unit test, push the result through the LDPC encoder, and then the after the entire first part works for exactly one message you can keep going on to expand to all message types. This will essentially provide a way to have a minimum working start from which I can then go on without having to worry about constantly fixing the N different implementations mentioned before.
This week was a week where I learned quite a bit about programming in general like how to think about API design, legacy code, systems and interfaces. 
Thank you and till next week. 
Tot ziens!

