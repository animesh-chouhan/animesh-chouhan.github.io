---
title: "Godelify"
description: "Turns a C source file into a prime number and back"
date: 2026-06-05
featured: "/images/projects/godelify.png"
categories: ["Maths"]
tags: ["maths", "python"]
---

<p align="center">
   <img src="/images/projects/godelify.png" alt="Godelify" style="max-width:80%"/>
</p>

Github: [godelify](https://github.com/animesh-chouhan/godelify)

Try it: [godelify.animeshchouhan.com](https://godelify.animeshchouhan.com/). The web version works with any text or file.

Gödel numbering gives every statement its own number. Godelify does the same for C files. It compresses the source with zlib, reads the bytes as one big integer and adds a small suffix until the number is prime. Drop the suffix and decompress to get the exact file back.

```sh
godelify encode program.c
godelify decode <prime> <size> recovered.c
```

Keep the file size along with the prime. You need both to decode.
