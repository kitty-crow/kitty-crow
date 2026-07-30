<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg">
  <img src="./assets/banner-light.svg" width="100%" alt="Kitty Crow, electronics engineer and systems builder">
</picture>

<br>

[![Website](https://img.shields.io/badge/kittycrow.dev-005f50?style=for-the-badge&logo=firefoxbrowser&logoColor=b2ebf2)](https://kittycrow.dev)
[![Blog](https://img.shields.io/badge/blog-004d40?style=for-the-badge&logo=rss&logoColor=b2ebf2)](https://kittycrow.dev/blog)
[![Email](https://img.shields.io/badge/e--meow-002f6c?style=for-the-badge&logo=protonmail&logoColor=b3e5fc)](mailto:kitty@kittycrow.dev)
[![Ko-fi](https://img.shields.io/badge/buy_me_a_coffee-8f6ad9?style=for-the-badge&logo=kofi&logoColor=ffffff)](https://ko-fi.com/kittycrow)

</div>

## Hello, everynyan `(=^ΦωΦ^=)`

I’m **Kitty Crow**, an Electronics Engineer living in Scotland, originally from South America.

At work, I live around telemetry, instrumentation, systems integration, test equipment, and the awkward boundary where hardware and software stop agreeing. Outside work, I make TypeScript do things it was probably not emotionally prepared for: compilers, WebAssembly kernels, browser tools, a tiny operating system, and whatever else began with *“this should be simple”*.

> I build things, break them, read the logs, and build them again.

My website is part workshop, part scrapbook. It is where engineering notes sit beside strange little tools, retro-web experiments, terminal windows, fiction, anime catgirls, and projects that got completely out of hand. I am not sanding it down for LinkedIn.

<p align="center">
  <a href="https://kittycrow.dev"><img src="./assets/kittycrow-88x31.svg" width="88" height="31" alt="kittycrow.dev"></a>
  <a href="https://github.com/kitty-crow/mikuOS"><img src="./assets/mikuos-88x31.svg" width="88" height="31" alt="mikuOS"></a>
  <a href="https://www.typescriptlang.org/"><img src="./assets/typescript-88x31.svg" width="88" height="31" alt="Built with TypeScript"></a>
</p>

## Compatibility notes

<p align="center">
  <img src="./assets/pronouns-88x31.svg" width="88" height="31" alt="Pronouns: she, her, hers">
  <img src="./assets/pride-88x31.svg" width="88" height="31" alt="LGBTQ+ pride flag">
  <img src="./assets/lesbian-88x31.svg" width="88" height="31" alt="Lesbian pride flag">
  <img src="./assets/lefty-88x31.svg" width="88" height="31" alt="Politically left">
  <img src="./assets/typescript-whore.svg" width="88" height="31" alt="TypeScript whore">
  <img src="./assets/palestine-sovereignty.svg" width="88" height="31" alt="I support Palestinian sovereignty">
</p>

<div align="center">

</div>

## What is on the workbench

<table>
<tr>
<td width="50%" valign="top">

### [初音ミクOS v｡三](https://github.com/kitty-crow/mikuOS)

An experimental non-Linux operating system and userspace. **MIKU** means *MIKU Is Not the Kernel; it’s Userspace*. It can boot through the Thistle interpreter or the Teto WebAssembly kernel, with a growing Unix-like userland and browser build.

`TypeScript` `WebAssembly` `RISC-V` `systems`

</td>
<td width="50%" valign="top">

### [Sandsara Track Viewer](https://github.com/kitty-crow/sandsara-track-viewer)

A Visual Studio Code extension and local browser studio for kinetic sand tables. It turns images and SVGs into continuous, route-planned binary tracks, previews them live, and keeps the whole pipeline on the user’s machine.

`TypeScript` `VS Code` `Web Workers` `WASM`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### [Braille QR](https://github.com/kitty-crow/braille-qr)

A strongly typed utility that renders genuine QR matrices as dense Unicode Braille for terminals, self-contained HTML pages, browser generation, and paste-ready embeds.

`TypeScript` `Unicode` `QR` `terminal`

</td>
<td width="50%" valign="top">

### [The toolchain rabbit hole](https://github.com/kitty-crow/baguette)

**Bake** reshapes TypeScript into the subset understood by **Baguette**, Baguette compiles it towards WebAssembly, **Thistle** interprets the instruction set, and **Teto** executes it as a kernel. This was once a small compiler project.

`compiler` `runtime` `kernel` `because why not`

</td>
</tr>
</table>

<details>
<summary><strong>Open the unnecessarily detailed version</strong></summary>

```mermaid
flowchart LR
    TS["TypeScript"] --> Bake["Bake<br/>source pre-compiler"]
    Bake --> Baguette["Baguette<br/>TS subset → WASM"]
    Thistle["Thistle<br/>interpreter"] --> MIKU["初音ミクOS<br/>MIKU userspace"]
    Baguette --> Teto["Teto<br/>WASM kernel"]
    Teto --> MIKU
    KittyX["KittyX<br/>support libraries"] --> MIKU
    Nemu["NEMUNEMU / Neru<br/>Linux compatibility work"] --> MIKU
```

The names are recursive acronyms because apparently the technical problem was not enough.

</details>

## Tools I reach for

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-005f50?style=flat-square&logo=typescript&logoColor=b2ebf2">
  <img alt="WebAssembly" src="https://img.shields.io/badge/WebAssembly-005f50?style=flat-square&logo=webassembly&logoColor=b2ebf2">
  <img alt="RISC-V" src="https://img.shields.io/badge/RISC--V-005f50?style=flat-square&logo=riscv&logoColor=b2ebf2">
  <img alt="Linux" src="https://img.shields.io/badge/Linux-005f50?style=flat-square&logo=linux&logoColor=b2ebf2">
  <img alt="React" src="https://img.shields.io/badge/React-005f50?style=flat-square&logo=react&logoColor=b2ebf2">
  <img alt="Bun" src="https://img.shields.io/badge/Bun-005f50?style=flat-square&logo=bun&logoColor=b2ebf2">
  <img alt="C" src="https://img.shields.io/badge/C-002f6c?style=flat-square&logo=c&logoColor=b3e5fc">
  <img alt="Arduino" src="https://img.shields.io/badge/Arduino-002f6c?style=flat-square&logo=arduino&logoColor=b3e5fc">
  <img alt="KiCad" src="https://img.shields.io/badge/KiCad-002f6c?style=flat-square&logo=kicad&logoColor=b3e5fc">
  <img alt="Git" src="https://img.shields.io/badge/Git-8f6ad9?style=flat-square&logo=git&logoColor=ffffff">
</p>

```ts
const kitty = {
  work: ["telemetry", "instrumentation", "systems integration"],
  afterHours: ["compilers", "kernels", "browser tools", "odd ideas"],
  defaults: {
    language: "TypeScript",
    platform: "Linux",
    approach: "make it work, understand why, then make it clean"
  },
  status: "probably debugging something"
} as const;
```

## Workshop telemetry

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/stats-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/stats-light.svg">
    <img width="49%" src="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/stats-light.svg" alt="Kitty Crow's GitHub statistics">
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/langs-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/langs-light.svg">
    <img width="49%" src="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/langs-light.svg" alt="Languages used across Kitty Crow's active public repositories">
  </picture>
</div>

<br>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/contrib-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/contrib-light.svg">
    <img width="100%" src="https://raw.githubusercontent.com/kitty-crow/kitty-crow/output/contrib-light.svg" alt="Kitty Crow's animated contribution trace">
  </picture>
</div>

## Find me around the webz

<p align="center">
  <a href="https://kittycrow.dev">website</a>
  ·
  <a href="https://kittycrow.dev/blog">blog</a>
  ·
  <a href="https://kittycrow.dev/guestbook">guestbook</a>
  ·
  <a href="https://github.com/kittyCrypto-gg">web projects</a>
  ·
  <a href="https://discord.com/users/kitty.crow">Discord</a>
  ·
  <a href="https://twitter.com/kitty_cr0w0">Twitter</a>
  ·
  <a href="https://t.me/kitty_crow">Telegram</a>
</p>

<div align="center">

`ฅ^•ﻌ•^ฅ`  
**Thanks for wandering through.**

</div>
