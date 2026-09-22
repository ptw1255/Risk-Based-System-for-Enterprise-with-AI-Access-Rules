# Risk Based System for Enterprise with AI Access Rules

## Goal

Design a risk-based access management system for a large enterprise moving from static access rules to AI-assisted access decisions. Then prototype a lightweight reviewer console for triaging access requests, including risk score, evidence, recommended action, reviewer decision, and audit notes.

## Customer

Healthcare companies and fintech enterprises that need controlled, auditable access to regulated and sensitive data.

## Business Outcome

Increase the velocity of sensitive-data access approvals while maintaining responsible policy enforcement, security oversight, and audit readiness.

## Product Concept

A risk-based access management system that evaluates sensitive data access requests using identity context, request details, resource sensitivity, policy constraints, security telemetry, historical records, and AI-assisted reasoning.

The system should help reviewers decide whether to approve, deny, escalate, or grant time-bound access while keeping humans accountable for final decisions.

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

The lightweight prototype should let a security reviewer triage access requests by showing:

- Risk score
- Evidence
- Recommended action
- Reviewer decision
- Audit notes
