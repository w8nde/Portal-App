const portalApi = {
  async getPortalSnapshot() {
    await new Promise((resolve) => setTimeout(resolve, 250));

    return {
      stats: [
        { label: "Open opportunities", value: 18, delta: "+3 this week" },
        { label: "Mandates due soon", value: 6, delta: "2 need legal review" },
        { label: "Portal alerts", value: 11, delta: "4 high priority" },
        { label: "Expected pipeline", value: "$4.8M", delta: "73% weighted confidence" }
      ],
      sales: [
        {
          account: "Hudson Terrace Retail",
          stage: "Proposal",
          value: "$640,000",
          owner: "Ariana Bell",
          region: "Northeast",
          nextStep: "Finalize pricing sheet by Friday"
        },
        {
          account: "CivicWorks Housing Group",
          stage: "Negotiation",
          value: "$1,120,000",
          owner: "Leo Grant",
          region: "Mid-Atlantic",
          nextStep: "Schedule procurement follow-up"
        },
        {
          account: "Elm Street Partners",
          stage: "Discovery",
          value: "$380,000",
          owner: "Sam Rivera",
          region: "Northeast",
          nextStep: "Confirm site access requirements"
        },
        {
          account: "North Harbor Logistics",
          stage: "Closed won",
          value: "$2,600,000",
          owner: "Mina Shah",
          region: "Southeast",
          nextStep: "Transition to implementation team"
        }
      ],
      mandates: [
        {
          title: "Annual vendor certification",
          owner: "Legal + Ops",
          deadline: "March 18, 2026",
          priority: "high",
          note: "Portal requires signed compliance packet and updated insurance certificate."
        },
        {
          title: "Quarterly sales reporting mandate",
          owner: "Revenue Operations",
          deadline: "March 22, 2026",
          priority: "medium",
          note: "Bundle Q1 pipeline summary with approved forecast notes before submission."
        },
        {
          title: "Accessibility attestation",
          owner: "Implementation",
          deadline: "April 2, 2026",
          priority: "low",
          note: "Collect latest product accessibility documentation for enterprise review."
        }
      ],
      feed: [
        {
          title: "Procurement packet uploaded",
          timestamp: "Today, 9:12 AM",
          description: "CivicWorks added a revised RFP packet with expanded milestone requirements."
        },
        {
          title: "Mandate reminder triggered",
          timestamp: "Today, 8:05 AM",
          description: "Vendor certification for Hudson Terrace moved into 7-day warning window."
        },
        {
          title: "Stakeholder message received",
          timestamp: "Yesterday, 4:48 PM",
          description: "North Harbor requested kickoff scheduling options for the implementation handoff."
        }
      ],
      board: [
        {
          column: "Now",
          tasks: [
            {
              title: "Review proposal redlines",
              details: "Hudson Terrace legal comments need a pricing response today."
            },
            {
              title: "Prepare mandate packet",
              details: "Gather insurance and signed certification docs for upload."
            }
          ]
        },
        {
          column: "Next",
          tasks: [
            {
              title: "Build executive summary",
              details: "Convert new portal activity into a one-page update for leadership."
            },
            {
              title: "Clean account notes",
              details: "Standardize account health notes before Friday review."
            }
          ]
        },
        {
          column: "Blocked",
          tasks: [
            {
              title: "Portal API credentials",
              details: "Waiting on Old City IT to provide production API token and endpoint docs."
            }
          ]
        }
      ]
    };
  }
};

const state = {
  snapshot: null,
  region: "all"
};

const statsGrid = document.getElementById("statsGrid");
const salesTableBody = document.getElementById("salesTableBody");
const mandatesList = document.getElementById("mandatesList");
const portalFeed = document.getElementById("portalFeed");
const teamBoard = document.getElementById("teamBoard");
const regionFilter = document.getElementById("regionFilter");
const refreshButton = document.getElementById("refreshButton");
const lastUpdated = document.getElementById("lastUpdated");
const installHint = document.getElementById("installHint");

function renderStats(stats) {
  statsGrid.innerHTML = stats
    .map(
      (item) => `
        <article class="stat-card">
          <p>${item.label}</p>
          <p class="value">${item.value}</p>
          <p class="delta">${item.delta}</p>
        </article>
      `
    )
    .join("");
}

function renderSalesTable(sales) {
  const filteredSales =
    state.region === "all"
      ? sales
      : sales.filter((item) => item.region === state.region);

  salesTableBody.innerHTML = filteredSales
    .map(
      (item) => `
        <tr>
          <td>${item.account}</td>
          <td>${item.stage}</td>
          <td>${item.value}</td>
          <td>${item.owner}</td>
          <td>${item.region}</td>
          <td>${item.nextStep}</td>
        </tr>
      `
    )
    .join("");
}

function renderMandates(mandates) {
  mandatesList.innerHTML = mandates
    .map(
      (item) => `
        <article class="list-card">
          <h4>${item.title}</h4>
          <p>${item.note}</p>
          <div class="tag-row">
            <span class="tag priority-${item.priority}">${item.priority} priority</span>
            <span class="tag">${item.owner}</span>
            <span class="tag">Due ${item.deadline}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderFeed(feed) {
  portalFeed.innerHTML = feed
    .map(
      (item) => `
        <article class="list-card">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <div class="tag-row">
            <span class="tag">${item.timestamp}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderBoard(columns) {
  teamBoard.innerHTML = columns
    .map(
      (column) => `
        <section class="board-column">
          <div class="column-header">
            <h4>${column.column}</h4>
            <span class="tag">${column.tasks.length} items</span>
          </div>
          <div class="task-stack">
            ${column.tasks
              .map(
                (task) => `
                  <article class="task-card">
                    <h5>${task.title}</h5>
                    <p>${task.details}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function populateRegionFilter(sales) {
  const regions = [...new Set(sales.map((item) => item.region))];

  regionFilter.innerHTML = [
    '<option value="all">All regions</option>',
    ...regions.map((region) => `<option value="${region}">${region}</option>`)
  ].join("");

  regionFilter.value = state.region;
}

function renderApp() {
  if (!state.snapshot) {
    return;
  }

  renderStats(state.snapshot.stats);
  renderSalesTable(state.snapshot.sales);
  renderMandates(state.snapshot.mandates);
  renderFeed(state.snapshot.feed);
  renderBoard(state.snapshot.board);
  populateRegionFilter(state.snapshot.sales);
}

async function loadSnapshot() {
  refreshButton.disabled = true;
  refreshButton.textContent = "Refreshing...";

  try {
    state.snapshot = await portalApi.getPortalSnapshot();
    renderApp();
    lastUpdated.textContent = `Updated ${new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    })}`;
  } catch (error) {
    lastUpdated.textContent = "Unable to load portal data";
    console.error(error);
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "Refresh data";
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (error) {
      console.error("Service worker registration failed", error);
    }
  });
}

function setupInstallHint() {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    installHint.textContent = "Installed app mode active.";
    return;
  }

  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  if (isIos) {
    installHint.textContent = "On iPhone: tap Share, then Add to Home Screen.";
    return;
  }

  installHint.textContent = "On Android: open the browser menu, then tap Install App or Add to Home Screen.";
}

regionFilter.addEventListener("change", (event) => {
  state.region = event.target.value;
  if (state.snapshot) {
    renderSalesTable(state.snapshot.sales);
  }
});

refreshButton.addEventListener("click", loadSnapshot);

registerServiceWorker();
setupInstallHint();
loadSnapshot();
