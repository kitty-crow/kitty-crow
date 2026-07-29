import { mkdir, writeFile } from "node:fs/promises";
function isRec(value) {
    return typeof value === "object" && value !== null;
}
function isStr(value) {
    return typeof value === "string";
}
function isNum(value) {
    return typeof value === "number" && Number.isFinite(value);
}
function isBool(value) {
    return typeof value === "boolean";
}
function isLangNode(value) {
    return isRec(value)
        && isStr(value.name)
        && (value.color === null || isStr(value.color));
}
function isLangEdge(value) {
    return isRec(value)
        && isNum(value.size)
        && isLangNode(value.node);
}
function isRepo(value) {
    return isRec(value)
        && isStr(value.name)
        && isBool(value.isArchived)
        && isNum(value.stargazerCount)
        && isNum(value.forkCount)
        && isRec(value.languages)
        && Array.isArray(value.languages.edges)
        && value.languages.edges.every(isLangEdge);
}
function isDay(value) {
    return isRec(value)
        && isNum(value.contributionCount)
        && isStr(value.date)
        && isNum(value.weekday);
}
function isWeek(value) {
    return isRec(value)
        && Array.isArray(value.contributionDays)
        && value.contributionDays.every(isDay);
}
function isCalendar(value) {
    return isRec(value)
        && isNum(value.totalContributions)
        && Array.isArray(value.weeks)
        && value.weeks.every(isWeek);
}
function isContributions(value) {
    return isRec(value)
        && isNum(value.totalCommitContributions)
        && isNum(value.totalIssueContributions)
        && isNum(value.totalPullRequestContributions)
        && isNum(value.totalPullRequestReviewContributions)
        && isCalendar(value.contributionCalendar);
}
function isUser(value) {
    return isRec(value)
        && (value.name === null || isStr(value.name))
        && isRec(value.followers)
        && isNum(value.followers.totalCount)
        && isRec(value.repositories)
        && isNum(value.repositories.totalCount)
        && Array.isArray(value.repositories.nodes)
        && value.repositories.nodes.every(isRepo)
        && isContributions(value.contributionsCollection);
}
function parseGql(value) {
    if (!isRec(value)) {
        throw new Error("GitHub GraphQL response is not an object");
    }
    const errors = value.errors;
    if (errors !== undefined) {
        if (!Array.isArray(errors) || !errors.every((item) => isRec(item) && isStr(item.message))) {
            throw new Error("GitHub GraphQL errors have an invalid shape");
        }
    }
    const data = value.data;
    let parsedData;
    if (data !== undefined) {
        if (!isRec(data)) {
            throw new Error("GitHub GraphQL data has an invalid shape");
        }
        const dataUser = data.user;
        if (!(dataUser === null || isUser(dataUser))) {
            throw new Error("GitHub GraphQL user has an invalid shape");
        }
        parsedData = { user: dataUser };
    }
    const result = {};
    if (parsedData !== undefined) {
        result.data = parsedData;
    }
    if (errors !== undefined) {
        result.errors = errors;
    }
    return result;
}
const token = process.env.GH_TOKEN;
const login = process.env.GH_LOGIN ?? "kitty-crow";
if (!token) {
    throw new Error("GH_TOKEN is required");
}
const query = `
  query Profile($login: String!) {
    user(login: $login) {
      name
      followers {
        totalCount
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          isArchived
          stargazerCount
          forkCount
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;
const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "kitty-crow-profile"
    },
    body: JSON.stringify({
        query,
        variables: { login }
    })
});
if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status}`);
}
const payload = parseGql(await response.json());
if (payload.errors?.length) {
    throw new Error(payload.errors.map((item) => item.message).join("; "));
}
const user = payload.data?.user;
if (!user) {
    throw new Error(`GitHub user not found: ${login}`);
}
const profile = user;
const activeRepos = profile.repositories.nodes.filter((repo) => !repo.isArchived);
const excludedRepos = new Set(["nsfwjs", "chatbot-ui", "carbonyl"]);
const langSkip = new Set(["JavaScript", "HTML", "CSS"]);
const langBytes = new Map();
let stars = 0;
let forks = 0;
for (const repo of activeRepos) {
    stars += repo.stargazerCount;
    forks += repo.forkCount;
    if (excludedRepos.has(repo.name)) {
        continue;
    }
    for (const edge of repo.languages.edges) {
        const name = edge.node.name;
        if (langSkip.has(name)) {
            continue;
        }
        langBytes.set(name, (langBytes.get(name) ?? 0) + edge.size);
    }
}
const langs = [...langBytes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);
const cal = profile.contributionsCollection.contributionCalendar;
const contributions = cal.weeks.flatMap((week) => week.contributionDays);
const generated = new Date().toISOString().slice(0, 10);
const themes = {
    light: {
        bg: "#ffffff",
        panel: "#e8f8f5",
        border: "#80cbc4",
        title: "#004d40",
        text: "#333333",
        muted: "#59706d",
        teal: "#00a8a8",
        cyan: "#33dede",
        lilac: "#8f6ad9",
        cells: ["#e8f8f5", "#b2ebf2", "#80deea", "#33dede", "#004d40"]
    },
    dark: {
        bg: "#1e1e1e",
        panel: "#121212",
        border: "#294149",
        title: "#00e0e0",
        text: "#e0e0e0",
        muted: "#9aa7a5",
        teal: "#00c8c8",
        cyan: "#00e0e0",
        lilac: "#c2a8ff",
        cells: ["#252525", "#294149", "#005f50", "#00a8a8", "#00e0e0"]
    }
};
function esc(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}
function shell(t, width, height, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <style>
    text { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    .title { font-size: 20px; font-weight: 700; fill: ${t.title}; }
    .label { font-size: 13px; fill: ${t.muted}; }
    .value { font-size: 24px; font-weight: 700; fill: ${t.text}; }
    .small { font-size: 11px; fill: ${t.muted}; }
  </style>
  <rect width="100%" height="100%" rx="14" fill="${t.bg}"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="13" fill="none" stroke="${t.border}"/>
  <rect x="0" y="0" width="${width}" height="34" rx="14" fill="${t.panel}"/>
  <rect x="0" y="20" width="${width}" height="14" fill="${t.panel}"/>
  <circle cx="18" cy="17" r="5" fill="${t.lilac}"/>
  <circle cx="34" cy="17" r="5" fill="${t.cyan}"/>
  <circle cx="50" cy="17" r="5" fill="${t.teal}"/>
  ${body}
</svg>`;
}
function statsSvg(t) {
    const c = profile.contributionsCollection;
    const stats = [
        ["active repos", activeRepos.length],
        ["stars", stars],
        ["followers", profile.followers.totalCount],
        ["contributions", cal.totalContributions],
        ["commits", c.totalCommitContributions],
        ["pull requests", c.totalPullRequestContributions],
        ["reviews", c.totalPullRequestReviewContributions],
        ["forks", forks]
    ];
    const cells = stats.map(([label, value], index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = 28 + col * 205;
        const y = 82 + row * 31;
        return `<text class="value" x="${x}" y="${y}">${esc(value)}</text>
    <text class="label" x="${x + 58}" y="${y - 2}">${esc(label)}</text>`;
    }).join("\n");
    return shell(t, 450, 224, `
    <text class="title" x="24" y="63">workshop telemetry</text>
    ${cells}
    <text class="small" x="24" y="209">public GitHub activity · refreshed ${generated}</text>
  `);
}
function langsSvg(t) {
    const total = langs.reduce((sum, [, size]) => sum + size, 0) || 1;
    const colours = [t.teal, t.lilac, t.cyan, "#388e3c", "#2f81f7", "#d29922", "#f778ba"];
    let offset = 0;
    const bars = langs.map(([, size], index) => {
        const ratio = size / total;
        const width = Math.max(4, ratio * 402);
        const x = 24 + offset;
        const colour = colours[index] ?? t.teal;
        offset += width;
        return `<rect x="${x.toFixed(2)}" y="76" width="${width.toFixed(2)}" height="12" rx="3" fill="${colour}"/>`;
    }).join("\n");
    const rows = langs.map(([name, size], index) => {
        const pct = ((size / total) * 100).toFixed(1);
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = 24 + col * 215;
        const y = 116 + row * 25;
        const dot = colours[index] ?? t.teal;
        return `<circle cx="${x + 5}" cy="${y - 5}" r="5" fill="${dot}"/>
    <text class="label" x="${x + 17}" y="${y}">${esc(name)}</text>
    <text class="small" text-anchor="end" x="${x + 193}" y="${y}">${pct}%</text>`;
    }).join("\n");
    return shell(t, 450, 224, `
    <text class="title" x="24" y="63">active source languages</text>
    <rect x="24" y="76" width="402" height="12" rx="3" fill="${t.panel}"/>
    ${bars}
    ${rows}
    <text class="small" x="24" y="209">active public repos · generated artefact-heavy repos excluded</text>
  `);
}
function contributionLevel(count, max) {
    if (count === 0) {
        return 0;
    }
    const ratio = count / Math.max(1, max);
    if (ratio < 0.25) {
        return 1;
    }
    if (ratio < 0.5) {
        return 2;
    }
    if (ratio < 0.75) {
        return 3;
    }
    return 4;
}
function contribSvg(t) {
    const width = 850;
    const height = 224;
    const size = 10;
    const gap = 3;
    const x0 = 91;
    const y0 = 94;
    const max = Math.max(...contributions.map((day) => day.contributionCount), 1);
    const byDate = new Map(contributions.map((day) => [day.date, day]));
    const start = new Date(contributions[0]?.date ?? generated);
    const cells = [];
    for (let week = 0; week < 53; week += 1) {
        for (let weekday = 0; weekday < 7; weekday += 1) {
            const date = new Date(start);
            date.setUTCDate(start.getUTCDate() + week * 7 + weekday);
            const key = date.toISOString().slice(0, 10);
            const day = byDate.get(key);
            const count = day?.contributionCount ?? 0;
            const level = contributionLevel(count, max);
            const x = x0 + week * (size + gap);
            const y = y0 + weekday * (size + gap);
            const colour = t.cells[level] ?? t.cells[0];
            cells.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="2" fill="${colour}"><title>${key}: ${count} contributions</title></rect>`);
        }
    }
    const monthStarts = [];
    let lastMonth = -1;
    for (let week = 0; week < 53; week += 1) {
        const date = new Date(start);
        date.setUTCDate(start.getUTCDate() + week * 7);
        const month = date.getUTCMonth();
        if (month !== lastMonth) {
            monthStarts.push({
                week,
                label: date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })
            });
            lastMonth = month;
        }
    }
    const monthLabels = monthStarts.flatMap((month, index) => {
        const nextWeek = monthStarts[index + 1]?.week ?? 53;
        if (nextWeek - month.week < 3) {
            return [];
        }
        return [`<text class="small" x="${x0 + month.week * (size + gap)}" y="79">${month.label}</text>`];
    });
    return shell(t, width, height, `
    <defs>
      <linearGradient id="scan" x1="0" x2="1">
        <stop offset="0" stop-color="${t.cyan}" stop-opacity="0"/>
        <stop offset="0.5" stop-color="${t.cyan}" stop-opacity="0.35"/>
        <stop offset="1" stop-color="${t.cyan}" stop-opacity="0"/>
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <text class="title" x="24" y="63">contribution trace</text>
    <text class="label" text-anchor="end" x="826" y="62">${cal.totalContributions} events in the last year</text>
    <text class="small" x="48" y="${y0 + 9}">Mon</text>
    <text class="small" x="48" y="${y0 + 3 * (size + gap) + 9}">Thu</text>
    <text class="small" x="48" y="${y0 + 6 * (size + gap) + 9}">Sun</text>
    ${monthLabels.join("\n")}
    ${cells.join("\n")}
    <rect x="${x0 - 18}" y="${y0 - 5}" width="36" height="${7 * (size + gap) - gap + 10}" rx="8" fill="url(#scan)" filter="url(#glow)">
      <animate attributeName="x" from="${x0 - 18}" to="${x0 + 53 * (size + gap)}" dur="7s" repeatCount="indefinite"/>
    </rect>
    <g transform="translate(776 185)">
      <path d="M0 13 L5 4 L10 10 L19 10 L24 4 L29 13 L26 27 L3 27 Z" fill="${t.panel}" stroke="${t.lilac}" stroke-width="2"/>
      <circle cx="9" cy="18" r="2" fill="${t.title}"/>
      <circle cx="20" cy="18" r="2" fill="${t.title}">
        <animate attributeName="r" values="2;2;0.2;2;2" dur="4s" repeatCount="indefinite"/>
      </circle>
      <path d="M12 23 Q15 25 18 23" fill="none" stroke="${t.title}" stroke-width="1.5"/>
    </g>
    <text class="small" x="24" y="210">GitHub GraphQL API · generated ${generated}</text>
  `);
}
await mkdir("generated", { recursive: true });
for (const [name, theme] of Object.entries(themes)) {
    await writeFile(`generated/stats-${name}.svg`, statsSvg(theme), "utf8");
    await writeFile(`generated/langs-${name}.svg`, langsSvg(theme), "utf8");
    await writeFile(`generated/contrib-${name}.svg`, contribSvg(theme), "utf8");
}
console.log(`Rendered profile artwork for ${login}`);
