+++
title="How Percentage Works in Calculators?"
extra.featured="/images/posts/calculator-percentage.png"
date=2024-10-13
extra.status="Done"

[taxonomies]
categories = ["Maths", "Python"]
tags = ["python", "maths"]

+++

<!-- Add summary here -->

<!-- more -->

<p align="center">
   <img src="/images/posts/jee-binomial/calculator-percentage.jpg" alt="jee-binomial-meme" style="max-width:98%"/>
</p>

## Motivation?

<blockquote class="twitter-tweet" align="center"><p lang="en" dir="ltr">Always trust your calculators <a href="https://t.co/xoSH7VFRT7">pic.twitter.com/xoSH7VFRT7</a></p>&mdash; World of Engineering (@engineers_feed) <a href="https://twitter.com/engineers_feed/status/1850951001190039880?ref_src=twsrc%5Etfw">October 28, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## How Percentage Works in Calculators

Percentages are a key feature of calculators, but the way they work may vary depending on the implementation. Let's break down how calculators handle percentages and the logic behind them.

### 1. **Basic Percentage Calculation (X%)**

On most calculators:

- Typing **200 × 50 %** will display **100** as the result.

When you type a number followed by the percentage symbol (%), the calculator interprets it as a fraction of 100. For example:

- **50%** is equivalent to **0.5**.

This is especially useful for quick computations. For example:

```
50% of 200 = 200 × 0.5 = 100
```

### 2. **Percentage Increase/Decrease**

When calculating a percentage increase or decrease, calculators help apply the following formulas:

- **Increase:** `Original Value + (Percentage × Original Value)`
- **Decrease:** `Original Value - (Percentage × Original Value)`

For example typing **150 + 20 %** on most calculators will calculate a 20% increase on 150:

```
150 + (150 × 0.2) = 180
```

Others may require you to first multiply 150 by 1.2 for the same effect.

## Implementation

We will look at two implementation of this operator in two open-source calculators: **GNOME** and **Android** calculator

### GNOME Calculator

The GNOME calculator [documentation](https://help.gnome.org/users/gnome-calculator/stable/percentage.html.en) describes how percentages are handled:

> Percentages are calculated using the % symbol.
>
> When added or subtracted the percentage symbol resolves to one percent of the value being added or subtracted from. The following equation calculates the price of a $140 item with 15% tax (140 + (15÷100)×140).
>
> **`140 + 15%`**
>
> In all other cases the percentage symbol resolves to a fraction out of 100. The following equation calculates one quarter of 80 apples ((25÷100)×80).
>
> **`25% × 80`**

```cpp
public class PercentNode : RNode
{
    public PercentNode (Parser parser, LexerToken? token, uint precedence, Associativity associativity)
    {
        base (parser, token, precedence, associativity);
    }

    public override Number? solve_r (Number r)
    {
        return r.divide_integer (100);
    }
}
```

```cpp
public class AddNode : LRNode
{
    public bool do_percentage = false;

    public AddNode (Parser parser, LexerToken? token, uint precedence, Associativity associativity)
    {
        base (parser, token, precedence, associativity);
    }

    public override Number solve_lr (Number l, Number r)
    {
        if (do_percentage)
        {
            var per = r.add (new Number.integer (100));
            per = per.divide_integer (100);
            return l.multiply (per);
        }
        else
            return l.add (r);
    }
}
```

https://github.com/GNOME/gnome-calculator/blob/8af88e1407ec47ed597068ed81db11862b82db18/lib/equation-parser.vala#L1795C1-L1803C10

```cpp
else if (token.type == LexerTokenType.PERCENTAGE)
{
    insert_into_tree_unary (new PercentNode (this, token, make_precedence_t (token.type), get_associativity (token)));

    if (!expression_2 ())
        return false;

    return true;
}
```

https://github.com/GNOME/gnome-calculator/blob/8af88e1407ec47ed597068ed81db11862b82db18/lib/equation-parser.vala#L1870C2-L1913C10

```cpp
else if (token.type == LexerTokenType.ADD)
{
    var node = new AddNode (this, token, make_precedence_t (token.type), get_associativity (token));
    insert_into_tree (node);

    if (!expression_1 ())
        return false;

    token = lexer.get_next_token ();
    if (token.type == LexerTokenType.PERCENTAGE)
    {
        //FIXME: This condition needs to be verified for all cases.. :(
        if (node.right.precedence > Precedence.PERCENTAGE)
        {
            var next_token  = lexer.get_next_token ();
            lexer.roll_back ();

            if (next_token.text != "" && get_precedence (next_token.type) < Precedence.PERCENTAGE)
            {
                lexer.roll_back ();
                if (!expression_2 ())
                    return true;
            }

            node.precedence = make_precedence_p (Precedence.PERCENTAGE);
            node.do_percentage = true;
            return true;
        }
        else
        {
            /* Assume '%' to be part of 'expression PERCENTAGE' statement. */
            lexer.roll_back ();
            if (!expression_2 ())
                return true;
        }
    }
    else
        lexer.roll_back ();

    if (!expression_2 ())
        return false;

    return true;
}
```

https://gitlab.gnome.org/GNOME/gnome-calculator/-/issues/?sort=created_date&state=all&search=percent&first_page_size=20

### Android Calculator

https://android.googlesource.com/platform/packages/apps/ExactCalculator/+/7265aa3a922a7e7c0389dae4b26cca562aa777a6/src/com/android/calculator2/CalculatorExpr.java#932

## Conclusion

Calculators handle percentages intuitively for most simple operations, but when working with more complex scenarios—like increases followed by discounts—understanding the underlying math becomes essential. Familiarizing yourself with these patterns will allow you to leverage the full potential of percentages in everyday calculations!

## References

1. [JEE (Advanced) Archive](https://jeeadv.ac.in/archive.html)
2. [Percentages](https://help.gnome.org/users/gnome-calculator/stable/percentage.html.en)
3. [functools — Python 3.13.0 documentation](https://docs.python.org/3/library/functools.html)

## Stay Tuned

Hope you enjoyed reading this. Stay tuned for more cool stuff coming your way!

<p align="center">
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1SKPmfSYaPsETbRHaiA18G?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</p>
</p>
