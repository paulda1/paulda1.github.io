The next step forward this week was finally implementing the complete message flow from PMT input to RF output though granted with errors. Previously, I'd been stuck trying to understand how all these GNU Radio components actually fit together. This felt overwhelming initially but became much clearer once I started connecting actual blocks.

I begin by creating a top block using `gr::make_top_block`. This handles the entire signal processing pipeline - worth noting from the documentation that the maximum number of output items is 100000000, which should be more than enough for our FT8 transmissions.

For PMTs (Polymorphic Types), these carry data from one block to another thread-safely. To create a PMT string, I use `pmt::string_to_symbol("s")` or the equivalent `pmt::intern("s")`. Here I convert a sample callsign to PMT format to send as the test message.

To actually transmit this test message, I use the Message Strobe block to send the PMT every few milliseconds. The two key parameters are the PMT message itself and the period in milliseconds. With 1000ms chosen for the period, the PMT gets sent once per second - perfect for testing without flooding the system.

Now comes the block connections. I connect the strobe block to `msg_processor`, which is my custom block for handling PDUs. The make function returns a shared pointer like other GNU Radio blocks. You'll notice there are no input or output signatures - just `gr::io_signature::make(0, 0, 0)`. I call the input port `Input` and the output `Output`. The `set_msg_handler` function is essential because when a message arrives at the `Input` port, there needs to be a way to handle it properly.

Here's where things get interesting: blocks that don't have streaming ports usually don't even need a work function, which is why mine is commented out. The processing happens entirely in the message handler. The other steps remain the same as before - ultimately a float vector of frequency tones gets generated and converted to a PDU. To create the PDU, the frequency tones are converted to a uniform vector of 32-bit floats for the actual data, then the metadata dictionary contains the vector size. This PDU gets published to blocks connected to the `Output` port.

For `pdu_to_stream`, I use the EARLY_BURST_APPEND mode to ensure that as soon as a message arrives from the processor output, the data immediately gets appended to the output stream. A maximum of 64 PDUs can be queued, which should handle any reasonable burst scenarios. I'm not entirely sure about the input port name - I've guessed "pdus" based on the documentation, but I can't find the actual namespace file for `msgport_names::pdus()` to verify the exact string.

The Gaussian pulse shaping took some debugging. I was dividing by `samples_per_symbol` rather than the proper T = 0.160 timing, and I also needed to center it properly. Both issues are fixed now and the pulse shaping looks correct ish. I still feel like something is off but I can't pin down what exactly.

The `interp_fir_filter_fff` block takes input from pdu_to_stream, interpolates by filling in zeros as needed for our 48kHz sampling rate (which comes to 7680 samples per symbol), then performs 1D convolution with the GFSK taps to generate the proper tone transitions.

But here's the frustrating part: I clearly messed up the VCO multiplication in `multiply_const_ff` - it wouldn't make sense to do it there when I'm handling it properly in the next stage anyway. For now I deleted that multiplication and moved on.

Until next week,  
Bikala mbote
