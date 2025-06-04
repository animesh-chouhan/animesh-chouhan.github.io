+++
title="How Differentiation Works in Computers? 🧮"
extra.featured="/images/posts/differentiation.jpeg"
date=2025-06-01
extra.status="Done"

[taxonomies]
categories = ["Maths", "Python", "AI"]
tags = ["python", "maths"]

+++

<!-- Add summary here -->

<!-- more -->

<p align="center">
   <img src="/images/posts/differentiation/differentiation.jpeg" alt="differentiation" style="max-width:98%"/>
</p>

## How it started?

It all started when I was watching the YouTube video on [Finding The Slope Algorithm (Forward Mode Automatic Differentiation)](https://www.youtube.com/watch?v=QwFLA5TrviI&ab_channel=Computerphile) by Computerphile:

<p align="center" >
<iframe style="max-width: 90%;" width="625" height="350" src="https://www.youtube.com/embed/QwFLA5TrviI?si=Stvftc2CmPGQJGSQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

In this video, Mark Williams demonstrates Forward Mode Automatic Differentiation and explains how it addresses the limitations of traditional methods like [Symbolic](https://en.wikipedia.org/wiki/Computer_algebra) and [Numerical](https://en.wikipedia.org/wiki/Numerical_differentiation) Differentiation. The video also introduces the concept of [Dual Numbers](https://en.wikipedia.org/wiki/Dual_number) and shows how they can be efficiently used to compute the gradient of a function at any point.

Let's start with the basic concepts of differentiation!

## Differentiation

In mathematics, the derivative is a fundamental tool that quantifies the sensitivity to change of a function's output with respect to its input. The derivative of a function of a single variable at a chosen input value, when it exists, is the slope of the tangent line to the graph of the function at that point. The process of finding a [derivative](https://en.wikipedia.org/wiki/Derivative) is called differentiation.

<p align="center">
   <img src="/images/posts/differentiation/tangent_function_animation.gif" alt="differentiation_animation" style="max-width:98%"/>
</p>

### Mathematical Definition

<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\\(','\\\)']]}});
</script>
<style>
mjx-container{
   overflow-x: auto;
   overflow-y: hidden;
   padding-top: 0.2em;
   /* font-size: 110% !important; */
}
@media (max-width: 768px) {
  pre code {
      font-size: 0.9em
   }
}

</style>

A function of a real variable \\( f(x) \\) is differentiable at a point \\( a \\) of its domain, if its domain contains an open interval containing \\( ⁠a \\)⁠, and the limit \\( L \\) exists.

$$
L = \lim\_{h \to 0} \frac{f(a + h) - f(a)}{h}
$$

## Why We Calculate Derivatives?

Derivatives are a fundamental concept in calculus with many practical use cases across science, engineering, economics, and computer science. They measure how a quantity changes in response to a small change in another, commonly called "rate of change".

Think of a derivatives as answering:

> "If I nudge the input just a little, how much does the output change?"

This makes derivatives crucial wherever change, sensitivity, or optimization is important. Some important applications include:

1. **CFD (Computational Fluid Dynamics)** 🌊: Simulates fluid flow by solving Navier–Stokes equations using partial derivatives of velocity, pressure, and density. These derivatives capture how small changes propagate, enabling realistic real-time simulations of smoke, fire, and airflow.

<p align="center">
   <img src="/images/posts/differentiation/cfd.jpg" alt="cfd" style="max-width:70%"/>
</p>

2. **Image Processing & Edge Detection** 🖼️: Image processing uses derivatives like Sobel filters and Laplacians to detect edges by identifying rapid changes in pixel intensity. This helps highlight boundaries for applications in computer vision and object recognition.

<p align="center">
   <img src="/images/posts/differentiation/sobel.jpg" alt="sobel" style="max-width:70%"/>
</p>

3. **Signal Smoothing & Filtering** 📡: Derivatives detect sudden spikes or noise in audio and sensor data, enabling smoothing and feedback control. This improves performance in applications like music processing, GPS filtering, and motion stabilization.

<p align="center">
   <img src="/images/posts/differentiation/signal.png" alt="signal_processing" style="max-width:70%"/>
</p>

4. **Machine Learning & AI** 🧠: In machine learning, derivatives guide gradient descent by showing how to adjust weights to minimize loss. Backpropagation uses these derivatives to efficiently update neural network parameters during training.

<p align="center">
   <img src="/images/posts/differentiation/gradient_descent.jpg" alt="gradient_descent" style="max-width:70%"/>
</p>

## Differentiation Methods

When it comes to differentiating with a computer, our first instinct is often the method we learned in high school, using known rules for common functions and applying them step by step. Let’s take a closer look at how that works!

### Symbolic Differentiation

Symbolic differentiation relies on the fundamental definition of a derivative which is taking the limit of the difference quotient. After establishing the derivatives of basic functions, we can systematically apply differentiation rules to compute the derivatives of more complex expressions.

$$
\boxed{L = \lim\_{h \to 0} \frac{f(a + h) - f(a)}{h}}
$$

Let’s calculate it for a simple function: \\( f(x)=x^n \\)

$$
\displaylines{\begin{align} f(x) &= x^n \\\ f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \\\ &= \lim_{h \to 0} \frac{(x + h)^n - x^n}{h}\end{align}}
$$

Now apply the **Binomial Theorem**:

$$
(x + h)^n = x^n + n x^{n-1} h + \frac{n(n-1)}{2!} x^{n-2} h^2 + \cdots + h^n
$$

Substitute this back into the limit:

$$
\displaylines{\begin{align}f'(x) &= \lim_{h \to 0} \frac{x^n + nx^{n-1}h + \frac{n(n-1)}{2!}x^{n-2}h^2 + \cdots + h^n - x^n}{h} \\\ &= \lim_{h \to 0} \frac{nx^{n-1}h + \frac{n(n-1)}{2!}x^{n-2}h^2 + \cdots + h^n}{h} \\\ &= \lim\_{h \to 0} \left(nx^{n-1} + \frac{n(n-1)}{2!}x^{n-2}h + \cdots + h^{n-1}\right) \\\ &= nx^{n-1}\end{align}}
$$

Using the power rule from symbolic differentiation, the derivative is:

$$
\frac{d}{dx} x^n = n x^{n-1}
$$

This rule is one of the foundational results and forms the basis for differentiating more complex expressions built from powers of \\(x\\). You’ve probably seen a sheet that lists differentiation rules formulas like this:

<p align="center">
   <img src="/images/posts/differentiation/derivative-rules.png" alt="derivate_rules" style="max-width:90%"/>
</p>

By breaking a complex function into smaller components and systematically applying basic rules such as the power, product, and chain rules you can compute the derivative of complex functions step-by-step.

## References

1. [Derivative - Wikipedia](https://en.wikipedia.org/wiki/Derivative)
2. [Differentiation Rules - MATH MINDS ACADEMY](https://www.mathmindsacademy.com/differentiation-rules.html)

## Stay Tuned

Hope you enjoyed reading this. Stay tuned for more cool stuff coming your way!<br><br>

<p align="center">
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4JGKZS7h4Qa16gOU3oNETV?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</p>
