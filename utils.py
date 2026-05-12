from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv(override=True)

SYSTEM_PROMPT = """You are a senior Indian contract lawyer with 15 years of experience reviewing freelance agreements, employment contracts, vendor agreements, real estate documents, and startup legal documents under Indian law.
You represent the person signing the contract and your job is to protect that user.
Only return valid JSON exactly matching the schema described by the user prompt. Do not provide any explanation, markdown, or additional text outside the JSON."""

USER_PROMPT_TEMPLATE = """Review the following contract carefully and return ONLY a valid JSON object matching the schema exactly.

JSON schema:
{
  "overall_risk": "Low" | "Moderate" | "High",
  "risk_summary": "2 sentence plain English overview of the contract",
  "contract_type": "e.g. Freelance Agreement, Employment Contract, Vendor Agreement",
  "red_flags_count": number,
  "clauses": [
    {
      "id": "unique string e.g. clause_1",
      "original_text": "exact text from contract",
      "risk_level": "green" | "yellow" | "red" | "info",
      "title": "short 3-5 word clause name",
      "plain_english": "explain in 1-2 simple sentences what this clause means, as if explaining to a student",
      "why_risky": "only include if risk_level is yellow or red — explain the specific risk",
      "indian_law_note": "only include if a specific Indian law applies — cite it briefly",
      "suggested_rewrite": "only include if risk_level is red — provide a fairer version of this clause"
    }
  ],
  "missing_clauses": [
    "List important clauses that should be in this contract but are missing — e.g. Payment Terms, Dispute Resolution, IP Ownership"
  ],
  "overall_advice": "3-4 sentences of plain English advice for the person signing this contract"
}

Focus especially on:
1. Payment terms — delays, non-payment, deductions
2. Termination — notice period, compensation on exit
3. IP ownership — who owns the work produced
4. Non-compete and non-disclosure scope and duration
5. Liability and indemnification clauses
6. Dispute resolution — jurisdiction, arbitration
7. Automatic renewal or lock-in traps

Contract text:
{contract_text}"""


def get_openai_api_key():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY is not set. Add it to your environment or create a .env file with OPENAI_API_KEY=..."
        )
    return api_key


def create_openai_client():
    return OpenAI(api_key=get_openai_api_key())


def get_contract_review_response(client, contract_text):
    max_chars = 8000
    if len(contract_text) > max_chars:
        contract_text = contract_text[:max_chars] + "

[...contract truncated due to length...]"

    prompt = USER_PROMPT_TEMPLATE.format(contract_text=contract_text)
    response = client.responses.create(
        model="gpt-4",
        temperature=0.0,
        max_output_tokens=1000,
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    )
    return response.output_text.strip()
