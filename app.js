const requests = [
  {
    id: "REQ-1048",
    caseId: "CASE-7742",
    requester: "Customer Support Carl",
    role: "Tier 2 Customer Support",
    team: "Patient Support Operations",
    manager: "Priya Shah",
    status: "Full-time employee",
    compliance: "HIPAA training complete 19 days ago",
    currentAccess: [
      "Can view support cases and non-clinical patient profile fields",
      "No current access to lab result documents",
      "Last PHI exception expired 42 days ago",
    ],
    resource: "Blood work report LAB-23891",
    dataType: "PHI: lab result report",
    accessLevel: "Read-only",
    duration: "24 hours",
    justification:
      "Patient called about a missing hemoglobin result in the portal. Carl needs to verify whether the report was released.",
    urgency: "Standard",
    age: "12m",
    risk: 62,
    recommendation: "Approve with expiration",
    confidence: "High",
    rationale:
      "The request is narrow, tied to an active support case, and Carl has current HIPAA training. Because the report contains PHI and Carl does not normally access lab reports, access should be read-only and expire within 24 hours.",
    policy: [
      {
        title: "Minimum necessary access",
        detail: "Requested scope is one report for one support case.",
      },
      {
        title: "PHI support exception",
        detail: "Support role can receive temporary read-only access with reviewer approval.",
      },
      {
        title: "Time-bound access required",
        detail: "PHI exceptions for support must expire within 24 hours.",
      },
      {
        title: "No separation-of-duties conflict",
        detail: "Carl cannot edit, export, or release clinical results.",
      },
    ],
    signals: [
      "MFA passed this session",
      "Managed device compliant",
      "Login location matches normal pattern",
      "No recent security alerts",
    ],
  },
  {
    id: "REQ-1051",
    caseId: "CASE-7760",
    requester: "Customer Support Carl",
    role: "Tier 2 Customer Support",
    team: "Patient Support Operations",
    manager: "Priya Shah",
    status: "Full-time employee",
    compliance: "HIPAA training complete 19 days ago",
    currentAccess: [
      "Can view support cases and non-clinical patient profile fields",
      "No standing lab report access",
      "One temporary PHI approval in the past quarter",
    ],
    resource: "All blood work reports for patient MRN-19840",
    dataType: "PHI: longitudinal lab history",
    accessLevel: "Read-only bulk report access",
    duration: "7 days",
    justification:
      "Patient has a billing question and wants to know which reports were included in the invoice.",
    urgency: "Standard",
    age: "27m",
    risk: 88,
    recommendation: "Escalate",
    confidence: "Medium",
    rationale:
      "The request asks for broader PHI access than the support case appears to require. Policy allows narrow report access for support exceptions, but bulk lab history should be reviewed by the data owner or compliance team.",
    policy: [
      {
        title: "Scope exceeds support exception",
        detail: "Request covers all blood work reports instead of a specific report.",
      },
      {
        title: "Minimum necessary concern",
        detail: "Billing question may not require direct access to clinical lab history.",
      },
      {
        title: "Additional approval required",
        detail: "Bulk PHI access requires compliance or data-owner review.",
      },
      {
        title: "Time-bound access conflict",
        detail: "Requested 7-day duration exceeds support exception guidance.",
      },
    ],
    signals: [
      "MFA passed this session",
      "Managed device compliant",
      "No recent security alerts",
      "Justification does not explain why bulk report access is needed",
    ],
  },
  {
    id: "REQ-1054",
    caseId: "CASE-7793",
    requester: "Contract Nurse Nina",
    role: "Temporary Clinical Contractor",
    team: "Oncology Clinic",
    manager: "Dr. Elena Torres",
    status: "Contractor ending in 11 days",
    compliance: "HIPAA attestation pending",
    currentAccess: [
      "Can view assigned patient schedule",
      "No current lab report access",
      "Contractor access review pending",
    ],
    resource: "Blood work report LAB-24011",
    dataType: "PHI: oncology lab result",
    accessLevel: "Read-only",
    duration: "3 days",
    justification:
      "Needs report access for pre-visit clinical preparation while covering for another nurse.",
    urgency: "Urgent",
    age: "8m",
    risk: 79,
    recommendation: "Escalate",
    confidence: "High",
    rationale:
      "The request has a plausible clinical reason, but the requester is a contractor with pending HIPAA attestation. Escalate to the clinical manager or compliance reviewer before granting PHI access.",
    policy: [
      {
        title: "Clinical need present",
        detail: "The report is tied to pre-visit preparation.",
      },
      {
        title: "Training prerequisite missing",
        detail: "HIPAA attestation must be complete before PHI access.",
      },
      {
        title: "Contractor review required",
        detail: "Temporary clinical contractors need manager confirmation for PHI exceptions.",
      },
      {
        title: "Access duration review",
        detail: "Requested duration should match the specific clinic coverage window.",
      },
    ],
    signals: [
      "MFA passed this session",
      "Device posture unknown",
      "Login location matches hospital network",
      "Contract end date is approaching",
    ],
  },
];

let selectedRequestId = requests[0].id;
let selectedDecision = "Approve with expiration";

const requestList = document.querySelector("#requestList");
const filter = document.querySelector("#filter");
const pendingCount = document.querySelector("#pendingCount");
const highRiskCount = document.querySelector("#highRiskCount");
const caseId = document.querySelector("#caseId");
const requestTitle = document.querySelector("#requestTitle");
const riskBadge = document.querySelector("#riskBadge");
const summaryList = document.querySelector("#summaryList");
const recommendation = document.querySelector("#recommendation");
const evidenceList = document.querySelector("#evidenceList");
const permissionList = document.querySelector("#permissionList");
const signalList = document.querySelector("#signalList");
const auditNote = document.querySelector("#auditNote");
const decisionStatus = document.querySelector("#decisionStatus");
const decisionActions = document.querySelector("#decisionActions");

function getRiskClass(score) {
  if (score >= 75) return "risk-high";
  if (score >= 50) return "risk-medium";
  return "risk-low";
}

function getFilteredRequests() {
  const value = filter.value;
  if (value === "high") return requests.filter((request) => request.risk >= 75);
  if (value === "escalate") {
    return requests.filter((request) => request.recommendation === "Escalate");
  }
  if (value === "approve") {
    return requests.filter((request) => request.recommendation.includes("Approve"));
  }
  return requests;
}

function renderQueue() {
  pendingCount.textContent = requests.length;
  highRiskCount.textContent = requests.filter((request) => request.risk >= 75).length;
  requestList.innerHTML = "";

  getFilteredRequests().forEach((request) => {
    const button = document.createElement("button");
    button.className = `request-item ${request.id === selectedRequestId ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <strong>${request.requester}</strong>
      <span>${request.resource}</span>
      <span>${request.caseId} · ${request.age} old</span>
      <div class="request-meta">
        <span class="pill ${getRiskClass(request.risk)}">${request.risk} risk</span>
        <span>${request.recommendation}</span>
      </div>
    `;
    button.addEventListener("click", () => {
      selectedRequestId = request.id;
      selectedDecision = request.recommendation;
      decisionStatus.textContent = "";
      render();
    });
    requestList.appendChild(button);
  });
}

function renderSummary(request) {
  const rows = [
    ["Requester", request.requester],
    ["Role", request.role],
    ["Team", request.team],
    ["Manager", request.manager],
    ["Resource", request.resource],
    ["Data type", request.dataType],
    ["Access", `${request.accessLevel} · ${request.duration}`],
    ["Justification", request.justification],
  ];

  summaryList.innerHTML = rows
    .map(([term, detail]) => `<dt>${term}</dt><dd>${detail}</dd>`)
    .join("");
}

function renderDetail() {
  const request = requests.find((item) => item.id === selectedRequestId) ?? requests[0];
  caseId.textContent = `${request.id} · ${request.caseId}`;
  requestTitle.textContent = `${request.requester} requesting ${request.accessLevel.toLowerCase()} access`;
  riskBadge.className = `risk-badge ${getRiskClass(request.risk)}`;
  riskBadge.textContent = `${request.risk} risk`;

  renderSummary(request);

  recommendation.innerHTML = `
    <div>
      <span class="pill ${getRiskClass(request.risk)}">${request.confidence} confidence</span>
    </div>
    <strong>${request.recommendation}</strong>
    <p>${request.rationale}</p>
  `;

  evidenceList.innerHTML = request.policy
    .map(
      (item) => `
        <article class="evidence">
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </article>
      `,
    )
    .join("");

  permissionList.innerHTML = request.currentAccess
    .map((item) => `<li>${item}</li>`)
    .join("");

  signalList.innerHTML = request.signals.map((item) => `<li>${item}</li>`).join("");

  auditNote.value = `Recommended action: ${request.recommendation}. Evidence reviewed: requester role, current permissions, requested PHI scope, policy matches, and security signals.`;
  renderDecisionButtons();
}

function renderDecisionButtons() {
  [...decisionActions.querySelectorAll("button")].forEach((button) => {
    button.classList.toggle("selected", button.dataset.action === selectedDecision);
  });
}

function render() {
  renderQueue();
  renderDetail();
}

filter.addEventListener("change", () => {
  const filtered = getFilteredRequests();
  if (filtered.length && !filtered.some((request) => request.id === selectedRequestId)) {
    selectedRequestId = filtered[0].id;
  }
  render();
});

decisionActions.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  selectedDecision = button.dataset.action;
  decisionStatus.textContent = "";
  renderDecisionButtons();
});

document.querySelector("#saveDecision").addEventListener("click", () => {
  const request = requests.find((item) => item.id === selectedRequestId);
  decisionStatus.textContent = `${selectedDecision} saved for ${request.id}. Audit record captured.`;
});

render();
