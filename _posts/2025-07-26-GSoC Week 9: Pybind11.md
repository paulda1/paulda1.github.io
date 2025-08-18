This week was spent finally understanding what pybind11 actually does under the hood. I went through the pybind11 documentation. Previously, I'd been treating it like some magical black box that somehow made C++ code work in Python. Which to be fair wasn't that far from reality. This felt like enough to get by initially but became a real problem when debugging binding issues. 
For those unfamiliar, pybind11 "is a lightweight header-only library that exposes C++ types in Python and vice versa, mainly to create Python bindings of existing C++ code". So some highlights of what this does:

- Automatic type conversions between Python objects and C++ types
- Exception handling that turns C++ exceptions into Python exceptions
- Memory management to deal with Python's garbage collector
- Function overloading and default arguments that work naturally in Python

The approach is honestly kind of elegant - you annotate your C++ code with pybind11 macros, and it generates all the PyObject* manipulation code automatically.

GNU radio decides to take advantage of this, moving away from SWIG to pybind11. The lesser of the two evils if you will. When you build a GNU Radio out-of-tree module, the build system generates several key files. The python/bindings/*_python.cc files contain the actual pybind11 binding code. Then there's the CMakeLists.txt magic that compiles these into shared libraries with names like gnuradio_your_module_python.so. These get installed where Python can find them, usually in site-packages.

But here's the frustrating part: the GNU Radio binding generator creates massive binding files with hundreds of lines of template instantiation. Debugging this feels next to impossible because of just the quantity of stuff to go through. Plus namespaces are annoying, because where on earth do you find where the variable you're trying to debug. 

At the same time, the real reason pybind11 is essential for testing becomes clear once you start writing QA code. You need your C++ blocks to be callable from Python so you can feed them stuff. Without proper bindings, you're stuck writing all your tests in C++, which means no numpy, no matplotlib, no pytest, which would all be ok if it weren't for the fact that Python is what people use to build GNU radio stuff. 

The real validation will be running these blocks in GNU Radio Companion and seeing clean diagrams. 

Until next week,  
Do widzenia

[Pybind11 docs](https://pybind11.readthedocs.io/en/stable/)
