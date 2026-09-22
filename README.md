# Risk Based System for Enterprise with AI Access Rules

## Goal

Design a risk-based access management system for a large enterprise moving from static access rules to AI-assisted access decisions. Then prototype a lightweight reviewer console for triaging access requests, including risk score, evidence, recommended action, reviewer decision, and audit notes.

## Product Thesis

The system enables human reviewers to process sensitive-data access requests faster by leveraging AI-assisted risk assessment, evidence summarization, and recommended actions while keeping the reviewer accountable for the final decision.

## Customer

Healthcare companies and fintech enterprises that need controlled, auditable access to regulated and sensitive data.

## Business Outcome

Increase the velocity of sensitive-data access approvals while maintaining responsible policy enforcement, security oversight, and audit readiness.

## Primary Persona

Reviewer Randall is a security or access governance reviewer at a healthcare company. His job is to evaluate sensitive-data access requests quickly and responsibly, especially requests involving PHI such as blood work reports.

For the MVP, the product focuses on Randall. The employee requester, such as Customer Support Carl, is treated as request context rather than a separate user experience.

## Jobs To Be Done

### Primary Reviewer Job

When Randall receives a sensitive-data access request, he wants to review the request in the right manner, respond quickly, and capture the evidence and logic behind his decision so the system has a complete record.

### AI-Assisted Review Job

When Randall reviews a request, he wants AI to summarize the evidence, highlight risk factors, map the request to policy, and recommend an action with rationale so that he can process the request faster while still trusting and owning the final decision.

### Audit And Trust Job

When Randall or the organization reviews a decision later, they want a complete record of the request, evidence, AI recommendation, human decision, and rationale so that the organization can prove the decision was appropriate, explainable, and policy-aligned.

## Product Concept

A reviewer console for evaluating sensitive-data access requests using identity context, request details, resource sensitivity, policy constraints, security telemetry, historical records, and AI-assisted reasoning.

The system should help Randall process requests faster without hiding risk. Randall should be able to understand the recommendation, inspect the evidence, apply policy judgment, and make an auditable final decision.

## Reviewer UX Flow

1. Randall views a queue of pending sensitive-data access requests.
2. Randall opens a request, such as Carl requesting access to a patient blood work report for a support case.
3. The system shows enriched request context, including requester role, business justification, resource sensitivity, relevant policies, prior history, and security signals.
4. AI assists Randall by summarizing evidence, highlighting risk factors, identifying policy matches, and recommending an action.
5. Randall decides to approve, deny, escalate, or grant time-bound access.
6. Randall adds or confirms audit notes, including an override reason if he disagrees with the AI recommendation.
7. The system saves an audit record with the request, evidence, AI recommendation, reviewer decision, notes, and timestamps.


## Functional Requirements

### R1: Identify The Requester

The system must identify who is making the access request so Randall can understand the requester context before making a decision.

The system should show:

- Requester name and role
- Department or team
- Manager or reporting line
- Employment status
- Relevant compliance or training status

### R2: Identify Current Permission Level

The system must show what level of permission the requester currently has so Randall can compare the new request against existing access.

The system should show:

- Current access level
- Existing permissions for the requested system or dataset
- Prior related access grants
- Any recent permission changes

### R3: Identify Requested Data Access

The system must show what data the requester needs access to so Randall can evaluate sensitivity and scope.

The system should show:

- Requested resource or report
- Data classification
- Sensitive data type, such as PHI or PII
- Requested access level
- Requested access duration
- Business justification

### R4: Evaluate Request Against Policy

The system must provide a response based on the relationship between the request and applicable policies.

The system should show:

- Relevant policy matches
- Policy conflicts or violations
- Risk score
- Supporting evidence
- AI-recommended action
- Rationale for the recommendation
- Missing or uncertain information

## Data Inputs

- Request: requested resource, access level, duration, business justification, urgency, and source ticket or workflow.
- User: role, department, manager, employment type, location, tenure, and compliance or training status.
- Resource: system, application, dataset, environment, owner, criticality, and data classification.
- Sensitive data: PII, PHI for healthcare, PCI or payment data for fintech, customer records, financial data, and business-confidential data.
- Policy: RBAC and ABAC rules, least-privilege requirements, separation-of-duties constraints, approval chains, retention rules, and audit requirements.
- Telemetry and security signals: device posture, MFA status, IP or location risk, impossible travel, recent alerts, anomalous behavior, and compromised credential signals.
- Records history: prior approvals and denials, reviewer notes, overrides, incidents, past access patterns, and audit logs.
- AI prompt context: structured request summary, relevant policies, evidence, risk factors, and instructions for producing a recommendation with rationale.

## Reviewer Console Prototype

The lightweight prototype should let Randall triage access requests by showing:

- Request queue
- Risk score
- Evidence
- Policy matches
- Recommended action
- Reviewer decision
- Audit notes
